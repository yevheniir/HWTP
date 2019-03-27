import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { StuffListComponent } from './stuff-list/stuff-list.component';
import { StuffComponent } from './stuff/stuff.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FilterComponent } from './filter/filter.component';
import { HWTPService } from './hwtp.service';
import { BuyedStuffListComponent } from './buyed-stuff-list/buyed-stuff-list.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminStuffCreatorComponent } from './admin-stuff-creator/admin-stuff-creator.component';
import { AdminStuffManagerComponent } from './admin-stuff-manager/admin-stuff-manager.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentPopupComponent } from './comment-popup/comment-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FiltersComponent,
    StuffListComponent,
    StuffComponent,
    MainPageComponent,
    ShoppingCartComponent,
    FilterComponent,
    BuyedStuffListComponent,
    AdminPanelComponent,
    AdminOrdersComponent,
    AdminStuffCreatorComponent,
    AdminStuffManagerComponent,
    FileSelectDirective,
    CommentPopupComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [HWTPService],
  bootstrap: [AppComponent]
})
export class AppModule { }
