import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';
import { map } from 'rxjs';
import { take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthStateService);
  const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId)) {
        return true; 
    }

    return authState.isLoggedIn$.pipe(
        take(1),
        map(isLoggedIn => {
            console.log('AuthGuard - isLoggedIn:', isLoggedIn);
            if (isLoggedIn) {
                return true;
            } else {
                router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
        })
    );
};
