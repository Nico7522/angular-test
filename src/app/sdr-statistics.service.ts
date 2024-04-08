import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { SdrByCategory } from './statistics/models/category-statistics.model';
import { SdrByMonth } from './statistics/models/month-statistics.model';
import { StatResponse } from './statistics/models/statistics-response.model';

@Injectable({
  providedIn: 'root',
})
export class SdrStatisticsService {
  private _httpClient = inject(HttpClient);
  constructor() {}

  private _sdrPerCategory$: BehaviorSubject<StatResponse<SdrByCategory>> =
    new BehaviorSubject<StatResponse<SdrByCategory>>({ data: [], error: null });
  sdrPerCategory$ = this._sdrPerCategory$.asObservable();
  private _sdrPerMonth$: BehaviorSubject<StatResponse<SdrByMonth>> =
    new BehaviorSubject<StatResponse<SdrByMonth>>({ data: [], error: null });
  sdrPerMonth$ = this._sdrPerMonth$.asObservable();

  getSdrPerCategory(
    startDate: string,
    endDate: string
  ): Observable<StatResponse<SdrByCategory>> {
    return this._httpClient.get<any>(``).pipe(
      map((data) => {
        let statArray: SdrByCategory[] = [];
        Object.keys(data).forEach((k) => {
          statArray.push({ category: k, value: data[k] });
        });
        this._sdrPerCategory$.next({
          data: statArray,
          error: null,
        });
        return {
          data: statArray,
          error: null,
        };
      }),
      catchError((err) => {
        this._sdrPerCategory$.next({ data: [], error: err });
        throw of(null);
      })
    );
  }

  getSdrPerMonth(
    startDate: string,
    endDate: string
  ): Observable<StatResponse<SdrByMonth>> {
    return this._httpClient.get<any>(``).pipe(
      map((data) => {
        console.log(data);
        let statArray: SdrByMonth[] = [];
        Object.keys(data).forEach((k) => {
          statArray.push({ month: k, value: data[k] });
        });
        this._sdrPerMonth$.next({ data: statArray, error: null });
        return { data: statArray, error: null };
      }),
      catchError((err) => {
        this._sdrPerMonth$.next({ data: [], error: err });
        throw of(null);
      })
    );
  }
}
