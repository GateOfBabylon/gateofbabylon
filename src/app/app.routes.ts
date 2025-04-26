import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/library',
    pathMatch: 'full',
  },
  {
    path: 'library',
    loadComponent: () =>
      import('./enuma/library/library.component').then((m) => m.LibraryComponent),
  },
  {
    path: 'executions',
    loadComponent: () =>
      import('./enuma/executions/executions.component').then((m) => m.ExecutionsComponent),
  },
];
