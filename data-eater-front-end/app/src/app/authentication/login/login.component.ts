import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, LoginResponseData } from 'src/app/resources/services/auth.service';
import { PlatformService } from 'src/app/resources/services/platform.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	isSignUpMode = false;
	loginForm: FormGroup;
	errorMessage: string;
	loginFailed: boolean;
	isLoading = false;

	constructor(
		private authService: AuthService,
		private router: Router,
		private platformService: PlatformService
	) { }

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		if (this.authService.getToken()) this.router.navigate(['/dashboard']);

		this.loginForm = new FormGroup({
			email: new FormControl('random1@random.com', [
				Validators.required,
				Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
			]),
			password: new FormControl('Random@12', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
			]),
		})
	}

	signUpToggle() {
	}

	onSubmit() {
		let loginObs: Observable<LoginResponseData>;
		this.isLoading = true;
		this.loginForm.controls['email'].disable();
		this.loginForm.controls['password'].disable();

		let email = this.loginForm.value.email;
		let password = this.loginForm.value.password;
		loginObs = this.authService.login(email, password);
		loginObs.subscribe(
			resData => {
				this.isLoading = false;
				this.router.navigate(['/dashboard'])
			},
			errorMessage => {
				this.errorMessage = errorMessage;
				this.loginFailed = true;
				this.isLoading = false;
				this.loginForm.controls['email'].enable();
				this.loginForm.controls['password'].enable();
				if (this.errorMessage == "user not activated.") this.router.navigate(['/activation'])
			}
		)
	}

	// @HostListener('window:scroll', [])
	// getYOffset() {
	// 	console.log(window.pageYOffset);
	// }

	ngOnDestroy() {

	}

}
