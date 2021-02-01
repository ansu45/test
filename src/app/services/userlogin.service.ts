import { TokenstorageService } from './tokenstorage.service';
import { ProductLevel } from './../Interfaces/product-level';
import { RefreshToken } from './../Interfaces/refresh-token';
import { AuthenticateResponse } from './../Interfaces/authenticate-response';
import { AuthenticateRequest } from './../Interfaces/authenticate-request';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import { retry,catchError } from 'rxjs/operators';

const AUTH_API2 ='http://localhost:64887/api/UserToken';//'http://localhost:5000/api/Users';//
const AUTH_API='http://localhost:50418/api';//'http://localhost:5000/api';// 
const AUTH_APIProd='http://localhost:64887/api/Productlevel';//'http://localhost:5000/api/productlevel'//
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserloginService {
  
  getrefreshtoken()
  {
    this.tokenservice.getRefreshToken();
  }
  constructor(private httpClient:HttpClient, private tokenservice: TokenstorageService) { }
  public loginAPI(credentials: AuthenticateRequest): Observable<AuthenticateResponse> {
    return this.httpClient.post<AuthenticateResponse>(`${AUTH_API2}/UserDetail`, credentials, httpOptions)
    .pipe(catchError(this.handleError));
  }
  public refreshToken(): Observable<AuthenticateResponse> {
    return this.httpClient.post<AuthenticateResponse>(`${AUTH_API2}/PostAuthenticateRefreshToken`, this.getrefreshtoken(), httpOptions)
    .pipe(catchError(this.handleError));
  }
  public GetProductWithLevel(modelID:number): Observable<ProductLevel> {
    return this.httpClient.get<ProductLevel>(`${AUTH_APIProd}/GetProductLevel/${modelID}`, httpOptions)
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
