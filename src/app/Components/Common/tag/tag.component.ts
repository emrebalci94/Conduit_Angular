import { Component, OnInit, Input } from '@angular/core';
import { Tag } from '../../../models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @Input() tag: Tag;
  @Input() color: string;
  constructor() { }

  ngOnInit() {
    if (!this.color) {
      this.color = "secondary";
    }
  }

}
