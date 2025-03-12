import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaHabitacion, IGetCategoryHabitacion } from '../../../domain';
import { environment } from '../../../../environments/environment.development';
import { CreteTipoHabitacionDto } from '../../../domain/dto/habitaciones/createTipoHabitacion.dto';

@Injectable({
  providedIn: 'root',
})
export class TipoHabitacionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.URL_API;

  createTipoHabitacion(
    data: CreteTipoHabitacionDto
  ): Observable<CategoriaHabitacion> {
    const url = `${this.baseUrl}/tipo-habitacion`;
    return this.http.post<CategoriaHabitacion>(url, data);
  }

  getTipo_habitaciones(): Observable<IGetCategoryHabitacion[]> {
    const url = `${this.baseUrl}/tipo-habitacion`;
    return this.http.get<IGetCategoryHabitacion[]>(url);
  }

  getTipo_habitacion(id: number): Observable<IGetCategoryHabitacion> {
    const url = `${this.baseUrl}/tipo-habitacion/${id}`;
    return this.http.get<IGetCategoryHabitacion>(url);
  }

  updateStatus(id: number) {
    const url = `${this.baseUrl}/tipo-habitacion/status/${id}`;
    return this.http.patch(url, {});
  }

  updateTipo_habitacion(
    id: number,
    data: CreteTipoHabitacionDto
  ): Observable<CategoriaHabitacion> {
    const url = `${this.baseUrl}/tipo-habitacion/${id}`;
    return this.http.patch<CategoriaHabitacion>(url, data);
  }
}
