import { Optional } from "sequelize";

export interface Wallet {
  amount: number;
}

export interface UserAttributes {
  id: number;
  user_name: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  birth_date?: Date;
  wallet?: number;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}
