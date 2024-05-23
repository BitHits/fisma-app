import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private loggedIn: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    public LoggedIn: Observable<boolean> = this.loggedIn.asObservable();

    constructor(private router: Router) { }

    Login(username: string, password: string) {
        return new Observable<boolean>(subscriber => {
            if (username === 'eu' && password === 'eu') {
                subscriber.next(true);
                this.SuccessfulLogin();
            } else {
                subscriber.next(false);
            }
        })
    }


    SuccessfulLogin() {
        if (!localStorage.getItem('loggedIn')) {
            localStorage.setItem('loggedIn', 'true');
        }
        this.loggedIn.next(true);
    }

    SuccessfulLogout() {
        localStorage.removeItem('loggedIn');
        this.router.navigate(['/']);
        this.loggedIn.next(false);
    }

}