import { QueryFullTextValue } from "../../shared/abstract-repository";

export type GroupQueryFullText = QueryFullTextValue & {
  readonly type: "GroupQueryFullText";
};

export interface GroupQueryByUser {
  readonly type: "GroupQueryByUser";

  readonly user: string;

  readonly field?: "admins" | "members";
}

export type GroupQuery = GroupQueryFullText | GroupQueryByUser;