import { Component, OnChanges, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NewblogService } from 'src/app/services/newblog/newblog.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostModel } from 'src/app/services/post/post-model';
import { PostService } from 'src/app/services/post/post.service';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {

  
  blogId:string;
  post: PostModel;

  //model
  public model = {
    title: "",
    category:"",
    description:"",
    createDate:"",
    name:"",
    url:"",
  };

  constructor(private uploadFile:UploadFileService, private activateRoute: ActivatedRoute, private postService: PostService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _newblogService: NewblogService, private router: Router) {
    this.blogId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
      this.getPostById();
  }

  editor = ClassicEditor;
  data: any;
  config = {
    toolbar: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'link',
      'mediaEmbed',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'insertTable',
      'blockQuote',
    ],
    language: 'id',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:full',
        'imageStyle:side'
      ]
    },
  }


  private getPostById() {
    this.postService.getPost(this.blogId).subscribe(data => {
      this.post = data;
      this.model.title=this.post.title;
      this.model.category=this.post.category;
      this.model.description=this.post.description;
      this.model.url=this.post.url;
        //Calling retrival service to retrieve the image
        this.uploadFile.getFile(this.post.name).subscribe(data =>{
          this.post.image = "data:image/jpg;base64," + data.data;
          });
      console.log(this.model.category);
    }, error => {
      throwError(error);
      this.router.navigate(['/404']);
    });
  }

  updateBlog(){

    console.log("Update Button Clicked!!");

    this.toastr.success("Success","Blog Updated Successfully!!");
    
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+', ';
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.model.createDate = date+' '+time+' ';
    this.model.url=this.post.url;
    this.postService.updatePost(this.blogId, this.model)
    .subscribe(
      data => console.log('Success!',data),
      error => console.error('Error!',error)
    )
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 1.5 seconds */
        this.spinner.hide();
    }, 1500);
    setTimeout(() => {
      this.router.navigate(['home']);
  }, 1500);
  }
}