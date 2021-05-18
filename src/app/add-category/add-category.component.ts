import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/adminService/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  user: any;
  but:boolean = true;
  constructor(private formBuilder:FormBuilder,private service:AdminService,public toastr:ToastrService) { }

  ngOnInit(): void {
    this.ViewCategory();
    this.categoryForm = this.formBuilder.group({
      category_name:['' , Validators.required]
    });
  }
  ViewCategory(){
    this.service.ViewCategory().subscribe(info=>{
      console.log(info);
      this.user = info;
    });
  }
  showSuccess() {
    this.toastr.success('Category Added successfully!', 'Category Added');
  }
  showSuccessEdit() {
    this.toastr.success('Category Edited successfully!', 'Category Edited');
  }
  showError() {
    this.toastr.error('First you need to logout!', 'Login Error');
  }
  showWarn() {
    this.toastr.warning('Category deleted successfully!' , 'Category Deleted');
  }
  onSubmit(){
    console.log('cat', this.categoryForm.get('category_name').value);
    this.service.AddCategory({"category_name":this.categoryForm.get('category_name').value}).subscribe(info=>{
      console.log(info);
      if(info.success){
        this.showSuccess();
        this.ViewCategory();
      }
    });
  }
  deleteCat(id){
    this.service.DeleteCategory(id).subscribe(info=>{
      console.log(info);
      if(info.success){
        this.showWarn();
        this.ViewCategory();
      }
    });
  }
  editCat(id,cat_name){
    localStorage.setItem('id' , id);
    console.log('id' , id , 'catname' , cat_name);
    this.categoryForm.get("category_name").setValue(cat_name);
    this.but=false
  }
  EditCategory(){
    var id = localStorage.getItem('id');
    this.service.EditCategory(id ,{"category_name":this.categoryForm.get('category_name').value} ).subscribe(info =>{
      console.log(info);
      if(info.success){
        this.showSuccessEdit();
        this.ViewCategory();
        this.but=true;
      }
    })
  }

}
