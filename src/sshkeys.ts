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

	create({ name, publicKey, }: {
		name: string;
		publicKey: string;
	}) {
		return req<CreateSSHKeysResponseType>({
			token: this.parent.string_token,
			endpoint: "/account/publicKeys",
			method: "POST",
			body: {
				name,
				publicKey,
			},
		});
	}

	delete({ id }: {
		id: number;
	}) {
		return req<CreateSSHKeysResponseType>({
			token: this.parent.string_token,
			endpoint: `/account/publicKeys/${id}`,
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

	toggleSSHSettings(data: SSHSettings) {
		return req<SSHSettingsResponseType>({
			token: data.token || this.parent.string_token,
			endpoint: `/servers/${data.serverSlug}/sshSettings`,
			headers: ["x-callback-id"],
			method: "POST",
			body: {
				passwordSshAuthEnabled: data.passwordSshAuthEnabled,
				passwordlessSudoEnabled: data.passwordlessSudoEnabled,
				sshPort: data.sshPort,
			},
		});
	}
}
