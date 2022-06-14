export interface IAuthContext {
  token?: string;
  user: IContextUser;
  signIn: (cpf: string, password: string) => Promise<string | undefined>;
  signOut: () => void;
  signed: boolean;
}

export interface IContextUser {
  id?: string;
  name?: string;
}

export interface IAuthProvider {
  children: JSX.Element;
}
