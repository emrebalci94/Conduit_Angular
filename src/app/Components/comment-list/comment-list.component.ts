import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { CommentViewModel } from '../../models/comment-view-model';
import { Comment } from '../../models/comment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  commentViewModel: CommentViewModel;
  newComment = new Comment();
  isLoading = true;
  isSendding = false;
  pagination = {
    limit: 5,
    offset: 0,
    totalCount: 0,
    length: 0
  }
  @Input() slug;
  @Input() articleId;
  constructor(private _commentService: CommentService) { }

  ngOnInit() {
    this.GetComment();
    this.newComment.articleId = this.articleId;
    this.newComment.authorUserId = Number(localStorage.getItem("userId"));
  }

  GetComment(offset = 0) {
    this.isLoading=true;
    this.pagination.offset = offset;
    this._commentService.GetComments(this.slug, this.pagination.limit, this.pagination.offset).subscribe(p => {
      if (!p.error) {
        this.commentViewModel = p;
        // console.log("1", this.commentViewModel);
        this.isLoading = false;
        this.pagination.totalCount = this.commentViewModel.obj.totalCount;
        this.pagination.length = Math.round(this.pagination.totalCount / this.pagination.limit);
      }
      else {

        console.log(p);
      }

    }, err => {
      throw err;
    });
  }

  ranger(max: number): number[] {
    let numbers = [];
    for (let i = 1; i <= max; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  send() {
    this.isSendding = true;
    if (this.newComment.body) {
      this._commentService.AddComment(this.newComment).subscribe(p => {
        if (!p.errors) {
          this.GetComment();
          this.isSendding = false;
        }
      }, err => {
        this.isSendding = false;
        throw err;
      })
    }
    this.newComment.body = null;
  }

  deleteComment(id:number){
    swal({
      title: 'Are you sure?',
      text: 'This comment will be delete.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // console.log(this.comment.id);
        this._commentService.DeleteComment(id).subscribe(p=>{
          if(!p.errors){
            this.GetComment();
          }
          else{
            throw p.errors.message
          }
        },err=>{
          throw err;
        })
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === swal.DismissReason.cancel) {
        // swal(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    }).catch(err=>{
      throw err;
    });
  }

  updateComment(model:Comment){
    swal({
      title: 'Are you sure?',
      text: 'This comment will be update.',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // console.log(this.comment.id);
        this._commentService.UpdateComment(model).subscribe(p=>{
          if(!p.errors){
            this.GetComment();
          }
          else{
            throw p.errors.message
          }
        },err=>{
          throw err;
        })
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === swal.DismissReason.cancel) {
        // swal(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    }).catch(err=>{
      throw err;
    });
    
  }

}
