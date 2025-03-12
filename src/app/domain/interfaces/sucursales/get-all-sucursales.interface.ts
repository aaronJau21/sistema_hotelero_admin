export interface IGetAllSucursales {
  data: ISucursal[];
  meta: Meta;
}

export interface ISucursal {
  id:        number;
  nombre:    string;
  direccion: string;
  id_user:   number;
  status:    boolean;
}

export interface Meta {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
}
