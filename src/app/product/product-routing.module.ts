import { ResoproductGuard } from './../services/resoproduct.guard';
import { ProductOrderComponent } from './product-order/product-order.component';
import { NgModule, resolveForwardRef } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router';

import { ProductComponent } from './product.component';

const routes: Routes = [{ path: '', component: ProductComponent },
{ path: 'OrderProduct'
 ,component: ProductOrderComponent
 ,resolve :{lnproduct: ResoproductGuard} }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
