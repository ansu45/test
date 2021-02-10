import { HttpClientModule} from '@angular/common/http';
import { AbcModule } from './abc/abc.module';
import { XyyModule } from './xyy/xyy.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,ErrorHandler} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HTTP_INTERCEPTORS} from '@angular/common/http';
import{AuthinterceptorInterceptor} from 'src/app/appinterceptor/authinterceptor.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminmenuComponent } from './layout/adminmenu/adminmenu.component';
import { MypipefilterComponent } from './mypipefilter/mypipefilter.component';
import { AuthComponent } from 'src/app/auth/auth.component';
import{MyErrorHandlerService} from 'src/app/services/my-error-handler-service.service'
import { ResoproductGuard } from './services/resoproduct.guard';

@NgModule({
  declarations: [
    AppComponent,
    AdminmenuComponent,
    MypipefilterComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    ,HttpClientModule
    ,FormsModule, ReactiveFormsModule
    ,XyyModule,AbcModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorInterceptor,
      multi: true
    },
      { provide: ErrorHandler, useClass: MyErrorHandlerService },
      ResoproductGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
