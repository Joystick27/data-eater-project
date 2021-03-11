export class Data {

	public id;
	public name: string;
	public description: string;
	public email: string;
	public phone: string;

	constructor(id, name: string, description: string, email: string, phone: string) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.email = email;
		this.phone = phone;
	}
}