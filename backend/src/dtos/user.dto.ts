export interface UserDTO {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: RoleDTO;
  createdAt: Date;
  updatedAt: Date;
  wallet: WalletDTO;
  // writing
}

export interface WalletDTO {
  id: string;
  userId: string;
  balance: number;
  // transactions Transaction[]
}

export enum RoleDTO {
  USER,
  ADMIN,
}
