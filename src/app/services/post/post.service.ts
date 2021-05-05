import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { newblogInterface } from '../newblog/newblogInterface';
import { updateBlogApi, deleteBlogApi, allBlogsByUserApi, blogsByIdApi, createBlogApi, getAllBlogs } from '../../../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(getAllBlogs);
  }

  createPost(postPayload: newblogInterface): Observable<any> {
    return this.http.post(createBlogApi , postPayload);
  }

  getPost(id: string): Observable<PostModel> {
    return this.http.get<PostModel>(blogsByIdApi + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(allBlogsByUserApi + name);
  }
  deletePost(id: string): Observable<string>{
    return this.http.delete<string>(deleteBlogApi + id);
  }

  updatePost(id: string, blog: PostModel): Observable<string>{
    return this.http.put<string>(updateBlogApi + id, blog);
  }
}