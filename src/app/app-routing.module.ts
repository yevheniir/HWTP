import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminStuffCreatorComponent } from './admin-stuff-creator/admin-stuff-creator.component';
import { AdminStuffManagerComponent } from './admin-stuff-manager/admin-stuff-manager.component';

const routes: Routes = [
  { path: 'admin-panel/orders', component: AdminOrdersComponent},
  { path: 'admin-panel/stuff-creator', component: AdminStuffCreatorComponent},
  { path: 'admin-panel/stuff-manager', component: AdminStuffManagerComponent},
  { path: 'admin-panel', component: AdminPanelComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: 'admin-panel', component: AdminPanelComponent},
  { path: '**', component: MainPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
