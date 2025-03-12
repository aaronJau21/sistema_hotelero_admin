import { httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '../../../../../environments/environment.development';
import { ClientsService } from '../../../../application/services/clients/clients.service';

@Component({
  selector: 'app-create-clients',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './create-clients.component.html',
  styleUrl: './create-clients.component.css',
})
export class CreateClientsComponent {
  private readonly dialog = inject(MatDialogRef<CreateClientsComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly _clientService = inject(ClientsService);

  public createClientForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido_paterno: ['', Validators.required],
    apellido_materno: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    edad: [0, Validators.required],
  });

  public submitCreateClient() {
    return this._clientService
      .createClient(this.createClientForm.value)
      .subscribe({
        next: (r) => {
          this.dialog.close(r);
        },
        error: console.log,
      });
  }

  onNoClick(): void {
    this.dialog.close();
  }
}
