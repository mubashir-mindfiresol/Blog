import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangepasswordService } from 'src/app/services/changepassword/changepassword.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  
  data:boolean;
  blogId:string;

  //model
  public model = {
    oldpassword: "",
    newpassword:""
  };
  
  constructor(private toastr: ToastrService, private passwordService:ChangepasswordService,  private router: Router) { 
    this.blogId = JSON.parse(window.sessionStorage.getItem('auth-user')).id;
  }

  ngOnInit(): void {
    
  }

  //Function called to change Password onSubmit()
  changePassword(){
    console.log("Change Password Clicked!!");
    this.passwordService.changePassword(this.blogId, this.model).subscribe(
      data => {this.data=data;
      if(this.data){
        this.toastr.success("Success","Successfuly Updated");
        this.router.navigate(['profile']);
      }
    else{
      this.toastr.error("Error","Error while updation!!");
    }}
    );
    console.log(this.data);
  }
}