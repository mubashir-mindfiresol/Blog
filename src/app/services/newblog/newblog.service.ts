import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newblogInterface } from './newblogInterface';
import { Observable } from 'rxjs';
import { newblogApi } from '../../../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class NewblogService {

  constructor(private _http: HttpClient) { }

  createblog(newblogInterface:newblogInterface): Observable<any>{
    return this._http.post(newblogApi,newblogInterface);
  }
}
