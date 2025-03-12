import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TipoHabitacionService } from '../../../../application/services/habitaciones/tipo-habitacion.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-update-tipo-habitacion',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './update-tipo-habitacion.component.html',
  styleUrl: './update-tipo-habitacion.component.css',
})
export class UpdateTipoHabitacionComponent {
  readonly dialogRef = inject(MatDialogRef<UpdateTipoHabitacionComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly tipoHabitacionService = inject(TipoHabitacionService);
  private readonly fb = inject(FormBuilder);

  getTipoHabitacion = rxResource({
    request: () => ({ id: this.data.id }),
    loader: ({ request }) =>
      this.tipoHabitacionService.getTipo_habitacion(request.id),
  });

  public formTipoHabitacion = this.fb.group({
    nombre: [this.getTipoHabitacion.value()?.nombre],
    descripcion: [this.getTipoHabitacion.value()?.descripcion],
    capacidad: [this.getTipoHabitacion.value()?.capacidad],
    precioBase: [this.getTipoHabitacion.value()?.precioBase],
  });

  constructor() {
    effect(() => {
      const tipoHabitacion = this.getTipoHabitacion.value();
      if (tipoHabitacion) {
        this.formTipoHabitacion.patchValue({
          nombre: tipoHabitacion.nombre,
          descripcion: tipoHabitacion.descripcion,
          capacidad: tipoHabitacion.capacidad,
          precioBase: tipoHabitacion.precioBase,
        });
      }
    });
  }

  public updateTipo_habitacion() {
    const data = {
      nombre: this.formTipoHabitacion.value.nombre as string,
      descripcion: this.formTipoHabitacion.value.descripcion as string,
      capacidad: this.formTipoHabitacion.value.capacidad as number,
      precioBase: Number(this.formTipoHabitacion.value.precioBase) as number,
    };

    return this.tipoHabitacionService
      .updateTipo_habitacion(this.data.id, data)
      .subscribe({
        next: (req) => {
          this.dialogRef.close(req);
        },
        error: console.log,
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
