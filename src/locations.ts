import { Webdock } from "./index";
import { req } from "./utils/req";

export type Location = {
	id: string;
	name: string;
	city: string;
	country: string;
	description: string;
	icon: string;
};

export type ListLocationsType = {
	body: Location[];
};

export class LocationClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	async list() {
		return await req<ListLocationsType>({
			token: this.parent.string_token,
			endpoint: "/locations",
			method: "GET",
		});
	}
}
