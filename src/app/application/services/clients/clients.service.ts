import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IClient } from '../../../domain/interfaces/clients/get-clients.interface';
import { CreateClientDto } from '../../../domain';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly _http = inject(HttpClient);
  private readonly _api = environment.URL_API;

  public createClient(data: CreateClientDto): Observable<IClient> {
    const url = `${this._api}/clients`;
    return this._http.post<IClient>(url, data);
  }

  public updateStatusClient(id: number): Observable<IClient> {
    const url = `${this._api}/clients/status/${id}`;
    return this._http.patch<IClient>(url, {});
  }
}
