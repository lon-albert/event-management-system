import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {

  constructor(
      private userService: UserService
  ) { }

  ngOnInit() {
  }

}
