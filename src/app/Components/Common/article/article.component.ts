import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../models/article';
import { Tag } from '../../../models/tag';
import { User } from '../../../models/user';

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
  @Input() onlineUser:User;
  constructor() { }

  ngOnInit() {

    // console.log(this.article.tags);
  }

}
