import { Component, inject, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientsComponent } from '../create-clients/create-clients.component';
import { IClient, IGetClients } from '../../../../domain';

@Component({
  selector: 'component-botones-principales-clients',
  imports: [],
  templateUrl: './botones-principales-clients.component.html',
  styleUrl: './botones-principales-clients.component.css',
})
export class BotonesPrincipalesClientsComponent {
  private readonly dialog = inject(MatDialog);
  clientes = output<IGetClients>();

  public openDialog() {
    const dialogRef = this.dialog.open(CreateClientsComponent);
    dialogRef.afterClosed().subscribe((r: IGetClients) => {
      if (r) {
        this.clientes.emit(r);
      }
    });
  }
}
