import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {ToastComponent} from '../../shared/toast/toast.component';
import {UserService} from "../../services/user.service";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {Comment} from "../../interfaces/comment.interface";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {

  private addCommentForm: FormGroup;
  private content = new FormControl('', Validators.required);
  comments = [];
  comment: Comment;
  event: Event;
  event_id;
  private sub: any;
  isLoading: boolean = true;
  gotEvent= false;
  gotComments= false;

  constructor(
    private toast: ToastComponent,
    private dataService: DataService,
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      // this.event_id = +params['id']; // (+) converts string 'id' to a number
      this.event_id = params['id']; // (+) converts string 'id' to a number
      // Dispatch action to load the compoonent data.
      this.getEvent();
      this.getComments();
    });

    this.comment = {
      _id: null,
      content: '',
      date: ''
    };

    this.addCommentForm = this.formBuilder.group({
      content: this.content,
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private getEvent() {
    this.dataService.getEvent(this.event_id).subscribe(
      data => {
        this.event = data
      }
      ,
      error => console.log(error),
      () => {
        this.gotEvent = true
        if(this.gotComments){
          this.isLoading = false;
        }
      }
    );
  }

  private getComments() {
    this.dataService.getComments(this.event_id).subscribe(
      data => {
        this.comments = data;
      }
      ,
      error => console.log(error),
      () => {
        this.gotComments = true
        if(this.gotEvent){
          this.isLoading = false;
        }
      }
    );
  }

  addComment() {
    this.resetComment();
    this.comment.content = this.addCommentForm.value.content;
    this.comment.author = this.userService.isLoggedIn()
      ? this.userService.getUserDetails()._id
      : null;
    this.comment.date = Date.now;
    this.comment.event = this.event_id;
    this.dataService.addComment(this.comment).subscribe(
      res => {
        let newComment = res.json();
        this.comments.push(newComment);
        this.addCommentForm.reset();
        this.toast.setMessage('Comment added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  private resetComment() {
    this.comment = {
      _id: null,
      content: '',
      date: ''
    }
  }


}
