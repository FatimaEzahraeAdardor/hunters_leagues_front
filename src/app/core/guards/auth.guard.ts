import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import inlineLocale from "@angular-devkit/build-angular/src/tools/esbuild/i18n-inliner-worker";

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;

  }
  return true;
};
