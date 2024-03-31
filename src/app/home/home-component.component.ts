import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewChild,
  inject,
} from '@angular/core';
import { Product } from '../models/product.model';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  from,
  interval,
  of,
  zip,
} from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { User, UserService } from '../user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { mergeMap, map, switchMap, concatMap } from 'rxjs/operators';
import { Filter, ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { filter } from '../method';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-parent-component',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterModule,
    FormsModule,
    CardModule,
    ButtonModule,
    RouterModule,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss',
  animations: [fadeInOnEnterAnimation()],
})
export class HomeComponentComponent {
  _ps = inject(ProductService);
  show = false;
  filter!: Filter;
  products: Product[] = [];
  ngOnInit() {
    this.filter = {
      name: '',
      description: '',
    };
  }

  getValue() {
    this._ps.filter(this.filter);
  }
}
