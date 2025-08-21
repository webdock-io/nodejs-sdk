import { Webdock } from "./index";
import { req } from "./utils/req";

export type Snapshot = {
	id: number;
	name: string;
	date: string; // ISO 8601 datetime string
	type: "daily" | "weekly" | "monthly";
	virtualization: "container" | "kvm";
	completed: boolean;
	deletable: boolean;
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

export type RestoreSnapShotType = {
	body: Snapshot;
	headers: {
		"x-callback-id": string;
	};
};

export class SnapshotsClass {
	private parent: Webdock;

	constructor(parent: Webdock) {
		this.parent = parent;
	}

	create({
		serverSlug,
		name,
	}: {
		serverSlug: string;
		name: string;
	}) {
		return req<SnapshotsCreateResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/snapshots`,
			method: "POST",
			body: {
				name,
			},
			headers: ["x-callback-id"],
		});
	}

	list({
		serverSlug,
	}: {
		serverSlug: string;
	}) {
		return req<ListSnapshotResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/snapshots`,
			method: "GET",
		});
	}

	delete({
		serverSlug,
		snapshotId,
	}: {
		serverSlug: string;
		snapshotId: number;
	}) {
		return req<DeleteSnapShotResponseType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/snapshots/${snapshotId}`,
			method: "DELETE",
			headers: ["x-callback-id"],
		});
	}

	restore({
		serverSlug,
		snapshotId,
	}: {
		serverSlug: string;
		snapshotId: number;
	}) {
		return req<RestoreSnapShotType>({
			token: this.parent.string_token,
			endpoint: `/servers/${serverSlug}/actions/restore`,
			method: "POST",
			headers: ["x-callback-id"],
			body: {
				snapshotId: snapshotId,
			},
		});
	}
}
