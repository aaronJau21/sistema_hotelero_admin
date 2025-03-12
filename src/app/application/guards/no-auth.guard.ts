import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const router = inject(Router);
  if (token || user) {
    router.navigateByUrl('/dashboard/incio');
    return false;
  }

  return true;
};
