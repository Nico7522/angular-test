import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnDestroy,
  inject,
} from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-child-component',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './child-component.component.html',
  styleUrl: './child-component.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponentComponent {
  ngOnDestroy(): void {
    console.log('cc');
  }
  @Input() counter!: number;
  destroyRef = inject(DestroyRef);
}
