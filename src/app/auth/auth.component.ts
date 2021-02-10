import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  accoutflag: boolean = true;
  authForm: FormGroup;
  constructor(private formbuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.authForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
  changeAccount() {
    this.accoutflag = !this.accoutflag;
  }
  onsubmit() {
   // this.lgForm.value.Username;
    console.log(this.authForm.value.email + ' ' + this.authForm.value.password);
  }
}
