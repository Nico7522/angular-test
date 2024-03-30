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
import { AsyncPipe } from '@angular/common';
import { User, UserService } from '../user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { mergeMap, map, switchMap, concatMap } from 'rxjs/operators';
import { Filter, ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { filter } from '../method';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-parent-component',
  standalone: true,
  imports: [AsyncPipe, RouterModule, FormsModule, CardModule, ButtonModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss',
})
export class HomeComponentComponent {
  _ps = inject(ProductService);

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
