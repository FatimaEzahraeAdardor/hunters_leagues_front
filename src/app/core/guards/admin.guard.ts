import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

    if (authService.getUserRole() !== 'ROLE_ADMIN') {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
};