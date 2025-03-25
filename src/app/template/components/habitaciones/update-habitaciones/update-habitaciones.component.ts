import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TipoHabitacionService } from '../../../../application/services/habitaciones/tipo-habitacion.service';
import { EstadoHhabitacionService } from '../../../../application/services/habitaciones/estado-hhabitacion.service';
import { HabitacionesService } from '../../../../application/services/habitaciones/habitaciones.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatSelectModule } from '@angular/material/select';
import { CreateHabitacionDto } from '../../../../domain';

@Component({
  selector: 'app-update-habitaciones',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './update-habitaciones.component.html',
  styleUrl: './update-habitaciones.component.css',
})
export class UpdateHabitacionesComponent {
  private readonly dialogRef = inject(
    MatDialogRef<UpdateHabitacionesComponent>
  );
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly tipoHabitacionService = inject(TipoHabitacionService);
  private readonly estadoHabitacionService = inject(EstadoHhabitacionService);
  private readonly habitacionesService = inject(HabitacionesService);
  private readonly fb = inject(FormBuilder);

  // tipo habitacion
  getTipoHabitacion = rxResource({
    loader: () => this.tipoHabitacionService.getTipo_habitaciones(),
  });
  // Estado habitacion
  getEstadoHabitacion = rxResource({
    loader: () => this.estadoHabitacionService.getEstadoHabitacion(),
  });
  // Habitacion
  getFindOneHabitacion = rxResource({
    request: () => ({ id: this.data.id }),
    loader: ({ request }) => this.habitacionesService.findOne(request.id),
  });

  public formHabitacion: FormGroup = this.fb.group({
    numero_habitacion: [
      this.getFindOneHabitacion.value()?.numeroHabitacion,
      Validators.required,
    ],
    id_categoria: [this.getFindOneHabitacion.value()?.id_categoria],
    id_estado_habitacion: [
      this.getFindOneHabitacion.value()?.id_estado_habitacion,
    ],
    descripcion: [this.getFindOneHabitacion.value()?.descripcion],
    servicios_incluidos: [
      this.getFindOneHabitacion.value()?.servicios_incluidos,
    ],
    id_sucursal: [this.getFindOneHabitacion.value()?.id_sucursal],
  });

  constructor() {
    effect(() => {
      const habitacion = this.getFindOneHabitacion.value();
      if (habitacion) {
        this.formHabitacion.patchValue({
          numero_habitacion: habitacion.numeroHabitacion,
          id_categoria: habitacion.id_categoria,
          id_estado_habitacion: habitacion.id_estado_habitacion,
          descripcion: habitacion.descripcion,
          servicios_incluidos: habitacion.servicios_incluidos,
        });
      }
    });
  }

  public updateHabitacion() {
    const data: CreateHabitacionDto = {
      numero_habitacion: this.formHabitacion.value.numero_habitacion as string,
      id_categoria: this.formHabitacion.value.id_categoria as number,
      id_estado_habitacion: this.formHabitacion.value
        .id_estado_habitacion as number,
      descripcion: this.formHabitacion.value.descripcion as string,
      servicios_incluidos: this.formHabitacion.value
        .servicios_incluidos as string,
      id_sucursal: this.formHabitacion.value.id_sucursal as number,
    };

    this.habitacionesService.update(this.data.id, data).subscribe({
      next: (data) => {
        this.dialogRef.close(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
