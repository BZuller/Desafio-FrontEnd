export interface IUser {
  id: string;
  name: string;
  cpf: string;
  password: string;
  observations?: string;
  birthdate: Date;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
