import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { env } from 'process';


@Injectable()
export class UploadService {
	constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

	uploadData(formData: FormData) {
		let token = this.authService.getToken();
		let header = { headers: new HttpHeaders({ 'Authorization': `Token ${token}` }) };
		return this.http.post(
			environment.baseUrl + "data/create/",
			formData,
			header
		)
	}

	private handleError(errorRes: HttpErrorResponse) {

	}
}
