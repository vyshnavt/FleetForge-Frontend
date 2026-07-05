import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthStateService {
  private accessToken$ = new BehaviorSubject<string | null>(null);

  token$ = this.accessToken$.asObservable();
  isLoggedIn$ = this.accessToken$.pipe(map(token => !!token));

  setToken(token: string) {
    this.accessToken$.next(token);
  }

  clearToken() {
    this.accessToken$.next(null);
  }

  getTokenSync(): string | null {
    return this.accessToken$.getValue();
  }
}