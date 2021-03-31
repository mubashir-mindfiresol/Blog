import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newblogInterface } from './newblogInterface';

@Injectable({
  providedIn: 'root'
})
export class NewblogService {

  _url='http://localhost:3001/enroll';
  constructor(private _http: HttpClient) { }

  enroll(newblogInterface:newblogInterface){
    return this._http.post<any>(this._url,newblogInterface);
  }
}
