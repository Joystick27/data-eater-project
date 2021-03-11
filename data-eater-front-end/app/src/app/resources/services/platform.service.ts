import { Injectable } from '@angular/core';


@Injectable()
export class PlatformService {

	constructor() { }

	getHeight() {
		return window.innerHeight;
	}

	getWidth() {
		return window.innerWidth;
	}

	

}