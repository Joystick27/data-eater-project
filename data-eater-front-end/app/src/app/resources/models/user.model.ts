export class User {
	constructor(
		public name: string,
		private _token: string,
		public email: string,
		public phone_onfirmed: boolean
	) { }

	token() {
		return this._token;
	}
}