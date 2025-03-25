import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// Mis Servicios
import { AuthService } from '../../../../application/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    UserName: ['', Validators.required],
    password: ['', Validators.required],
  });

  loginSubmit() {
    return this.authService.login(this.loginForm.value).subscribe({
      next: (r) => {
        localStorage.setItem('token', r.token);
        localStorage.setItem('user', JSON.stringify(r.user));
        this.router.navigateByUrl('/dashboard/incio');
      },
      error: console.error,
    });
  }
}
