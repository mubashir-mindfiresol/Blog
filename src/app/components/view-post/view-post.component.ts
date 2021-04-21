import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/services/post/post-model';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/services/comment/comment.payload';
import { CommentService } from 'src/app/services/comment/comment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})

export class ViewPostComponent implements OnInit {

  @Input() posts: PostModel[];

  blogId: string;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  commentText:string;
  btn_disable:string;
  isActive:boolean=false;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router, private toastr: ToastrService) {

    this.blogId = this.activateRoute.snapshot.params.id;
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      comment: '',
      blogId: this.blogId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }

  postComment() {
    this.commentPayload.comment = this.commentForm.get('comment').value;
    this.commentPayload.blogId= this.blogId;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('comment').setValue('');
      this.getCommentsForPost();
      this.toastr.info("Comment Added!!","Success")
    }, error => {
      throwError(error);
    })
  }

  private getPostById() {
    this.postService.getPost(this.blogId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.blogId).subscribe(data => {
      this.comments = data;
      
      console.log(data);
    }, error => {
      throwError(error);
    });
  }

  onClick() {
    this.isActive = !this.isActive;
  }
}