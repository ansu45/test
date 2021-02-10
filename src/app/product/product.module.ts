import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductOrderComponent } from './product-order/product-order.component';


@NgModule({
  declarations: [ProductComponent, ProductOrderComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class ProductModule { }
