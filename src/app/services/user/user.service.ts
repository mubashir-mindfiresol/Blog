import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { authApi } from '../../../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(authApi + 'all', { responseType: 'text' });
  }
  
  getAdminBoard(): Observable<any> {
    return this.http.get(authApi + 'admin', { responseType: 'text' });
  }
}