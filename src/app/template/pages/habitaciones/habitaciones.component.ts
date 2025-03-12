import { Component, inject } from '@angular/core';
import { BotonesPrincipalesComponent } from '../../components/habitaciones/botones-principales/botones-principales.component';
import { HabitacionesService } from '../../../application/services/habitaciones/habitaciones.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { IGetHabitaciones } from '../../../domain';
import { UpdateHabitacionesComponent } from '../../components/habitaciones/update-habitaciones/update-habitaciones.component';

@Component({
  selector: 'app-habitaciones',
  imports: [BotonesPrincipalesComponent, NgClass],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css',
  host: {
    class: 'flex-1',
  },
})
export default class HabitacionesComponent {
  private readonly habitacionesService = inject(HabitacionesService);
  private readonly dialog = inject(MatDialog);

  getHabitaciones = rxResource({
    loader: () => this.habitacionesService.getHabitaciones(),
  });

  // UpdateHabitaciones
  updateHabitaciones(id: number) {
    this.habitacionesService.update_status(id).subscribe({
      next: (data) => {
        this.getHabitaciones.reload();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onHabitacionCreada() {
    this.getHabitaciones.reload();
  }

  openialigUpdate(id: number) {
    const dialogRef = this.dialog.open(UpdateHabitacionesComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result: IGetHabitaciones) => {
      if (result) {
        this.getHabitaciones.reload();
      }
    });
  }
}
