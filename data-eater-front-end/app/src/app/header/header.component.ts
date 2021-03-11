import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../resources/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	animations: [
		trigger('changeState', [
			state('true', style({
				position: 'fixed'
			})),
			state('false', style({
				position: 'fixed',
				top: '-150px'
			})),
			transition('true => false', animate('200ms')),
			transition('false => true', animate('200ms')),
		])
	]
})

export class HeaderComponent implements OnInit, OnDestroy {
	private userSub: Subscription;
	public isMenuCollapsed = true;
	public isAuthenticated = false;
	public hideNavbar = true;
	public lastScrollHeight = 0;
	userName = ''
	constructor(
		private authService: AuthService
	) { }

	ngOnInit(): void {
		this.userSub = this.authService.user.subscribe(user => {
			this.isAuthenticated = !!user;
			this.userName = user ? user.email : '';
		})
	}

	activateClass(subModule) {
		subModule.active = !subModule.active;
	}

	onLogout() {
		this.authService.logout();
	}

	toggleNav() {
		this.hideNavbar = !this.hideNavbar;
	}

	@HostListener('window:scroll', ['$event'])
	getYOffset($event) {
		var currentHeight = window.pageYOffset;
		if (currentHeight <= 10) {
			this.hideNavbar = true;
		}
		else if (currentHeight - this.lastScrollHeight >= 0) {
			this.hideNavbar = false;
		}
		else {
			this.hideNavbar = true;
		}
		this.lastScrollHeight = currentHeight;
	}

	ngOnDestroy() {
		this.userSub.unsubscribe();
	}

}
