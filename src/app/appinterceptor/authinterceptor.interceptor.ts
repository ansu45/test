import { TokenstorageService } from './../services/tokenstorage.service';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { retry,catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,HttpErrorResponse
} from '@angular/common/http';

@Injectable()
export class AuthinterceptorInterceptor implements HttpInterceptor {

  constructor(private tokkenx: TokenstorageService) {}
  handleError(error: HttpErrorResponse) {
    console.log("lalalalalalalala");
    return throwError(error);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokkenx.getToken()) {
      request = this.addToken(request, this.tokkenx.getToken());
    }
    return next.handle(request).pipe(
      catchError(this.handleError)
    );
  }
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
