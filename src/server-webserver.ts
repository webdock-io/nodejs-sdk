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
	db: ServerWebserverDatabaseClass;
	wordpress: ServerWebserverWordpressClass;

	constructor(parent: Webdock) {
		this.db = new ServerWebserverDatabaseClass(parent);
		this.wordpress = new ServerWebserverWordpressClass(parent);
	}
}

export class ServerWebserverDatabaseClass {
	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	status({ serverSlug }: { serverSlug: string }) {
		return req<DatabaseBackupStatusResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/db-backup-on-disk`,
			method: "GET",
		});
	}

	enable({
		serverSlug,
		backupDir,
		keep,
		schedule,
	}: {
		serverSlug: string;
	} & DatabaseBackupConfiguration) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/db-backup-on-disk`,
			method: "POST",
			body: {
				backupDir,
				keep,
				schedule,
			},
			headers: ["x-callback-id"],
		});
	}

	update({
		serverSlug,
		backupDir,
		keep,
		schedule,
	}: {
		serverSlug: string;
	} & DatabaseBackupUpdate) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/db-backup-on-disk`,
			method: "PATCH",
			body: {
				backupDir,
				keep,
				schedule,
			},
			headers: ["x-callback-id"],
		});
	}

	disable({ serverSlug }: { serverSlug: string }) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/db-backup-on-disk/disable`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	run({ serverSlug }: { serverSlug: string }) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/db-backup-on-disk/run`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}
}

export class ServerWebserverWordpressClass {
	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	blockSearchEngines({
		serverSlug,
		robotsTxt,
	}: {
		serverSlug: string;
		robotsTxt?: string;
	}) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/block-search-engines`,
			method: "POST",
			body: {
				robotsTxt,
			},
			headers: ["x-callback-id"],
		});
	}

	unblockSearchEngines({ serverSlug }: { serverSlug: string }) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/unblock-search-engines`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	enableBasicAuth({
		serverSlug,
		path,
		username,
		password,
	}: {
		serverSlug: string;
		path: string;
		username: string;
		password: string;
	}) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/enable-basic-auth`,
			method: "POST",
			body: {
				path,
				username,
				password,
			},
			headers: ["x-callback-id"],
		});
	}

	disableBasicAuth({
		serverSlug,
		path,
	}: {
		serverSlug: string;
		path: string;
	}) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/disable-basic-auth`,
			method: "POST",
			body: {
				path,
			},
			headers: ["x-callback-id"],
		});
	}

	testCertbot({ serverSlug }: { serverSlug: string }) {
		return req<WebserverAsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/test-certbot`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}
}
