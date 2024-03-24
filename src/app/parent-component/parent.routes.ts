import { Route } from '@angular/router';
import { Comp1Component } from '../comp1/comp1.component';
import { Comp2Component } from '../comp2/comp2.component';
import { canMGuard } from '../can-m.guard';

export const PARENT_ROUTES: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'child',
        component: Comp1Component,
        canMatch: [canMGuard],
      },
      {
        path: 'child',
        component: Comp2Component,
      },
    ],
  },
];
