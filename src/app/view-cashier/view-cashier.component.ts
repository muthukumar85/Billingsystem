import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/adminService/admin.service';

@Component({
  selector: 'app-view-cashier',
  templateUrl: './view-cashier.component.html',
  styleUrls: ['./view-cashier.component.scss']
})
export class ViewCashierComponent implements OnInit {
  cashierForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private service:AdminService) { }
  user:any;
  ngOnInit(): void {
    this.service.ViewCashier().subscribe(info=>{
      console.log(info);
      this.user = info;
    });
    this.cashierForm = this.formBuilder.group({
      cashier_name:['' , Validators.required]
    });
  }

  onSubmit(event){
    // this.service.SearchCashier(this.cashierForm.get('cashier_name').value).subscribe(info=>{
    //   console.log(info);
    //   this.user = info;
    // });
  }

}
