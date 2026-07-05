import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, throwError, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, switchMap } from 'rxjs/operators'; 
import { getCreateBillRes } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}/app`;

  constructor(private http: HttpClient) {}

  // Fetch all bills (supports optional parameters for searching/filtering)
  getBills(clientId?: string, status?: string): Observable<any[]> {
    let params: any = {};
    if (clientId) params.clientId = clientId;
    if (status) params.status = status;

    return this.http.get<any[]>(`${this.apiUrl}/bill/get`, { params });
  }

  // Fetch a single client's name by ID (used for your Create Bill pre-fill)
  getClientName(clientId?: string): Observable<{ name: string }> {
    console.log('Fetching client name for ID:', clientId, this.apiUrl);
        return this.http.get<{ name: string }>(`${this.apiUrl}/bill/get`).pipe(
            catchError((error) => {
                console.log('Handled locally in service:', error);
                    return throwError(() => new Error('Failed to fetch user list.'));
            })
        )
  }

  createBill(billPayload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, billPayload);
  }

  getCreateBillDetails():Observable<getCreateBillRes>{
    return this.http.get<getCreateBillRes>(`${this.apiUrl}/get/create-bill`)
  }
}
