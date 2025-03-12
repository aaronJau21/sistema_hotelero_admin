import { Component, inject, output } from '@angular/core';

import {
  MatDialog,
} from '@angular/material/dialog';
import { CrearTipoHabitacionComponent } from '../crear-tipo-habitacion/crear-tipo-habitacion.component';
import { CategoriaHabitacion } from '../../../../domain';

@Component({
  selector: 'component-botones-principales',
  imports: [],
  templateUrl: './botones-principales.component.html',
  styleUrl: './botones-principales.component.css',
})
export class BotonesPrincipalesComponent {
  private readonly dialog = inject(MatDialog);
  tipoHabitacionCreado = output<CategoriaHabitacion>();

  public openDialog() {
    const dialogRef = this.dialog.open(CrearTipoHabitacionComponent);
    dialogRef.afterClosed().subscribe((result: CategoriaHabitacion) => {
      if (result) {
        this.tipoHabitacionCreado.emit(result);
      }
    });
  }
}
