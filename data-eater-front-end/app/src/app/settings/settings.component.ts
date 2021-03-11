import { Component, OnInit } from '@angular/core';
import { SettingsService, AuthResponseData } from '../resources/services/settings.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	response: AuthResponseData;
	isChangePassMode = true;
	changePasswordForm: FormGroup;
	constructor(private settings: SettingsService) { }

	ngOnInit(): void {
		this.settings.getUserData().subscribe(resData => {
			this.response = resData;
		});
		this.initForm();
	}

	initForm() {
		this.changePasswordForm = new FormGroup({
			oldPassword: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
			]),
			newPassword: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
			]),
			confPassword: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
			])
		})
	}
	onSubmit() {
		if (!this.changePasswordForm.valid) return;

		let oldPassword = this.changePasswordForm.value.oldPassword;
		let newPassword = this.changePasswordForm.value.newPassword;
		let confPassword = this.changePasswordForm.value.confPassword;
		this.settings.changeUserData(this.response.email,
			this.response.first_name,
			this.response.last_name,
			this.response.phone,
			oldPassword,
			newPassword,
			confPassword).subscribe(resData => {
			})
	}
	changePassMode() {
		this.isChangePassMode = !this.isChangePassMode;
	}

}
