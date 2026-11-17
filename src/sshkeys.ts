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
export type SSHSettings = {
	passwordSshAuthEnabled?: boolean;
	passwordlessSudoEnabled?: boolean;
	sshPort?: number;
	serverSlug: string
	token?: string;
};

export type SSHSettingsResponseType = {
	headers: {
		"x-callback-id": string;
	};
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

	toggleSSHSettings(args: SSHSettings) {
		return req<SSHSettingsResponseType>({
			token: args.token || this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/sshSettings`,
			headers: ["x-callback-id"],
			method: "POST",
			body: {
				passwordSshAuthEnabled: args.passwordSshAuthEnabled,
				passwordlessSudoEnabled: args.passwordlessSudoEnabled,
				sshPort: args.sshPort,
			},
		});
	}
}
