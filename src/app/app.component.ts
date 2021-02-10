import { TokenstorageService } from './services/tokenstorage.service';
import { LoginserService } from './services/loginser.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular30jan';
  userName:string;
  constructor(private loginSer:LoginserService, private tokenstorage:TokenstorageService)
  {

  }
  ngOnInit(){
 //  this.userName= this.tokenstorage.getUser();
this.loginSer.userName.subscribe(userName=>{this.userName=userName
if(!this.userName){this.userName=this.tokenstorage.getUser();}})
//this.loginSer.userName.subscribe(userName=>console.log( userName));
  }
}
