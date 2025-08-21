import { Webdock } from "./index";
import { req } from "./utils/req";

export type ServerImage = {
	slug: string;

	name: string;

	webServer: "Apache" | "Nginx" | null;

	phpVersion: string | null;
};

export type ListImageTypeResponse = {
	body: ServerImage[];
};

export class ImagesClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	async list() {
		return await req<ListImageTypeResponse>({
			token: this.parent.string_token,
			endpoint: "/images",
			headers: [],
			method: "GET",
		});
	}
}
