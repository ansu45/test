import { environment } from './../../../environments/environment';
import { LoginserService } from './../../services/loginser.service';
import { TokenstorageService } from './../../services/tokenstorage.service';
import { AuthenticateResponse } from './../../Interfaces/authenticate-response';
import { UserloginService } from './../../services/userlogin.service';
import { AuthenticateRequest } from './../../Interfaces/authenticate-request';
import { Component, OnInit } from '@angular/core';
import {RefreshToken} from './../../Interfaces/refresh-token';
import { FormGroup, FormBuilder, Validator, FormControl } from '@angular/forms';
import { Subscriber, throwError } from 'rxjs';
import { retryWhen,delay, scan } from 'rxjs/operators';


@Component({
  selector: 'app-logina',
  templateUrl: './logina.component.html',
  styleUrls: ['./logina.component.css']
})
export class LoginaComponent implements OnInit {
  lgForm: FormGroup;
  apiurl=environment.AUTH_API2;
  authRequest: AuthenticateRequest ={Username:'', Password:''};
  refreshToken: RefreshToken={Token:''};
  constructor(private formbuilder: FormBuilder,
    private userLogin: UserloginService,
    private tokenStorgeService: TokenstorageService,
    private loginSer:LoginserService) {
    this.lgForm = this.formbuilder.group({
      Username: [''],
      Password: ['']
    })
  }

  ngOnInit(): void {
  }
  fSubmit() {
  // console.log( this.lgForm);
  // console.log(this.lgForm.value.Username);

   this.authRequest.Username =    this.lgForm.value.Username;
    this.authRequest.Password = this.lgForm.value.Password;

    this.userLogin.loginAPI(this.authRequest)
    .pipe(
      retryWhen(err=>err.pipe(delay(1000),scan((retrycount)=>
      {if(retrycount>5) {throw err;}
      else{retrycount=retrycount+1;
      console.log('retrycount='+retrycount);
      return retrycount; // this retur is used in scan
    // return 1;
      }
    },0))
    )
    )
    .subscribe(res => {
      this.ststorageMethod(res)
    },
    (error:any)=>{let cerror=error;
      throwError(cerror);
    
    });
  }
  ststorageMethod(oResponse: AuthenticateResponse) {
    if (oResponse) {
      this.tokenStorgeService.saveUser(oResponse.Username);
      this.tokenStorgeService.saveToken(oResponse.JwtToken);
      this.tokenStorgeService.saveRefreshToken(oResponse.RefreshToken);
      this.loginSer.userName.next(this.tokenStorgeService.getUser());
    }
 //   console.log(this.tokenStorgeService.getUser());
  }
  refreshtoken()
  {
  //  this.refreshToken.Token=this.tokenStorgeService.getRefreshToken();
  //  this.userLogin.refreshToken(this.refreshToken={Token:this.tokenStorgeService.getRefreshToken()}).subscribe(
   //   data=>{console.log(data.JwtToken, data.RefreshToken)}
   // );
  }
}
