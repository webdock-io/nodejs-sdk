import { Webdock } from ".";
import { req } from "./utils/req";

export type CreateScriptBodyType = {
	name: string;
	filename: string;
	content: string;
};

export type CreateScriptResponseType = {
	body: {
		id: number;
		name: string;
		description: string;
		filename: string;
		content: string;
	};
};

export type DeleteScriptServerReturnType = {
	body: Script;
	headers: {
		"x-callback-id": string;
	};
};

export type ExecuteScriptOnServerReturnType = {
	body: Script;
	headers: {
		"x-callback-id": string;
	};
};

export type GetScriptByIdTResponseType = {
	body: {
		id: number;
		name: string;
		description: string;
		filename: string;
		content: string;
	};
};
export interface ResponseHeaders {
	"x-callback-id": string;
}

/**
 * Response Schema (application/json)
 */
export interface Script {
	/** Script ID (int64) */
	id: number;
	/** Script name */
	name: string;
	/** Script path */
	path: string;
	/** Date/time of the last run */
	lastRun: string | null;
	/** Callback ID of the last script run */
	lastRunCallbackId: string | null;
	/** Creation date/time */
	created: string;
}

export type CreateScriptOnServerResponse = {
	headers: ResponseHeaders;
	body: Script;
};
export type ListScriptsOnServerResponseType = {
	body: {
		id: number;
		name: string;
		path: string;
		lastRun: Date | null;
		lastRunCallbackId: string;
		created: Date;
	}[];
};
export type ListScriptsResponse = {
	body: {
		id: number;
		name: string;
		description: string;
		filename: string;
		content: string;
	}[];
};

type PingResponseType = {
	body: {
		webdock: "rocks";
	};
};

export class WebdockClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}


	async ping() {
		return req<PingResponseType>({
			method: "GET",
			endpoint: "/ping"
		})
	}


}
