export enum TransactionStatus {
  success = "success",
  failed = "failed",
  unknown = "unknown",
}

export interface Transaction {
  amount: number;
  user_id: string;
  status: TransactionStatus;
  bank: string;
  gateway: string;
}
