import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { StuffListComponent } from './stuff-list/stuff-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

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
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FiltersComponent,
    StuffListComponent,
    MainPageComponent,
    ShoppingCartComponent,
    FilterComponent,
    BuyedStuffListComponent,
    AdminPanelComponent,
    AdminOrdersComponent,
    AdminStuffCreatorComponent,
    AdminStuffManagerComponent,

    CommentPopupComponent,
    PasswordComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule
  ],
  entryComponents: [
    CommentPopupComponent,
  ],
  providers: [HWTPService],
  bootstrap: [AppComponent]
})
export class AppModule { }
