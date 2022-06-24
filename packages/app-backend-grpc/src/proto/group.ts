/* eslint-disable */
// @generated by protobuf-ts 2.7.0 with parameter eslint_disable,ts_nocheck,server_generic,client_none,optimize_code_size
// @generated from protobuf file "group.proto" (package "whiterabbit.group", syntax proto3)
// tslint:disable
// @ts-nocheck
import { FindPageRequest } from "./shared";
import { StringValue } from "./google/protobuf/wrappers";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { NullableStringArray } from "./shared";
import { PageInfo } from "./shared";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * @generated from protobuf message whiterabbit.group.Group
 */
export interface Group {
  /**
   * @generated from protobuf field: string id = 1;
   */
  id: string;
  /**
   * @generated from protobuf field: google.protobuf.Timestamp createdAt = 2;
   */
  createdAt?: Timestamp;
  /**
   * @generated from protobuf field: google.protobuf.Timestamp updatedAt = 3;
   */
  updatedAt?: Timestamp;
  /**
   * @generated from protobuf field: string name = 4;
   */
  name: string;
  /**
   * @generated from protobuf field: string description = 5;
   */
  description: string;
  /**
   * @generated from protobuf field: repeated string admins = 6;
   */
  admins: string[];
  /**
   * @generated from protobuf field: repeated string members = 7;
   */
  members: string[];
}
/**
 * @generated from protobuf message whiterabbit.group.GroupPage
 */
export interface GroupPage {
  /**
   * @generated from protobuf field: whiterabbit.shared.PageInfo pageInfo = 1;
   */
  pageInfo?: PageInfo;
  /**
   * @generated from protobuf field: repeated whiterabbit.group.GroupItem items = 2;
   */
  items: GroupItem[];
}
/**
 * @generated from protobuf message whiterabbit.group.GroupItem
 */
export interface GroupItem {
  /**
   * @generated from protobuf field: string cursor = 1;
   */
  cursor: string;
  /**
   * @generated from protobuf field: whiterabbit.group.Group data = 2;
   */
  data?: Group;
}
/**
 * @generated from protobuf message whiterabbit.group.GroupResponse
 */
export interface GroupResponse {
  /**
   * @generated from protobuf field: whiterabbit.group.Group group = 1;
   */
  group?: Group;
}
/**
 * @generated from protobuf message whiterabbit.group.CreateCommand
 */
export interface CreateCommand {
  /**
   * @generated from protobuf field: optional string id = 1;
   */
  id?: string;
  /**
   * @generated from protobuf field: string name = 2;
   */
  name: string;
  /**
   * @generated from protobuf field: string description = 3;
   */
  description: string;
  /**
   * @generated from protobuf field: repeated string admins = 4;
   */
  admins: string[];
  /**
   * @generated from protobuf field: repeated string members = 5;
   */
  members: string[];
}
/**
 * @generated from protobuf message whiterabbit.group.UpdateCommand
 */
export interface UpdateCommand {
  /**
   * @generated from protobuf field: string id = 1;
   */
  id: string;
  /**
   * @generated from protobuf field: optional string name = 2;
   */
  name?: string;
  /**
   * @generated from protobuf field: optional string description = 3;
   */
  description?: string;
  /**
   * @generated from protobuf field: whiterabbit.shared.NullableStringArray admins = 4;
   */
  admins?: NullableStringArray;
  /**
   * @generated from protobuf field: whiterabbit.shared.NullableStringArray members = 5;
   */
  members?: NullableStringArray;
}
/**
 * @generated from protobuf message whiterabbit.group.DeleteCommand
 */
export interface DeleteCommand {
  /**
   * @generated from protobuf field: string id = 1;
   */
  id: string;
}
/**
 * @generated from protobuf message whiterabbit.group.Command
 */
export interface Command {
  /**
   * @generated from protobuf oneof: command
   */
  command:
    | {
        oneofKind: "create";
        /**
         * @generated from protobuf field: whiterabbit.group.CreateCommand create = 1;
         */
        create: CreateCommand;
      }
    | {
        oneofKind: "update";
        /**
         * @generated from protobuf field: whiterabbit.group.UpdateCommand update = 2;
         */
        update: UpdateCommand;
      }
    | {
        oneofKind: "delete";
        /**
         * @generated from protobuf field: whiterabbit.group.DeleteCommand delete = 3;
         */
        delete: DeleteCommand;
      }
    | {
        oneofKind: undefined;
      };
}
/**
 * @generated from protobuf message whiterabbit.group.Commands
 */
export interface Commands {
  /**
   * @generated from protobuf field: repeated whiterabbit.group.Command commands = 1;
   */
  commands: Command[];
}
// @generated message type with reflection information, may provide speed optimized methods
class Group$Type extends MessageType<Group> {
  constructor() {
    super("whiterabbit.group.Group", [
      { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
      { no: 2, name: "createdAt", kind: "message", T: () => Timestamp },
      { no: 3, name: "updatedAt", kind: "message", T: () => Timestamp },
      { no: 4, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
      {
        no: 5,
        name: "description",
        kind: "scalar",
        T: 9 /*ScalarType.STRING*/,
      },
      {
        no: 6,
        name: "admins",
        kind: "scalar",
        repeat: 2 /*RepeatType.UNPACKED*/,
        T: 9 /*ScalarType.STRING*/,
      },
      {
        no: 7,
        name: "members",
        kind: "scalar",
        repeat: 2 /*RepeatType.UNPACKED*/,
        T: 9 /*ScalarType.STRING*/,
      },
    ]);
  }
}
/**
 * @generated MessageType for protobuf message whiterabbit.group.Group
 */
export const Group = new Group$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GroupPage$Type extends MessageType<GroupPage> {
  constructor() {
    super("whiterabbit.group.GroupPage", [
      { no: 1, name: "pageInfo", kind: "message", T: () => PageInfo },
      {
        no: 2,
        name: "items",
        kind: "message",
        repeat: 1 /*RepeatType.PACKED*/,
        T: () => GroupItem,
      },
    ]);
  }
}
/**
 * @generated MessageType for protobuf message whiterabbit.group.GroupPage
 */
export const GroupPage = new GroupPage$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GroupItem$Type extends MessageType<GroupItem> {
  constructor() {
    super("whiterabbit.group.GroupItem", [
      { no: 1, name: "cursor", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
      { no: 2, name: "data", kind: "message", T: () => Group },
    ]);
  }
}
/**
 * @generated MessageType for protobuf message whiterabbit.group.GroupItem
 */
export const GroupItem = new GroupItem$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GroupResponse$Type extends MessageType<GroupResponse> {
  constructor() {
    super("whiterabbit.group.GroupResponse", [
      { no: 1, name: "group", kind: "message", T: () => Group },
    ]);
  }
}
/**
 * @generated MessageType for protobuf message whiterabbit.group.GroupResponse
 */
export const GroupResponse = new GroupResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CreateCommand$Type extends MessageType<CreateCommand> {
  constructor() {
    super("whiterabbit.group.CreateCommand", [
      {
        no: 1,
        name: "id",
        kind: "scalar",
        opt: true,
        T: 9 /*ScalarType.STRING*/,
      },
      { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
      {
        no: 3,
        name: "description",
        kind: "scalar",
        T: 9 /*ScalarType.STRING*/,
      },
      {
        no: 4,
        name: "admins",
        kind: "scalar",
        repeat: 2 /*RepeatType.UNPACKED*/,
        T: 9 /*ScalarType.STRING*/,
      },
      {
        no: 5,
        name: "members",
        kind: "scalar",
        repeat: 2 /*RepeatType.UNPACKED*/,
        T: 9 /*ScalarType.STRING*/,
      },
    ]);
  }
}
/**
 * @generated MessageType for protobuf message whiterabbit.group.CreateCommand
 */
export const CreateCommand = new CreateCommand$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateCommand$Type extends MessageType<UpdateCommand> {
  constructor() {
    super("whiterabbit.group.UpdateCommand", [
      { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
      {
        no: 2,
        name: "name",
        kind: "scalar",
        opt: true,
        T: 9 /*ScalarType.STRING*/,
      },
      {
        no: 3,
        name: "description",
        kind: "scalar",
        opt: true,
        T: 9 /*ScalarType.STRING*/,
      },
      { no: 4, name: "admins", kind: "message", T: () => NullableStringArray },
      { no: 5, name: "members", kind: "message", T: () => NullableStringArray },
    ]);
  }
}
/**
 * @generated MessageType for protobuf message whiterabbit.group.UpdateCommand
 */
export const UpdateCommand = new UpdateCommand$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteCommand$Type extends MessageType<DeleteCommand> {
  constructor() {
    super("whiterabbit.group.DeleteCommand", [
      { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
    ]);
  }
}
/**
 * @generated MessageType for protobuf message whiterabbit.group.DeleteCommand
 */
export const DeleteCommand = new DeleteCommand$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Command$Type extends MessageType<Command> {
  constructor() {
    super("whiterabbit.group.Command", [
      {
        no: 1,
        name: "create",
        kind: "message",
        oneof: "command",
        T: () => CreateCommand,
      },
      {
        no: 2,
        name: "update",
        kind: "message",
        oneof: "command",
        T: () => UpdateCommand,
      },
      {
        no: 3,
        name: "delete",
        kind: "message",
        oneof: "command",
        T: () => DeleteCommand,
      },
    ]);
  }
}
/**
 * @generated MessageType for protobuf message whiterabbit.group.Command
 */
export const Command = new Command$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Commands$Type extends MessageType<Commands> {
  constructor() {
    super("whiterabbit.group.Commands", [
      {
        no: 1,
        name: "commands",
        kind: "message",
        repeat: 1 /*RepeatType.PACKED*/,
        T: () => Command,
      },
    ]);
  }
}
/**
 * @generated MessageType for protobuf message whiterabbit.group.Commands
 */
export const Commands = new Commands$Type();
/**
 * @generated ServiceType for protobuf service whiterabbit.group.GroupService
 */
export const GroupService = new ServiceType("whiterabbit.group.GroupService", [
  { name: "findOne", options: {}, I: StringValue, O: GroupResponse },
  { name: "findPage", options: {}, I: FindPageRequest, O: GroupPage },
  { name: "handle", options: {}, I: Command, O: GroupResponse },
  {
    name: "handleAll",
    serverStreaming: true,
    options: {},
    I: Commands,
    O: GroupResponse,
  },
]);
