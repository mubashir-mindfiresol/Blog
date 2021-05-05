import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/services/post/post-model';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/services/comment/comment.payload';
import { CommentService } from 'src/app/services/comment/comment.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})

export class ViewPostComponent implements OnInit, OnChanges {

  username:string;
  blogId: string;
  post: PostModel=new PostModel();
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  commentText:string;
  btn_disable:string;

  constructor(private router: Router, private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private toastr: ToastrService, private spinner: NgxSpinnerService) {

    this.blogId = this.activateRoute.snapshot.params.id;
    console.log(this.blogId);
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      comment: '',
      blogId: this.blogId
    };
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 600);
    this.getPostById();
    this.getCommentsForPost();
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    //console.log(JSON.parse(window.sessionStorage.getItem('auth-user')).username);
  }

  ngOnChanges(change){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 600);
    this.getPostById();
    this.getCommentsForPost();
  }
  
  postComment() {
    this.commentPayload.comment = this.commentForm.get('comment').value;
    this.commentPayload.blogId= this.blogId;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('comment').setValue('');
      this.getCommentsForPost();
      this.toastr.info("Comment Added!!","Success");
    }, error => {
      throwError(error);
      this.toastr.warning("Login to Comment!!","Login first");
    })
  }

  private getPostById() {
    console.log(this.blogId);
    this.postService.getPost(this.blogId).subscribe(data => {
      this.post = data;
      console.log(this.post);
    }, error => {
      throwError(error);
      this.router.navigate(['/404']);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.blogId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }
}