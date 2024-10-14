import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  return inject(AuthService)
    .check()
    .pipe(
      switchMap((authenticated) => {
        if (!authenticated) {
          const urlTree = router.parseUrl(`/auth/login`);

          return of(urlTree);
        }

        return of(true);
      })
    );
};
