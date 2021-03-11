import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../resources/services/auth.service';
import { UploadService } from '../resources/services/upload.service';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

	uploadForm: FormGroup;
	errorMessage: string;
	formValid: boolean[] = [false, false, false, false];
	isLoading = false;
	image1: File = null;
	image2: File = null;
	image3: File = null;
	zip: File = null;

	constructor(private uploadService: UploadService,
		private authService: AuthService,
		private router: Router) { }

	ngOnInit(): void {
		if (!this.authService.getToken()) this.router.navigate(['/dashboard']);
		this.uploadForm = new FormGroup({
			zip: new FormControl(),
		})
	}

	onFileChanged(event) {
		const fileAllowed = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
		if (event.target.id == "FormControlFile4") {
			if ((fileAllowed.indexOf(event.target.files[0].type) >= 0)) {
				this.zip = event.target.files.item(0);
				this.formValid[3] = false;
			}
			else {
				this.formValid[3] = true;
			}
		}
	}

	onSubmit() {
		const formData = new FormData();

		formData.append('file', this.zip);

		this.isLoading = true;
		this.uploadService.uploadData(formData).subscribe(resData => {
			this.isLoading = false;
			this.router.navigateByUrl('/dashboard');
		})

	}

}
