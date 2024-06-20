export interface Wallet {
  amount: number;
}

export interface User {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  refreshToken?: string;
  wallet: Wallet;
}
