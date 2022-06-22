import { IUser } from '../interfaces';
import HttpClient from './httpClient';

interface ILoginResponse {
  user: IUser;
  token: string;
}

class SessionService {
  static async login(cpf: string, password: string): Promise<ILoginResponse> {
    const { data } = await HttpClient.api.post('/session', { cpf, password });

    return data;
  }
}

export default SessionService;
