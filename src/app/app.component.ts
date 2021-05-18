import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { AuthService } from './adminService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Billingsystem';
  popup: any=0;
  constructor(public dialog: MatDialog, private service:AuthService,public toastr: ToastrService){}
  ngOnInit(): void {
    $(".sidebar-dropdown > a").click(function() {
      $(".sidebar-submenu").slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass("active")
      ) {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .parent()
          .removeClass("active");
      } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .next(".sidebar-submenu")
          .slideDown(200);
        $(this)
          .parent()
          .addClass("active");
      }
    });
    
    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
    });
    $(".area").click(function() {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
      $(".page-wrapper").addClass("toggled");
    });

    
  }

  showToastr(positionClass) {
    this.toastr.warning('You are LoggedOut', 'LogOut Successfull', {
      positionClass
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      // width: '250px',
      data: this.popup
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
    
    });
  }
  showToastrNot(){
    this.toastr.error('You Are not Logged In' , 'Error Logout');
  }
  logout(){
    var info = this.service.logOut();
    if (info == 'success') {
      this.showToastr('toast-top-right');
    }
    if(info == 'notlog'){
      this.showToastrNot();
    }
  }
}
