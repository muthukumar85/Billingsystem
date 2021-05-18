import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCashierComponent } from './add-cashier/add-cashier.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { BillingComponent } from './billing/billing.component';
import { LoginComponent } from './login/login.component';
import { SalesAsProductComponent } from './sales-as-product/sales-as-product.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';
import { ViewCashierComponent } from './view-cashier/view-cashier.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';

const routes: Routes = [
  { path: 'login' , component:LoginComponent},
{ path: 'add' , component:AddCashierComponent },
{ path:'view' , component:ViewCashierComponent},
{ path: 'addcat' , component:AddCategoryComponent},
{ path: 'addpro' , component:AddProductComponent},
{ path: 'upstock' , component:UpdateStockComponent},
{ path: 'bill' , component:BillingComponent},
{ path: 'salesproduct' , component:SalesAsProductComponent},
{ path: 'viewtrans' , component:ViewTransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
