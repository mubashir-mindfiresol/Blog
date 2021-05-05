import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangepasswordModel } from './changepassword-model';
import { authApi } from '../../../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(private http: HttpClient) { }

  changePassword(id: string, changepassword: ChangepasswordModel): Observable<boolean>{
    return this.http.put<boolean>(authApi + id, changepassword);
  }
}
