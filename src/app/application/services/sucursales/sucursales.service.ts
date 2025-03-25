import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import {
  CreateSucursalDto,
  IGetAllSucursales,
  ISucursal,
} from '../../../domain';

@Injectable({
  providedIn: 'root',
})
export class SucursalesService {
  private readonly _http = inject(HttpClient);
  private readonly _api = environment.URL_API;

  getAllSucursales(queryPage: number): Observable<IGetAllSucursales> {
    const url = `${this._api}/SucusalesHoteles?page=${queryPage}&pageSize=10`;
    return this._http.get<IGetAllSucursales>(url);
  }

  getAllSelect():Observable<ISucursal[]> {
    const url = `${this._api}/SucusalesHoteles/select`;
    return this._http.get<ISucursal[]>(url);
  }

  updateStatusSucursal(id: number): Observable<ISucursal> {
    const url = `${this._api}/SucusalesHoteles/status/${id}`;
    return this._http.patch<ISucursal>(url, {});
  }

  createSucursal(data: CreateSucursalDto): Observable<ISucursal> {
    const url = `${this._api}/SucusalesHoteles`;
    return this._http.post<ISucursal>(url, data);
  }
}
