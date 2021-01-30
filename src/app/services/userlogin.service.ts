import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import { retry,catchError } from 'rxjs/operators';

const AUTH_API2 ='http://localhost:64887api/User';//'http://localhost:5000/api/Users';//
const AUTH_API='http://localhost:50418/api';//'http://localhost:5000/api';// 
const AUTH_APIProd='http://localhost:50418/api/productlevel/';//'http://localhost:5000/api/productlevel'//
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  constructor(private httpClient:HttpClient) { }
  public loginAPI(credentials: {AuthenticateRequest}): Observable<AuthenticateResponse> {
    return this.httpClient.post<AuthenticateResponse>(`${AUTH_API2}/authenticate`, credentials, httpOptions)
    .pipe(catchError(this.handleError));
  }
  private handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
}
}
