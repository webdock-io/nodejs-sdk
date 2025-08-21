import { Webdock } from "./index";
import { req } from "./utils/req";

export type ShellUser = {
	id: number;
	username: string;
	group: string;
	shell: string;
	created: string;
	updated: string;
	publicKeys: number[];
};

export type CreateShellUserResponseType = {
	body: ShellUserDTO;
	headers: {
		"x-callback-id": string;
	};
};

export type DeleteUserShellResponseType = {
	body: ShellUser;
	headers: {
		"x-callback-id": string;
	};
};

export type ListShellUsersResponseType = {
	body: ShellUser[];
};

export type PublicKeyDTO = {
	id: number;
	name: string;
	key: string;
	created: string;
};

export type ShellUserDTO = {
	id: number;
	username: string;
	group: string;
	shell: string;
	publicKeys: PublicKeyDTO[];
	created: string;
};
export type ListShellUserDTO = {
	id: number;
	username: string;
	group: string;
	shell: string;
	publicKeys: PublicKeyDTO[];
	created: string;
};
export type ShellUserCreationResponse = {
	headers: {
		"x-callback-id": string;
	};

	body: ShellUserDTO;
};

export type CreateWebSSHTokenResponseType = {
	body: {
		token: string;
	};
};

export class ShellUsersClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	create({ serverSlug, username, password, group, shell, publicKeys, }: {
		serverSlug: string;
		username: string;
		password: string;
		group?: string;
		shell?: string;
		publicKeys?: number[];
	}) {
		return req<CreateShellUserResponseType>({
			token: this.parent.string_token,
			endpoint: `servers/${serverSlug}/shellUsers`,
			method: "POST",
			body: {
				username,
				password,
				group,
				shell,
				publicKeys: publicKeys ?? [],
			},
			headers: ["x-callback-id"],
		});
	}

	delete({ serverSlug, userId, }: {
		serverSlug: string;
		userId: number;
	}) {
		return req<DeleteUserShellResponseType>({
			token: this.parent.string_token,
			endpoint: `servers/${serverSlug}/shellUsers/${userId}`,
			method: "DELETE",
			headers: ["x-callback-id"],
		});
	}

	list({ serverSlug, }: {
		serverSlug: string;
	}) {
		return req<ListShellUsersResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/shellUsers`,
			method: "GET",
		});
	}
	edit(
		{ slug, id, keys }: {
			slug: string;
			id: number;
			keys: number[];
		},
	) {
		return req<ShellUserCreationResponse>({
			endpoint: `servers/${slug}/shellUsers/${id}`,
			method: "PATCH",
			body: {
				publicKeys: keys,
			},
			headers: ["x-callback-id"],
			token: this.parent.string_token,
		});
	}
	websshToken(
		{ serverSlug, username, }: {
			serverSlug: string;
			username: string;
		},
	) {
		return req<CreateWebSSHTokenResponseType>(
			{
				endpoint: `servers/${serverSlug}/shellUsers/WebsshToken`,
				method: "POST",
				token: this.parent.string_token,
				body: {
					username,
				},
			},
		);
	}
}
