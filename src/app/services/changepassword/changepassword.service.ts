import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangepasswordModel } from './changepassword-model';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(private http: HttpClient) { }

  changePassword(id: string, changepassword: ChangepasswordModel): Observable<boolean>{
    return this.http.put<boolean>('http://localhost:8080/api/auth/' + id, changepassword);
  }
}
