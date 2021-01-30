import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginxComponent } from './loginx/loginx.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder,FormGroup, Validators } from '@angular/forms';


@NgModule({
  declarations: [LoginxComponent],
  imports: [
    CommonModule
    ,FormsModule, ReactiveFormsModule
  ]
})
export class XyyModule { }
