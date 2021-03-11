import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { env } from 'process';
import { Data } from '../models/data.model';

@Injectable()
export class DataService {
	dataChanged = new Subject<Data[]>();
	private data: Data[] = [];
	constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }


	getDataList() {
		let token = this.authService.getToken();
		let header = { headers: new HttpHeaders({ 'Authorization': `Token ${token}` }) };
		return this.http
			.get(
				environment.baseUrl + "data/list/", header
			)
			.subscribe(resData => {
				this.assignData(resData);
			})
	}

	editData(id, name, description, email, phone) {
		let token = this.authService.getToken();
		let header = { headers: new HttpHeaders({ 'Authorization': `Token ${token}` }) };
		return this.http
			.put(
				environment.baseUrl + "data/manage/" + id + "/",
				{
					name: name,
					email: email,
					mobile_no: phone,
					description: description

				},
				header
			);
	}

	delteDataItem(id) {
		let token = this.authService.getToken();
		let header = { headers: new HttpHeaders({ 'Authorization': `Token ${token}` }) };
		return this.http
			.delete(
				environment.baseUrl + "data/manage/" + id + "/", header
			)
	}

	getData() {
		return this.data.slice();
	}

	getDataRow(index: number) {
		return this.data.slice()[index];
	}

	assignData(resData) {
		this.data = [];
		resData.forEach(row => {
			this.data.push(new Data(row.pk, row.name, row.description, row.email, row.mobile_no))
		});
		this.dataChanged.next(this.data.slice());
	}

	private handleError(errorRes: HttpErrorResponse) {

	}
}