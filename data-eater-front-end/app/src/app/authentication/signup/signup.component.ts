import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData, LoginResponseData } from 'src/app/resources/services/auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	signUpForm: FormGroup;
	isLoading = false;
	accontCreationFailed = false;
	errorMessage = null;

	constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.signUpForm = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&*])/)
			]),
			confPassword: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&*])/)
			]),
		});
	}

	onSubmit() {
		this.isLoading = true;
		this.signUpForm.disable();
		let authObs: Observable<AuthResponseData>;
		if (
			(
				this.signUpForm.value.password !==
				this.signUpForm.value.confPassword
			)
		) {
			this.isLoading = false;
			this.signUpForm.enable();
			return;
		}
		let fname = '';
		let lname = '';
		let email = this.signUpForm.value.email;
		let password = this.signUpForm.value.password;
		let confPassword = this.signUpForm.value.confPassword;
		let phone = '';
		authObs = this.authService.signup(fname, lname, email, password, confPassword, phone);
		authObs.subscribe(resData => {
			if (resData && (resData.email == email)) {
				localStorage.setItem('email', email);
				this.isLoading = false;
				this.signUpForm.enable();
				this.router.navigate(['']);
			}
		}, errorMessage => {
			this.errorMessage = errorMessage;
			this.accontCreationFailed = true;
			this.isLoading = false;
			this.signUpForm.enable();
		});
	}


	ngOnDestroy() {

	}

}
