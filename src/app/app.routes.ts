import { Routes } from '@angular/router';
import { LoginComponent } from './template/shared/pages/login/login.component';
import { DashboardLatoutComponent } from './template/layout/dashboard-latout/dashboard-latout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardLatoutComponent,
    children: [
      {
        path: 'incio',
        loadComponent: () => import('./template/pages/home/home.component'),
      },
      {
        path: 'categoria-habitacion',
        loadComponent: () =>
          import('./template/pages/tipo-habitacion/tipo-habitacion.component'),
      },
      { path: '', redirectTo: '/dashboard/incio', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/dashboard/incio', pathMatch: 'full' },
];
