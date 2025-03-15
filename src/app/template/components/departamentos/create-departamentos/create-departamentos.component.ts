import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-departamentos',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './create-departamentos.component.html',
  styleUrl: './create-departamentos.component.css',
})
export class CreateDepartamentosComponent {
  private readonly dialog = inject(MatDialogRef<CreateDepartamentosComponent>);

  onNoClick(): void {
    this.dialog.close();
  }
}
