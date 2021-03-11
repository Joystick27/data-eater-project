import { Component, OnInit } from '@angular/core';
import { Data } from '../resources/models/data.model';
import { Subscription } from 'rxjs';
import { DataService } from '../resources/services/data.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	data: Data[];
	dataRow: Data;
	subscription: Subscription;
	constructor(private dataService: DataService) { }

	ngOnInit(): void {
		this.dataService.getDataList();
		this.subscription = this.dataService.dataChanged
			.subscribe(
				(data: Data[]) => {
					this.data = data;
				}
			);
	}

}
