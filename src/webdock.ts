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

type WebdockIPBlocks = {
	id: number;
	blockId: number;
	ipv4: string;
	ipv6: string;
	status: string;
	serverSlug: string;
}

export class WebdockClass {
	private parent: Webdock;
	scripts: WebdockScripts
	IpBlocks: IpBlocksClass
	constructor(parent: Webdock) {
		this.parent = parent;
		this.scripts = new WebdockScripts(parent)
		this.IpBlocks = new IpBlocksClass(parent)
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

class IpBlocksClass {
	private parent: Webdock
	constructor(parent: Webdock) {
		this.parent = parent
	}


	BanIp({ ipId }: { ipId: number }) {
		return req({
			token: this.parent.string_token,
			endpoint: `/servers/ipBlocks/${ipId}/banned`,
			method: "PATCH",
			body: {
				banned: true
			}
		})
	}

	UnBanIp({ ipId }: { ipId: number }) {
		return req({
			token: this.parent.string_token,
			endpoint: `/servers/ipBlocks/${ipId}/banned`,
			method: "PATCH",
			body: {
				banned: true
			}
		})
	}
	inspectIpBlock({
		blockId,
		status = "all",
	}: {
		blockId: number;
		status?: "all" | "free" | "used" | "banned" | "reserved";
	}) {
		const params = new URLSearchParams({
			blockId: String(blockId),
			status,
		});

		return req<WebdockIPBlocks>({
			token: this.parent.string_token,
			endpoint: `/servers/ipBlocks/inspect?${params.toString()}`,
			method: "GET",

		});
	}

}

