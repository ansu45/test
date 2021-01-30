import { XyyModule } from './xyy/xyy.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminmenuComponent } from './layout/adminmenu/adminmenu.component';
import { MypipefilterComponent } from './mypipefilter/mypipefilter.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminmenuComponent,
    MypipefilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    ,FormsModule, ReactiveFormsModule
    ,XyyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
