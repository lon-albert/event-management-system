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
  isLoading = true;

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.dataService.getFrontEvents().subscribe(
      data => this.events = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
