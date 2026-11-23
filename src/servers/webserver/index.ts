import type { Webdock } from "../../index.js";
import { ServerWebserverDatabaseBackupClass } from "./database-backup/index.js";
import { ServerWebserverSearchEnginesClass } from "./search-engines/index.js";
import { ServerWebserverBasicAuthClass } from "./basic-auth/index.js";
import { ServerWebserverCertbotClass } from "./certbot/index.js";

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

export type DatabaseBackupUpdate =
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




