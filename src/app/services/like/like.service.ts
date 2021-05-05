import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LikePayload } from './like-payload';
import { Observable } from 'rxjs';
import { likeApi } from '../../../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  like(likePayload: LikePayload): Observable<any> {
    return this.http.post(likeApi, likePayload);
  }

  liked(blogId: string): Observable<boolean> {
    return this.http.get<boolean>(likeApi + blogId);
  }
}