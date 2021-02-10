import { TokenstorageService } from './../../services/tokenstorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminmenu',
  templateUrl: './adminmenu.component.html',
  styleUrls: ['./adminmenu.component.css']
})
export class AdminmenuComponent implements OnInit {

  constructor(private tokenStorageService: TokenstorageService) { }

  ngOnInit(): void {
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
