import type { Webdock } from "../../../index.js";
import type { WebserverAsyncActionResponseType } from "../index.js";
import { req } from "../../../utils/req.js";

export class ServerWebserverBasicAuthClass {
	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	enable(args: {
		serverSlug: string;
		path: string;
		username: string;
		password: string;
	}) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/enable-basic-auth`,
			method: "POST",
			body: {
				path: args.path,
				username: args.username,
				password: args.password,
			},
			headers: ["x-callback-id"],
		});
	}

	disable(args: {
		serverSlug: string;
		path: string;
	}) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/disable-basic-auth`,
			method: "POST",
			body: {
				path: args.path,
			},
			headers: ["x-callback-id"],
		});
	}
}
