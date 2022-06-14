import { IUser } from '../interfaces';
import HttpClient from './httpClient';

class UsersService {
  static async users(): Promise<IUser[]> {
    const { data } = await HttpClient.api.get<IUser[]>('/user');
    return data;
  }

  static async user(id: string): Promise<IUser> {
    const { data } = await HttpClient.api.get(`/users/${id}`);
    return data;
  }

  static async create(
    name: string,
    cpf: string,
    password: string,
    birthdate: Date,
    admin: boolean,
    observations?: string
  ): Promise<IUser> {
    const { data } = await HttpClient.api.post('/user', { name, cpf, password, observations, birthdate, admin });
    return data;
  }

  static async update(id: string, admin: boolean, observations?: string): Promise<void> {
    const obj = {
      admin,
      observations,
    };
    const { data } = await HttpClient.api.put(`/user/${id}`, obj);
    return data;
  }

  static async delete(id: string): Promise<number> {
    const { status } = await HttpClient.api.delete(`/user/${id}`);
    return status;
  }
}

export default UsersService;
