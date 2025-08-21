import { Webdock } from "./index";
import { req } from "./utils/req";

export type CPU = {
	cores: number;
	threads: number;
};

export type Price = {
	amount: number;
	currency: string;
};

export type Profile = {
	slug: string;
	name: string;
	ram: number;
	disk: number;
	cpu: CPU;
	price: Price;
};

export type ListProfilesResponseType = {
	body: Profile[];
};



export class ProfilesClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	async list({
		locationId = "dk",
		profileSlug = ""
	}) {

		const res = await req<ListProfilesResponseType>({
			token: this.parent.string_token,
			endpoint: `/profiles?locationId=${locationId}&profileSlug=${profileSlug}`,
			method: "GET",
		});

		// If the user is asking for one profile, return it as an array any way, not to break compatibility
		if (res.success == true && !(res.response.body instanceof Array)) res.response.body = [res.response.body]

		return res

	}
}


