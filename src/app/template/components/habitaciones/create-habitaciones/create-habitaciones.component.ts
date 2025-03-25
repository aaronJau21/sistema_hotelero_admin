import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { TipoHabitacionService } from '../../../../application/services/habitaciones/tipo-habitacion.service';
import { EstadoHhabitacionService } from '../../../../application/services/habitaciones/estado-hhabitacion.service';
import { HabitacionesService } from '../../../../application/services/habitaciones/habitaciones.service';
import { SucursalesService } from '../../../../application/services/sucursales/sucursales.service';

@Component({
  selector: 'app-create-habitaciones',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './create-habitaciones.component.html',
  styleUrl: './create-habitaciones.component.css',
})
export class CreateHabitacionesComponent {
  private readonly dialog = inject(MatDialogRef<CreateHabitacionesComponent>);
  private readonly tipoHabitacionService = inject(TipoHabitacionService);
  private readonly estadoHabitacionService = inject(EstadoHhabitacionService);
  private readonly habitacionesService = inject(HabitacionesService);
  private readonly sucursalService = inject(SucursalesService);
  private readonly fb = inject(FormBuilder);

  // tipo habitacion
  getTipoHabitacion = rxResource({
    loader: () => this.tipoHabitacionService.getTipo_habitaciones(),
  });
  // Estado habitacion
  getEstadoHabitacion = rxResource({
    loader: () => this.estadoHabitacionService.getEstadoHabitacion(),
  });
  // Sucursales
  getSucursales = rxResource({
    loader: () => this.sucursalService.getAllSelect(),
  });

  public formCreateHabitacion: FormGroup = this.fb.group({
    NumeroHabitacion : [''],
    id_categoria: [0],
    id_estado_habitacion: [0],
    descripcion: [''],
    servicios_incluidos: [''],
    id_sucursal: [0],
  });

  createHabitacion() {
    return this.habitacionesService
      .createHabitaciones(this.formCreateHabitacion.value)
      .subscribe({
        next: (res) => {
          this.dialog.close(res);
        },
        error: console.error,
      });
  }

  onNoClick(): void {
    this.dialog.close();
  }
}
