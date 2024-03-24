import { CanMatchFn } from '@angular/router';

export const canMGuard: CanMatchFn = (route, segments) => {
  return false;
};
