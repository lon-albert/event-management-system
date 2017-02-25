import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {DataService} from '../../services/data.service';
import {ToastComponent} from '../../shared/toast/toast.component';
import {ViewChildren} from '@angular/core/src/metadata/di';
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-comments',
  templateUrl: 'comments.component.html',
  styleUrls: ['comments.component.css']
})
export class CommentsComponent implements OnInit {

  @ViewChildren('reg') regs;

  private sub: any;
  private comments = [];
  private isLoading = true;
  event_id;

  constructor(
              private dataService: DataService,
              private toast: ToastComponent,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      // this.event_id = +params['id']; // (+) converts string 'id' to a number
      this.event_id = params['id']; // (+) converts string 'id' to a number
      this.getComments();
    });
  }

  private getComments() {
    this.dataService.getComments(this.event_id).subscribe(
      data => {
        this.comments = data
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteComment(comment) {
    if (window.confirm('Are you sure you want to permanently delete this comment?')) {
      this.dataService.deleteComment(comment).subscribe(
        res => {
          // map returns an array of the ids of all comments & indexOf returns the
          // index at which the id of deleted comment passed in as an argument to deleteComment occurs
          let pos = this.comments.map(comment_ => {
            return comment_._id;
          }).indexOf(comment._id);
          this.comments.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
