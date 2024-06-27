export interface Transaction {
  amount: number;
  user_id: string;
  status: "success" | "failed" | "unknown";
  bank: string;
  gateway: string;
}
