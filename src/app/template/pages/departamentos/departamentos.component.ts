import { Component, computed, inject } from '@angular/core';
import { BotonesPrincipalesDepartamentosComponent } from '../../components/departamentos/botones-principales-departamentos/botones-principales-departamentos.component';
import { environment } from '../../../../environments/environment.development';
import { httpResource } from '@angular/common/http';
import { IGetDepartamento } from '../../../domain';
import { NgClass } from '@angular/common';
import { DepartamentosService } from '../../../application/services/departamentos/departamentos.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDepartamentoComponent } from '../../components/sucursales/update-departamento/update-departamento.component';

@Component({
  selector: 'app-departamentos',
  imports: [BotonesPrincipalesDepartamentosComponent, NgClass],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css',
  host: {
    class: 'flex-1',
  },
})
export default class DepartamentosComponent {
  private readonly _departamentoService = inject(DepartamentosService);
  private readonly _API = environment.URL_API;
  private readonly dialog = inject(MatDialog);

  resourceDepartamentos = httpResource<IGetDepartamento[]>(() => ({
    url: `${this._API}/departamentos`,
    headers: { 'Content-type': 'application/json' },
  }));

  getDepartamentos = computed(() => this.resourceDepartamentos.value() || []);

  public departamentoStatus(id: number) {
    return this._departamentoService.updateStatus(id).subscribe({
      next: () => this.resourceDepartamentos.reload(),
      error: console.log,
    });
  }

  openialigUpdate(id: number) {
    const dialogRef = this.dialog.open(UpdateDepartamentoComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe({
      next: () => this.resourceDepartamentos.reload(),
      error: console.log,
    });
  }
}
