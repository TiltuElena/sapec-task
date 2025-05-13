import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@/services/auth.service';
import {PageRoutes} from '@/ts/enums';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const expectedRole = route.data['role'];
  const userRole = authService.getUserRole();
  const isAuthenticated = authService.isAuthenticated();


  if (!isAuthenticated) {
    router.navigate([PageRoutes.LOGIN]);
    return false;
  }

  if (expectedRole && userRole !== expectedRole) {
    router.navigate([PageRoutes.NOT_FOUND]);
    return false;
  }

  return true;
};
