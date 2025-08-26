import { type } from "arktype";
import { Webdock } from "./index.mts";
import { req } from "./utils/req.mts";


const ServerImage = type({
	slug: "string",
	name: "string",
	webServer: `"Apache" | "Nginx" | null`,
	phpVersion: "string | null",
});

export const ListImageTypeResponse = type({
	body: [ServerImage]
});

export class ImagesClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	async list() {
		return await req({
			token: this.parent.string_token,
			endpoint: "/images",
			headers: [],
			method: "GET",
		}, ListImageTypeResponse);
	}
}
