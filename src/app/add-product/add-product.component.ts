import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/adminService/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  ProductForm:FormGroup;
  pro: any;
  constructor(private formBuilder:FormBuilder,private service:AdminService,public toastr:ToastrService) { }
  but:boolean = true;
  user:any;
  ngOnInit(): void {
    this.ProductForm = this.formBuilder.group({
      category_name:['' , Validators.required],
      brand_name:['' , Validators.required],
      product_name:['', Validators.required],
      quantity:['' , Validators.required],
      color:[''],
      mrp:['', Validators.required]
    });
    this.ViewCategory();
    this.ViewProduct();
  }
  ViewCategory(){
    this.service.ViewCategory().subscribe(info=>{
      console.log(info);
      this.user = info;
    });
  }
  ViewProduct(){
    this.service.ViewProduct().subscribe(info=>{
      console.log(info);
      this.pro = info;
    });
  }
  showSuccess() {
    this.toastr.success('Product Added successfully!', 'Product Added');
  }
  showSuccessEdit() {
    this.toastr.success('Category Edited successfully!', 'Category Edited');
  }
  showError() {
    this.toastr.error('First you need to logout!', 'Login Error');
  }
  showWarn() {
    this.toastr.warning('Product deleted successfully!' , 'Product Deleted');
  }
  onSubmit(){
    this.service.AddProduct({
      "brand_name":this.ProductForm.get('brand_name').value ,
      "product_name":this.ProductForm.get('product_name').value , 
      "color":this.ProductForm.get('color').value ,
      "quantity":this.ProductForm.get('quantity').value , 
      "mrp":this.ProductForm.get('mrp').value
  }).subscribe(info =>{
    console.log(info);
    if(info.success){
      this.service.AddProductWithCategory(this.ProductForm.get('category_name').value ,{
        "brand_name":info.pro.brand_name,
        "prod_id":[ info.pro._id.toString() ]
      }).subscribe(infos => {
        if(info.success){
          console.log(infos);
          this.showSuccess();
          this.ViewProduct();
        }
      })
    }
  })
  }
  deletePro(cat_id,id){
    this.service.DeleteProduct(cat_id , id).subscribe(info =>{
      if(info.success){
        this.showWarn();
        this.ViewProduct();
      }
    })
  }
}
