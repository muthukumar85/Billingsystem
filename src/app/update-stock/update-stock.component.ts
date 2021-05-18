import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/adminService/admin.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit {
  UpstockForm: FormGroup;
  prod_id: any;
  upstock: any;

  constructor(private formBuilder:FormBuilder , private service:AdminService , private toastr:ToastrService) { }

  ngOnInit(): void {
    this.UpstockForm = this.formBuilder.group({
      product_id:['' , Validators.required],
      category_name:['' , Validators.required],
      brand_name:['' , Validators.required],
      product_name:['', Validators.required],
      available_quantity:['' , Validators.required],
      upstock_quantity:['' , Validators.required]
    });
    this.ViewStock();
  }
  showSuccess() {
    this.toastr.success('Product Accessed successfully!', 'Product Accessed');
  }
  showSuccessup() {
    this.toastr.success('Stock Updated successfully!', 'Stock Updated');
  }
  ViewStock(){
    this.service.GetStock().subscribe(info =>{
      this.upstock = info.upstock;
      console.log(this.upstock);
    })
  }
  BindProduct(event){
    if(event.target.value.length>=4){
    this.service.SearchBillProduct(event.target.value).subscribe(info=>{
      if(info.success){
        this.prod_id = info.product.variants._id;
        console.log('cat', info)
        this.showSuccess();
        this.UpstockForm.get('category_name').setValue(info.category);
        this.UpstockForm.get('product_name').setValue(info.product.variants.product_name);
        this.UpstockForm.get('brand_name').setValue(info.product.variants.brand_name);
        this.UpstockForm.get('available_quantity').setValue(info.product.variants.quantity);
      }
    })
  }
  }
  onSubmit(){
    var date = new Date;
    this.service.AddStock({"prod_id": this.prod_id , "upstock_quantity":this.UpstockForm.get('upstock_quantity').value , "upstock_date":JSON.parse(JSON.stringify(date.toDateString()))}).subscribe(info =>{
      if(info.success){
        console.log(info);
        this.service.AddStockProduct({"prod_id":this.prod_id} , info.upstock._id).subscribe(infos=>{
          if(infos.success){
            console.log(infos);
            this.showSuccessup();
            this.ViewStock();
          }
        })
      }
    })
  }
}
