import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';
import { CommentViewModel } from '../models/comment-view-model';
import { Comment } from '../models/comment';
import { ResultMessage } from '../models/result-message';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private _baseUrl: string;
  constructor(private _http: HttpClient) {
    this._baseUrl = AppConstants.ServerWithApiUrl + "Comment";
  }

  public GetComments(slug: string, limit = 2, offset = 0): Observable<CommentViewModel> {
    return this._http.get<CommentViewModel>(this._baseUrl + `?slug=${slug}&limit=${limit}&offset=${offset}`);
  }

  public AddComment(comment: Comment): Observable<ResultMessage> {
    return this._http.post<ResultMessage>(this._baseUrl, comment);
  }

  public DeleteComment(id: number): Observable<ResultMessage> {
    return this._http.delete<ResultMessage>(this._baseUrl + "/" + id);
  }
  public UpdateComment(comment: Comment): Observable<ResultMessage> {
    return this._http.put<ResultMessage>(this._baseUrl,comment);
  }
}
