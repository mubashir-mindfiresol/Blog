import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NewblogService } from 'src/app/services/newblog/newblog.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-newblog',
  templateUrl: './newblog.component.html',
  styleUrls: ['./newblog.component.css']
})
export class NewblogComponent implements OnInit {

  public Editor = ClassicEditor;
  
  // Variables for image-preview
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  imageSrc: string;

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });  //Variable to submit
  submitted=false;
  //upload
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;

  
  //model
  public model = {
    title: "",
    category:"",
    description:"",
    createDate:"",
    url:""
  };

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private _newblogService: NewblogService, private router: Router, private uploadService: UploadFileService) {
  }

  ngOnInit(): void {
    this.spinner.show();
  setTimeout(() => {
    this.spinner.hide();
  }, 1500);

    // ClassicEditor
    // .create( document.querySelector( '#editor' ), {
    //     toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
    //     heading: {
    //         options: [
    //             { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
    //             { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
    //             { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
    //         ]
    //     }
    // } )
    // .catch( error => {
    //     console.log( error );
    // } );
}

editor = ClassicEditor;
data: any = ``;
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

onFileChange(event) {
  
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.myForm.patchValue({
      fileSource: file
    });
  }
}

  onSubmit() {

    this.toastr.success("Success","Blog Posted Successfully!!");

    this.submitted=true;
    
    var today = new Date();

    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+', ';

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    this.model.createDate = date+' '+time;
    
    //New Code for Uploading image/file
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);
    console.log(this.myForm.get('fileSource').value);
    this.uploadService.upload(this.myForm.get('fileSource').value).subscribe(data => {
    this.model.url=data.url;
    console.log(data);
    console.log(this.model.url);
    this._newblogService.createblog(this.model)
    .subscribe(
      data => console.log('Success!',data),
      error => console.error('Error!',error)
    )
    });

    //New code ends
    console.log(this.model.url);

    
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 1500);
    setTimeout(() => {
      this.router.navigate(['home']);
  }, 1500);
  }
}