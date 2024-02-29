import { CanActivateFn } from '@angular/router';
// https://github.com/saikorthivada/angular-tutorials/blob/can-activate-guard/package.json
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
