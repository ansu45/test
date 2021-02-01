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
  constructor(private tokkenx: TokenstorageService, private userlogin: UserloginService) {}
  handleError(error: HttpErrorResponse) {
    console.log("lalalalalalalala");
    return throwError(error);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokkenx.getToken()) {
      request = this.addToken(request, this.tokkenx.getToken());
    }
    return next.handle(request).pipe(
    /*  catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })*/

     catchError(this.handleError)
    );  //pipe closing
  }
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
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
}
