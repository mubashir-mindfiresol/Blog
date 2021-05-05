import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { PostModel } from '../../services/post/post-model';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';

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
  constructor(private router: Router, private uploadFile: UploadFileService) { 
    
  }

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

//  getImg(fileName:string){
//    this.uploadFile.getFile(fileName).subscribe(data =>{
//      this.temp=data.data;
//      console.log("data returned in getImg "+this.temp);
//      return this.temp;
//    },
//    error=>{throwError(error);
//    });
//  }

}