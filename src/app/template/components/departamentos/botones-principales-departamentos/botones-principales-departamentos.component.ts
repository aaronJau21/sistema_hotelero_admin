import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDepartamentosComponent } from '../create-departamentos/create-departamentos.component';

@Component({
  selector: 'component-botones-principales-departamentos',
  imports: [],
  templateUrl: './botones-principales-departamentos.component.html',
  styleUrl: './botones-principales-departamentos.component.css',
})
export class BotonesPrincipalesDepartamentosComponent {
  private readonly dialog = inject(MatDialog);

  public openDialog() {
    this.dialog.open(CreateDepartamentosComponent);
  }
}
