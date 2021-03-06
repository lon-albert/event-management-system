/**
 * Created by lon on 12/3/16.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {EventsComponent} from "./events/events.component";
import {AdminGuard} from "../services/admin.guard";
import {CommentsComponent} from "./comments/comments.component";

const adminRoutes: Routes = [
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
        { path: '', redirectTo: 'events', pathMatch: 'full'},
      { path: 'events',  component: EventsComponent },
      { path: 'comments/:id', component: CommentsComponent },
    ]},

];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
