import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params, Data } from '@angular/router';
import { DataService } from 'src/app/resources/services/data.service';
@Component({
	selector: 'app-dashboard-item',
	templateUrl: './dashboard-item.component.html',
	styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {
	uploadForm: FormGroup;
	id: number;
	data: Data;
	isLoading = false;

	constructor(
		private dataService: DataService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(
			(params: Params) => {
				this.id = +params['id'];
				this.data = this.dataService.getDataRow(this.id);
			}
		);
		if (!this.data) this.router.navigate(['/dashboard']);
		this.initForm();
	}

	initForm() {
		this.uploadForm = new FormGroup({
			name: new FormControl(this.data.name, [
				Validators.required,
				Validators.pattern(/^[A-Za-z ]+$/)
			]),
			description: new FormControl(this.data.description, [
				Validators.required,
			]),
			email: new FormControl(this.data.email, [
				Validators.required,
				Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/),
			]),
			phone: new FormControl(this.data.phone, [
				Validators.required,
				Validators.pattern(/^([1-9]{1}[0-9]{9})$/)
			]),
		})
	}

	onSubmit() {
		let name = this.uploadForm.value.name;
		let description = this.uploadForm.value.description;
		let email = this.uploadForm.value.email;
		let price = this.uploadForm.value.phone;

		this.isLoading = true;
		this.dataService.editData(this.data.id, name, description, email, price).subscribe(resData => {
			this.isLoading = false;
			this.router.navigateByUrl('/dashboard');
		})
	}

	onDelete() {
		this.isLoading = true;
		this.dataService.delteDataItem(this.data.id).subscribe(resData => {
			this.isLoading = false;
			this.router.navigateByUrl('/dashboard');
		})
	}

}
