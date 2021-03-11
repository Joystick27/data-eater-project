import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { AuthService, UserConfirmResponseData } from '../resources/services/auth.service';

@Component({
	selector: 'app-activation',
	templateUrl: './activation.component.html',
	styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

	token: string;
	userActivationObs: Observable<UserConfirmResponseData>;
	content: string;

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.route.params.subscribe(
			(params: Params) => {
				this.token = params['token'];
				this.confirmUser(this.token);
			}
		);
	}

	redirect(page: string): void {
		timer(800).subscribe(x => { this.router.navigateByUrl(page); });
	}

	confirmUser(token: string) {
		this.userActivationObs = this.authService.confirmUser(token);

		this.userActivationObs.subscribe(
			resData => {
				if (resData['confirmed'] == true) {
					this.content = "Account activated please login";
					this.redirect("/auth")
				}
			},
			errorMessage => {
				this.content = "Bad Request";
				this.redirect("/project")
			}
		);
	}
}