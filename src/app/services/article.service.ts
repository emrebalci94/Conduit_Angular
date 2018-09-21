import { Injectable } from '@angular/core';
import { Repository } from './common/repository';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';
import { Article, ArticleViewModel } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private _http: HttpClient, private _baseRepository: Repository) {
    // this._baseRepository.setApiUrl("Article");
  }

  public GetAllArticles(tag?: string, offset?: number, limit?: number, userid?: number, onlyliked?: boolean): Observable<ArticleViewModel> {
    let parameters = "Article/";
    parameters += tag == undefined ? "" : "tag=" + tag;
    parameters += offset == undefined ? "" : "offset=" + offset;
    parameters += limit == undefined ? "" : "&limit=" + limit;
    parameters += userid == undefined ? "" : "&userid=" + userid;
    parameters += onlyliked == undefined ? "" : "&onlyliked=" + onlyliked;

    // const parameters = `Article/tag=${tag}&offet=${offset}&limit=${limit}&userid=${userid}&onlyliked=${onlyliked}`;
    // console.log(parameters);
    return this._http.get<ArticleViewModel>(AppConstants.ServerWithApiUrl + parameters);
  }

  
}
