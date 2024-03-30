import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home/home-component.component';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';
import { FoodComponent } from './food/food.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponentComponent,
  },
  {
    path: 'products',
    component: ProductComponent,
  },
  {
    path: 'foods',
    component: FoodComponent,
  },
  {
    path: 'clients',
    component: ClientComponent,
  },
];
