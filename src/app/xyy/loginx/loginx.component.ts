import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginx',
  templateUrl: './loginx.component.html',
  styleUrls: ['./loginx.component.css']
})
export class LoginxComponent implements OnInit {
  lgForm:FormGroup;
  constructor( private formbuilder:FormBuilder) { 
    this.lgForm =  this.formbuilder.group({
      userName:[''],
      password:['']
    })
  }

  ngOnInit(): void {
   
  }
  fSubmit()
  {}

}
