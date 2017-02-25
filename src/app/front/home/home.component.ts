import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {DataService} from "../../services/data.service";
import {ToastComponent} from "../../shared/toast/toast.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events = [];
  upcoming=0;
  passed=0;
  now;
  isLoading = true;

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEvents();
    this.now =  Date.now;
  }

  getEvents() {
    this.dataService.getFrontEvents().subscribe(
      data => {
        this.events = data
        this.getCount();
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  private getCount() {
    for(let x = 0; x < this.events.length; x ++) {
      if(this.events[x].startdatetime > this.now){
        this.upcoming+=1
      }else{
        this.passed+=1
      }
    }
  }

}
