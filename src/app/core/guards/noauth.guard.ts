import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of, switchMap } from 'rxjs';

export const noauthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  return inject(AuthService)
    .check()
    .pipe(
      switchMap((authenticated) => {
        if (authenticated) {
          return of(router.parseUrl('dashboard'));
        }

        return of(true);
      })
    );
};
