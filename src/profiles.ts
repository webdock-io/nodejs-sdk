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

export type Platform = "epyc_vps" | "intel_vps" | "ryzen_vps" | (string & {})

export type Profile = {
	slug: string;
	name: string;
	ram: number;
	disk: number;
	cpu: CPU;
	price: Price;
	network_bandwidth: number;
	platform: Platform | null;
};
export type DeleteCustomProfilesParams = {
	profileSlug: string
}
export type CreateCustomProfilesParams = {
	platform: Platform;
	cpu_threads: number;
	ram: number;
	disk_space: number;
	network_bandwidth: number;
}

export type CreateCustomProfileResponseType = {
	body: Profile;
};




export type ListProfilesResponseType = {
	body: Profile[];
};



export class ProfilesClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}
	async delete(args: DeleteCustomProfilesParams) {
		return req<void>({
			token: this.parent.string_token,
			endpoint: `/profiles/${args.profileSlug}`,
			method: "DELETE"
		})
	}

	async create(args: CreateCustomProfilesParams) {
		return req<CreateCustomProfileResponseType>({
			token: this.parent.string_token,
			endpoint: "/profiles",
			method: "POST",
			body: {
				platform: args.platform,
				cpu_threads: args.cpu_threads,
				ram: args.ram,
				disk_space: args.disk_space,
				network_bandwidth: args.network_bandwidth
			}
		})
	}

	async list({
		locationId = "dk",
		profileSlug = ""
	}: {
		locationId?: string;
		profileSlug?: string;
	} = {}) {
		const searchParams = new URLSearchParams();
		if (locationId) searchParams.set("locationId", locationId);
		if (profileSlug) searchParams.set("profileSlug", profileSlug);
		const query = searchParams.toString();

		const res = await req<ListProfilesResponseType>({
			token: this.parent.string_token,
			endpoint: `/profiles${query ? `?${query}` : ""}`,
			method: "GET",
		});

		// If the user is asking for one profile, return it as an array any way, not to break compatibility
		if (res.success == true && !(res.response.body instanceof Array)) res.response.body = [res.response.body]

		return res

	}
}


