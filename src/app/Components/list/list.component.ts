import { Component, OnInit } from '@angular/core';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../models/tag';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tabtag } from '../../models/tabtag';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  tags: string[];
  articles: Article[];
  user: User = null;
  tabs: Tabtag[] = [];
  constructor(private _tagService: TagService, private _articleServices: ArticleService, private _userService: UserService) { }

  ngOnInit() {
    this.Load();
    // setTimeout(()=>{  console.log(this.articles,this.tags)},1000);
    //  throw ("asdasd");
    // setTimeout(() => this._t.success('sup'))

  }

  Load() {
    this._tagService.GetAll().subscribe(p => { this.tags = p.map(e => e.tag); });
    this._articleServices.GetAllArticles().subscribe(p => {
      this.articles = p.articles;
    });
    const userId = localStorage.getItem("userId");

    if (userId) {
      this._userService.getToUser(Number(userId)).subscribe(p => {
        this.user = p;
      }, err => { throw err });
    }
  }

  isLiked(ids: number[]): boolean {
    const userId = localStorage.getItem("userId");
    const user=this.user;
    if (userId && user) {
      if (ids.length>0) {
        return ids.some(p => p && p == user.id);
      }
      return false;
    }
    return false;
  }

  tagClicked(tag) {
    // alert(tag)
    this._articleServices.GetAllArticles(tag).subscribe(p => {
      if (this.tabs.filter(p => p.name == tag).length == 0) {
        this.tabs.push(new Tabtag(tag, p));
      }
      else {
        const tagTab = document.getElementById("t-" + tag + "-tab");
        tagTab.click();
      }
      // console.log(this.tabs);
    });
  }

  closeTag(tagName: string) {
    const indexOfTabs = this.tabs.findIndex(p => p.name == tagName);
    if (indexOfTabs >= 0) {
      this.tabs.splice(indexOfTabs, 1);
      setTimeout(() => {
        const homeTab = document.getElementById("home-tab");
        homeTab.click();
      }, 50);
    }


  }
}
