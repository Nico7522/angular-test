import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  surname: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = {
    name: 'jean',
    surname: 'pierre',
  };

  $user: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);
  constructor() {}
}
