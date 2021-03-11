import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
export interface AuthResponseData {
	email: string;
	first_name: string;
	last_name: string;
	phone: string;
}


@Injectable()
export class SettingsService {

	constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

	getUserData() {
		let token = this.authService.getToken();
		let header = { headers: new HttpHeaders({ 'Authorization': `Token ${token}` }) };
		return this.http
			.get<AuthResponseData>(
				environment.baseUrl + "user/me/", header
			);
	}

	changeUserData(email, first_name, last_name, phone, oldPassword, newPassword, confPassword) {
		let token = this.authService.getToken();
		let header = { headers: new HttpHeaders({ 'Authorization': `Token ${token}` }) };
		return this.http.patch(
			environment.baseUrl + "user/me/",
			{
				email: email,
				first_name: first_name,
				last_name: last_name,
				phone: phone,
				password: oldPassword,
				new_password: newPassword,
				confirm_password: confPassword
			},
			header,
		);
	}

	private handleError(errorRes: HttpErrorResponse) {

	}
}
