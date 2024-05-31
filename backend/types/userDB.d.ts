import { User } from "./user";

export interface UserDB {
  users: Array<User>;
  setUsers: (users: Array<User>) => void;
}
