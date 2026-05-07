import type { Webdock, WebdockApiRequestReturn } from "./index";
import { CreateScriptResponseType, GetScriptByIdTResponseType, ListScriptsResponse } from "./servers";
import type { Snapshot } from "./snapshots";
import { req } from "./utils/req";

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
type ListArchivedServersRepose = {
	body: Snapshot[]
};

export class AccountClass {
	private parent: Webdock;
	scripts: AccountScripts;
	constructor(parent: Webdock) {
		this.parent = parent;
		this.scripts = new AccountScripts(parent)
	}




	async listArchivedServers() {
		return req<ListArchivedServersRepose>({
			token: this.parent.string_token,
			endpoint: "/servers/snapshots",
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

	getById({ scriptId }: { scriptId: AccountScriptReference }) {
		return req<GetScriptByIdTResponseType>(
			{
				token: this.parent.string_token,
				endpoint: `/account/scripts/${scriptId}`,
				method: "GET",
			},
		);
	}
	update({
		id,
		name,
		filename,
		content,
	}: {
		id: AccountScriptReference;
		name: string;
		filename: string;
		content: string;
	}) {
		return req<CreateScriptResponseType>(
			{
				token: this.parent.string_token,
				endpoint: `/account/scripts/${id}`,
				method: "PATCH",
				body: {
					name,
					filename,
					content,
				},
			},
		);
	}
	create(
		{ content, filename, name }: {
			name: string;
			filename: string;
			content: string;
		},
	) {
		return req<CreateScriptResponseType>(
			{
				token: this.parent.string_token,
				endpoint: "/account/scripts",
				method: "POST",
				body: {
					content,
					filename,
					name,
				},
			},
		);
	}
	delete({ id }: { id: AccountScriptReference }) {
		return req<undefined>(
			{
				token: this.parent.string_token,
				endpoint: `/account/scripts/${id}`,
				method: "DELETE",
			},
		);
	}
}
