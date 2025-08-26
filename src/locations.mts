import { type } from "arktype";
import { Webdock } from "./index.mts";
import { req } from "./utils/req.mts";

export const Location = type({
	id: "string",
	name: "string",
	city: "string",
	country: "string",
	description: "string",
	icon: "string",
});

export const ListLocationsType = type({
	body: [Location],
});

export class LocationClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	async list() {
		return await req(
			{
				token: this.parent.string_token,
				endpoint: "/locations",
				method: "GET",
			},
			ListLocationsType
		);
	}
}
