import { WalletDTO } from "./user.dto";

export interface Transaction {
  id: string;
  walletId: string;
  amount: number;
  type: TransactionDTO;
  createdAt: Date;
  updatedAt: Date;
  wallet: WalletDTO;
}

export enum TransactionDTO {
  CREDIT,
  DEBIT,
}
