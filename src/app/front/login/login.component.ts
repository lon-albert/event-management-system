import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Router } from '@angular/router';

import { ToastComponent } from '../../shared/toast/toast.component';

import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  private user = {};
  private isEditing = false;

  private loginForm: FormGroup;
  private email = new FormControl('', Validators.required);
  private password = new FormControl('', Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              private userService: UserService,
              private toast: ToastComponent,
              private formBuilder: FormBuilder,
              private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });

      this.userService.logout();
  }

  login() {
    this.dataService.login(this.loginForm.value).subscribe(
      res => {
        let response = res.json();
        // this.loginForm.reset();
        // console.log(JSON.stringify(response));
        if (response.error) {
            this.toast.setMessage(response.message, 'danger');
        }else {
            this.userService.login(response);
            this.toast.setMessage(response.message, 'success');
            // if (this.userService.isUserAnAdmin()) {
            //     this.router.navigate(['admin']);
            // }
          this.router.navigate(['home']);
        }

      },
        (error => {
            console.log(error);
            this.toast.setMessage(error, 'danger');
        })
    );
  }

  enableEditing(user) {
    this.isEditing = true;
    this.user = user;
  }

  cancelEditing() {
    this.isEditing = false;
    this.user = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
  }
}
