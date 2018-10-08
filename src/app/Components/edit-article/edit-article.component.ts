import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { ToastrService } from 'ngx-toastr';
import { Article } from '../../models/article';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  article: Article = new Article();
  tags = [];
  constructor(private _activatedRoute: ActivatedRoute, private _articleServices: ArticleService, private _toastrService: ToastrService, private _route: Router) { }

  ngOnInit() {
    this.article.tags = [];
    this._activatedRoute.params.subscribe(param => {
      if (param["tag"]) {
        const paramTag = param["tag"];
        this._articleServices.GetArticleDetail(paramTag).subscribe(p => {
          if (p && p.authorUserId != Number(localStorage.getItem("userId"))) { // bu tarafın bide api tarafından kontrol edilmesi lazım.
            throw {message:"Sadece kendi makalenizi güncelleyebilirsiniz.", status:999};
          }
          this.article = p;
          var tagList = this.article.tags.map(x => { return { display: x, value: x }; });
          this.tags = tagList;

        }, err => { throw err; });
      }
    })
  }

  save() {
    const tags = this.tags.map(p => p.value[0].toUpperCase()+p.value.slice(1));
    this.article.tags = tags;
    this._articleServices.EditArticle(this.article).subscribe(p => console.log(p), err => { throw err; })
  }
}
