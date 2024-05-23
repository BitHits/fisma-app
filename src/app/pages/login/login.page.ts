import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'eu-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})

export class LoginPage implements OnInit {
    loginEnabled = false;
    error = false;
    loginForm = new UntypedFormGroup({
        username: new UntypedFormControl('', [Validators.required]),
        password: new UntypedFormControl('', [Validators.required])
    });

    constructor(public authService: AuthenticationService, private router: Router) {
    }

    login() {
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;
        this.authService.Login(username, password).subscribe((loggedIn: boolean) => {
            if (loggedIn === true) {
                this.router.navigate(['sales']);
            } else {
                this.error = true;
            }
        });
    }

    ngOnInit() {
        this.loginForm.statusChanges.subscribe(status => {
            this.loginEnabled = status === 'VALID';
        });
    }

}