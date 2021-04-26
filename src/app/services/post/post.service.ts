import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/blogs/');
  }

  getPost(id: string): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8080/api/blogs/id/'+ id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/blogs/' + name);
  }

  deletePost(id: string): Observable<string>{
    return this.http.delete<string>('http://localhost:8080/api/blogs/deleteblog/' + id);
  }

  updatePost(id: string, blog: PostModel): Observable<string>{
    return this.http.put<string>('http://localhost:8080/api/blogs/id/' + id, blog);
  }
  
}