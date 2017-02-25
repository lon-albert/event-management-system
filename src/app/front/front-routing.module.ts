/**
 * Created by lon on 12/3/16.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {FrontComponent} from './front.component';
import {EventComponent} from "./event/event.component";

const frontRoutes: Routes = [
    {
        path: '',
        component: FrontComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full'},
            { path: 'home',  component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
          { path: 'event/:id', component: EventComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(frontRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FrontRoutingModule { }
