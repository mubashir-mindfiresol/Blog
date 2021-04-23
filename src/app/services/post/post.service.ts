import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { newblogInterface } from '../newblog/newblogInterface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/blogs/');
  }

  createPost(postPayload: newblogInterface): Observable<any> {
    return this.http.post('http://localhost:8080/api/blogs/createblog', postPayload);
  }

  getPost(id: string): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8080/api/blogs/id/'+ id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/blogs/' + name);
  }
}