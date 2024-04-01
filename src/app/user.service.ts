import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserResponse } from './models/api-response';
import { environment } from '../environment/environment';

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

  getAll(limit: number, skip: number): Observable<UserResponse> {
    return this._httpClient.get<UserResponse>(
      `${environment.API_URL}/users?limit=${limit}&skip=${skip}`
    );
  }
}
