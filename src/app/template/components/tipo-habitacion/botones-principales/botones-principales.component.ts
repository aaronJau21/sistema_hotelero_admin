import { Component, inject } from '@angular/core';

import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { CrearTipoHabitacionComponent } from '../crear-tipo-habitacion/crear-tipo-habitacion.component';

@Component({
  selector: 'component-botones-principales',
  imports: [],
  templateUrl: './botones-principales.component.html',
  styleUrl: './botones-principales.component.css',
})
export class BotonesPrincipalesComponent {
  private readonly dialog = inject(MatDialog);

  public openDialog() {
    this.dialog.open(CrearTipoHabitacionComponent, {
      data: {
        animal: 'panda',
      },
    });
  }
}
