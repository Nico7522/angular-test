import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  surname: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private _httpClient = inject(HttpClient);
}
