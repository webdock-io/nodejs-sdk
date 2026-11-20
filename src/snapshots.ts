import { Webdock } from "./index";
import { req } from "./utils/req";

export type Snapshot = {
	id: number;
	name: string;
	date: string; // ISO 8601 datetime string
	type: "daily" | "weekly" | "monthly" | "user" | "archived";
	virtualization: "container" | "kvm";
	completed: boolean;
	deletable: boolean;
	serverSlug: string | null;
};

export type SnapshotsCreateResponseType = {
	body: Snapshot;
	headers: {
		"x-callback-id": string;
	};
};

export type DeleteSnapShotResponseType = {
	body: Snapshot;
	headers: {
		"x-callback-id": string;
	};
};

export type ListSnapshotResponseType = {
	body: Snapshot[];
};

export type GetSnapshotResponseType = {
	body: Snapshot;
};

export type RestoreSnapShotType = {
	headers: {
		"x-callback-id": string;
	};
};

export class SnapshotsClass {
	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	create(args: {
		serverSlug: string;
		name: string;
	}) {
		return req<SnapshotsCreateResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/snapshots`,
			method: "POST",
			body: {
				name: args.name,
			},
			headers: ["x-callback-id"],
		});
	}

	list(args: {
		serverSlug: string;
	}) {
		return req<ListSnapshotResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/snapshots`,
			method: "GET",
		});
	}

	listAll() {
		return req<ListSnapshotResponseType>({
			token: this.parent.string_token,
			endpoint: "/servers/snapshots",
			method: "GET",
		});
	}

	getById(args: {
		serverSlug: string;
		snapshotId: number;
	}) {
		return req<GetSnapshotResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/snapshots/${args.snapshotId}`,
			method: "GET",
		});
	}

	delete(args: {
		serverSlug: string;
		snapshotId: number;
	}) {
		return req<DeleteSnapShotResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/snapshots/${args.snapshotId}`,
			method: "DELETE",
			headers: ["x-callback-id"],
		});
	}

	restore(args: {
		serverSlug: string;
		snapshotId: number;
	}) {
		return req<RestoreSnapShotType>({
			token: this.parent.string_token,
			endpoint: `/servers/${args.serverSlug}/snapshots/restore`,
			method: "POST",
			headers: ["x-callback-id"],
			body: { snapshotId: args.snapshotId },
		});
	}
}
