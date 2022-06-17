import { AbstractModel } from "../shared";
import RoleValue from "./role.value";
import AuthIdValue from "./auth-id.value";

export default interface UserModel extends AbstractModel {
  readonly name: string;
  readonly role: RoleValue;
  readonly authIds: AuthIdValue[];
}
