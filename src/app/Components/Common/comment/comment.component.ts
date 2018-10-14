import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../../models/comment';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Output() removeClick= new EventEmitter();
  @Output() updateComment=new EventEmitter<Comment>();
  isUser=false;
  isEdit=true;
  constructor() { }

  ngOnInit() {
    this.isUser= this.comment.authorUserId == Number(localStorage.getItem("userId"));
  }


  remove(){
    this.removeClick.emit(this.comment.id);
  }
  UpdateComment(){
    this.updateComment.emit(this.comment);
  }
}
