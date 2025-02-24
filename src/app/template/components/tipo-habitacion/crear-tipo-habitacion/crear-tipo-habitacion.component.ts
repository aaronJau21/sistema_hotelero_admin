import { Component, inject } from '@angular/core';
// Angular Material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TipoHabitacionService } from '../../../../application/services/habitaciones/tipo-habitacion.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-tipo-habitacion',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './crear-tipo-habitacion.component.html',
  styleUrl: './crear-tipo-habitacion.component.css',
})
export class CrearTipoHabitacionComponent {
  private readonly dialog = inject(MatDialogRef<CrearTipoHabitacionComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(TipoHabitacionService);
  data = inject(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialog.close();
  }

  public loginCreateTipoHabitacion: FormGroup = this.fb.group({
    nombre: [''],
    descripcion: [''],
    precioBase: [''],
    capacidad: [''],
  });
}
