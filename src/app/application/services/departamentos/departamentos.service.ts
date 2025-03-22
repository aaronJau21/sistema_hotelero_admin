import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IGetDepartamento } from '../../../domain';

@Injectable({
  providedIn: 'root',
})
export class DepartamentosService {
  private readonly _http = inject(HttpClient);
  private readonly _api = environment.URL_API;

  public updateStatus(id: number): Observable<IGetDepartamento> {
    const url = `${this._api}/departamentos/status/${id}`;
    return this._http.get<IGetDepartamento>(url);
  }

  public updateDepartamento(
    id: number,
    name: string
  ): Observable<IGetDepartamento> {
    const url = `${this._api}/departamentos/${id}`;
    return this._http.patch<IGetDepartamento>(url, { nombre: name });
  }
}
