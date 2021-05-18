import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

interface AuthResponse {
  status: string;
  success: string;
  token: string;
}

interface JWTResponse {
  status: string;
  success: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
   token:any;
authToken:string;
  usname: any;
   constructor(private http: HttpClient,
     private processHTTPMsgService: ProcessHTTPMsgService) {
  
   }
   ngOnInit() {
 
   } 
   checkJWTtoken() {
     this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
     .subscribe(res => {
       console.log('JWT Token Valid: ', res);
       this.sendUsername(res.user.username);
     },
     err => {
       console.log('JWT Token invalid: ', err);
       this.destroyUserCredentials();
     });
   }

   sendUsername(name: string) {
     this.username.next(name);
   }

   clearUsername() {
     this.username.next(undefined);
   }

   loadUserCredentials() {
     const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
     console.log('loadUserCredentials ', credentials);
     if (credentials && credentials.username !== undefined) {
       this.useCredentials(credentials);
       if (this.authToken) {
        this.checkJWTtoken();
       }
     }
   }

   storeUserCredentials(credentials: any) {
     console.log('storeUserCredentials ', credentials);
     localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
     this.useCredentials(credentials);
   }

   useCredentials(credentials: any) {
     this.isAuthenticated = true;
     this.sendUsername(credentials.username);
     this.authToken = credentials.token;
     console.log('athutoke',this.authToken)
   }

   destroyUserCredentials() {
     if(this.authToken != '123'){
     this.authToken = undefined;
     this.clearUsername();
     this.isAuthenticated = false;
     var dat = JSON.stringify({'username':'123' , 'token':'123'});
     localStorage.setItem(this.tokenKey, dat);
       return 'success';
    } 
    else {
      return 'notlog';
    }

   }

   signUp(data):Observable<any> {
    return this.http.post<any>(baseURL + 'users/signup' , JSON.parse(JSON.stringify(data)) )
    .pipe( map(res => {
      return { 'success' : res.success , 'status' : res.status };
    }),
    catchError(error => this.processHTTPMsgService.handleError(error)));
   }

   logIn(user: any): Observable<any> {
     return this.http.post<AuthResponse>(baseURL + 'users/login',
       {'username': user.username, 'password': user.password})
       .pipe( map(res => {
          this.usname = user.username;
          localStorage.setItem('usname' , user.username);
           this.storeUserCredentials({username: user.username, token: res.token});
           return {'success': true, 'username': user.username };
       }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
   }

   logOut() {
     return this.destroyUserCredentials();
   }

   isLoggedIn(): Boolean {
     return this.isAuthenticated;
   }

   getUsername(): Observable<string> {
     console.log(this.username);
     return this.username.asObservable();
   }
   getUsname() {
    
    return this.usname;
  }

   getToken(): string {
    this.token = JSON.parse(localStorage.getItem('JWT'));
    // this.token = JSON.parse(JSON.stringify({'username':'123' , 'token':'123'}));
    console.log(this.token);
    this.authToken = this.token.token;
     return this.authToken;
   }
}
