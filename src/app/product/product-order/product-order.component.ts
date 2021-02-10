import { ProductLevel } from './../../Interfaces/product-level';
import { ResoproductGuard } from './../../services/resoproduct.guard';
import { throwError, BehaviorSubject } from 'rxjs';
import { Products } from './../../Interfaces/products';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { UserloginService } from 'src/app/services/userlogin.service'
import { error } from '@angular/compiler/src/util';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnChanges, OnInit {
  private _data = new BehaviorSubject<Products[]>([]);
  formProduct: FormGroup;
  lproduct: Products[];
  pLevel: ProductLevel;
  pLevelResponse: ProductLevel = {
    RmodelId: null,
    ModelID:0 ,
    ModelName: null,
    products: [{
      id: null,
      ProductCode: null,
      Model: null,
      category: null,
      MarketName: null,
      price: null,
      isEOL: true
    }]
  };
  rmodelID: string;
  /*=[{ id:null,
    ProductCode:null,
    Model:null,
    category:null,
    MarketName:null,
    price:null,
    isEOL:null

  }];*/
  countries = [{
    id: '8f8c6e98',
    name: 'USA',
    code: 'USD'
  },
  {
    id: '169fee1a',
    name: 'Canada',
    code: 'CAD'
  },
  {
    id: '3953154c',
    name: 'UK',
    code: 'GBP'
  }]
  constructor(private formBuilder: FormBuilder, private userlogin: UserloginService,
    private activateroute: ActivatedRoute
  ) {
    /*  this.userlogin.GetProductWithLevel(1).subscribe(pro=>(this._data.next(pro.products)) );
   this._data.subscribe(pr=>{this.lproduct=pr});
   */// implementation from behaviorsubject which is not working
    // this.pLevel=this.activateroute.snapshot.data['lnproduct'];
    this.userlogin.GetProductWithLevel(1).subscribe(
      data => { let pdata= JSON.stringify(data)
        this.lproduct=JSON.parse(pdata);
      //  this.lproduct = data.products
        this.rmodelID = data.RmodelId;
        if (this.lproduct) {
          this.formInit();
        }

        //  console.log(this.lproduct)
      }
    );
  }

  ngOnInit(): void {
    this.formInit();
  }
  //this.loginSer.userName.next(this.tokenStorgeService.getUser());

  formInit() {

    // this.userlogin.GetProductWithLevel(1).subscribe(pro => { this.lproduct = pro.products },
    //  (err)=>console.log(err))
    this.formProduct = this.formBuilder.group({
      productSel: [''] //ProductCode
      , childArray: this.formBuilder.array([])
      , hdRmodelID: [this.rmodelID],
      txtF:['', [Validators.required]]
    })
    this.onformcontrolChange();
    //  console.log('Rajo  '+this.lproduct[0].ProductCode);
    //  this.userlogin.GetProductWithLevel(1).subscribe(pro=>(this._data.next(pro.products)) );
  }
  onSubmit() {
    // console.log(this.formProduct);
    this.displaySelection();
  }
  /*
  ngAfterViewInit()
  {
    console.log(this.lproduct[0]?.ProductCode);
    
  }*/
  ngOnChanges() {
    alert('rajo');
  }
  childArray(): FormArray {
    return this.formProduct.get("childArray") as FormArray
  }
  onformcontrolChange(): void {

    this.formProduct.get('productSel').valueChanges.subscribe(val => {
      //console.log(val['ProductCode'])
      this.NewChildGroup2(val)
    });
  }
  NewChildGroup() {
    this.childArray().push(this.formBuilder.group({
      ProductCode: '',
      ModelCode: '',
      Category: '',
      Price: '',
      Quantity: [0,[Validators.required,Validators.maxLength(3)]]
    }));
  }
  NewChildGroup2(pr: Products) {
    this.childArray().push(this.formBuilder.group({
      ProductCode: pr.ProductCode,
      ModelCode: pr.Model,
      Category: pr.category,
      Price: pr.price,
      Quantity: [0,[Validators.required,Validators.maxLength(3)]]
    }));
    // console.log(this.formProduct);

  }
  displaySelection() {
    this.pLevelResponse.RmodelId = this.formProduct.value.hdRmodelID;
    if (this.formProduct.value.childArray.length > 0) {
      for (var p in this.formProduct.value.childArray) {
        this.pLevelResponse.products[p] = this.formProduct.value.childArray[p];
      //  console.log(this.formProduct.value.childArray[p])
      }
      this.userlogin.SaveProducts(this.pLevelResponse).subscribe(
        pdata=>{console.log(pdata)}
      )
    }
    console.log(this.formProduct);
  //  console.log(this.pLevelResponse);
  }
}
