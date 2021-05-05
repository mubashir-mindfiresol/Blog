import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';
import { getAllCommentsApi, postCommentApi} from '../../../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  //Get all comments for a particular Blog
  getAllCommentsForPost(postId: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(getAllCommentsApi + postId);
  }

  //Adding a comment to a Blog
  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>(postCommentApi, commentPayload);
  }

  // getAllCommentsByUser(name: string) {
  //   return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/' + name);
  // }
}