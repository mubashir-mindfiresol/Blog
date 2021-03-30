import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-newblog',
  templateUrl: './newblog.component.html',
  styleUrls: ['./newblog.component.css']
})
export class NewblogComponent implements OnInit {

  public Editor = ClassicEditor;

  public model = {
    name: '',
    category:'',
    description: '',
    editorData:''
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log( `Form submit, model: ${ JSON.stringify( this.model ) }` );
}
}
