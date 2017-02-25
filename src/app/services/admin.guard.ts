/**
 * Created by lon on 12/27/16.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {UserService} from "./user.service";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private user: UserService, private router: Router) {}

    canActivate() {

        if (this.user.isUserAnAdmin()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/home']);
        return false;
    }
}
