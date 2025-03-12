import { Component, computed, inject, OnInit } from '@angular/core';
import { httpResource } from '@angular/common/http';

import { BotonesPrincipalesClientsComponent } from '../../components/clients/botones-principales-clients/botones-principales-clients.component';
import { environment } from '../../../../environments/environment.development';
import { IGetClients } from '../../../domain/interfaces/clients/get-clients.interface';
import { NgClass } from '@angular/common';
import { ClientsService } from '../../../application/services/clients/clients.service';

@Component({
  selector: 'app-clients',
  imports: [BotonesPrincipalesClientsComponent, NgClass],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
  host: {
    class: 'flex-1',
  },
})
export default class ClientsComponent {
  private readonly _clientService = inject(ClientsService);
  private readonly _API = environment.URL_API;

  resourceClient = httpResource<IGetClients>(() => ({
    url: `${this._API}/clients`,
    headers: { 'Content-Type': 'application/json' },
  }));

  getClient = computed(() => this.resourceClient.value()?.clients || []);

  updateStatusClient(id: number) {
    return this._clientService.updateStatusClient(id).subscribe({
      next: (r) => {
        this.resourceClient.reload();
      },
      error: console.log,
    });
  }

  onClientCreada() {
    this.resourceClient.reload();
  }
}
