import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home/home-component.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { FoodComponent } from './food/food.component';
import { StatisticsComponent } from './statistics/pages/statistics/statistics.component';

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
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },
];
