import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { uploadApi, getImgApi } from '../../../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<any> {
    let formData=new FormData();
    formData.append('file',file);
    return this.http.post<any>(uploadApi, formData);
  }
  getFile(fileName: string): Observable<any> {
    return this.http.get<any>(getImgApi+ fileName);
  }
}