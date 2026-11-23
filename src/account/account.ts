import type { Webdock, WebdockApiRequestReturn } from "../index";
import { CreateScriptResponseType, GetScriptByIdTResponseType, ListScriptsResponse } from "../servers/index";
import type { Snapshot } from "../snapshots";
import { req } from "../utils/req";
import { AccountCloudflare } from "./cloudflare";
import { AccountMonitoringClass } from "./monitoring/index.js";

export type AccountInformation = {
	userId: number;
	companyName: string;
	userName: string;
	userAvatar: string;
	userEmail: string;
	isTeamMember: boolean;
	teamLeader: string;
	accountBalance: string;
	accountBalanceRaw: string;
	accountBalanceCurrency: string;
	referralURl: string;
	referralCode: string;
};

export type AccountInformationReturnType = {
	body: AccountInformation;
};

type AccountScriptReference = number | string;
type RawAccountInformationReturnType = {
	body: AccountInformation | AccountInformation[];
};

export type AddPublicKeyRequest = {
	name: string;
	publicKey: string;
};

export type PublicKey = {
	id: number;
	name: string;
	key: string;
	created: string;
};

export type PublicKeyReturnType = {
	body: PublicKey;
};
type ListArchivedServersReponse = {
	body: ArchivedServer[]
};
export type ArchivedServer = {
	id: number;
	slug: string;
	name: string;
	location: string;
	imageSlug: string;
	virtualization: "container" | "kvm";
	archivedAt: string;
	usedDiskMiB: number | null;
	requiredDiskMiB: number | null;
	callbackId: string | null;
};
export class AccountClass {
	private parent: Webdock;
	scripts: AccountScripts;
	cloudflare: AccountCloudflare;
	monitoring: AccountMonitoringClass;
	constructor(parent: Webdock) {
		this.parent = parent;
		this.scripts = new AccountScripts(parent)
		this.cloudflare = new AccountCloudflare(parent)
		this.monitoring = new AccountMonitoringClass(parent)
	}




	async listArchivedServers() {
		return req<ListArchivedServersReponse>({
			token: this.parent.string_token,
			endpoint: "/servers/archived",
			method: "GET",
		})
	}

	async info(): WebdockApiRequestReturn<AccountInformationReturnType> {
		const res = await req<RawAccountInformationReturnType>({
			token: this.parent.string_token,
			endpoint: "/account/accountInformation",
			headers: [],
			method: "GET",
		});

		if (res.success && Array.isArray(res.response.body)) {
			return {
				...res,
				response: {
					...res.response,
					body: res.response.body[0],
				},
			};
		}

		return res as Awaited<WebdockApiRequestReturn<AccountInformationReturnType>>;
	}

}


class AccountScripts {

	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	async list() {
		return await req<ListScriptsResponse>({
			token: this.parent.string_token,
			endpoint: "/account/scripts",
			headers: [],
			method: "GET",
		});
	}

	getById(args: { scriptId: AccountScriptReference }) {
		return req<GetScriptByIdTResponseType>(
			{
				token: this.parent.string_token,
				endpoint: `/account/scripts/${args.scriptId}`,
				method: "GET",
			},
		);
	}
	update(args: {
		id: AccountScriptReference;
		name: string;
		filename: string;
		content: string;
	}) {
		return req<CreateScriptResponseType>(
			{
				token: this.parent.string_token,
				endpoint: `/account/scripts/${args.id}`,
				method: "PATCH",
				body: {
					name: args.name,
					filename: args.filename,
					content: args.content,
				},
			},
		);
	}
	create(args: {
		name: string;
		filename: string;
		content: string;
	}) {
		return req<CreateScriptResponseType>(
			{
				token: this.parent.string_token,
				endpoint: "/account/scripts",
				method: "POST",
				body: {
					content: args.content,
					filename: args.filename,
					name: args.name,
				},
			},
		);
	}
	delete(args: { id: AccountScriptReference }) {
		return req<undefined>(
			{
				token: this.parent.string_token,
				endpoint: `/account/scripts/${args.id}`,
				method: "DELETE",
			},
		);
	}
}
