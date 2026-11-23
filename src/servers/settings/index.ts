import type { Webdock } from "../../index.js";
import type { AsyncActionResponseType } from "../index.js";
import { req } from "../../utils/req.js";

export class ServerSettingsClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	update(args: {
		webroot?: string;
		updateWebserver?: boolean;
		updateLetsencrypt?: boolean;
		serverSlug: string;
	}) {
		return req<AsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/settings`,
			method: "POST",
			headers: ["x-callback-id"],
			body: {
				...(args.webroot !== undefined ? { webroot: args.webroot } : {}),
				...(args.updateWebserver !== undefined ? { updateWebserver: args.updateWebserver } : {}),
				...(args.updateLetsencrypt !== undefined ? { updateLetsencrypt: args.updateLetsencrypt } : {}) 
			},
		});
	}
}
