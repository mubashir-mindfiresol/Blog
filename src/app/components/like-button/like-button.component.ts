import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
export class LikeButtonComponent implements OnInit,OnChanges {

  @Input() post: PostModel;
  likePayload: LikePayload;
  upvoteColor: string;
  liked: boolean;
  isActive:boolean;

  constructor(private likeService: LikeService,
    private postService: PostService, private toastr: ToastrService) {
     

    this.likePayload = {
      like: undefined,
      blogId: undefined,
    }
  }

  ngOnInit(): void {
    console.log(this.post);
    this.updateLikeDetails();
    this.userLiked();
  }
  ngOnChanges(changes) {
    this.updateLikeDetails();
    this.userLiked();
  }
  likePost() {
    this.isActive=!this.isActive;
    
    this.likePayload.like = 1;
    this.like();
    if(this.isActive){
      this.toastr.success("👍","You liked the blog");
    }
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

  private userLiked(){
    this.likeService.liked(this.post.id).subscribe(data => {
      this.liked= data;
      this.isActive=this.liked;
    });
  }
}