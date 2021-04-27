import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})

export class BoardAdminComponent implements OnInit {
  content: string;

  constructor(private userService: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
        console.log("Data copied to content");
      },
      err => {
        this.content = JSON.parse(err.error).message;
        console.log("Error");
      }
    );
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }
}