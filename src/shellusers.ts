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
		webSshUrl: string;
	};
};

export type ResetShellUserPasswordResponseType = {
	headers: {
		"x-callback-id": string;
	};
};

export class ShellUsersClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	create(args: {
		serverSlug: string;
		username: string;
		password: string;
		group?: string;
		shell?: string;
		publicKeys?: number[];
	}) {
		return req<CreateShellUserResponseType>({
			token: this.parent.string_token,
			endpoint: `servers/${args.serverSlug}/shellUsers`,
			method: "POST",
			body: {
				username: args.username,
				password: args.password,
				group: args.group,
				shell: args.shell,
				publicKeys: args.publicKeys ?? [],
			},
			headers: ["x-callback-id"],
		});
	}

	delete(args: {
		serverSlug: string;
		userId: number;
	}) {
		return req<DeleteUserShellResponseType>({
			token: this.parent.string_token,
			endpoint: `servers/${args.serverSlug}/shellUsers/${args.userId}`,
			method: "DELETE",
			headers: ["x-callback-id"],
		});
	}

	resetPassword(args: {
		serverSlug: string;
		userId: number;
		newPassword: string;
	}) {
		return req<ResetShellUserPasswordResponseType>({
			token: this.parent.string_token,
			endpoint: `servers/${args.serverSlug}/shellUsers/${args.userId}/resetPassword`,
			method: "POST",
			body: {
				newPassword: args.newPassword,
			},
			headers: ["x-callback-id"],
		});
	}

	list(args: {
		serverSlug: string;
	}) {
		return req<ListShellUsersResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/shellUsers`,
			method: "GET",
		});
	}
	edit(args: {
		slug: string;
		id: number;
		keys: number[];
	}) {
		return req<ShellUserCreationResponse>({
			endpoint: `servers/${args.slug}/shellUsers/${args.id}`,
			method: "PATCH",
			body: {
				publicKeys: args.keys,
			},
			headers: ["x-callback-id"],
			token: this.parent.string_token,
		});
	}

	websshToken(args: {
		serverSlug: string;
		username: string;
	}) {
		return req<CreateWebSSHTokenResponseType>(
			{
				endpoint: `servers/${args.serverSlug}/shellUsers/WebsshToken`,
				method: "POST",
				token: this.parent.string_token,
				body: {
					username: args.username,
				},
			},
		);
	}
}
