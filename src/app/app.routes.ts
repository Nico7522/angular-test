import { Routes } from '@angular/router';
import { ParentComponentComponent } from './parent-component/parent-component.component';
import { CComponent } from './c/c.component';

export const routes: Routes = [
  {
    path: 'parent',
    component: ParentComponentComponent,
    loadChildren: () =>
      import('./parent-component/parent.routes').then((m) => m.PARENT_ROUTES),
  },
  {
    path: 'Ccomponent',
    component: CComponent,
  },
];
