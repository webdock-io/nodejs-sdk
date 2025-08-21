import { Webdock } from "./index.js";
import { isE2EEnabled, waitForCallback } from "./testUtils.js";

describe("Snapshots API", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const enabled = Boolean(token) && isE2EEnabled();
	const client = new Webdock(token || "");
	const it = enabled ? test : test.skip;

	let testServerSlug: string | undefined;
	let snapshotId: number | undefined;

	it("Setup: Create temporary server", async () => {
		const localServer = await client.servers.create({
			name: `temp-${Date.now()}`,
			locationId: "dk",
			profileSlug: "webdockepyc-premium",
			imageSlug: "krellide:webdock-noble-lemp",
			slug: `temp-${Date.now()}`,
		});
		expect(localServer.success).toBe(true);
		if (!localServer.success) return;
		testServerSlug = localServer.response.body.slug;
		await waitForCallback(client, localServer.response.headers["x-callback-id"]);
	});

	it("list() - Retrieve all snapshots", async () => {
		if (!testServerSlug) return;
		const snapshots = await client.snapshots.list({ serverSlug: testServerSlug });
		expect(snapshots.success).toBe(true);
		if (!snapshots.success) return;
		expect(snapshots.response.body).toBeInstanceOf(Array);
	});

	it("create() - Create temporary snapshot", async () => {
		if (!testServerSlug) return;
		const localSnapshot = await client.snapshots.create({ serverSlug: testServerSlug, name: `test-snapshot-${Date.now()}` });
		expect(localSnapshot.success).toBe(true);
		if (!localSnapshot.success) return;
		snapshotId = localSnapshot.response.body.id;
		await waitForCallback(client, localSnapshot.response.headers["x-callback-id"]);
	});

	it("delete() - Remove temporary snapshot", async () => {
		if (!testServerSlug || !snapshotId) return;
		const deleteSnapshot = await client.snapshots.delete({ serverSlug: testServerSlug, snapshotId });
		expect(deleteSnapshot.success).toBe(true);
		if (!deleteSnapshot.success) return;
		await waitForCallback(client, deleteSnapshot.response.headers["x-callback-id"]);
	});

	afterAll(async () => {
		if (!enabled) return;
		if (testServerSlug) {
			const deleteServer = await client.servers.delete({ serverSlug: testServerSlug });
			if (deleteServer.success) {
				await waitForCallback(client, deleteServer.response.headers["x-callback-id"]);
			}
		}
	});
});

