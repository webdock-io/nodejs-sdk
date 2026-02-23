import { Webdock } from "./index.js";
import { isE2EEnabled, waitForCallback } from "./testUtils.js";

describe("Server API", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const enabled = Boolean(token) && isE2EEnabled();
	const client = new Webdock(token || "");
	const it = enabled ? test : test.skip;

	let testServerSlug: string | undefined;
	let testServerSlugNoUserScript: string | undefined;
	let callbackId: string | undefined;
	let fetchFileOperationId: number;

	// it("list() - Retrieve all servers", async () => {
	// 	const servers = await client.servers.list();
	// 	expect(servers.success).toBe(true);
	// 	if (!servers.success) return;
	// 	expect(servers.response.body).toBeInstanceOf(Array);
	// });

	it("create() - Create temporary server for testing", async () => {
		const local = await client.servers.create({
			name: `temp-${Date.now()}`,
			locationId: "dk",
			profileSlug: "vps-epyc-pro-2025",
			imageSlug: "webdock-ubuntu-noble-cloud",
			slug: `temp-${Date.now()}`,
			userScriptId: 355454
		});
		expect(local.success).toBe(true);
		if (!local.success) return;
		testServerSlug = local.response.body.slug;
		await waitForCallback(client, local.response.headers["x-callback-id"]);
	});

	it("create() - Create temporary server for testing - No userScriptId", async () => {
		const local = await client.servers.create({
			name: `temp-${Date.now()}`,
			locationId: "dk",
			profileSlug: "vps-epyc-pro-2025",
			imageSlug: "webdock-ubuntu-noble-cloud",
			slug: `temp-${Date.now()}`,
		});
		expect(local.success).toBe(true);
		if (!local.success) return;
		testServerSlugNoUserScript = local.response.body.slug;
		await waitForCallback(client, local.response.headers["x-callback-id"]);
	});

	it("reboot() - Reboot server", async () => {
		if (!testServerSlug) return;
		const reboot = await client.servers.reboot({ serverSlug: testServerSlug });
		expect(reboot.success).toBe(true);
		if (!reboot.success) return;
		callbackId = reboot.response.headers["x-callback-id"];
		await waitForCallback(client, callbackId);
	});

	it("stop() - Shutdown server", async () => {
		if (!testServerSlug) return;
		const stop = await client.servers.stop({ serverSlug: testServerSlug });
		expect(stop.success).toBe(true);
		if (!stop.success) return;
		callbackId = stop.response.headers["x-callback-id"];
		await waitForCallback(client, callbackId);
	});

	it("start() - Start server", async () => {
		if (!testServerSlug) return;
		const start = await client.servers.start({ serverSlug: testServerSlug });
		expect(start.success).toBe(true);
		if (!start.success) return;
		callbackId = start.response.headers["x-callback-id"];
		await waitForCallback(client, callbackId);
	});

	it("getBySlug() - Fetch server by slug", async () => {
		if (!testServerSlug) return;
		const res = await client.servers.getBySlug({ serverSlang: testServerSlug });
		expect(res.success).toBe(true);
		if (!res.success) return;
		expect(res.response.body).toMatchObject({
			slug: testServerSlug,
			name: expect.any(String),
			status: expect.any(String),
		});
	});

	it("fetchFile() - Fetch /etc/os-release from server", async () => {
		if (!testServerSlug) return;
		const res = await client.servers.fetchFile({ slug: testServerSlug, path: "/etc/os-release" });
		expect(res.success).toBe(true);


	});

	it("update() - Update server name/description", async () => {
		if (!testServerSlug) return;
		const newDesc = `test-desc-${Date.now()}`;
		const res = await client.servers.update({ serverSlug: testServerSlug, description: newDesc, name: "NEW NAME " + Date.now() });
		expect(res.success).toBe(true);
		if (!res.success) return;
		expect(res.response.body).toMatchObject({
			slug: testServerSlug,
		});
	});

	it("resizeDryRun() - Dry run resize", async () => {
		if (!testServerSlug) return;
		const res = await client.servers.resizeDryRun({ serverSlug: testServerSlug, profileSlug: "wp-business-2026" });
		expect(res.success).toBe(true);
		if (!res.success) return;
		expect(res.response.body).toHaveProperty("chargeSummary");
	});

	it("metrics() - Retrieve real-time server metrics", async () => {
		if (!testServerSlug) return;
		const res = await client.servers.metrics({ serverSlug: testServerSlug, now: true });
		expect(res.success).toBe(true);
		if (res.success) {
			expect(res.response.body).toMatchObject({
				disk: { allowed: expect.any(Number) },
				network: { total: expect.any(Number), allowed: expect.any(Number) },
				cpu: expect.any(Object),
				processes: expect.any(Object),
				memory: expect.any(Object),
			});
		}
	});

	it("reinstall() - reinstall websocker service", async () => {
		if (!testServerSlug) return;
		const res = await client.servers.reinstall({
			serverSlug: testServerSlug, userScriptId: 355455,
			imageSlug: "webdock-ubuntu-noble-cloud",
			deleteSnapshots: true





		});
		expect(res.success).toBe(true);
		if (res.success) {
			await waitForCallback(client, res.response.headers["x-callback-id"])
		}
	});


	afterAll(async () => {
		if (!enabled) return;
		if (testServerSlug) {
			const del = await client.servers.delete({ serverSlug: testServerSlug });
			if (del.success) {
				await waitForCallback(client, del.response.headers["x-callback-id"]);
			}
		}
		if (testServerSlugNoUserScript) {
			const del = await client.servers.delete({ serverSlug: testServerSlugNoUserScript });
			if (del.success) {
				await waitForCallback(client, del.response.headers["x-callback-id"]);
			}
		}

	});
});

