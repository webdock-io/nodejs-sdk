import { Webdock } from "./index";
import { req } from "./utils/req";

export type ServerStatus =
	| "provisioning"
	| "running"
	| "stopped"
	| "error"
	| "rebooting"
	| "starting"
	| "stopping"
	| "reinstalling"
	| "suspended";
export type VirtualizationType = "container" | "kvm";
export type ServerType = "Apache" | "Nginx" | "None";
export type ServerScriptReference = number | string;

export type CPU = {
	cores: number;
	threads: number;
};

export type ServerMetadata = {
	default_alias_disabled?: boolean;
	has_set_domains?: boolean;
	certbot_lastrun_time?: string | null;
	certbot_lastrun_result?: string | null;
	icon?: string | null;
	description?: string | null;
	notes?: string | null;
	invoice_date?: string | null;
	auto_stop_on_bandwidth_cap?: boolean;
	[key: string]: unknown;
};

export type ServerServices = {
	is_managed_server?: boolean;
	service_list?: Record<string, unknown>[];
	[key: string]: unknown;
};

export type ServerImageData = {
	slug: string;
	name: string;
	webServer: ServerType | null;
	phpVersion: string | null;
};

export type ServerProfileData = {
	slug: string;
	name: string;
	ram: number;
	disk: number;
	cpu: CPU;
	price: {
		amount: number;
		currency: string;
	};
	network_bandwidth: number;
	platform: string | null;
};

export type Server = {
	slug: string;
	name: string;
	date: string;
	location: string | null;
	image: string;
	profile: string | null;
	ipv4: string | null;
	ipv6: string | null;
	status: ServerStatus;
	pendingDeletion?: boolean;
	virtualization: VirtualizationType;
	webServer: ServerType;
	aliases: string[];
	snapshotRunTime: number;
	description: string;
	WordPressLockDown: boolean;
	SSHPasswordAuthEnabled: boolean;
	passwordlessSudoEnabled?: boolean;
	notes: string;
	nextActionDate: string;
	metadata?: ServerMetadata;
	services?: ServerServices;
	secondaryIps?: string[];
	secondary_ips?: string[];
	lastChecked?: string | null;
	lastchecked?: string | null;
	imageData?: ServerImageData;
	profileData?: ServerProfileData;
};

export type CreateServerResponseType = {
	body: Server;
	headers: {
		"x-callback-id": string;
	};
};

export type DeleteServerResponseType = {
	body: Server;
	headers: {
		"x-callback-id": string;
	};
};

export type FetchFileResponsePayload = {
	body: {
		content: string;
	};
	headers: {
		"x-callback-id": string;
	};
};

export type ListServersResponseType = {
	body: Server[];
};

export type ReinstallServerResponseType = {
	body: Server;
	headers: {
		"x-callback-id": string;
	};
};

interface WarningDTO {
	type: string;
	message: string;
	data: Record<string, string | number>;
}

interface Price {
	amount: number;
	currency: "EUR" | "DKK" | "USD";
}

interface ChargeSummaryItemDTO {
	text: string;
	price: Price;
	isRefund: boolean;
}

interface ChargeSummaryTotalDTO {
	subTotal: Price;
	vat: Price;
	total: Price;
}

interface ChargeSummaryDTO {
	items: ChargeSummaryItemDTO[];
	total: ChargeSummaryTotalDTO;
}

type DryRunResponse = {
	warnings: WarningDTO[];
	chargeSummary: ChargeSummaryDTO;
};

export type ResizeDryRunResponseType = {
	body: DryRunResponse;
};

export type ResizeResponseType = {
	body: Server;
	headers: {
		"x-callback-id": string;
	};
};

export type StartResponseType = {
	body: Server;
	headers: {
		"x-callback-id": string;
	};
};

export type ArchiveResponseType = {
	body: Server;
	headers: {
		"x-callback-id": string;
	};
};

export type UpdateServerResponseType = {
	body: Server;
};

export type CancelDeleteServerResponseType = {
	body: Server;
	headers: Partial<ResponseHeaders>;
};

export type UpdateServerIdentityResponseType = {
	body: Server;
	headers: ResponseHeaders;
};

export type AsyncActionResponseType = {
	body: unknown;
	headers: ResponseHeaders;
};

/** */
interface MetricsSamplingDTO {
	amount: number;
	timestamp: string;
}

interface DiskMetricsDTO {
	allowed: number;
	samplings: MetricsSamplingDTO[];
}

interface NetworkMetricsDTO {
	total: number;
	allowed: number;
	ingressSamplings: MetricsSamplingDTO[];
	egressSamplings: MetricsSamplingDTO[];
}

interface CpuMetricsDTO {
	usageSamplings: MetricsSamplingDTO[];
}

interface ProcessesMetricsDTO {
	processesSamplings: MetricsSamplingDTO[];
}

interface MemoryMetricsDTO {
	usageSamplings: MetricsSamplingDTO[];
}

export type MetricsNowResponseType = {
	body: {
		disk: DiskMetricsDTO;
		network: NetworkMetricsDTO;
		cpu: CpuMetricsDTO;
		processes: ProcessesMetricsDTO;
		memory: MemoryMetricsDTO;
	};
};

export class ServersClass {
	private parent: Webdock;
	scripts: ServerScriptsClass
	identity: ServerIdentityClass
	settings: ServerSettingsClass

	constructor(parent: Webdock) {
		this.parent = parent;
		this.scripts = new ServerScriptsClass(parent)
		this.identity = new ServerIdentityClass(parent)
		this.settings = new ServerSettingsClass(parent)
	}




	cancelDelete({ serverSlug }: { serverSlug: string }) {
		return req<CancelDeleteServerResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/uncancel`,
			method: "POST",
		})
	}



	create({
		name,
		locationId,
		profileSlug,
		imageSlug,
		virtualization,
		snapshotId,
		userScriptId,
		slug
	}: {
		name: string;
		locationId: string;
		profileSlug?: string;
		virtualization?: string;
		slug?: string;
		userScriptId?: ServerScriptReference;
	} & (
			| { snapshotId?: number; imageSlug?: never }
			| { imageSlug?: string; snapshotId?: never }
		)) {
		return req<CreateServerResponseType>(
			{
				token: this.parent.string_token,
				endpoint: "/servers",
				method: "POST",
				body: {
					name,
					locationId,
					profileSlug,
					imageSlug,
					virtualization,
					snapshotId,
					userScriptId,
					slug
				},
				headers: ["x-callback-id"],
			},
		);
	}
	delete({ serverSlug, }: { serverSlug: string }) {
		return req<DeleteServerResponseType>(
			{
				token: this.parent.string_token,
				endpoint: `/servers/${serverSlug}`,
				method: "DELETE",
				headers: ["x-callback-id"],
			},
		);
	}

	async fetchFileAsync({
		path,
		slug,
	}: {
		path: string;
		slug: string;
	}) {
		return req<FetchFileResponsePayload>(
			{
				endpoint: `servers/${slug}/fetchFile`,
				method: "POST",
				token: this.parent.string_token,
				body: {
					filePath: path,
				},
				headers: ["x-callback-id"],
			},
		);


	}
	async fetchFile({
		path,
		slug,
	}: {
		path: string;
		slug: string;
	}) {
		const init = await req<FetchFileResponsePayload>(
			{
				endpoint: `servers/${slug}/fetchFile`,
				method: "POST",
				token: this.parent.string_token,
				body: {
					filePath: path,
				},
				headers: ["x-callback-id"],
			},
		);
		if (!init.success) return {
			success: false,
			message: `Failed to initiate file fetch for '${path}' on server '${slug}'`,
		};

		const callbackId = init.response.headers["x-callback-id"];
		let event = await this.parent.operation.fetch(callbackId);
		if (!event.success) return {
			success: false,
			message: `Failed to retrieve operation status (callback ID: ${callbackId})`,
		};

		while (true) {
			let res = event.response.body[0];
			if (res.status === "finished") {
				return {
					success: true,
					content: res.message,
				};
			} else if (res.status === "error") {
				return {
					success: false,
					message: `File fetch failed for '${path}': ${res.message}`,
				};
			}

			await new Promise((resolve) => setTimeout(resolve, 3000));
			event = await this.parent.operation.fetch(callbackId);
			if (!event.success) return {
				success: false,
				message: `Lost connection to operation (callback ID: ${callbackId}) while fetching '${path}'`,
			};
		}
	}
	getBySlug({ serverSlug }: { serverSlug?: string; }) {
		const slug = serverSlug;

		return req<CreateServerResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${slug}`,
			method: "GET",
		});
	}
	list({ status = "all" }: { status?: "all" | "suspended" | "active" } = {}) {
		return req<ListServersResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers?status=${status}`,
			method: "GET",
		});
	}
	metrics({ now, serverSlug }: {
		serverSlug: string;
		now: boolean;
	}) {
		return req<MetricsNowResponseType>(
			{
				endpoint: `servers/${serverSlug}/metrics${now ? "/now" : ""}`,
				method: "GET",
				token: this.parent.string_token,
			},
		);
	}
	reboot({
		serverSlug,
	}: { serverSlug: string }) {
		return req<StartResponseType>(
			{
				token: this.parent.string_token,
				endpoint: `/servers/${serverSlug}/actions/reboot`,
				method: "POST",
				headers: ["x-callback-id"],
			},
		);
	}
	reinstall({ imageSlug, serverSlug, userScriptId, deleteSnapshots }: {
		deleteSnapshots?: boolean;
		serverSlug: string;
		userScriptId?: ServerScriptReference;
		imageSlug: string;
	}) {
		return req<ReinstallServerResponseType>(
			{
				token: this.parent.string_token,
				endpoint: `/servers/${serverSlug}/actions/reinstall`,
				method: "POST",
				body: {
					imageSlug, serverSlug, userScriptId, deleteSnapshots
				},
				headers: ["x-callback-id"],
			},
		);
	}
	resize({ serverSlug, profileSlug }: {
		serverSlug: string;
		profileSlug: string;
	}) {
		return req<ResizeResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/resize`,
			method: "POST",
			body: { profileSlug },
			headers: ["x-callback-id"],
		});
	}

	resizeDryRun({ serverSlug, profileSlug }: {
		serverSlug: string;
		profileSlug: string;
	}) {
		return req<ResizeDryRunResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/resize/dryrun`,
			method: "POST",
			body: { profileSlug },
		});
	}

	start({ serverSlug }: {
		serverSlug: string;
	}) {
		return req<StartResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/start`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	stop({ serverSlug, }: {
		serverSlug: string;
	}) {
		return req<StartResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/stop`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	archive({ serverSlug }: {
		serverSlug: string;
	}) {
		return req<ArchiveResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/suspend`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	update({ serverSlug, nextActionDate, name, description, notes, }: {
		serverSlug: string;
		nextActionDate?: string;
		name?: string;
		description?: string;
		notes?: string;
	}) {
		return req<UpdateServerResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}`,
			method: "PATCH",
			body: { nextActionDate, name, description, notes },
		});
	}
}

export type CreateScriptBodyType = {
	name: string;
	filename: string;
	content: string;
};

export type CreateScriptResponseType = {
	body: {
		id: number;
		name: string;
		description: string;
		filename: string;
		content: string;
		slug: string;
	};
};

export type DeleteScriptServerReturnType = {
	headers: ResponseHeaders;
};

export type ExecuteScriptOnServerReturnType = {
	body: Script;
	headers: {
		"x-callback-id": string;
	};
};

export type GetScriptByIdTResponseType = {
	body: {
		id: number;
		name: string;
		description: string;
		filename: string;
		content: string;
		slug: string;
	};
};
export interface ResponseHeaders {
	"x-callback-id": string;
}

/**
 * Response Schema (application/json)
 */
export interface Script {
	/** Script ID (int64) */
	id: number;
	/** Script name */
	name: string;
	/** Script path */
	path: string;
	/** Date/time of the last run */
	lastRun: string | null;
	/** Callback ID of the last script run */
	lastRunCallbackId: string | null;
	/** Creation date/time */
	created: string;
	slug: string;
}

export type CreateScriptOnServerResponse = {
	headers: ResponseHeaders;
	body: Script;
};
export type ListScriptsOnServerResponseType = {
	body: {
		id: number;
		name: string;
		path: string;
		lastRun: Date | null;
		lastRunCallbackId: string;
		created: Date;
		slug: string;
	}[];
};
export type ListScriptsResponse = {
	body: {
		id: number;
		name: string;
		description: string;
		filename: string;
		content: string;
		slug: string;
	}[];
};

export class ServerScriptsClass {
	private parent: Webdock;
	constructor(parent: Webdock) {
		this.parent = parent;
	}


	create({
		scriptId,
		path,
		makeScriptExecutable,
		executeImmediately,
		serverSlug,
	}: {
		scriptId: ServerScriptReference;
		path: string;
		makeScriptExecutable: boolean;
		executeImmediately: boolean;
		serverSlug: string;
	}) {
		return req<CreateScriptOnServerResponse>(
			{
				token: this.parent.string_token,
				endpoint: `/servers/${serverSlug}/scripts`,
				method: "POST",
				body: {
					scriptId,
					path,
					makeScriptExecutable,
					executeImmediately,
				},
				headers: ["x-callback-id"],
			},
		);
	}

	delete(
		{ serverSlug, scriptId }: {
			serverSlug: string;
			scriptId: number;
		},
	) {
		return req<DeleteScriptServerReturnType>(
			{
				token: this.parent.string_token,
				endpoint: `/servers/${serverSlug}/scripts/${scriptId}`,
				method: "DELETE",
				headers: ["x-callback-id"],
			},
		);
	}
	execute(
		{ serverSlug, scriptID }: {
			serverSlug: string;
			scriptID: number;
		},
	) {
		return req<ExecuteScriptOnServerReturnType>(
			{
				token: this.parent.string_token,
				endpoint: `/servers/${serverSlug}/scripts/${scriptID}/execute`,
				method: "POST",
				headers: ["x-callback-id"],
			},
		);
	}

	listOnServer({ serverSlug }: {
		token?: string;
		serverSlug: string;
	}) {
		return req<ListScriptsOnServerResponseType>(
			{
				token: this.parent.string_token,
				endpoint: `/servers/${serverSlug}/scripts`,
				method: "GET",
			},
		);
	}



}
class ServerIdentityClass {
	private parent: Webdock
	constructor(parent: Webdock) {
		this.parent = parent
	}

	update({
		serverSlug,
		maindomain,
		aliasdomains,
		removeDefaultAlias
	}: {
		serverSlug: string,
		maindomain: string,
		aliasdomains?: string,
		removeDefaultAlias?: boolean
	}) {
		return req<UpdateServerIdentityResponseType>({
			token: this.parent.string_token,
			method: "PATCH",
			endpoint: `/servers/${serverSlug}/identity`,
			headers: ["x-callback-id"],
			body: {
				maindomain,
				aliasdomains,
				removeDefaultAlias
			}
		})
	}

	renewCertificates({
		serverSlug,
		domains,
		email,
		forceSSL
	}: {
		serverSlug: string;
		domains?: string[];
		email?: string;
		forceSSL?: boolean
	}) {
		return req<AsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/run-certbot`,
			method: "POST",
			headers: ["x-callback-id"],
			body: {
				domains,
				email,
				forceSSL
			}
		})
	}
}

class ServerSettingsClass {
	private parent: Webdock
	constructor(parent: Webdock) {
		this.parent = parent
	}

	update({
		webroot,
		updateWebserver,
		updateLetsencrypt,
		serverSlug
	}: {
		webroot: string,
		updateWebserver: boolean,
		updateLetsencrypt: boolean,
		serverSlug: string
	}) {

		return req<AsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/settings`,
			method: "POST",
			headers: ["x-callback-id"],
			body: {
				webroot: webroot,
				updateWebserver: updateWebserver,
				updateLetsencrypt: updateLetsencrypt,
			}
		})
	}
}
