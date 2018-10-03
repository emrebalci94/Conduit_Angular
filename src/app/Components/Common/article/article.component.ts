import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../../../models/article';
import { User } from '../../../models/user';
import { ArticleService } from '../../../services/article.service';
import { throws } from 'assert';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() isBodySmall: boolean = true;
  @Input() isLiked: boolean = false;
  @Input() isMe: boolean = false;
  @Input() onlineUser: User;
  @Output() tagClick = new EventEmitter<string>();
  constructor(private _articleService: ArticleService) { }

  ngOnInit() {

  }

  
  clikedToTag(tag) {
    this.tagClick.emit(tag);
  }

  likeOrUnlike() {
    let userId = localStorage.getItem("userId");

    if (userId) {
      this._articleService.Liked(userId, this.article.id.toString()).subscribe(p => {
        if (p.errors) {
          throw (p.errors.message);
        } else {
          if (this.isLiked) {
            var index = this.article.likedUserIds.indexOf(Number(userId));
            // console.log(index);
            this.article.likedUserIds.splice(index, 1);
          }
          else {
            this.article.likedUserIds.push(Number(userId));

          }
          this.isLiked = !this.isLiked;
          // console.log(this.article.likedUserIds, this.isLiked);

        }
      }, err => throws(err));
    }
    else {
      throw ("Önce üye girişi yapmalısınız.");
    }
  }


}
