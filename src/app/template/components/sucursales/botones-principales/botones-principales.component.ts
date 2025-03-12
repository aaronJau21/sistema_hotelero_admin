import { Component, inject, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSucursalesComponent } from '../create-sucursales/create-sucursales.component';

@Component({
  selector: 'components-botones-principales',
  imports: [],
  templateUrl: './botones-principales.component.html',
  styleUrl: './botones-principales.component.css',
})
export class BotonesPrincipalesComponent {
  private readonly dialog = inject(MatDialog);
  sucursal = output();
  public openDialog() {
    const dialogRef = this.dialog.open(CreateSucursalesComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sucursal.emit(result);
      }
    });
  }
}
