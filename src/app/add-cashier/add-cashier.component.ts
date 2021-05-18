import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/adminService/admin.service';
import { AuthService } from 'src/app/adminService/auth.service';

@Component({
  selector: 'app-add-cashier',
  templateUrl: './add-cashier.component.html',
  styleUrls: ['./add-cashier.component.scss']
})
export class AddCashierComponent implements OnInit {
  cashierForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private service:AuthService , public toastr: ToastrService) { }

  ngOnInit(): void {
    this.cashierForm = this.formBuilder.group({
      mobile:['' , Validators.required],
      username:['' , Validators.required],
      password:['' , Validators.required],
      email:['' , Validators.required],
      type:['' , Validators.required],
      address:['' , Validators.required],
      age:['' , Validators.required]
    });
  }
  showSuccess() {
    this.toastr.success('New User Registered', 'SignUp Successfull');
  }
  showError() {
    this.toastr.error('First you need to logout!', 'Login Error');
  }
  onSubmit(){
    console.log(this.cashierForm.value)
    this.service.signUp({ "mobile":this.cashierForm.get("mobile").value ,"username":this.cashierForm.get("username").value, "password":this.cashierForm.get("password").value, "email":this.cashierForm.get("email").value , "account_type":this.cashierForm.get("type").value , "address":this.cashierForm.get("address").value , "age":this.cashierForm.get("age").value}).subscribe(info=>{
      console.log('post' , info);
      if (info.success ==true) {
        this.showSuccess();
      }
    })
  }

}
