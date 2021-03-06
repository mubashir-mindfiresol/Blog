import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PostModel } from 'src/app/services/post/post-model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: ['./editblog.component.css']
})
export class EditblogComponent implements OnInit {
  
  posts: Array<PostModel> = [];
  msg:string;
  
  constructor(private router: Router, private toastr: ToastrService, private postService: PostService, private spinner: NgxSpinnerService) {
    this.postService.getAllPostsByUser(JSON.parse(window.sessionStorage.getItem("auth-user")).username).subscribe(post => {
      this.posts = post;
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }

  //Function to delete seleted Blog
  delete(id: string){
    if(confirm("Are you sure you want to delete?"))
    {
      console.log("triggered"+id);
      console.log("true");
      this.postService.deletePost(id).subscribe(data => {
        this.msg = data;
      }, error => {
        this.msg=(error);
      });
      this.toastr.success(this.msg,"Deleted!!");
      location.reload();
    }
  }

  //Redirects to Update Page
  update(id: string){
    console.log("Update Button Clicked");
    this.router.navigateByUrl('/update-blog/'+ id);
  }

  //If User wants to Read the Blog
  goToPost(id: string){
    this.router.navigateByUrl('/view-post/'+ id);
  }
}
