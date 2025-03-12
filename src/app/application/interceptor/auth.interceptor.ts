import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error.message === 'Token Expirado') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.navigateByUrl('/login');
      }
      if (error.error.message === 'Token no valido') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.navigateByUrl('/login');
      }
      return throwError(() => error);
    })
  );
};
