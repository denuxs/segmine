import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _httpClient = inject(HttpClient);
  private _user: ReplaySubject<any> = new ReplaySubject<any>(1);

  set user(value: any) {
    this._user.next(value);
  }

  get user$(): Observable<any> {
    return this._user.asObservable();
  }

  get(): Observable<any> {
    return this._httpClient.get<any>(environment.API + 'users/me/').pipe(
      tap((user) => {
        this._user.next(user);
      })
    );
  }
}
