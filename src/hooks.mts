import { Type, type } from "arktype";
import { Webdock } from "./index.mts";
import { req } from "./utils/req.mts";

export const HookFilter = type({
	type: "string",
	value: "string",
});

export const Hook = type({
	id: "number",
	callbackUrl: "string",
	filters: [HookFilter]
});

export const GetHookByIdResponseType = type({

	body: Hook

});

export const ListHooksResponseType = type({
	body: [Hook]
});

export class HooksClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}
	async getById({

		id,
	}: {
		id: number;
	}) {
		return await req(
			{
				endpoint: `hooks/${id}`,
				method: "GET",
				token: this.parent.string_token,
			}, ListHooksResponseType
		);
	}
	async create({
		callbackUrl,
		eventType,
		callbackId,
	}: {
		eventType?: string;
		callbackUrl: string;
		callbackId?: number;
	}) {
		return await req(
			{
				endpoint: `/hooks`,
				method: "POST",
				token: this.parent.string_token,
				body: {
					callbackUrl: callbackUrl,
					callbackId: callbackId,
					eventType: eventType,
				},
			},
			GetHookByIdResponseType
		);
	}
	async deleteById({ id }: { id: number }) {
		return await req(
			{
				endpoint: `hooks/${id}`,
				method: "DELETE",
				token: this.parent.string_token,
			},
			type("never")
		);
	}
	async list() {
		return await req(
			{
				token: this.parent.string_token,
				endpoint: "/hooks",
				method: "GET",
			},
			ListHooksResponseType
		);
	}
}
