import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';
import { map, take } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthStateService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
        return true; 
    }

    return authState.isLoggedIn$.pipe(
            take(1),
            map(isLoggedIn => {
                console.log('GUESTGuard - isLoggedIn:', isLoggedIn);
                if (isLoggedIn) {
                    return router.parseUrl('/bills');
                } else {
                    return true;
                }
            })
    );

};
