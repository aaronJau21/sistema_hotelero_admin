import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaHabitacion } from '../../../domain';
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
}
