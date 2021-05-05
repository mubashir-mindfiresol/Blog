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

  //Variable for CKEditor
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
  });  
  
  //Variable to submit
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
    name:"",
    path:"",
    url:"",
  };

  url:any;

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private _newblogService: NewblogService, private router: Router, private uploadService: UploadFileService) {
  }

  ngOnInit(): void {
    this.spinner.show();
  setTimeout(() => {
    this.spinner.hide();
  }, 1500);
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
    var reader = new FileReader();
         reader.readAsDataURL(event.target.files[0]); // read file as data url
             reader.onload = (event) => { // called once readAsDataURL is completed
                 this.url = event.target.result;
  }
  }
}

// onSelectFile(event) { // called each time file input changes
//   if (event.target.files && event.target.files[0]) {
//     var reader = new FileReader();

//     reader.readAsDataURL(event.target.files[0]); // read file as data url

//     reader.onload = (event) => { // called once readAsDataURL is completed
//       this.url = event.target.result;
//     }
//   }
// }

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
    this.model.name=data.fileName;
    this.model.path=data.path;
    this.model.url=data.url;
    console.log(data);
    console.log("file name is"+this.model.name);
    this._newblogService.createblog(this.model)
    .subscribe(
      data => console.log('Success!',data),
      error => console.error('Error!',error)
    )
    });

    //New code ends
    console.log(this.model.name);

    
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