import { Webdock } from "../index";
import { ServerWebserverClass } from "./webserver/index.js";
import { ServerMailClass } from "./mail/index.js";
import { ServerScriptsClass } from "./scripts/index.js";
import { ServerIpBlock } from "./ip-block/index.js";
import { ServerIdentityClass } from "./identity/index.js";
import { ServerSettingsClass } from "./settings/index.js";
import { ServerMonitoringClass } from "./monitoring/index.js";
import { ServerWordpressClass } from "./wordpress/index.js";
import { req } from "../utils/req";

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
export type RenewServerCertResponseType = {
	headers: {
		"x-callback-id": string;
	};
};

export type SSHSettings = {
	serverSlug: string;
	passwordSshAuthEnabled?: boolean;
	passwordlessSudoEnabled?: boolean;
	sshPort?: number;
};

export type SSHSettingsResponseType = {
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

export type CreateServerSnapshotActionResponseType = {
	body: {
		id: number;
		name: string;
		date: string;
		type: "daily" | "weekly" | "monthly" | "user" | "archived";
		virtualization: "container" | "kvm";
		completed: boolean;
		deletable: boolean;
		serverSlug: string | null;
	};
	headers: ResponseHeaders;
};

export interface MetricsSamplingDTO {
	amount: number;
	timestamp: string;
}

export interface MetricsPercentSamplingDTO {
	percent: number;
	timestamp: string;
}

export interface MetricsValueSamplingDTO {
	value: number;
	timestamp: string;
}

export interface DiskDetailedMetricsDTO {
	diskReadBytes: MetricsValueSamplingDTO[];
	filesystemSizeBytes: MetricsValueSamplingDTO[];
	filesystemAvailBytes: MetricsValueSamplingDTO[];
	filesystemFreeBytes: MetricsValueSamplingDTO[];
	diskWrittenBytes: MetricsValueSamplingDTO[];
	diskReadsCompleted: MetricsValueSamplingDTO[];
	diskWritesCompleted: MetricsValueSamplingDTO[];
}

export interface NetworkDetailedMetricsDTO {
	networkReceiveBytes: MetricsValueSamplingDTO[];
	networkTransmitBytes: MetricsValueSamplingDTO[];
	networkReceiveDroppedPackets: MetricsValueSamplingDTO[];
	networkTransmitDroppedPackets: MetricsValueSamplingDTO[];
	networkReceiveErrors: MetricsValueSamplingDTO[];
	networkTransmitErrors: MetricsValueSamplingDTO[];
	networkReceivePackets: MetricsValueSamplingDTO[];
	networkTransmitPackets: MetricsValueSamplingDTO[];
}

export interface CpuDetailedMetricsDTO {
	bootTimeSeconds: MetricsValueSamplingDTO[];
	cpuEffectiveTotal: MetricsValueSamplingDTO[];
}

export interface MemoryDetailedMetricsDTO {
	memoryActiveBytes: MetricsValueSamplingDTO[];
	memoryMemAvailableBytes: MetricsValueSamplingDTO[];
	memoryMemFreeBytes: MetricsValueSamplingDTO[];
	memoryMemTotalBytes: MetricsValueSamplingDTO[];
	memoryActiveFileBytes: MetricsValueSamplingDTO[];
	memoryActiveAnonBytes: MetricsValueSamplingDTO[];
	memoryInactiveBytes: MetricsValueSamplingDTO[];
	memoryInactiveFileBytes: MetricsValueSamplingDTO[];
	memoryInactiveAnonBytes: MetricsValueSamplingDTO[];
	memoryRssBytes: MetricsValueSamplingDTO[];
	memoryShmemBytes: MetricsValueSamplingDTO[];
	memorySwapBytes: MetricsValueSamplingDTO[];
	memoryUnevictableBytes: MetricsValueSamplingDTO[];
	memoryWritebackBytes: MetricsValueSamplingDTO[];
	memoryCachedBytes: MetricsValueSamplingDTO[];
	memoryDirtyBytes: MetricsValueSamplingDTO[];
	memoryMappedBytes: MetricsValueSamplingDTO[];
	memoryHugepagesTotalBytes: MetricsValueSamplingDTO[];
	memoryHugepagesFreeBytes: MetricsValueSamplingDTO[];
	memoryOomKills: MetricsValueSamplingDTO[];
}

export interface DiskMetricsDTO {
	allowed: number;
	samplings: MetricsSamplingDTO[];
	detailedMetrics: DiskDetailedMetricsDTO;
}

export interface NetworkMetricsDTO {
	total: number;
	allowed: number;
	ingressSamplings: MetricsSamplingDTO[];
	egressSamplings: MetricsSamplingDTO[];
	detailedMetrics: NetworkDetailedMetricsDTO;
}

export interface CpuMetricsDTO {
	usageSamplings: MetricsSamplingDTO[];
	usagePercentSamplings: MetricsPercentSamplingDTO[];
	detailedMetrics: CpuDetailedMetricsDTO;
}

export interface ProcessesMetricsDTO {
	processesSamplings: MetricsSamplingDTO[];
}

export interface MemoryMetricsDTO {
	usageSamplings: MetricsSamplingDTO[];
	detailedMetrics: MemoryDetailedMetricsDTO;
}

export type ResourceUsageLevel = "ok" | "warn" | "crit";

export interface ResourceUsageMetricStatusDTO {
	used: number;
	allowed: number;
	percentUsed: number;
	warnThresholdPercent: number;
	criticalThresholdPercent: number;
	thresholdHit: boolean;
	level: ResourceUsageLevel;
}

export interface ResourceUsageProblemResourceDTO {
	resource:
	| "network"
	| "disk"
	| "memory"
	| "cpu"
	| "memoryOomKills"
	| "networkDroppedPackets"
	| "networkErrors";
	level: ResourceUsageLevel;
	evidence: Record<string, unknown> | null;
}

export interface ResourceUsageStatusDTO {
	hasIssues: boolean;
	level: ResourceUsageLevel;
	network: ResourceUsageMetricStatusDTO;
	disk: ResourceUsageMetricStatusDTO;
	memory: ResourceUsageMetricStatusDTO;
	cpu: ResourceUsageMetricStatusDTO;
	problemResources: ResourceUsageProblemResourceDTO[];
}

export interface ServerMetricsDTO {
	disk: DiskMetricsDTO;
	network: NetworkMetricsDTO;
	cpu: CpuMetricsDTO;
	processes: ProcessesMetricsDTO;
	memory: MemoryMetricsDTO;
	resourceUsageStatus: ResourceUsageStatusDTO;
	meta: Record<string, unknown>;
}

type LatestDetailedMetrics<T> = { [K in keyof T]: MetricsValueSamplingDTO };

export type InstantDiskDetailedMetricsDTO =
	LatestDetailedMetrics<DiskDetailedMetricsDTO>;
export type InstantNetworkDetailedMetricsDTO =
	LatestDetailedMetrics<NetworkDetailedMetricsDTO>;
export type InstantCpuDetailedMetricsDTO =
	LatestDetailedMetrics<CpuDetailedMetricsDTO>;
export type InstantMemoryDetailedMetricsDTO =
	LatestDetailedMetrics<MemoryDetailedMetricsDTO>;

export interface InstantDiskMetricsDTO {
	allowed: number;
	lastSamplings: MetricsSamplingDTO;
	detailedMetrics: InstantDiskDetailedMetricsDTO;
}

export interface InstantNetworkMetricsDTO {
	total: number;
	allowed: number;
	latestIngressSampling: MetricsSamplingDTO;
	latestEgressSampling: MetricsSamplingDTO;
	detailedMetrics: InstantNetworkDetailedMetricsDTO;
}

export interface InstantCpuMetricsDTO {
	latestUsageSampling: MetricsSamplingDTO;
	latestUsagePercentSampling: MetricsPercentSamplingDTO;
	detailedMetrics: InstantCpuDetailedMetricsDTO;
}

export interface InstantProcessesMetricsDTO {
	latestProcessesSampling: MetricsSamplingDTO;
}

export interface InstantMemoryMetricsDTO {
	latestUsageSampling: MetricsSamplingDTO;
	detailedMetrics: InstantMemoryDetailedMetricsDTO;
}

export interface InstantServerMetricsDTO {
	disk: InstantDiskMetricsDTO;
	network: InstantNetworkMetricsDTO;
	cpu: InstantCpuMetricsDTO;
	processes: InstantProcessesMetricsDTO;
	memory: InstantMemoryMetricsDTO;
	resourceUsageStatus: ResourceUsageStatusDTO;
}

export interface ServerMetricsWarningServerDTO {
	slug: string;
	name: string;
	locationName: string;
	locationCity: string;
}

export interface ServerMetricsWarningRowDTO {
	server: ServerMetricsWarningServerDTO;
	resourceUsageStatus: ResourceUsageStatusDTO;
}

export interface ServerMetricsWarningsOverviewDTO {
	count: number;
	rows: ServerMetricsWarningRowDTO[];
}

export type ServerMetricsResponseType = {
	body: ServerMetricsDTO;
};

export type InstantServerMetricsResponseType = {
	body: InstantServerMetricsDTO;
};

export type ServerMetricsWarningsOverviewResponseType = {
	body: ServerMetricsWarningsOverviewDTO;
};

export type IpBlockStatsv = {
	/** CIDR prefix for this block */
	cidr: string;

	/** Total number of IP rows in the database for this block */
	total: number;

	/** Number of assignable free IPs: free IPs minus user-banned IPs */
	free: number;

	/** Number of used IPs */
	used: number;

	/** Number of user-banned free IPs for this server owner */
	banned: number;

	/** Number of reserved IPs in this block, administratively reserved by Webdock */
	reserved: number;
};

/** GET /servers/{serverSlug}/ipBlocks returns a map of block ID to that block's stats. */
export type ListIpBlocksResponseType = {
	body: Record<string, IpBlockStatsv>;
};

type FetchFileResult =
	| {
		success: true;
		base64: string;
	}
	| {
		success: false;
		message: string;
	};
export class ServersClass {
	private parent: Webdock;
	scripts: ServerScriptsClass;
	identity: ServerIdentityClass;
	settings: ServerSettingsClass;
	IpBlock: ServerIpBlock;
	webserver: ServerWebserverClass;
	mail: ServerMailClass;
	monitoring: ServerMonitoringClass;
	wordpress: ServerWordpressClass;

	constructor(parent: Webdock) {
		this.parent = parent;
		this.scripts = new ServerScriptsClass(parent);
		this.identity = new ServerIdentityClass(parent);
		this.settings = new ServerSettingsClass(parent);
		this.IpBlock = new ServerIpBlock(parent);
		this.webserver = new ServerWebserverClass(parent);
		this.mail = new ServerMailClass(parent);
		this.monitoring = new ServerMonitoringClass(parent);
		this.wordpress = new ServerWordpressClass(parent);
	}

	cancelDelete(args: { serverSlug: string }) {
		return req<CancelDeleteServerResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/uncancel`,
			method: "POST",
		});
	}

	create(args: {
		name: string;
		locationId: string;
		profileSlug?: string;
		userScriptId?: ServerScriptReference;
	} & (
			| { snapshotId?: number; imageSlug?: never }
			| { imageSlug?: string; snapshotId?: never }
		)) {
		return req<CreateServerResponseType>({
			token: this.parent.string_token,
			endpoint: "/servers",
			method: "POST",
			body: {
				name: args.name,
				locationId: args.locationId,
				profileSlug: args.profileSlug,
				imageSlug: args.imageSlug,
				snapshotId: args.snapshotId,
				userScriptId: args.userScriptId,
			},
			headers: ["x-callback-id"],
		});
	}
	delete(args: { serverSlug: string }) {
		return req<DeleteServerResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}`,
			method: "DELETE",
			headers: ["x-callback-id"],
		});
	}

	async StartFileFetch(args: { path: string; slug: string }) {
		return req<FetchFileResponsePayload>({
			endpoint: `servers/${args.slug}/fetchFile`,
			method: "POST",
			token: this.parent.string_token,
			body: {
				filePath: args.path,
			},
			headers: ["x-callback-id"],
		});
	}

	async fetchFile(args: {
		path: string;
		slug: string;
	}): Promise<FetchFileResult> {
		const init = await this.StartFileFetch({ path: args.path, slug: args.slug });

		if (!init.success) {
			return {
				success: false,
				message: `Failed to initiate file fetch for '${args.path}' on server '${args.slug}'`,
			};
		}

		const callbackId = init.response.headers["x-callback-id"];

		const event = await this.parent.operation.waitForEventToEnd(callbackId);

		if (!event.success) {
			return {
				success: false,
				message: `Failed to retrieve operation status (callback ID: ${callbackId})`,
			};
		}

		return {
			success: true,
			base64: event.data,
		};
	}

	getBySlug(args: { serverSlug: string }) {
		return req<CreateServerResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}`,
			method: "GET",
		});
	}
	list(args: { status?: "all" | "suspended" | "active" | "archived" } = {}) {
		return req<ListServersResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers?status=${args.status ?? "all"}`,
			method: "GET",
		});
	}
	getServerMetrics(args: {
		serverSlug: string;
		resolutionSeconds?: number;
		maxSamples?: number;
		from?: string | number;
		to?: string | number;
	}) {
		const params = new URLSearchParams();
		if (args.resolutionSeconds !== undefined)
			params.set("resolutionSeconds", String(args.resolutionSeconds));
		if (args.maxSamples !== undefined) params.set("maxSamples", String(args.maxSamples));
		if (args.from !== undefined) params.set("from", String(args.from));
		if (args.to !== undefined) params.set("to", String(args.to));
		const query = params.toString();
		return req<ServerMetricsResponseType>({
			endpoint: `/servers/${args.serverSlug}/metrics${query ? `?${query}` : ""}`,
			method: "GET",
			token: this.parent.string_token,
		});
	}
	getInstantMetrics(args: { serverSlug: string }) {
		return req<InstantServerMetricsResponseType>({
			endpoint: `/servers/${args.serverSlug}/metrics/now`,
			method: "GET",
			token: this.parent.string_token,
		});
	}
	getServerMetricsWarningsOverview(args: {
		serverSlug?: string;
		includeOk?: boolean;
	} = {}) {
		const params = new URLSearchParams();
		if (args.serverSlug !== undefined) params.set("serverSlug", args.serverSlug);
		if (args.includeOk !== undefined) params.set("includeOk", String(args.includeOk));
		const query = params.toString();
		return req<ServerMetricsWarningsOverviewResponseType>({
			endpoint: `/servers/metrics/warnings${query ? `?${query}` : ""}`,
			method: "GET",
			token: this.parent.string_token,
		});
	}
	reboot(args: { serverSlug: string }) {
		return req<StartResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/reboot`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	snapshot(args: { serverSlug: string; name: string }) {
		return req<CreateServerSnapshotActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/snapshot`,
			method: "POST",
			body: {
				name: args.name,
			},
			headers: ["x-callback-id"],
		});
	}

	disableIpv6(args: { serverSlug: string }) {
		return req<AsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/disable-ipv6`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	enableIpv6(args: { serverSlug: string }) {
		return req<AsyncActionResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/enable-ipv6`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	toggleSSHSettings(args: SSHSettings) {
		return req<SSHSettingsResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/sshSettings`,
			method: "POST",
			body: {
				passwordSshAuthEnabled: args.passwordSshAuthEnabled,
				passwordlessSudoEnabled: args.passwordlessSudoEnabled,
				sshPort: args.sshPort,
			},
			headers: ["x-callback-id"],
		});
	}

	reinstall(args: {
		deleteSnapshots?: boolean;
		serverSlug: string;
		userScriptId?: ServerScriptReference;
		imageSlug: string;
	}) {
		return req<ReinstallServerResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/reinstall`,
			method: "POST",
			body: {
				imageSlug: args.imageSlug,
				userScriptId: args.userScriptId,
				deleteSnapshots: args.deleteSnapshots,
			},
			headers: ["x-callback-id"],
		});
	}
	resize(args: {
		serverSlug: string;
		profileSlug: string;
	}) {
		return req<ResizeResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/resize`,
			method: "POST",
			body: { profileSlug: args.profileSlug },
			headers: ["x-callback-id"],
		});
	}

	resizeDryRun(args: {
		serverSlug: string;
		profileSlug: string;
	}) {
		return req<ResizeDryRunResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/resize/dryrun`,
			method: "POST",
			body: { profileSlug: args.profileSlug },
		});
	}

	start(args: { serverSlug: string }) {
		return req<StartResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/start`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	stop(args: { serverSlug: string }) {
		return req<StartResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/stop`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	archive(args: { serverSlug: string }) {
		return req<ArchiveResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/actions/archive`,
			method: "POST",
			headers: ["x-callback-id"],
		});
	}

	UpdateServerMetadata(args: {
		serverSlug: string;
		nextActionDate?: string;
		name?: string;
		description?: string;
		notes?: string;
	}) {
		return req<UpdateServerResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}`,
			method: "PATCH",
			body: {
				nextActionDate: args.nextActionDate,
				name: args.name,
				description: args.description,
				notes: args.notes,
			},
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

export type GetScriptOnServerReturnType = {
	body: Script;
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


export interface ServerIp {
	/** IP row ID, as used by updateServerIps and inspectIpBlock. */
	id: number;
	/** ID of the IP block this address belongs to (see getServerIpBlocks). */
	blockId: number;
	/** IPv4 address, or null for IPv6-only assignments. */
	ipv4: string | null;
	/** IPv6 address, or null when the block has no IPv6. */
	ipv6: string | null;
	/** True for the server's primary IP (its outbound address). Exactly one IP per server is primary. */
	primary: boolean;
	/** True when this IP is billed in addition to the server price (every additional IP). */
	billable: boolean;
	/** Custom reverse DNS (PTR) hostname, or null for the default (the server's main domain for the primary IP, none otherwise). */
	reverseDns: string | null;
}

export type ChangeIPAddressResponseType = {
	headers: ResponseHeaders;
	body: ServerIp[];
};

type ServerIpToAdd =
	| { ipId: number; blockId?: never; primary?: boolean; reverseDns?: string | null }
	| { blockId: number; ipId?: never; primary?: boolean; reverseDns?: string | null };

export type ChangeIPAddressArgs = {
	serverSlug: string;
	add?: ServerIpToAdd[];
	remove?: number[];
	banRemovedIpIds?: number[];
	primaryIpId?: number | null;
	reverseDns?: { ipId: number; hostname: string | null }[];
};



