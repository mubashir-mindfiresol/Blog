import { Component, OnInit } from '@angular/core';
import {Blog} from './blog';
import { BLOGS } from './mock-blog';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  p: number = 1;
  blogs = BLOGS;

  constructor() { }
  commentText:string;
  //Initialization Life-Cycle Hook

  ngOnInit(): void {
  }

  saveNewField(commentText) {
    console.log("searched Text", commentText);
  }

  postComment(){
    console.log("Comment Posted!!")
  }
}
