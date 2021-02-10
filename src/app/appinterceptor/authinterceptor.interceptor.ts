import { AuthenticateResponse } from './../Interfaces/authenticate-response';
import { RefreshToken } from './../Interfaces/refresh-token';
import { UserloginService } from './../services/userlogin.service';
import { TokenstorageService } from './../services/tokenstorage.service';
import { Injectable } from '@angular/core';
import { throwError, Observable,BehaviorSubject } from 'rxjs';
import { retry,catchError ,filter, take, switchMap} from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,HttpErrorResponse
} from '@angular/common/http';

@Injectable()
export class AuthinterceptorInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private refreshTokenSubject2: BehaviorSubject<AuthenticateResponse> = new BehaviorSubject<AuthenticateResponse>(null);
  constructor(private tokkenx: TokenstorageService, private userlogin: UserloginService) {}
  handleError(error: HttpErrorResponse) {
    console.log(error);
    console.log("lalalalalalalala :-"+error.error)  ;
    
    return throwError(error);
  }

  handleErrorTwo(error: HttpErrorResponse) {
    let errorMessage = '';
    //if (error.error instanceof ErrorEvent) {
      if(error.error||!error.error.error)
      {
        // client-side error
        errorMessage = `Error :  ${error.error}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
   // console.log(errorMessage);
    return throwError(errorMessage);
    
  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokkenx.getToken()) {
      request = this.addToken(request, this.tokkenx.getToken());
    }
    return next.handle(request).pipe(
     catchError(error => {
       if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error2(request, next);
        } else {
          return throwError(error);
        }
      })

    // catchError(this.handleErrorTwo)
    );  //pipe closing
  }// intercept close
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  handle401Error2(request: HttpRequest<any>, next: HttpHandler){
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.userlogin.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          this.ststorageMethod(token);
          return next.handle(this.addToken(request, this.tokkenx.getToken()));
        }))
    } //if end
    else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    } //else end
  }
  handle401Error(request: HttpRequest<any>, next: HttpHandler){
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.userlogin.refreshToken().subscribe(
        token=>{
          this.isRefreshing=false;
          this.refreshTokenSubject.next(token.JwtToken);

          return next.handle(this.addToken( request, token.JwtToken))
        }
      )
    }else{
      let jwttoken;
       this.refreshTokenSubject.subscribe(token=>{jwttoken=token});
       return next.handle( this.addToken(request, jwttoken));
    }
/*
      return this.userlogin.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.);
          return next.handle(this.addToken(request, token.jwt));
        }));
        

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
    */
  }

  ststorageMethod(oResponse: AuthenticateResponse) {
    if (oResponse) {
      this.tokkenx.signOut();
      this.tokkenx.saveUser(oResponse.Username);
      this.tokkenx.saveToken(oResponse.JwtToken);
      this.tokkenx.saveRefreshToken(oResponse.RefreshToken);
    }
}
}
