import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

import { Utils } from '../utils.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: boolean = false;
  private _httpClient = inject(HttpClient);

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  set refreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  get refreshToken(): string {
    return localStorage.getItem('refreshToken') ?? '';
  }

  signIn(credentials: { username: string; password: string }): Observable<any> {
    if (this._authenticated) {
      return throwError(() => 'User is already logged in.');
    }

    return this._httpClient
      .post(environment.API_AUTH + 'token/', credentials)
      .pipe(
        switchMap((response: any) => {
          this.accessToken = response.access;
          this.refreshToken = response.refresh;

          this._authenticated = true;

          return of(response);
        })
      );
  }

  signInUsingToken(): Observable<any> {
    return this._httpClient
      .post(environment.API_AUTH + 'token/refresh/', {
        refresh: this.refreshToken,
      })
      .pipe(
        catchError(() => of(false)),
        switchMap((response: any) => {
          if (response.access) {
            this.accessToken = response.access;
          }

          this._authenticated = true;

          return of(true);
        })
      );
  }

  signOut(): Observable<any> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this._authenticated = false;

    return of(true);
  }

  signUp(body: any): Observable<any> {
    return this._httpClient.post(environment.API + 'register/', body);
  }

  check(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }

    if (!this.accessToken) {
      return of(false);
    }

    if (Utils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists, and it didn't expire, sign in using it
    return this.signInUsingToken();
  }
}
