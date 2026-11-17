import type { Webdock, WebdockApiRequestReturn } from "./index";
import { req } from "./utils/req";




export type CPU = {
	cores: number;
	threads: number;
};

export type Price = {
	/** Amount in the smallest currency unit given by `unit`, e.g. 430 cents = EUR 4.30. */
	amount: number;
	currency: "EUR" | "DKK" | "USD";
	/** `cent` for EUR/USD, `ore` for DKK. Added in API 1.1.6. */
	unit?: "cent" | "ore";
	/** Human-readable price, derived from amount, unit and currency. Added in API 1.1.6. */
	displayPrice?: string;
	/** Added in API 1.1.6. */
	billingFrequency?: "monthly" | "yearly" | null;
	/** Legacy alias of `billingFrequency`. Added in API 1.1.6. */
	billingPeriod?: "month" | "year" | null;
};

export type Platform = "epyc_vps" | "intel_vps" | (string & {})

export type IncludedService = "wordpress_management" | "postmark_transactional" | "mail_forwarding";

export type Profile = {
	/** Unique ID of the profile. `name` is only a display label. */
	slug: string;
	name: string;
	/** RAM in MiB. */
	ram: number;
	/** Disk in MiB. */
	disk: number;
	cpu: CPU;
	/** Monthly price (same as `prices[0]`). */
	price: Price;
	/** `[monthly, yearly]` price options. Added in API 1.1.6. */
	prices?: Price[];
	/** Network bandwidth in Gbit/s. */
	network_bandwidth: number;
	platform: Platform | null;
	/** Must be true for managed WordPress to work on servers with this profile. Added in API 1.1.6. */
	wordpressManagementIncluded?: boolean;
	/** Managed services included with this profile. Added in API 1.1.6. */
	includedServices?: IncludedService[];
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

/** GET /profiles answers with an array, or with a single object when `profileSlug` matches a profile exactly. */
type RawListProfilesResponseType = {
	body: Profile[] | Profile;
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

	async list(args: {
		locationId?: string;
		profileSlug?: string;
	} = {}): WebdockApiRequestReturn<ListProfilesResponseType> {
		const locationId = args.locationId ?? "dk";
		const searchParams = new URLSearchParams();
		if (locationId) searchParams.set("locationId", locationId);
		if (args.profileSlug) searchParams.set("profileSlug", args.profileSlug);
		const query = searchParams.toString();

		const res = await req<RawListProfilesResponseType>({
			token: this.parent.string_token,
			endpoint: `/profiles${query ? `?${query}` : ""}`,
			method: "GET",
		});
		if (!res.success) return res;

		// A single profile (profileSlug lookup) is still returned as an array, so callers always get the same shape.
		const { body } = res.response;
		return {
			...res,
			response: {
				...res.response,
				body: Array.isArray(body) ? body : [body],
			},
		};
	}
}


