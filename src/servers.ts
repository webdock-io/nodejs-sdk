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

export type Server = {
	slug: string;
	name: string;
	date: string;
	location: string;
	image: string;
	profile: string;
	ipv4: string | null;
	ipv6: string | null;
	status: ServerStatus;
	virtualization: VirtualizationType;
	webServer: ServerType;
	aliases: [
		string,
	];
	snapshotRunTime: 0;
	description: string;
	WordPressLockDown: boolean;
	SSHPasswordAuthEnabled: boolean;
	notes: string;
	nextActionDate: string;
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
	constructor(parent: Webdock) {
		this.parent = parent;
	}

	create({
		name,
		locationId,
		profileSlug,
		imageSlug,
		virtualization,
		slug,
		snapshotId,
	}: {
		name: string;
		locationId: string;
		profileSlug?: string;
		imageSlug?: string;
		virtualization?: string;
		slug?: string;
		snapshotId?: number;
	}) {
		return req<CreateServerResponseType>(
			{
				token: this.parent.string_token,
				endpoint: "/servers",
				method: "POST",
				body: {
					name: name,
					locationId: locationId,
					profileSlug: profileSlug,
					imageSlug: imageSlug,
					virtualization: virtualization,
					slug: slug,
					snapshotId,
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
	fetchFile({
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
	getBySlug({ serverSlang, }: { serverSlang: string; }) {
		return req<CreateServerResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlang}`,
			method: "GET",
		});
	}
	list() {
		return req<ListServersResponseType>({
			token: this.parent.string_token,
			endpoint: "/servers",
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
	reinstall({ imageSlug, serverSlug, }: {
		imageSlug: string;
		serverSlug: string;
	}) {
		return req<ReinstallServerResponseType>(
			{
				token: this.parent.string_token,
				endpoint: `/servers/${serverSlug}/actions/reinstall`,
				method: "POST",
				body: {
					imageSlug,
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
