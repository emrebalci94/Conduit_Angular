import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from '../../../models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @Input() tag: Tag;
  @Input() color: string;
  @Output() tagClick = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    if (!this.color) {
      this.color = "secondary";
    }
  }

  clickToTag(clickedTag:string){
    // alert(clickedTag);
    this.tagClick.emit(clickedTag);
  }
}
