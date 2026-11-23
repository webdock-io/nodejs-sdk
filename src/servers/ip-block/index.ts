import type { Webdock } from "../../index.js";
import type { ListIpBlocksResponseType, ChangeIPAddressArgs, ChangeIPAddressResponseType } from "../index.js";
import { req } from "../../utils/req.js";

export class ServerIpBlock {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	ListIpBlocks(args: { serverSlug: string }) {
		return req<ListIpBlocksResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/ipBlocks`,
			method: "GET",
		});
	}

	ChangeIPAddress(args: ChangeIPAddressArgs) {
		return req<ChangeIPAddressResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/ips`,
			method: "PATCH",
			headers: ["x-callback-id"],
			body: {
				add: args.add,
				remove: args.remove,
				banRemovedIpIds: args.banRemovedIpIds,
				primaryIpId: args.primaryIpId,
				reverseDns: args.reverseDns,
			},
		});
	}
}
