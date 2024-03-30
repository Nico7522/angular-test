import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProductService } from '../product.service';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Product } from '../models/product.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ApiResponse } from '../models/api-response';

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
  $product: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    this.products
  );
  $products!: Observable<ApiResponse>;

  ngOnInit() {
    this.$products = this._productService.getAll();
  }
}
