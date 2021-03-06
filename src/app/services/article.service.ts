import { Injectable } from '@angular/core';
import { Repository } from './common/repository';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';
import { Article, ArticleViewModel } from '../models/article';
import { ResultMessage } from '../models/result-message';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private _http: HttpClient, private _baseRepository: Repository) {
    // this._baseRepository.setApiUrl("Article");
  }

  public GetAllArticles(tag?: string, offset?: number, limit?: number, userid?: number, onlyliked?: boolean): Observable<ArticleViewModel> {
    let parameters = "Article";
    parameters += tag == undefined ? "" : "?tag=" + tag;
    parameters += offset == undefined ? "" : "?offset=" + offset;
    parameters += limit == undefined ? "" : "?limit=" + limit;
    parameters += userid == undefined ? "" : "?userid=" + userid;
    parameters += onlyliked == undefined ? "" : "?onlyliked=" + onlyliked;

    // const parameters = `Article/tag=${tag}&offet=${offset}&limit=${limit}&userid=${userid}&onlyliked=${onlyliked}`;
    console.log(parameters);
    return this._http.get<ArticleViewModel>(AppConstants.ServerWithApiUrl + parameters);
  }

  public GetArticleDetail(slug: string): Observable<Article> {
    let url = AppConstants.ServerWithApiUrl + "Article/" + slug;
    return this._http.get<Article>(url);
  }

  public Liked(userId: string, articleId: string): Observable<ResultMessage> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem("token")}`
  });
    let url = AppConstants.ServerWithApiUrl + `User/favoritearticle/${userId}?articleId=${articleId}`;
    return this._http.post<ResultMessage>(url, null,{ headers: headers });
  }

  public NewArticle(article: Article): Observable<ResultMessage> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    });
    return this._http.post<ResultMessage>(AppConstants.ServerWithApiUrl + "Article", article, { headers: headers });
  }

  public EditArticle(article: Article) {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    });
    return this._http.put<ResultMessage>(AppConstants.ServerWithApiUrl + "Article/"+article.id, article, { headers: headers });

  }
}
