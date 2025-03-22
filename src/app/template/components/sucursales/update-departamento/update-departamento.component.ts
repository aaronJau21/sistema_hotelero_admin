import { Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '../../../../../environments/environment.development';
import { httpResource } from '@angular/common/http';
import { IGetDepartamento } from '../../../../domain';
import { DepartamentosService } from '../../../../application/services/departamentos/departamentos.service';

@Component({
  selector: 'app-update-departamento',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './update-departamento.component.html',
  styleUrl: './update-departamento.component.css',
})
export class UpdateDepartamentoComponent {
  private readonly _departamentoService = inject(DepartamentosService);
  private readonly fb = inject(FormBuilder);
  private readonly _API = environment.URL_API;
  private readonly dialogRef = inject(
    MatDialogRef<UpdateDepartamentoComponent>
  );
  readonly data = inject(MAT_DIALOG_DATA);

  resourceDepartamento = httpResource<IGetDepartamento>(() => ({
    url: `${this._API}/departamentos/${this.data.id}`,
    headers: { 'Content-Type': 'application/json' },
  }));

  departamento = computed(() => this.resourceDepartamento.value());

  public updateForm = this.fb.group({
    nombre: [this.departamento()?.nombre],
  });

  public updateFormSubmit() {
    this._departamentoService
      .updateDepartamento(this.data.id, this.updateForm.value.nombre!)
      .subscribe({
        next: (r) => this.dialogRef.close(r),
        error: console.log,
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
