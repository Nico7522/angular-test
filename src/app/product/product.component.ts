import {
  Component,
  HostListener,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProductService } from '../product.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  ignoreElements,
  map,
  of,
  startWith,
} from 'rxjs';
import { Product } from '../models/product.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductResponse } from '../models/api-response';
import { ViewModel, VmSignal } from '../models/view-model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardModule, AsyncPipe, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private _productService = inject(ProductService);
  products!: Product[];
  productPag: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  error: string = '';
  limit = 10;
  skip = 0;
  onLoading: boolean = false;
  $product: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    this.products
  );

  // vm$
  vm$: Observable<ViewModel<ProductResponse>> = this._productService
    .getAll(this.skip, this.limit)
    .pipe(
      map((result) => ({ status: 'result' as const, result })),
      startWith({ status: 'loading' as const }),
      catchError((error) => of({ status: 'error' as const, error }))
    );

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(e: any) {
    const scrollPosition = window.pageYOffset;
    const windowSize = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if (scrollPosition + windowSize >= bodyHeight && !this.onLoading) {
      this.onLoading = true;
      console.log('cc');
    }
  }
}
