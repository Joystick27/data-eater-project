import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


export interface AuthResponseData {
	email: string;
	first_name: string;
	last_name: string;
	phone: string;
	is_developer: boolean;
}
export interface LoginResponseData {
	token: string;
	username: string;
	email: string;
	phone_confirmed: boolean;
}
export interface UserConfirmResponseData {
	confirmed: boolean;
}


@Injectable()
export class AuthService {
	user = new BehaviorSubject<User>(null);
	constructor(private http: HttpClient, private router: Router) { }

	signup(fname: string, lname: string,
		email: string, password: string,
		confPassword: string, phone: string) {
		localStorage.setItem('email', JSON.stringify(email));
		return this.http
			.post<AuthResponseData>(
				environment.baseUrl + "user/create/",
				{
					first_name: fname,
					last_name: lname,
					email: email,
					password: password,
					confirm_password: confPassword,
					phone: "+91 " + phone
				}
			)
			.pipe(
				catchError(this.handleError), tap(resData => {
					return resData;
				})
			);
	}

	login(email: string, password: string) {
		localStorage.setItem('email', JSON.stringify(email));
		return this.http
			.post<LoginResponseData>(
				environment.baseUrl + "user/login/",
				{
					email: email,
					password: password,
				}
			)
			.pipe(catchError(this.handleError), tap(resData => {
				this.handleAuthentication(
					resData.username,
					resData.token,
					resData.email,
					resData.phone_confirmed);
			})
			);
	}

	autoLogin() {
		const userData: {
			name: string;
			_token: string;
			email: string;
			phoneConfirmed: boolean;
		} = JSON.parse(localStorage.getItem('userData'));

		if (!userData) {
			return;
		}
		const loadedUser = new User
			(
				userData.name,
				userData._token,
				userData.email,
				userData.phoneConfirmed
			);
		this.user.next(loadedUser);
	}

	logout() {
		this.user.next(null);
		localStorage.removeItem('userData');
		this.router.navigate(['/auth']);
		return this.http
			.post(
				environment.baseUrl + "user/logout/",
				{}
			)
			.pipe(catchError(this.handleError), tap(resData => {
				return resData;
			})
			);
	}

	getToken() {
		try {
			const userData: {
				name: string;
				_token: string;
			} = JSON.parse(localStorage.getItem('userData'));
			return userData._token;
		}
		catch {
			return null;
		}
	}

	confirmUser(token: string) {
		return this.http.put<UserConfirmResponseData>(
			environment.baseUrl + "activation/confirm/" + token + "/",
			{}
		);
	}

	createActivationToken(email: string) {
		return this.http.post<UserConfirmResponseData>(
			environment.baseUrl + "activation/create/",
			{
				email: email
			}
		);
	}

	private handleAuthentication(token: string, username: string, email: string, phoneConfirmed: boolean) {
		const user = new User(token, username, email, phoneConfirmed);
		this.user.next(user);
		localStorage.setItem('userData', JSON.stringify(user));
	}

	private handleError(errorRes: HttpErrorResponse) {
		let errorMessage = 'An unknown error occured!';
		if (!errorRes.error) {
			return throwError(errorMessage);
		}

		// Login Errors
		if (errorRes.status == 401) {
			errorMessage = "Not authorized to access.";
		}
		if (errorRes.error.non_field_errors == "invalid_credentials")
			errorMessage = "provided credentials are invalid.";
		if (errorRes.error.non_field_errors == "user_not_activated")
			errorMessage = "user not activated."
		if (errorRes.error.email == "user with this email already exists.")
			errorMessage = "email already exists."


		return throwError(errorMessage);
	}
}
