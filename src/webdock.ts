import { Webdock } from ".";
import { req } from "./utils/req";





export type ListScriptsResponse = {
	body: {
		id: number;
		name: string;
		description: string;
		filename: string;
		content: string;
		slug: string;
	}[];
};

type PingResponseType = {
	body: {
		webdock: "rocks";
	};
};

export class WebdockClass {
	private parent: Webdock;
	scripts: WebdockScripts
	constructor(parent: Webdock) {
		this.parent = parent;
		this.scripts = new WebdockScripts(parent)
	}


	async ping() {
		return req<PingResponseType>({
			token: this.parent.string_token,
			method: "GET",
			endpoint: "/ping"
		})
	}


}

export class WebdockScripts {

	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	async list() {
		return await req<ListScriptsResponse>({
			token: this.parent.string_token,
			endpoint: "/scripts",
			headers: [],
			method: "GET",
		});
	}

}
