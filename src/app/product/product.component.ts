import { UserloginService } from './../services/userlogin.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ProductLevel } from './../Interfaces/product-level';
import { Products} from './../Interfaces/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  sh:string;
 
  constructor(private formBuilder: FormBuilder, private userlogin: UserloginService) {  this.productForm=this.formBuilder.group({
    name:[''],
    childArray:this.formBuilder.array([])
  });
  this.userlogin.GetProductWithLevel(1).subscribe(prodLevel=>{this.myformload(prodLevel)
  });}
  myformload(myPLevel:ProductLevel)
  {this.productForm.patchValue(
    {name:myPLevel.modelName  } )
  console.log(myPLevel);
  for(var x in myPLevel.products )
  this.childArray().push(this.ChildGroup(myPLevel.products[x]));
  }
  ngOnInit(): void {
    
  }
  ChildGroup(cproduct:Products): FormGroup {
    return this.formBuilder.group({
      ProductCode:cproduct.productCode ,
      ModelCode:cproduct.model,
      Category:cproduct.category,
      Price:cproduct.price
    })

}
childArray() : FormArray {
  return this.productForm.get("childArray") as FormArray
}
addQuantity() {
 // this.childArray().push(this.ChildGroup());
}
onSubmit() {
  console.log(this.productForm.value);
 
}
NewChildGroup() {
  this.childArray().push(  this.formBuilder.group({
    ProductCode:'',
    ModelCode:'',
    Category:'',
    Price:''
  }));
}
}
