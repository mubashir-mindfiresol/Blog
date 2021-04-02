import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NewblogService } from 'src/app/services/newblog/newblog.service';

@Component({
  selector: 'app-newblog',
  templateUrl: './newblog.component.html',
  styleUrls: ['./newblog.component.css']
})
export class NewblogComponent implements OnInit {

  public Editor = ClassicEditor;
  
  //Variable to submit
  submitted=false;
  
  public model = {
    name: '',
    category:'',
    editorData:'',
    dateTime:'',
    url:{},
  };

  constructor(private _newblogService: NewblogService) {
  }

  ngOnInit(): void {
    ClassicEditor
    .create( document.querySelector( '#editor' ), {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
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

  onSelectFile(event: { target: { files: Blob[]; }; }) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.model.url = event.target.result;
      }
    }
}

  onSubmit() {

    this.submitted=true;
    
    var today = new Date();

    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    this.model.dateTime = date+' '+time;

    //console.log( `Form submit, model: ${ JSON.stringify( this.model ) }` );
    this._newblogService.enroll(this.model)
    .subscribe(
      data => console.log('Success!',data),
      error => console.error('Error!',error)
    )
  }
}
