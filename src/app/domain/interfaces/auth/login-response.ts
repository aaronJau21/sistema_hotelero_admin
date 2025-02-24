export interface ILoginResponse {
  user: IUser;
  token: string;
}

export interface IUser {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  user_name: string;
  status: boolean;
  role_id: number;
}
