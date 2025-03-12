import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { BotonesPrincipalesComponent } from '../../components/sucursales/botones-principales/botones-principales.component';
import { SucursalesService } from '../../../application/services/sucursales/sucursales.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { IGetAllSucursales } from '../../../domain';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sucursales',
  imports: [BotonesPrincipalesComponent, NgClass],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css',
  host: {
    class: 'flex-1',
  },
})
export default class SucursalesComponent {
  private readonly _sucursalesService = inject(SucursalesService);
  public page = signal<number>(1);

  public nextPage(pages: number) {
    this.page.update((page) => page + pages);
  }

  getSucursales = rxResource({
    request: () => ({ queryPage: this.page() }),
    loader: ({ request }) =>
      this._sucursalesService.getAllSucursales(request.queryPage),
  });

  updateStatus(id: number) {
    this._sucursalesService.updateStatusSucursal(id).subscribe({
      next: (r) => this.getSucursales.reload(),
      error: console.error,
    });
  }

  onSucursalesCreado() {
    this.getSucursales.reload();
  }
}
