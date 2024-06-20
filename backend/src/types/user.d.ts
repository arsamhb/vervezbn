export interface User {
  userName: string;
  password: string;
  refreshToken?: string;
}

export interface UserAttributes extends User {
  id: number;
}


