import { Component, OnInit } from '@angular/core';
import { Tag } from '../../models/tag';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[];
  constructor(private _tagService: TagService) { }

  ngOnInit() {
    this._tagService.GetAll().subscribe(p => this.tags = p);
  }

}
