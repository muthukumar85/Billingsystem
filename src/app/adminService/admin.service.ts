import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { cashier } from '../shared/cashier';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient , private authService:AuthService , public toastr:ToastrService) { }
  token = JSON.parse(localStorage.getItem('JWT'));
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  addCashier(data):Observable<any>{
    console.log(this.token);
    return this.http.post<any>(baseURL +'cashier' , JSON.parse(JSON.stringify(data)) ,this.httpOptions)
    .pipe( map(res => {
      console.log(res );
      return res;
    }), 
      catchError(this.errorHandler)
    )
  }
  ViewCashier():Observable<any>{
    console.log(this.token);
    return this.http.get<any>(baseURL +'users')
    .pipe( map(res => {
      console.log(res);
      return res;
    }), 
      catchError(this.errorHandler)
    )
  }
  SearchCashier(data):Observable<any>{
    console.log(this.token);
    return this.http.get<any>(baseURL +'users/search' , data)
    .pipe( map(res => {
      console.log(res);
      return res;
    }), 
      catchError(this.errorHandler)
    )
  }
  AddCategory(data):Observable<any>{
    return this.http.post<any>(baseURL +'category' , data)
    .pipe( map(res => {
      console.log(res);
      return res;
    }), 
      catchError(this.errorHandler)
    )
  }

  ViewCategory():Observable<any>{
    return this.http.get<any>(baseURL +'category')
    .pipe( map(res => {
      console.log(res);
      return res;
    }), 
      catchError(this.errorHandler)
    )
  }
  EditCategory(id,data):Observable<any>{
    return this.http.put<any>(baseURL +'category/' + id , data)
    .pipe( map(res => {
      console.log(res);
      return res;
    }), 
      catchError(this.errorHandler)
    )
  }
  DeleteCategory(id):Observable<any>{
    return this.http.delete<any>(baseURL +'category/' + id)
    .pipe( map(res => {
      console.log(res);
      return res;
    }), 
      catchError(this.errorHandler)
    )
  }
  AddProduct(data):Observable<any>{
    return this.http.post<any>(baseURL +'product' , data)
    .pipe( map(res => {
      console.log(res);
      return res;
    }), 
      catchError(this.errorHandler)
    )
  }
  AddProductWithCategory(id , data):Observable<any>{
    return this.http.post<any>(baseURL +'category/'+ id +'/product' , data)
    .pipe( map(res => {
      console.log(res);
      return res;
    }), 
      catchError(this.errorHandler)
    )
  }
  ViewProduct():Observable<any>{
    return this.http.get<any>(baseURL +'category/')
    .pipe( map(res => {
      console.log(res);
      return res;
    }), 
      catchError(this.errorHandler)
    )
  }
  DeleteProduct(cat_id,prod_id):Observable<any>{
    return this.http.delete<any>(baseURL +'category/' + cat_id + '/product/' + prod_id)
    .pipe( map(res => {
      console.log(res);
      return res;
    }), 
      catchError(this.errorHandler)
    )
  } 
  SearchBillProduct(prod_id):Observable<any>{
    return this.http.get<any>(baseURL +'searchProduct/' + prod_id)
    .pipe( map(res => {
      console.log(res);
      return res;
    }), 
      catchError(this.errorHandler)
    )
  }
  AddBill(date):Observable<any>{
    return this.http.post<any>(baseURL + 'bill' , date)
    .pipe( map(res =>{
      console.log(res);
      return res;
    }),
      catchError(this.errorHandler))
  }
  AddBillProduct(bill_id , data):Observable<any>{
    return this.http.post<any>(baseURL + 'bill/' + bill_id + '/product', data)
    .pipe( map(res =>{
      console.log(res);
      return res;
    }),
      catchError(this.errorHandler))
  }
  PutBillProduct(data):Observable<any>{
    return this.http.get<any>(baseURL + 'billfind/'+ data)
    .pipe( map(res =>{
      console.log(res);
      return res;
    }),
      catchError(this.errorHandler))
  }
  SoldOutProduct(data):Observable<any>{
    return this.http.post<any>(baseURL + 'soldout' , data)
    .pipe( map(res =>{
      console.log(res);
      return res;
    }),
      catchError(this.errorHandler))
  }
  FindBill(data):Observable<any>{
    return this.http.get<any>(baseURL + 'billfind/'+ data)
    .pipe( map(res =>{
      console.log(res);
      return res;
    }),
      catchError(this.errorHandler))
  }
  AddStock(data):Observable<any>{
    return this.http.post<any>(baseURL + 'upstock' ,data)
    .pipe( map(res =>{
      console.log(res);
      return res;
    }),
      catchError(this.errorHandler))
  }
  AddStockProduct(data , id):Observable<any>{
    return this.http.post<any>(baseURL + 'upstock/' + id + '/product'  ,data)
    .pipe( map(res =>{
      console.log(res);
      return res;
    }),
      catchError(this.errorHandler))
  }
  GetStock():Observable<any>{
    return this.http.get<any>(baseURL + 'upstock')
    .pipe( map(res =>{
      return res;
    }),
      catchError(this.errorHandler))
  }
  GetSolds(id):Observable<any>{
    return this.http.get<any>(baseURL + 'soldout/' + id)
    .pipe( map(res =>{
      return res;
    }),
      catchError(this.errorHandler))
  }
  GetSold():Observable<any>{
    return this.http.get<any>(baseURL + 'soldout')
    .pipe( map(res =>{
      return res;
    }),
      catchError(this.errorHandler))
  }
  PaidAssign(data):Observable<any>{
    return this.http.post<any>(baseURL + 'paid' , data)
    .pipe( map(res =>{
      return res;
    }),
      catchError(this.errorHandler))
  }
  GetPaid(data):Observable<any>{
    return this.http.get<any>(baseURL + 'paid' , data)
    .pipe( map(res =>{
      return res;
    }),
      catchError(this.errorHandler))
  }
  GetPaidAll():Observable<any>{
    return this.http.get<any>(baseURL + 'getpaid')
    .pipe( map(res =>{
      return res;
    }),
      catchError(this.errorHandler))
  }
  CheckPaid(no):Observable<any>{
    return this.http.get<any>(baseURL + 'paid/' + no)
    .pipe( map(res =>{
      return res;
    }),
      catchError(this.errorHandler))
  }
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      console.log(error.status);
      if(error.status == 401){
        this.toastr.error('You not Authorized' , 'Invalid User');
      }
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

  viewCashier(){
    return this.http.get<any>('http://localhost:3000/cashier');
  }
}
function tokenKey(tokenKey: any): any {
  throw new Error('Function not implemented.');
}

