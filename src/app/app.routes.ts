import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'bills',
        pathMatch: 'full' 
      },
      {
        path: 'bills',
        loadChildren: () =>
          import('./features/bill/bill.routes')
            .then(m => m.BILL_ROUTES)
      }
    ]
  },
  {
    path: '',
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./features/auth/auth.routes')
            .then(m => m.AUTH_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
