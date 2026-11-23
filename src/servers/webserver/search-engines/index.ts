import type { Webdock } from "../../../index.js";
import type { WebserverAsyncActionResponseType } from "../index.js";
import { req } from "../../../utils/req.js";

export class ServerWebserverSearchEnginesClass {
	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	block(args: {
		serverSlug: string;
		robotsTxt?: string;
	}) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/block-search-engines`,
			method: "POST",
			body: {
				robotsTxt: args.robotsTxt,
			},
			headers: ["x-callback-id"],
		});
	}

	unblock(args: { serverSlug: string }) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/unblock-search-engines`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}
}
