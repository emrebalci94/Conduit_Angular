import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  article: Article = new Article();
  tags = [];
  constructor(private _activatedRoute: ActivatedRoute, private _articleServices: ArticleService, private _toastrService: ToastrService,private _route:Router) { }

  ngOnInit() {
    this.article.tags = [];
    this._activatedRoute.params.subscribe(param => {
      if (param["tag"]) {
        this.article.tags.push(param["tag"]);
      }
    })
  }

  save() {
    const tags = this.tags.map(p => p.value);
    this.article.tags = tags;
    this.article.slug = this.article.title.replace(" ", "_").toLowerCase();
    this.article.authorUserId = Number(localStorage.getItem("userId"));
    this._articleServices.NewArticle(this.article).subscribe(result => {
      if (result.errors) {
        this._toastrService.error(result.errors.message, result.errors.code.toString());
      }
      else {
        this._toastrService.success("Kayıt başarılı");
        this._route.navigateByUrl("/");
      }
    }, err => {
      console.log(err);
      throw err;
    });
  }
}
