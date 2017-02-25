/**
 * Created by lon on 12/3/16.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from '../services/logged-in.guard';
import {UserComponent} from "./user.component";
import {EventsComponent} from "./events/events.component";
import {CommentsComponent} from "../admin/comments/comments.component";

const userRoutes: Routes = [
    { path: 'user', component: UserComponent, canActivate: [LoggedInGuard], children: [
        { path: '', redirectTo: 'events', pathMatch: 'full'},
        { path: 'events',  component: EventsComponent },
      { path: 'comments/:id', component: CommentsComponent },
    ]},

];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule { }
