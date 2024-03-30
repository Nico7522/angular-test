import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewChild,
  inject,
} from '@angular/core';
import { ChildComponentComponent } from '../child-component/child-component.component';
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
@Component({
  selector: 'app-parent-component',
  standalone: true,
  imports: [ChildComponentComponent, AsyncPipe, RouterModule, FormsModule],
  templateUrl: './parent-component.component.html',
  styleUrl: './parent-component.component.scss',
})
export class ParentComponentComponent {
  _ps = inject(ProductService);

  filter!: Filter;
  products: Product[] = [];
  ngOnInit() {
    this.filter = {
      name: '',
      description: '',
    };
  }

  getValue(key: keyof Filter, e: any) {
    this._ps.filter(this.filter);
  }
}
