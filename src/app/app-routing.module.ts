import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";

const routes: Routes = [
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: '**', component: MainPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
