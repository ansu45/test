import { ProductLevel } from './../Interfaces/product-level';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Products } from './../Interfaces/products';
import{UserloginService} from './userlogin.service';

@Injectable({
  providedIn: 'root'
})
export class ResoproductGuard implements Resolve<ProductLevel>{
  constructor( private userlogin: UserloginService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductLevel> 
  {
   return this.userlogin.GetProductWithLevel(1);
   
  }
  
}
