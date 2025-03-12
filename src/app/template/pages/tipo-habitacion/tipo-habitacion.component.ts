import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { BotonesPrincipalesComponent } from '../../components/tipo-habitacion/botones-principales/botones-principales.component';
import { TipoHabitacionService } from '../../../application/services/habitaciones/tipo-habitacion.service';
import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTipoHabitacionComponent } from '../../components/tipo-habitacion/update-tipo-habitacion/update-tipo-habitacion.component';

@Component({
  selector: 'app-tipo-habitacion',
  imports: [MatButtonModule, BotonesPrincipalesComponent, NgClass],
  templateUrl: './tipo-habitacion.component.html',
  styleUrl: './tipo-habitacion.component.css',
  host: {
    class: 'flex-1',
  },
})
export default class TipoHabitacionComponent {
  private readonly tipoHabitacionService = inject(TipoHabitacionService);
  private readonly dialog = inject(MatDialog);

  getTipoHabitaciones = rxResource({
    loader: () => this.tipoHabitacionService.getTipo_habitaciones(),
  });

  updateStatus(id: number) {
    this.tipoHabitacionService.updateStatus(id).subscribe({
      next: () => {
        this.getTipoHabitaciones.reload();
      },
    });
  }

  onTipoHabitacionCreada() {
    this.getTipoHabitaciones.reload();
  }

  // Dialog update
  openDialogUpdate(id: number) {
    const dialogRef = this.dialog.open(UpdateTipoHabitacionComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTipoHabitaciones.reload();
      }
    });
  }
}
