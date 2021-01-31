import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginaComponent } from './logina/logina.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginaComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class AbcModule { }
