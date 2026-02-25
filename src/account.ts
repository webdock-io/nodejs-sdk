import { Webdock } from "./index";
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

	constructor(parent: Webdock) {
		this.parent = parent;
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