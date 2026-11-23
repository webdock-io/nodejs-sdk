import type { Webdock } from "../../index.js";
import type { UpdateServerIdentityResponseType, RenewServerCertResponseType } from "../index.js";
import { req } from "../../utils/req.js";

export class ServerIdentityClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	update(args: {
		serverSlug: string;
		maindomain: string;
		aliasdomains?: string;
		removeDefaultAlias?: boolean;
	}) {
		return req<UpdateServerIdentityResponseType>({
			token: this.parent.string_token,
			method: "PATCH",
			endpoint: `/servers/${args.serverSlug}/identity`,
			headers: ["x-callback-id"],
			body: {
				maindomain: args.maindomain,
				aliasdomains: args.aliasdomains,
				removeDefaultAlias: args.removeDefaultAlias,
			},
		});
	}

	renewCertificates(args: {
		serverSlug: string;
		domains?: string[];
		email?: string;
		forceSSL?: boolean;
	}) {
		return req<RenewServerCertResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/run-certbot`,
			method: "POST",
			headers: ["x-callback-id"],
			body: {
				domains: args.domains,
				email: args.email,
				forceSSL: args.forceSSL,
			},
		});
	}
}
