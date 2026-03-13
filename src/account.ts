import { Webdock } from "./index";
import { CreateScriptResponseType, GetScriptByIdTResponseType, ListScriptsResponse } from "./scripts";
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
};

export type AccountInformationReturnType = {
	body: AccountInformation;
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

export class AccountClass {
	private parent: Webdock;
	scripts: AccountScripts;
	constructor(parent: Webdock) {
		this.parent = parent;
		this.scripts = new AccountScripts(parent)
	}

	async info() {
		return await req<AccountInformationReturnType>({
			token: this.parent.string_token,
			endpoint: "/account/accountInformation",
			headers: [],
			method: "GET",
		});
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

	getById({ scriptId }: { scriptId: number }) {
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
		id: number;
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
	delete({ id }: { id: number }) {
		return req<undefined>(
			{
				token: this.parent.string_token,
				endpoint: `/account/scripts/${id}`,
				method: "DELETE",
			},
		);
	}
}