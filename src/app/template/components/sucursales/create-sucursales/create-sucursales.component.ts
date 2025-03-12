import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SucursalesService } from '../../../../application/services/sucursales/sucursales.service';

@Component({
  selector: 'app-create-sucursales',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './create-sucursales.component.html',
  styleUrl: './create-sucursales.component.css',
})
export class CreateSucursalesComponent {
  private readonly _sucursalesService = inject(SucursalesService);
  private readonly dialog = inject(MatDialogRef<CreateSucursalesComponent>);
  private readonly fb = inject(FormBuilder);

  public createForm: FormGroup = this.fb.group({
    nombre: [''],
    direccion: [''],
  });

  public createSucursal() {
    this._sucursalesService.createSucursal(this.createForm.value).subscribe({
      next: (res) => {
        this.dialog.close(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onNoClick(): void {
    this.dialog.close();
  }
}
