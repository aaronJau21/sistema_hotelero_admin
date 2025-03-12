import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const router = inject(Router);

  if (!token || !user) {
    router.navigateByUrl('/login');
    return false;
  }

  
  return true;
};
