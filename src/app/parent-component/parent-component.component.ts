import { Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { ChildComponentComponent } from '../child-component/child-component.component';
import { Product } from '../models/product.model';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  interval,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { User, UserService } from '../user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-parent-component',
  standalone: true,
  imports: [ChildComponentComponent, AsyncPipe, RouterModule],
  templateUrl: './parent-component.component.html',
  styleUrl: './parent-component.component.scss',
})
export class ParentComponentComponent {
  @ViewChild(ChildComponentComponent, { static: false })
  child!: ChildComponentComponent;
  ngAfterViewInit() {
    if (this.child) {
      interval(1000)
        .pipe(takeUntilDestroyed(this.child.destroyRef))
        .subscribe((count) => console.log(count));
    }
  }

  display: boolean = true;

  canDisplay() {
    this.display = false;
  }
}
