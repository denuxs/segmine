import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, Observable, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Utils } from '../utils.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let newReq = req.clone();

  if (
    authService.accessToken &&
    !Utils.isTokenExpired(authService.accessToken)
  ) {
    newReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + authService.accessToken
      ),
    });
  }

  return next(newReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authService.signOut();

        // location.reload();
      }

      return throwError(() => error);
    })
  );
};
