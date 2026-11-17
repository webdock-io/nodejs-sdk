import { Webdock } from "./index";
import { req } from "./utils/req";

export type SSHKeys = {
	fingerprint: string;
	id: number;
	name: string;
	key: string;
	created: string;
};

export type CreateSSHKeysResponseType = {
	body: SSHKeys;
};

export type ListSSHKeysResponseType = {
	body: SSHKeys[];
};

export class SshKeysClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	create(args: {
		name: string;
		publicKey: string;
	}) {
		return req<CreateSSHKeysResponseType>({
			token: this.parent.string_token,
			endpoint: "/account/publicKeys",
			method: "POST",
			body: {
				name: args.name,
				publicKey: args.publicKey,
			},
		});
	}

	delete(args: {
		id: number;
	}) {
		return req<CreateSSHKeysResponseType>({
			token: this.parent.string_token,
			endpoint: `/account/publicKeys/${args.id}`,
			method: "DELETE",
		});
	}

	list() {
		return req<ListSSHKeysResponseType>({
			token: this.parent.string_token,
			endpoint: "/account/publicKeys",
			method: "GET",
		});
	}
}
