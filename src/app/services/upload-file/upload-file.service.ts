import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../post/post-model';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<any> {
    let formData=new FormData();
    formData.append('file',file);
    return this.http.post<any>('http://localhost:8080/single/upload', formData);
  }
  getFile(fileName: String): Observable<any> {
    return this.http.get<any>('http://localhost:8080/download/'+ fileName);
  }
}