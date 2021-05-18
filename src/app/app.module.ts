import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminService } from './adminService/admin.service';
import { AuthGuardService } from './adminService/auth-guard.service';
import { AuthInterceptor, UnauthorizedInterceptor } from './adminService/auth.interceptor';
import { AuthService } from './adminService/auth.service';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { baseURL } from './shared/baseurl';
import { ProcessHTTPMsgService } from './adminService/process-httpmsg.service';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ViewCashierComponent } from './view-cashier/view-cashier.component';
import { AddCashierComponent } from './add-cashier/add-cashier.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { BillingComponent } from './billing/billing.component';
import { LoginComponent } from './login/login.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesAsProductComponent } from './sales-as-product/sales-as-product.component';
import { ChartsModule } from 'ng2-charts';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
@NgModule({
  declarations: [
    AppComponent,
    ViewCashierComponent,
    AddCashierComponent,
    AddCategoryComponent,
    AddProductComponent,
    BillingComponent,
    LoginComponent,
    UpdateStockComponent,
    SalesAsProductComponent,
    ViewTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule   
  ],
  providers: [AuthService,
    AuthGuardService,
    AdminService,
    {provide: 'baseURL', useValue: baseURL},
    ProcessHTTPMsgService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
