import { Webdock } from "./index";
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

export class ScriptsClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	create(
		{ content, filename, name }: {
			name: string;
			filename: string;
			content: string;
		},
	) {
		return req<CreateScriptResponseType>(
			{
				token: this.parent.string_token,
				endpoint: "/account/scripts",
				method: "POST",
				body: {
					content,
					filename,
					name,
				},
			},
		);
	}
	createOnServer({
		scriptId,
		path,
		makeScriptExecutable,
		executeImmediately,
		serverSlug,
	}: {
		scriptId: number;
		path: string;
		makeScriptExecutable: boolean;
		executeImmediately: boolean;
		serverSlug: string;
	}) {
		return req<CreateScriptOnServerResponse>(
			{
				token: this.parent.string_token,
				endpoint: `/servers/${serverSlug}/scripts`,
				method: "POST",
				body: {
					scriptId,
					path,
					makeScriptExecutable,
					executeImmediately,
				},
				headers: ["x-callback-id"],
			},
		);
	}
	delete({ id }: { id: number }) {
		return req<undefined>(
			{
				token: this.parent.string_token,
				endpoint: `/account/scripts/${id}`,
				method: "DELETE",
			},
		);
	}
	deleteScriptFromServer(
		{ serverSlug, scriptId }: {
			serverSlug: string;
			scriptId: number;
		},
	) {
		return req<DeleteScriptServerReturnType>(
			{
				token: this.parent.string_token,
				endpoint: `/servers/${serverSlug}/scripts/${scriptId}`,
				method: "DELETE",
			},
		);
	}
	executeOnServer(
		{ serverSlug, scriptID }: {
			serverSlug: string;
			scriptID: number;
		},
	) {
		return req<ExecuteScriptOnServerReturnType>(
			{
				token: this.parent.string_token,
				endpoint: `/servers/${serverSlug}/scripts/${scriptID}/execute`,
				method: "POST",
				headers: ["x-callback-id"],
			},
		);
	}
	getById({ scriptId }: { token?: string; scriptId: number }) {
		return req<GetScriptByIdTResponseType>(
			{
				token: this.parent.string_token,
				endpoint: `/account/scripts/${scriptId}`,
				method: "GET",
			},
		);
	}
	list(token?: string) {
		return req<ListScriptsResponse>({
			token: this.parent.string_token,
			endpoint: "/account/scripts",
			method: "GET",
		});
	}
	listOnServer({ serverSlug }: {
		token?: string;
		serverSlug: string;
	}) {
		return req<ListScriptsOnServerResponseType>(
			{
				token: this.parent.string_token,
				endpoint: `/servers/${serverSlug}/scripts`,
				method: "GET",
			},
		);
	}
	update({
		id,
		name,
		filename,
		content,
	}: {
		id: number;
		name: string;
		filename: string;
		content: string;
	}) {
		return req<CreateScriptResponseType>(
			{
				token: this.parent.string_token,
				endpoint: `/account/scripts/${id}`,
				method: "PATCH",
				body: {
					name,
					filename,
					content,
				},
			},
		);
	}
}
