import type { Webdock } from "./index.js";
import { req } from "./utils/req.js";

export type DatabaseBackupSchedule = "hourly" | "daily" | "weekly" | "manual";

export type DatabaseBackupConfiguration = {
	/** Absolute path where database backups are stored. */
	backupDir?: string;
	/** Number of backup archives to retain. The API accepts values from 1 to 365. */
	keep?: number;
	/** Schedule for automatic backups, or "manual" to disable the cron schedule. */
	schedule?: DatabaseBackupSchedule;
};

export type DatabaseBackupStatus = {
	enabled: boolean;
	backupDir: string;
	keep: number;
	schedule: DatabaseBackupSchedule;
	scriptPath: string;
	lastRun: string;
	lastStatus: string;
};

export type DatabaseBackupStatusResponseType = {
	body: DatabaseBackupStatus;
};

export type WebserverAsyncActionResponseType = {
	body: unknown;
	headers: {
		"x-callback-id": string;
	};
};

type DatabaseBackupUpdate =
	| (DatabaseBackupConfiguration & { backupDir: string })
	| (DatabaseBackupConfiguration & { keep: number })
	| (DatabaseBackupConfiguration & { schedule: DatabaseBackupSchedule });

export class ServerWebserverClass {
	databaseBackup: ServerWebserverDatabaseBackupClass;
	searchEngines: ServerWebserverSearchEnginesClass;
	basicAuth: ServerWebserverBasicAuthClass;
	certbot: ServerWebserverCertbotClass;

	constructor(parent: Webdock) {
		this.databaseBackup = new ServerWebserverDatabaseBackupClass(parent);
		this.searchEngines = new ServerWebserverSearchEnginesClass(parent);
		this.basicAuth = new ServerWebserverBasicAuthClass(parent);
		this.certbot = new ServerWebserverCertbotClass(parent);
	}
}

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

export class ServerWebserverSearchEnginesClass {
	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	block(args: {
		serverSlug: string;
		robotsTxt?: string;
	}) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/block-search-engines`,
			method: "POST",
			body: {
				robotsTxt: args.robotsTxt,
			},
			headers: ["x-callback-id"],
		});
	}

	unblock(args: { serverSlug: string }) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/unblock-search-engines`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}
}

export class ServerWebserverBasicAuthClass {
	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	enable(args: {
		serverSlug: string;
		path: string;
		username: string;
		password: string;
	}) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/enable-basic-auth`,
			method: "POST",
			body: {
				path: args.path,
				username: args.username,
				password: args.password,
			},
			headers: ["x-callback-id"],
		});
	}

	disable(args: {
		serverSlug: string;
		path: string;
	}) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/disable-basic-auth`,
			method: "POST",
			body: {
				path: args.path,
			},
			headers: ["x-callback-id"],
		});
	}
}

export class ServerWebserverCertbotClass {
	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	test(args: { serverSlug: string }) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/test-certbot`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}
}
