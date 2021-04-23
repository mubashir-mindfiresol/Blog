import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LikePayload } from './like-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  like(likePayload: LikePayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/like/likeblog', likePayload);
  }

  liked(blogId: string): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/api/like/likeblog/' + blogId);
  }
}