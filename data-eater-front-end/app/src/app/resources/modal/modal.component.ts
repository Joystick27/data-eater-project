import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
	selector: 'modal-form',
	templateUrl: './modal-form.component.html',
	styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent {
	validatingForm: FormGroup;

	ngOnInit() {
		this.validatingForm = new FormGroup({
			signupFormModalName: new FormControl('', Validators.required),
			signupFormModalEmail: new FormControl('', Validators.email),
			signupFormModalPassword: new FormControl('', Validators.required),
		});
	}

	get signupFormModalName() {
		return this.validatingForm.get('signupFormModalName');
	}

	get signupFormModalEmail() {
		return this.validatingForm.get('signupFormModalEmail');
	}

	get signupFormModalPassword() {
		return this.validatingForm.get('signupFormModalPassword');
	}
}