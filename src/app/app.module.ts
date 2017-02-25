import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './front/home/home.component';
import { DataService } from './services/data.service';

import { ToastComponent } from './shared/toast/toast.component';
import {GlobalModule} from "./global/global.module";
import {FrontModule} from "./front/front.module";
import {UserService} from "./services/user.service";
import {LoggedInGuard} from "./services/logged-in.guard";
import {UserRoutingModule} from "./user/user-routing.module";
import {UserModule} from "./user/user.module";
import {AdminModule} from "./admin/admin.module";
import {AdminRoutingModule} from "./admin/admin-routing.module";
import {AdminGuard} from "./services/admin.guard";

const routing = RouterModule.forRoot([
    // { path: '',      component: HomeComponent },
]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    GlobalModule,
    FrontModule,
    UserModule,
    UserRoutingModule,
    AdminModule,
    AdminRoutingModule
  ],
  providers: [
    DataService,
    UserService,
    ToastComponent,
    LoggedInGuard,
    AdminGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
