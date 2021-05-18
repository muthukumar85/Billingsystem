import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from 'src/app/adminService/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: ''};
  errMess: string;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,public toastr: ToastrService) { }

  ngOnInit() {

  }
  onNoClick(): void {
    this.dialogRef.close('true');
  }
  showSuccess() {
    this.toastr.success('This is a success toastr message!', 'Success');
  }
  showError() {
    this.toastr.error('First you need to logout!', 'Login Error');
  }
  showToastr(positionClass) {
    this.toastr.success('You are Authenticated', 'Login Successfull', {
      positionClass
    });
  }
  onSubmit() {
    console.log('User: ', this.user);
   
    if(this.authService.isLoggedIn()){
      this.showError();
    }
    else {
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          $('.cls').click();
          this.dialogRef.close(res.success);
          this.showToastr('toast-top-right');
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.errMess = error;
      });
    }
  }
}
