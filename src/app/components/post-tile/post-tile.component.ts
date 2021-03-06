import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { PostModel } from '../../services/post/post-model';
import { Router } from '@angular/router';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit, OnChanges {

  @Input() posts: PostModel[];
  p: number = 1;
  temp:any;
  images:any;
  constructor(private router: Router, private uploadFile: UploadFileService) {

  }

  ngOnInit(): void {
    
  }

  ngOnChanges():void{
    console.log(this.posts);
    this.getImg();
  }

  //Redirects to individual post
  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/'+ id);
  }

  //Function for Pagination
  onPageChange(page) {
    this.p = page;
  }

  //Code for Image Retrieval Starts
  getImg() {
      this.posts.forEach((post, idx) => { 
        this.readImageFile(idx, post.name);
      });
    };

  readImageFile(idx, url) {
      this.uploadFile.getFile(url).subscribe(data =>{
        this.posts[idx].image = "data:image/jpg;base64," + data.data;
        });
  }
  //Code for Image Retrieval Ends
}