import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {DataService} from '../../services/data.service';
import {ToastComponent} from '../../shared/toast/toast.component';
import {ViewChildren} from '@angular/core/src/metadata/di';
import {UserService} from "../../services/user.service";
import {Event} from "./events.interface";


@Component({
  selector: 'app-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.css']
})
export class EventsComponent implements OnInit {

  @ViewChildren('reg') regs;

  private events = [];
  private isLoading = true;

  private event: Event;
  private isEditing = false;

  private currentUser: any;
  private isUserAdmin: boolean;

  private addEventForm: FormGroup;
  private title = new FormControl('', Validators.required);
  private startdatetime = new FormControl('', Validators.required);
  private duration = new FormControl('', Validators.required);
  private description = new FormControl('', Validators.required);
  private location = new FormControl('', Validators.required);
  private visible = new FormControl('', Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              private userService: UserService,
              private toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.getEvents();

    this.event = {
      _id: null,
      title: '',
      startdatetime: '',
      duration: 0,
      description: '',
      location: '',
      visible: 0
    };

    this.addEventForm = this.formBuilder.group({
      title: this.title,
      startdatetime: this.startdatetime,
      duration: this.duration,
      description: this.description,
      location: this.location,
      visible: this.visible
    });

    this.isUserAdmin = this.userService.isUserAnAdmin();
    this.currentUser = this.userService.getUserDetails();
  }

  private getEvents() {
    let user = this.userService.getUserDetails();
    this.dataService.getUserEvents(user).subscribe(
      data => {
        this.events = data
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addEvent() {
    this.resetEvent();
    this.event.title = this.addEventForm.value.title;
    this.event.startdatetime = this.addEventForm.value.startdatetime;
    this.event.duration = this.addEventForm.value.duration;
    this.event.description = this.addEventForm.value.description;
    this.event.location = this.addEventForm.value.location;
    this.event.visible = this.addEventForm.value.visible ? true : false;
    this.event.author = this.userService.getUserDetails()._id;
    console.log(this.event)
    this.dataService.addEvent(this.event).subscribe(
      res => {
        let newEvent = res.json();
        this.events.push(newEvent);
        this.addEventForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  private resetEvent() {
    this.event = {
      _id: null,
      title: '',
      startdatetime: '',
      duration: 0,
      description: '',
      location: '',
      visible: 0
    };
  }

  enableEditing(event) {
    this.isEditing = true;
    this.event = event;
  }

  cancelEditing() {
    this.isEditing = false;
    this.resetEvent();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the events to reset the editing
    this.getEvents();
  }

  editEvent(event) {
    event.visible = event.visible ? true : false;
    this.dataService.editEvent(event).subscribe(
      res => {
        this.isEditing = false;
        const i = this.events.findIndex(localEvent => localEvent._id === event._id);
        this.events[i] = res.json();
        this.toast.setMessage('Success', 'success');
      },
      error => console.log(error)
    );
    this.resetEvent();
  }

  deleteEvent(event) {
    if (window.confirm('Are you sure you want to permanently delete this event?')) {
      this.dataService.deleteEvent(event).subscribe(
        res => {
          // map returns an array of the ids of all events & indexOf returns the
          // index at which the id of deleted event passed in as an argument to deleteEvent occurs
          let pos = this.events.map(event_ => {
            return event_._id;
          }).indexOf(event._id);
          this.events.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
