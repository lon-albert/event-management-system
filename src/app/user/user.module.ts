import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalModule} from '../global/global.module';
import {UserRoutingModule} from "./user-routing.module";
import {UserComponent} from "./user.component";
import {EventsComponent} from "./events/events.component";
import {AdminModule} from "../admin/admin.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GlobalModule,
    UserRoutingModule,
    AdminModule
  ],
  declarations: [
    UserComponent,
    EventsComponent
  ],
})
export class UserModule {

}
