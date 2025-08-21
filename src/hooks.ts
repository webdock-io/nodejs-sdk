import { Webdock } from "./index";
import { req } from "./utils/req";

export type HookFilter = {
	type: string;
	value: string;
};

export type Hook = {
	id: number;
	callbackUrl: string;
	filters: HookFilter[];
};

export type GetHookByIdResponseType = {
	body: Hook;
};

export type ListHooksResponseType = {
	body: Hook[];
};

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
		return await req<GetHookByIdResponseType>(
			{
				endpoint: `hooks/${id}`,
				method: "GET",
				token: this.parent.string_token,
			},
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
		return await req<GetHookByIdResponseType>(
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
		);
	}
	async deleteById({ id }: { id: number }) {
		return await req(
			{
				endpoint: `hooks/${id}`,
				method: "DELETE",
				token: this.parent.string_token,
			},
		);
	}
	async list() {
		return await req<ListHooksResponseType>(
			{
				token: this.parent.string_token,
				endpoint: "/hooks",
				method: "GET",
			},
		);
	}
}
