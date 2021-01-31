import { LoginaComponent } from './abc/logina/logina.component';
import { LoginxComponent } from './xyy/loginx/loginx.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'loginx', component:LoginxComponent},
  {path:'logina', component:LoginaComponent},
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
