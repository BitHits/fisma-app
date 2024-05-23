import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';

@Component({
    selector: 'eu-master',
    templateUrl: 'master.page.html',
    styleUrls: ['master.page.scss']
})

export class MasterPage implements OnInit {

    items: MenuItem[] = [];
    activeTab: MenuItem = this.items[0];

    constructor(private authService: AuthenticationService, private router: Router) {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            //typing: https://github.com/angular/angular/issues/43124
            .subscribe((event: any) => {
                const tabIndex = this.items.findIndex(item => item.routerLink === event.url.slice(1));
                this.activeTab = this.items[tabIndex];
            })
    }

    logout() {
        this.authService.SuccessfulLogout();
    }

    ngOnInit() {
        this.items = [
            { label: 'Sales', icon: 'pi pi-fw pi-euro', routerLink: 'sales' },
            { label: 'New Product', icon: 'pi pi-fw pi-tag', routerLink: 'new-product' }
        ];
    }
}