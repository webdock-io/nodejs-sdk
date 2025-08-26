import { Webdock } from "./index.mts";
import { req } from "./utils/req.mts";
import { type } from "arktype";


export const CPU = type({
	cores: 'number',
	threads: 'number',
});

export const Price = type({
	amount: 'number',
	currency: 'string',
});

export const Profile = type({
	slug: 'string',
	name: 'string',
	ram: 'number',
	disk: 'number',
	cpu: CPU,
	price: Price,
});

export const ListProfilesResponseType = type({
	body: [Profile],
});

export class ProfilesClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	async list({
		locationId = "dk",
		profileSlug = ""
	}) {

		const res = await req({
			token: this.parent.string_token,
			endpoint: `/profiles?locationId=${locationId}&profileSlug=${profileSlug}`,
			method: "GET",
		}, ListProfilesResponseType);

		// If the user is asking for one profile, return it as an array any way, not to break compatibility
		if (res.success == true && !(res.response.body instanceof Array)) res.response.body = [res.response.body]

		return res

	}

	// TODO: implement
	// move getProfileBySlug to its own method
}


