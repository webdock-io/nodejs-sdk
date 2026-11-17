import { Webdock } from "./index";
import { req } from "./utils/req";

export type EventStatus = "waiting" | "working" | "finished" | "error";

export type EventsType = {
	id: number;
	startTime: Date;
	endTime?: Date;
	callbackId: string;
	serverSlug: string;
	eventType: string;
	action: string;
	actionData: string;
	message: string;
	status: EventStatus;
};
type EventLogResponse = {
	body: EventsType[];
};
export type EventTypeListResponse = {
	body: EventsType[];
	headers: {
		"x-total-count": string;
	};
};

export class EventsClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	async list( args: { page?:number , limit?:number, type?:string }) {
		let endpoint = "/events";

		const queryParams: string[] = [];

		if (args.page) {
			queryParams.push(`page=${args.page}`);
		}
	if (args.limit) {
			queryParams.push(`limit=${args.limit}`);
		}
	if (args.type) {
			queryParams.push(`type=${args.type}`);
		}

 
 

		if (queryParams.length > 0) {
			endpoint += `?${queryParams.join("&")}`;
		}


		return await req<EventTypeListResponse>({
			token: this.parent.string_token,
			endpoint,
			headers: ["x-total-count"],
			method: "GET",
		});
	}
	async waitForEventToEnd(callbackId: string) {

		while (true) {

			await new Promise((resolve) => setTimeout(resolve, 200));

			const result = await req<EventLogResponse>({
				token: this.parent.string_token,
				endpoint: `/events?callbackId=${callbackId}`,
				log: false,
				method: "GET",
			});

			if (!result.success) {
				console.error(result.error);
				return;
			}

			if ( result.response.body[0].status == "error") {
				console.error(result.response.body[0].message);
				return;
			}

			if ( result.response.body[0].status == "finished") {
				return result;
			}
		}
	}
}
