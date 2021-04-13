import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NewblogService } from 'src/app/services/newblog/newblog.service';
import { Router } from '@angular/router';

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
    title: "",
    category:"",
    description:"",
    dateTime:"",
  };

  constructor(private _newblogService: NewblogService, private router: Router) {
  }

  ngOnInit(): void {
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

    this.submitted=true;
    
    var today = new Date();

    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    this.model.dateTime = date+' '+time;

    //console.log( `Form submit, model: ${ JSON.stringify( this.model ) }` );
    this._newblogService.createblog(this.model)
    .subscribe(
      data => console.log('Success!',data),
      error => console.error('Error!',error)
    )
    this.router.navigate(['/homepage']);
  }
}
