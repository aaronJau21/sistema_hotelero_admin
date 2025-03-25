import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IGetEstadoHabitacion } from '../../../domain';

@Injectable({
  providedIn: 'root',
})
export class EstadoHhabitacionService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.URL_API;

  getEstadoHabitacion(): Observable<IGetEstadoHabitacion[]> {
    const url = `${this.url}/Estados/habitacion`;
    return this.http.get<IGetEstadoHabitacion[]>(url);
  }
}
