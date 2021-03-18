import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user={};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getUser(){
    this.userService.getUser().subscribe(
      user=>{
        console.log(user);
        this.user=user;
      },
      error=>{
        console.log(error);
      }
    )
  }

}
