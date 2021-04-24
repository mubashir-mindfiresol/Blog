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
    url:""
  };

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private _newblogService: NewblogService, private router: Router, private uploadService: UploadFileService) {
  }

  ngOnInit(): void {
    this.spinner.show();
  setTimeout(() => {
    this.spinner.hide();
  }, 1500);
    this.fileInfos = this.uploadService.getFiles();

    ClassicEditor
    .create( document.querySelector( '#editor' ), {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
        }
    } )
    .catch( error => {
        console.log( error );
    } );
}

  onSubmit() {

    this.toastr.success("Success","Blog Posted Successfully!!");

    this.submitted=true;
    
    var today = new Date();

    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+', ';

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    this.model.createDate = date+' '+time;

    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

      this.selectedFiles = undefined;

    this._newblogService.createblog(this.model)
    .subscribe(
      data => console.log('Success!',data),
      error => console.error('Error!',error)
    )
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 1500);
    setTimeout(() => {
      this.router.navigate(['home']);
  }, 1500);
  }

  //Image-preview
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    this.selectedFiles = fileInput.target.files;
    
    this.model.url="D:/uploads/"+fileInput.target.files[0].name;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];
                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
}
}