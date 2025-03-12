import { Routes } from '@angular/router';
import { LoginComponent } from './template/shared/pages/login/login.component';
import { DashboardLatoutComponent } from './template/layout/dashboard-latout/dashboard-latout.component';
import { authGuard } from './application/guards/auth.guard';
import { noAuthGuard } from './application/guards/no-auth.guard';

export const routes: Routes = [
  { path: 'login', canActivate: [noAuthGuard], component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardLatoutComponent,
    children: [
      {
        path: 'incio',
        loadComponent: () => import('./template/pages/home/home.component'),
      },
      {
        path: 'sucursales',
        loadComponent: () =>
          import('./template/pages/sucursales/sucursales.component'),
      },
      {
        path: 'categoria-habitacion',
        loadComponent: () =>
          import('./template/pages/tipo-habitacion/tipo-habitacion.component'),
      },
      {
        path: 'habitaciones',
        loadComponent: () =>
          import('./template/pages/habitaciones/habitaciones.component'),
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./template/pages/clients/clients.component'),
      },
      { path: '', redirectTo: '/dashboard/incio', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/dashboard/incio', pathMatch: 'full' },
];
