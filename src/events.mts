import { Webdock } from "./index.mts";
import { req } from "./utils/req.mts";

import { type } from "arktype"

export type EventStatus = "waiting" | "working" | "finished" | "error";
const EventStatus = type(`"waiting" | "working" | "finished" | "error"`);

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

const EventsType = type({
	id: "number",
	startTime: "Date",
	endTime: "Date | null",
	callbackId: "string",
	serverSlug: "string",
	eventType: "string",
	action: "string",
	actionData: "string",
	message: "string",
	status: EventStatus,
});

export type EventTypeListResponse = {
	body: EventsType[];
	headers: {
		"x-total-count": string;
	};
};
const EventTypeListResponse = type({
	body: [EventsType],
	headers: type({
		"x-total-count": "string",
	})
});
export class EventsClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	async list({ page = 1, limit = 10, type = "" }) {
		let endpoint = "/events";

		const queryParams: string[] = [];

		if (page) {
			queryParams.push(`page=${page}`);
		}

		if (limit) {
			queryParams.push(`per_page=${limit}`);
		}

		if (type) {
			queryParams.push(`eventType=${type}`);
		}

		if (queryParams.length > 0) {
			endpoint += `?${queryParams.join("&")}`;
		}


		return await req({
			token: this.parent.string_token,
			endpoint,
			headers: ["x-total-count"],
			method: "GET",
		}, EventTypeListResponse);
	}
}
