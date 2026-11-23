import type { Webdock } from "../../../index.js";
import type { DatabaseBackupConfiguration, DatabaseBackupStatusResponseType, DatabaseBackupUpdate, WebserverAsyncActionResponseType } from "../index.js";
import { req } from "../../../utils/req.js";

export class ServerWebserverDatabaseBackupClass {
	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	status(args: { serverSlug: string }) {
		return req<DatabaseBackupStatusResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/db-backup-on-disk`,
			method: "GET",
		});
	}

	enable(args: {
		serverSlug: string;
	} & DatabaseBackupConfiguration) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/db-backup-on-disk`,
			method: "POST",
			body: {
				backupDir: args.backupDir,
				keep: args.keep,
				schedule: args.schedule,
			},
			headers: ["x-callback-id"],
		});
	}

	update(args: {
		serverSlug: string;
	} & DatabaseBackupUpdate) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/db-backup-on-disk`,
			method: "PATCH",
			body: {
				backupDir: args.backupDir,
				keep: args.keep,
				schedule: args.schedule,
			},
			headers: ["x-callback-id"],
		});
	}

	disable(args: { serverSlug: string }) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/db-backup-on-disk/disable`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	run(args: { serverSlug: string }) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/db-backup-on-disk/run`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}
}
