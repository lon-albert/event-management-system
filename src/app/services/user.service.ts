/**
 * Created by lon on 12/25/16.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    private loggedIn = false;

    constructor() {
        this.loggedIn = !!localStorage.getItem('token');
    }

    login(res) {
        localStorage.setItem('current_user', JSON.stringify(res.user));
        localStorage.setItem('token', res.user.token);
        this.loggedIn = true;
        return res.success;
    }

    logout() {
        localStorage.removeItem('current_user');
        localStorage.removeItem('token');
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    getUserDetails() {
        if (this.isLoggedIn()) {
            return JSON.parse(localStorage.getItem('current_user'));
        }
    }

    isUserAnAdmin() {
        if (this.isLoggedIn()) {
            return JSON.parse(localStorage.getItem('current_user')).is_admin
        }
        return false;
    }
}
