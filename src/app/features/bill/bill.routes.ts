import { Routes } from '@angular/router';

export const BILL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/bill-list/bill-list.page')
        .then(m => m.BillListPage)
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/bill-create/bill-create.page')
        .then(m => m.BillCreatePage)
  }
];