import type { Webdock } from "../../../index.js";
import type { WebserverAsyncActionResponseType } from "../index.js";
import { req } from "../../../utils/req.js";

export class ServerWebserverCertbotClass {
	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	test(args: { serverSlug: string }) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/test-certbot`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}
}
