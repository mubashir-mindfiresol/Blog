import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { PostModel } from '../../services/post/post-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {

  @Input() posts: PostModel[];
  p: number = 1;
  post: any = {};
  temp:any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  //Redirects to individual post
  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/'+ id);
  }

  //Function for Pagination
  onPageChange(page) {
    this.p = page;
 }
//  getImg(fileName:String){
//    this.uploadFile.getFile(fileName).subscribe(data =>{
//      this.temp=data.data;
//      console.log("data returned"+this.temp);
//      return this.temp;
//    },
//    error=>{throwError(error);
//    });
//  }
}