import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable,Injector } from '@angular/core';
import {Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class MyErrorHandlerService implements ErrorHandler {
  
  constructor( private injector: Injector) { }
  handleError(error: any) {
    const router = this.injector.get(Router);
    if (Error instanceof HttpErrorResponse) {
     console.log('pagla'+error.status);
    }
    else {
      console.error(error);
    //  console.error(error.status+'\n message'+error.message);
    // console.error("an error occurred here broo");
    }
   // router.navigate(['error']);
}
}