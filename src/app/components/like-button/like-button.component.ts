import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../../services/post/post-model';
import { LikePayload } from '../../services/like/like-payload';
import { LikeService } from '../../services/like/like.service';
import { PostService } from '../../services/post/post.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent implements OnInit {

  @Input() post: PostModel;
  likePayload: LikePayload;
  upvoteColor: string;
  isActive:boolean;
  temp:number;

  constructor(private likeService: LikeService,
    private postService: PostService, private toastr: ToastrService) {
     

    this.likePayload = {
      like: undefined,
      blogId: undefined
    }
  }

  ngOnInit(): void {
    this.temp=this.post.likeCount;
    this.updateLikeDetails();
  }

  likePost() {
    //console.log(this.temp);
    // if(this.temp>this.post.likeCount)
    // {
    //   this.isActive=true;
    // }
    // else{
    //   this.isActive=false;
    // }
    this.likePayload.like = 1;
    this.like();
    // if(this.isActive){
    //   this.toastr.success("👍","You liked the blog");
    // }
    // else{
    //   this.toastr.warning("👎","You unliked the blog");
    // }
    //console.log(this.post.likeCount);
    //console.log(this.likeService);
  }

  private like() {
    this.likePayload.blogId = this.post.id;
    this.likeService.like(this.likePayload).subscribe(() => {
      this.updateLikeDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateLikeDetails() {
    this.postService.getPost(this.post.id).subscribe(blog => {
      this.post = blog;
    });
  }
}