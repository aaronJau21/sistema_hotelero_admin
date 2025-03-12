import { Component, inject, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateHabitacionesComponent } from '../create-habitaciones/create-habitaciones.component';
import { IGetCategoryHabitacion } from '../../../../domain';

@Component({
  selector: 'components-botones-principales',
  imports: [],
  templateUrl: './botones-principales.component.html',
  styleUrl: './botones-principales.component.css',
})
export class BotonesPrincipalesComponent {
  private readonly dialog = inject(MatDialog);

  habitacion = output<IGetCategoryHabitacion>();

  public openDialog() {
    const dialogRef = this.dialog.open(CreateHabitacionesComponent);
    dialogRef.afterClosed().subscribe((result: IGetCategoryHabitacion) => {
      if (result) {
        this.habitacion.emit(result);
      }
    });
  }
}
