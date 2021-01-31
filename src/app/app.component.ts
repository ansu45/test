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
  constructor(private loginSer:LoginserService)
  {

  }
  ngOnInit(){
this.loginSer.userName.subscribe(userName=>{this.userName=userName})
//this.loginSer.userName.subscribe(userName=>console.log( userName));
  }
}
