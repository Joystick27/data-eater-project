import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class RedirectService {

	constructor(
		private http: HttpClient,
		private router: Router
	) { }

	redirectTo(redirectTo: string) {
		this.router.navigate([`/${redirectTo}`])
	}

}
// Ruviero02@12R3