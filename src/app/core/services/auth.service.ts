import { inject, Injectable,PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { authResponse, loginCredentials, refreshTokenResponse } from "../models/auth.model";
import { Observable, of, tap, throwError } from "rxjs";
import { Router } from '@angular/router';
import { AuthStateService } from "./auth-state.service";
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient,private router: Router, private authState: AuthStateService) { }

    private apiUrl = environment.apiUrl;
      private platformId = inject(PLATFORM_ID);
    

    initializeApp(): Promise<boolean> {
        return new Promise((resolve) => {

            if (!isPlatformBrowser(this.platformId)) {
                return resolve(true);
            }

            this.http.post<{ accessToken: string }>(`${this.apiUrl}/auth/refresh`, {}, { withCredentials: true })
                .pipe(
                    tap((response) => {
                        this.authState.setToken(response.accessToken);
                    }),
                    catchError(() => {
                        this.authState.clearToken();
                        return of(null);
                    })
                )
                .subscribe({
                    next: () => resolve(true),
                    error: () => resolve(true),
                    complete: () => resolve(true)
                });
        });
    }


    doLogin(data: loginCredentials): Observable<authResponse> {
        return this.http.post<authResponse>(`${this.apiUrl}/auth/login`, data,{ withCredentials: true } ).pipe(
            catchError((error: HttpErrorResponse)=>{
                return throwError(()=> error)
            })
        )

    }

    refreshToken() {
        // Send empty payload; backend looks at incoming cookie

        console.log('1. Waiting for 5 seconds before calling backend HTTP URL...');
        return this.http.post<refreshTokenResponse>(`${this.apiUrl}/auth/refresh`, {}, { withCredentials: true }).pipe(
            tap((response) => {
                    this.authState.setToken(response.accessToken);
                }),
            catchError((error: HttpErrorResponse) => {
                this.authState.clearToken();
                return throwError(() => error); 
            })
        ); 
    }

    logout() {
        this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
            next: () => this.completeLogout(),
            error: () => this.completeLogout()
        });
    } 

    private completeLogout() {
        this.authState.clearToken();
        if (isPlatformBrowser(this.platformId)) {
            this.router.navigate(['/login']);
        }
    }
}
