import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserService {
userName=new BehaviorSubject('');
currentuserName = this.userName.asObservable();
  constructor() { }

}
