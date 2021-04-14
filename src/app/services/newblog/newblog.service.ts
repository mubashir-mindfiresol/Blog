import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newblogInterface } from './newblogInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewblogService {

  _url='http://localhost:8080/api/blogs/createblog';
  constructor(private _http: HttpClient) { }

  createblog(newblogInterface:newblogInterface): Observable<any>{
    return this._http.post(this._url,newblogInterface);
  }
}
