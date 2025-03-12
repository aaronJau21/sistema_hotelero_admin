export interface IGetClients {
  clients: IClient[];
}

export interface IClient {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  password: string;
  edad: number;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}
