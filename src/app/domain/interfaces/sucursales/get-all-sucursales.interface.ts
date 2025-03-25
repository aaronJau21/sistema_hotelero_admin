export interface IGetAllSucursales {
  data: ISucursal[];
  totalPages: number;
  pageSize: number;
  page: number;
  totalRecords: string;
}

export interface ISucursal {
  id: number;
  nombre: string;
  direccion: string;
  id_user: number;
  status: boolean;
}
