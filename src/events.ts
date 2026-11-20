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

	async list(args: {
		page?: number;
		per_page?: number;
		eventType?: string;
		/** @deprecated Use per_page instead. */
		limit?: number;
		/** @deprecated Use eventType instead. */
		type?: string;
	}) {
		const query = new URLSearchParams();
		if (args.page !== undefined) query.set("page", String(args.page));
		const perPage = args.per_page ?? args.limit;
		if (perPage !== undefined) query.set("per_page", String(perPage));
		const eventType = args.eventType ?? args.type;
		if (eventType) query.set("eventType", eventType);
		const search = query.toString();
		const endpoint = `/events${search ? `?${search}` : ""}`;

		return await req<EventTypeListResponse>({
			token: this.parent.string_token,
			endpoint,
			headers: ["x-total-count"],
			method: "GET",
		});
	}
 
}
