import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { ToastComponent } from '../../shared/toast/toast.component';

import { DataService } from '../../services/data.service';

import { User } from '../../interfaces/user.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  private isAdmin: boolean;

  constructor(private http: Http,
              private router: Router,
              private dataService: DataService,
              private toast: ToastComponent) { }

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
      confirmPassword: '',
      fullname: '',
      middlename: '',
      is_admin:false
    };
  }

  register(user) {
    console.log(user);
    this.dataService.register(user).subscribe(
        res => {
          let response = res.json();
          if(response.error){
            this.toast.setMessage(response.message, 'warning');
          }else{
            this.toast.setMessage(response.message, 'success');
            this.router.navigate(['login']);
          }
        },
        error => console.log(error)
    );
  }
}
