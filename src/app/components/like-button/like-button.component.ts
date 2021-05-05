import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PostModel } from '../../services/post/post-model';
import { LikePayload } from '../../services/like/like-payload';
import { LikeService } from '../../services/like/like.service';
import { PostService } from '../../services/post/post.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';


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
  blogId: string;
  copyText:string;

  constructor(private likeService: LikeService,
    private postService: PostService, private toastr: ToastrService, private activateRoute: ActivatedRoute) {
     
    this.blogId = this.activateRoute.snapshot.params.id;

    this.likePayload = {
      like: undefined,
      blogId: undefined,
    }
  }

  ngOnInit(): void {
  
  }
  
  ngOnChanges(changes) {
    this.updateLikeDetails();
    this.userLiked();
  }
  
  //Called when user clicks on Like button
  likePost() {
    this.likePayload.like = 1;
    this.like();
  }

  //Called when User Clicks on Share button
  shareUrl(){
    var dummy = document.createElement('input'),
    text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    this.toastr.success("Paste this link on any social media","Sharable Link Generated");
  }

  //Like-Service call
  private like() {
    this.likePayload.blogId = this.post.id;
    this.likeService.like(this.likePayload).subscribe(() => {
      this.updateLikeDetails();
      this.isActive=!this.isActive;  
      if(this.isActive){
        this.toastr.success("👍","You liked the blog");
      }
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  //Update Blog Service Call
  private updateLikeDetails() {
    this.postService.getPost(this.blogId).subscribe(blog => {
      this.post = blog;
    });
  }

  //Check whether user has already liked the blog or not
  private userLiked(){
    this.likeService.liked(this.blogId).subscribe(data => {
      this.liked= data;
      this.isActive=this.liked;
    });
  }
}