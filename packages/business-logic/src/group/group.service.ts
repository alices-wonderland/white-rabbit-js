import { AuthUser, CommandInput, checkCreate, WriteService } from "../shared";
import GroupEntity, { GROUP_TYPE } from "./group.entity";
import GroupCommand from "./group.command";
import { singleton } from "tsyringe";
import { EntityDTO, EntityManager, MikroORM } from "@mikro-orm/core";
import { RoleValue, UserEntity, UserService } from "../user";
import CreateGroupCommand from "./create-group.command";
import { filterAsync } from "../utils";
import UpdateGroupCommand from "./update-group.command";
import DeleteGroupCommand from "./delete-group.command";
import { NoPermissionError } from "../error";

export const GROUP_READ_SCOPE =
  "urn:alices-wonderland:white-rabbit:groups:read";
export const GROUP_WRITE_SCOPE =
  "urn:alices-wonderland:white-rabbit:groups:write";

@singleton()
export default class GroupService extends WriteService<
  GroupEntity,
  GroupCommand
> {
  constructor(orm: MikroORM, private readonly userService: UserService) {
    super(orm, GROUP_TYPE, GroupEntity, GROUP_READ_SCOPE, GROUP_WRITE_SCOPE, [
      "CreateGroupCommand",
    ]);
  }

  private async createGroup(
    authUser: AuthUser,
    command: CreateGroupCommand,
    em: EntityManager
  ): Promise<GroupEntity> {
    await checkCreate(
      this.type,
      this.entityName,
      authUser,
      this.writeScope,
      {
        name: command.name,
      },
      em
    );

    const admins = await em.find(UserEntity, {
      id: {
        $in:
          authUser.user != null
            ? [...command.admins, authUser.user.id]
            : command.admins,
      },
    });
    const members = await em.find(UserEntity, { id: { $in: command.members } });
    const entity = new GroupEntity(command.name, command.description);
    entity.setAdmins(
      await filterAsync(admins, async (e) =>
        this.userService.isReadable(e, authUser)
      )
    );
    entity.setMembers(
      await filterAsync(members, async (e) =>
        this.userService.isReadable(e, authUser)
      )
    );
    em.persist(entity);
    return entity;
  }

  private async updateGroup(
    authUser: AuthUser,
    command: UpdateGroupCommand,
    em: EntityManager
  ): Promise<GroupEntity> {
    const entity = await this.getWriteableEntity(
      authUser,
      command.targetId,
      em
    );

    if (
      command.name == null &&
      command.description == null &&
      command.admins == null &&
      command.members == null
    ) {
      return entity;
    }

    if (command.name != null) {
      entity.name = command.name;
    }

    if (command.description != null) {
      entity.description = command.description;
    }

    if (command.admins != null) {
      const admins = await em.find(UserEntity, { id: { $in: command.admins } });
      entity.setAdmins(
        await filterAsync(admins, async (e) =>
          this.userService.isReadable(e, authUser)
        )
      );
    }

    if (command.members != null) {
      const members = await em.find(UserEntity, {
        id: { $in: command.members },
      });
      entity.setMembers(
        await filterAsync(members, async (e) =>
          this.userService.isReadable(e, authUser)
        )
      );
    }

    em.persist(entity);
    return entity;
  }

  private async deleteGroup(
    authUser: AuthUser,
    command: DeleteGroupCommand,
    em: EntityManager
  ): Promise<void> {
    const entity = await this.getWriteableEntity(
      authUser,
      command.targetId,
      em
    );

    entity.deletedAt = new Date();
    entity.name = entity.name + new Date().toUTCString();
    em.persist(entity);
  }

  override async handle(
    { command, authUser }: CommandInput<GroupCommand>,
    em?: EntityManager
  ): Promise<EntityDTO<GroupEntity> | null> {
    const emInst = em ?? this.orm.em.fork();
    switch (command.type) {
      case "CreateGroupCommand":
        return this.createGroup(authUser, command, emInst).then((e) =>
          e.toObject()
        );
      case "UpdateGroupCommand":
        return this.updateGroup(authUser, command, emInst).then((e) =>
          e.toObject()
        );
      case "DeleteGroupCommand":
        return this.deleteGroup(authUser, command, emInst).then(() => null);
    }
  }

  async isReadable(entity: GroupEntity, authUser: AuthUser): Promise<boolean> {
    if (!(await super.isReadable(entity, authUser))) {
      return false;
    }

    if ((authUser?.user?.role ?? RoleValue.USER) > RoleValue.USER) {
      return true;
    }

    if (!entity.admins.isInitialized()) {
      await entity.admins.init();
    }

    if (!entity.members.isInitialized()) {
      await entity.members.init();
    }

    return (
      authUser?.user != null &&
      (entity.admins.contains(authUser.user) ||
        entity.members.contains(authUser.user))
    );
  }

  async checkWriteable(entity: GroupEntity, authUser: AuthUser): Promise<void> {
    await super.checkWriteable(entity, authUser);

    if (!entity.admins.isInitialized()) {
      await entity.admins.init();
    }

    if (authUser.user == null || entity.admins.contains(authUser.user)) {
      throw new NoPermissionError(this.type, "WRITE");
    }
  }
}
