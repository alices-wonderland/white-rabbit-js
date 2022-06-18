import {
  JournalCommand,
  JournalEntity,
  JournalService,
  Order,
  RoleValue,
} from "@white-rabbit/business-logic";
import { container, singleton } from "tsyringe";
import { MikroORM } from "@mikro-orm/core";
import each from "jest-each";
import { Task } from "./task";
import AbstractSuite from "./abstract-suite";

const TASKS: Array<Task<JournalEntity, JournalCommand>> = [
  {
    type: "FindPageTask",
    name: "Find journal page",
    input: {
      authUser: { user: { role: RoleValue.OWNER } },
      query: {},
      pagination: { size: 3 },
      sort: [{ field: "name", order: Order.ASC }],
    },
    checker: async ({ item }) => {
      let prevName: string | null = null;
      for (const { data } of item) {
        expect(data.deletedAt).toBeFalsy();
        if (prevName != null) {
          expect(data.name.localeCompare(prevName)).toBeGreaterThan(0);
        }
        prevName = data.name;
      }
    },
    expectNextPage: true,
  },
  {
    type: "FindOneTask",
    name: "Find a journal based on an admin",
    input: async (em) => {
      const journal = await em.findOneOrFail(
        JournalEntity,
        {},
        { populate: ["accessItems"] }
      );
      const adminUserId = journal.admins.filter(
        (item) => item.type === "user"
      )[0].itemId;
      return {
        authUser: { user: { role: RoleValue.OWNER } },
        query: {
          accessItems: { accessible: "admin", type: "user", user: adminUserId },
        },
      };
    },
    checker: async ({ item, input }) => {
      const queryAccessItem = input.query?.accessItems as Record<
        string,
        unknown
      >;
      expect(await item?.accessItems?.loadItems()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...queryAccessItem,
            user: expect.objectContaining({ id: queryAccessItem.user }),
          }),
        ])
      );
    },
  },
];

@singleton()
export default class JournalSuite extends AbstractSuite<
  JournalEntity,
  JournalCommand,
  JournalService
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(orm: MikroORM, service: JournalService) {
    super(orm, service);
  }

  readonly tasks = TASKS;

  static start(): void {
    describe("JournalSuite should be passed", () => {
      each(TASKS).test("$type: $name", async (task) =>
        container.resolve(JournalSuite).runTask(task)
      );
    });
  }
}