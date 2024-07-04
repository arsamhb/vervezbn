import { Optional } from "sequelize";

export enum TransactionStatus {
  success = "success",
  failed = "failed",
  unknown = "unknown",
}

export interface TransactionAttributes {
  id: number;
  amount: number;
  user_id: number;
  status: TransactionStatus;
  gateway: string;
}

export interface TransactionCreationAttributes
  extends Optional<TransactionAttributes, "id"> {}
