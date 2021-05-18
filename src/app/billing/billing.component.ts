import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/adminService/admin.service';
import { AuthService } from '../adminService/auth.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  user: any;
  BillForm:FormGroup;
  cat: any;
  dates: any = '';
  billtable: any;
  billfirst:any = 1;
  bill_id: any;
  billno: any;
  totalAmount: number = null;
  payableAmount: number = null;
  username: string;
  usname: any;

  constructor(private service:AdminService, private formBuilder:FormBuilder , private toastr:ToastrService , private authservice:AuthService) { }

  ngOnInit(): void {
    this.BillForm = this.formBuilder.group({
      category_name:['' , Validators.required],
      brand_name:['' , Validators.required],
      product_name:['', Validators.required],
      product_id:['', Validators.required],
      quantity:['' , Validators.required]
    });
    // this.ViewCategory();
  }
  ViewCategory(){
    this.service.ViewCategory().subscribe(info=>{
      console.log(info);
      this.user = info;
    });
  }
  showSuccess() {
    this.toastr.success('Product Accessed successfully!', 'Product Accessed');
  }
  showBillSuccess() {
    this.toastr.success('Added to bill successfully!', 'Added To Bill');
  }
  PaymentSuccess() {
    this.toastr.success('bill payed successfully!', 'Payment Successful');
  }
  BindProduct(id){
    if(id.length>=4){
    this.service.SearchBillProduct(id).subscribe(info=>{
      if(info.success){
        this.cat = info;
        console.log('cat',this.cat)
        this.showSuccess();
        this.BillForm.get('category_name').setValue(info.category);
        this.BillForm.get('product_name').setValue(info.product.variants.product_name);
        this.BillForm.get('brand_name').setValue(info.product.variants.brand_name);
        this.BillForm.get('quantity').setValue(1);
      }
    })
  }
  }
  calculateAmount(){
    this.totalAmount = 0;
    for(let a of this.billtable){
      var b = a.product.mrp * a.soldout_quantity
      this.totalAmount += b;
    }
  }
  CalculatePayableAmount(event){
    this.payableAmount = 0;
    var discountprice = event.target.value;
    this.payableAmount = Math.round(this.totalAmount - (this.totalAmount * (discountprice/100)));
  }
  CalculatePayableAmount2(event){
    this.payableAmount = 0;
    var discountprice = event;
    this.payableAmount = Math.round(this.totalAmount - (this.totalAmount * (discountprice/100)));
  }
  onKey(event){
    this.BindProduct(event.target.value);
  }
  onKeys(event){
    this.service.FindBill(event.target.value).subscribe(info =>{
      if(info.bill.length <= 0){
        this.billtable = null;
      }
      else if(info.success){
        console.log(info.bill[0].products);
        this.billtable = info.bill[0].products;
        this.bill_id = info.bill[0]._id;
        this.billno = info.bill[0].bill_no;
        this.dates = new Date(info.bill[0].bill_date).toDateString();
        this.billfirst += 1; 
        this.calculateAmount();
        this.CalculatePayableAmount2(0);
      }
      
    })
  }
  onSubmit(){
    var date = new Date
    console.log(this.dates);
    console.log(this.billfirst);
    if(this.billfirst==1){
    this.service.AddBill(JSON.parse(JSON.stringify({"bill_date":date}))).subscribe(info => {
      console.log('bill' , info);
      if(info.success){
         this.bill_id = info.bill._id;
         this.billno = info.bill.bill_no
         this.billfirst += 1; 
      }
    });
  }
  
  this.service.SoldOutProduct({"soldout_quantity":this.BillForm.get('quantity').value , "prod_id":this.cat.product.variants._id}).subscribe(dat=>{
    if(dat.success){
        this.dates= date.toDateString();
        console.log(dat.sold);
        this.service.AddBillProduct(this.bill_id , {"soldout_quantity":this.BillForm.get('quantity').value , "prod_id":[this.cat.product.variants._id]}).subscribe(infos =>{
          if(infos.success){
            console.log('billinfo' , infos)
            this.billtable = infos.bill.products;
            this.BillForm.get('category_name').setValue('');
            this.BillForm.get('product_name').setValue('');
            this.BillForm.get('product_id').setValue('');
            this.BillForm.get('brand_name').setValue('');
            this.BillForm.get('quantity').setValue('');
            this.showBillSuccess();
            this.calculateAmount();
            this.CalculatePayableAmount2(0);
          }
        })
      }
    })
    

  }
  pay(){
    this.service.CheckPaid(this.billno).subscribe(datas =>{
      if(datas.paid.length>=1){
        this.toastr.warning('This bill is already paid' , 'Already Paid')
      }
      else if(datas.success){
        var date = new Date;
        var dates = date.toLocaleDateString().toString();
        this.usname = this.authservice.getUsname();
        // this.username = JSON.parse(JSON.stringify(this.usname));
        this.username = localStorage.getItem('usname');
        this.service.PaidAssign({"username": this.username, "overall_amount":this.payableAmount , "Paid_date":dates , "bill_no":this.billno}).subscribe(info => {
        if(info.success){
          this.PaymentSuccess();
          this.billtable = null;
          this.billno = null; 
          this.bill_id = null;
          this.billfirst = 1;
          this.totalAmount = null;
          this.payableAmount = null;
          $('.dis').val(null);
      }
    })
    }  
    })
    
    
  }
}
