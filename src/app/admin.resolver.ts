import { ResolveFn } from '@angular/router';

export const adminResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
