import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminStuffCreatorComponent } from './admin-stuff-creator/admin-stuff-creator.component';
import { AdminStuffManagerComponent } from './admin-stuff-manager/admin-stuff-manager.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [
  { path: 'admin-panel', component: AdminPanelComponent, children: [
    { path: 'orders', component: AdminOrdersComponent},
    { path: 'stuff-creator', component: AdminStuffCreatorComponent},
    { path: 'stuff-manager', component: AdminStuffManagerComponent},
  ]},
  { path: 'password', component: PasswordComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: '**', component: MainPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
