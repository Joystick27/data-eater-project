import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './resources/services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	isLoginMode = true;
	windowHeight = 0;

	constructor(
		private authService: AuthService,
		private router: Router,
		@Inject(PLATFORM_ID) private platformId
	) { }

	ngOnInit() {
		if (isPlatformBrowser(this.platformId)) {
			this.authService.autoLogin();
			let winWidth = window.innerWidth;
			if (winWidth < 800)
				this.windowHeight = window.innerHeight; //365
			else
				this.windowHeight = window.innerHeight - 209;
			this.router.events.subscribe((evt) => {
				if (!(evt instanceof NavigationEnd)) {
					return;
				}
				window.scrollTo(0, 0);
			});
		}
	}
}
