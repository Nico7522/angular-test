import {
  Component,
  HostListener,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { UserService } from '../user.service';
import { VmSignal } from '../models/view-model';
import { UserResponse } from '../models/api-response';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, delay, map, of, startWith } from 'rxjs';
import { CardModule } from 'primeng/card';
import { User } from '../models/user.model';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  private _userService = inject(UserService);
  limit: number = 10;
  skip: number = 0;
  userPag: WritableSignal<User[] | undefined> = signal([]);

  onLoading: boolean = false;
  usersSignal: Signal<VmSignal<UserResponse> | undefined> = toSignal(
    this._userService.getAll(this.limit, this.skip).pipe(
      map((result) => ({ data: result, error: null, loading: false })),
      startWith({ data: null, loading: true, error: null }),
      catchError((error) => of({ data: null, error: 'error', loading: false }))
    )
  );

  userList: Signal<User[] | undefined> = computed(
    () => this.usersSignal()?.data?.users
  );
  ngOnInit() {}
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(e: any) {
    const scrollPosition = window.pageYOffset;
    const windowSize = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if (scrollPosition + windowSize >= bodyHeight && !this.onLoading) {
      this.onLoading = true;
      console.log('cc');
      this.skip += 10;
    }
  }
}