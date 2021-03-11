import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/resources/services/auth.service';

@Component({
	selector: 'app-activate',
	templateUrl: './activate.component.html',
	styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
	isLoading = false;
	email: string;
	message: string = null;
	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.email = JSON.parse(localStorage.getItem('email'));
		if (!this.email) this.router.navigate(['/project']);
	}

	reSendActivation() {
		this.isLoading = true;
		this.authService.createActivationToken(this.email).subscribe(resData => {
			if (resData.confirmed == false) this.message = "Email sent";
			this.isLoading = false;
		})
	}

}
