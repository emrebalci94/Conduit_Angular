import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { throws } from 'assert';

@Component({
  selector: 'app-article-detail',
  template: `
  <div class="container-fluid" *ngIf="article;else loading;">
    <div class="row">
      <div class="col-md-8">
        <app-article  [article]="article" [isBodySmall]="false" [isLiked]="isLiked" [isMe]="isMe"></app-article>
      </div>
      <div class="col-md-4">
        Commentler gelecek.
      </div>
      
    </div>

      <a [routerLink]="['']"  class="btn btn-outline-dark w-25 ml-2"> <i class="fas fa-home"></i> Anasayfa</a>
    
  </div>
  <ng-template #loading>
  Yükleniyor...
  </ng-template>
  `,
})
export class ArticleDetailComponent implements OnInit, OnDestroy { //inline templatelerde OnDestroy şart.
  slug: string;
  private params: any;
  article: Article;
  isLiked = false;
  isMe = false;

  constructor(private _activatedRoute: ActivatedRoute, private _articleService: ArticleService, private _route: Router) { }

  ngOnInit() {
    this.params = this._activatedRoute.params.subscribe(p => {
      this.slug = p["slug"];
    });

    if (this.slug) {
      this._articleService.GetArticleDetail(this.slug).subscribe(p => {
        // console.log(p);
        this.article = p;
        let userId = localStorage.getItem("userId");
        if (userId) {
          this.isMe = this.article.authorUserId == Number(userId);
          this.isLiked = this.article.likedUserIds.some(p => p == Number(userId));
        }
      }, err => throws(err));
    }
    else {
      this._route.navigate([""]);
    }


  }
  ngOnDestroy() {
    this.params.unsubscribe();
  }

}
