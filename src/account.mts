import { Webdock } from "./index.mts";
import { req } from "./utils/req.mts";
import { type } from "arktype"


const AccountInformation = type({
	userId: "number = 0",
	companyName: "string = ''",
	userName: "string = ''",
	userAvatar: "string = ''",
	userEmail: "string = ''",
	isTeamMember: "boolean = false",
	teamLeader: "string = ''",
	accountBalance: "string = ''",
	accountBalanceRaw: "string = ''",
	accountBalanceCurrency: "string = ''",
})

export const AccountInformationReturnType = type({
	body: AccountInformation
})

export class AccountClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	async info() {
		return await req({
			token: this.parent.string_token,
			endpoint: "/account/accountInformation",
			headers: [],
			method: "GET",
		}, AccountInformationReturnType);
	}
}
