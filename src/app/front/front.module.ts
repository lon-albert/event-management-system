/**
 * Created by lon on 12/3/16.
 */
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule, ReactiveFormsModule}    from '@angular/forms';

import {EqualValidatorDirective} from '../services/equal-validator.directive';
import {FrontRoutingModule} from './front-routing.module';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {GlobalModule} from '../global/global.module';
import {FrontComponent} from './front.component';
import {EventComponent} from "./event/event.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FrontRoutingModule,
    GlobalModule
  ],
  declarations: [
    FrontComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EqualValidatorDirective,
    EventComponent
  ],
  providers: [
  ],
  exports: [
  ]
})
export class FrontModule {}
