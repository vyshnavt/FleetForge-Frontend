import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { AuthStateService } from "../services/auth-state.service";
import { isPlatformBrowser } from "@angular/common";

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null >(null);

export const authInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next:HttpHandlerFn) => {
    const authState = inject(AuthStateService);
    const authService = inject(AuthService);
    const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId)) {
        return next(req);
    }

    const token = authState.getTokenSync();
    let authReq = req;

    if (token) {
        authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401&& !authReq.url.includes('/auth/refresh')) {
                return handle401Error(authReq, next, authService, authState);
            }
            return throwError(() => error);
        })
    );
};

function handle401Error(req: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService,authState:AuthStateService) {
    if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);
        

        return authService.refreshToken().pipe(
            switchMap((response: any) => {
                isRefreshing = false;
                const newToken = response?.accessToken || response;
                if (!newToken) {
                    throw new Error('Refresh token assignment failed');
                }

                authState.setToken(newToken);
                refreshTokenSubject.next(newToken);
                const retriedReq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${newToken}`
                    }
                });
                return next(retriedReq);
            }),
            catchError((err) => {
                isRefreshing = false;
                refreshTokenSubject.next(null);
                authService.logout();
                return throwError(() => err);
            })
        );
    }
        
    return refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((validToken) => {
            const retriedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${validToken}`
                }
            });
            return next(retriedReq);
        })
    );

}