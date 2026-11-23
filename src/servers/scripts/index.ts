import type { Webdock } from "../../index.js";
import type { ServerScriptReference, CreateScriptOnServerResponse, DeleteScriptServerReturnType, GetScriptOnServerReturnType, ExecuteScriptOnServerReturnType, ListScriptsOnServerResponseType } from "../index.js";
import { req } from "../../utils/req.js";

export class ServerScriptsClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	create(args: {
		scriptId: ServerScriptReference;
		path: string;
		makeScriptExecutable: boolean;
		executeImmediately: boolean;
		serverSlug: string;
	}) {
		return req<CreateScriptOnServerResponse>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/scripts`,
			method: "POST",
			body: {
				scriptId: args.scriptId,
				path: args.path,
				makeScriptExecutable: args.makeScriptExecutable,
				executeImmediately: args.executeImmediately,
			},
			headers: ["x-callback-id"],
		});
	}

	delete(args: { serverSlug: string; scriptId: string }) {
		return req<DeleteScriptServerReturnType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/scripts/${args.scriptId}`,
			method: "DELETE",
			headers: ["x-callback-id"],
		});
	}

	getById(args: {
		serverSlug: string;
		scriptId: string | number;
	}) {
		return req<GetScriptOnServerReturnType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/scripts/${args.scriptId}`,
			method: "GET",
		});
	}

	execute(args: { serverSlug: string; scriptID: string }) {
		return req<ExecuteScriptOnServerReturnType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/scripts/${args.scriptID}/execute`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	listOnServer(args: {  serverSlug: string }) {
		return req<ListScriptsOnServerResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/scripts`,
			method: "GET",
		});
	}
}
