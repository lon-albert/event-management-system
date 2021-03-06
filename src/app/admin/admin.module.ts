import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalModule} from '../global/global.module';
import {EventsComponent} from "./events/events.component";
import {CommentsComponent} from "./comments/comments.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GlobalModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent,
    EventsComponent,
    CommentsComponent
  ],
})
export class AdminModule {

}
