import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CreateHabitacionDto, IGetHabitaciones } from '../../../domain';

@Injectable({
  providedIn: 'root',
})
export class HabitacionesService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.URL_API;

  getHabitaciones(): Observable<IGetHabitaciones[]> {
    return this.http.get<IGetHabitaciones[]>(`${this.url}/habitaciones`);
  }

  createHabitaciones(data: CreateHabitacionDto): Observable<IGetHabitaciones> {
    const token = localStorage.getItem('token');
    console.log(token);
    return this.http.post<IGetHabitaciones>(`${this.url}/habitaciones`, data);
  }

  findOne(id: number): Observable<IGetHabitaciones> {
    return this.http.get<IGetHabitaciones>(`${this.url}/habitaciones/${id}`);
  }

  update(id: number, data: CreateHabitacionDto): Observable<IGetHabitaciones> {
    const url = `${this.url}/habitaciones/${id}`;
    return this.http.patch<IGetHabitaciones>(url, data);
  }

  update_status(id: number): Observable<IGetHabitaciones> {
    return this.http.patch<IGetHabitaciones>(
      `${this.url}/habitaciones/status/${id}`,
      null
    );
  }
}
