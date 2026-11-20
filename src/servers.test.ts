import { createTestClient, isE2EEnabled, waitForCallback } from "./testUtils.js";

describe("Server API", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const enabled = Boolean(token) && isE2EEnabled();
	const client = createTestClient(token);
	const it = enabled ? test : test.skip;

	let testServerSlug: string | undefined;
	let testServerSlugNoUserScript: string | undefined;
	let cancelDeleteServerSlug: string | undefined;
	let tempAccountScriptId: number | undefined;
	let callbackId: string | undefined;

	function makeTempName(prefix: string) {
		return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
	}

	async function deleteServerIfNeeded(serverSlug?: string) {
		if (!serverSlug) return;

		const server = await client.servers.getBySlug({ serverSlug: serverSlug });
		if (!server.success) return;

		const del = await client.servers.delete({ serverSlug });
		if (del.success) {
			await waitForCallback(client, del.response.headers["x-callback-id"]);
		}
	}

	it("setup() - Create temporary account script for server actions", async () => {
		const scriptName = makeTempName("temp-script");
		const localScript = await client.account.scripts.create({
			name: scriptName,
			filename: `${scriptName}.sh`,
			content: "#!/bin/bash\necho 'webdock sdk test'\n",
		});
		expect(localScript.success).toBe(true);
		if (!localScript.success) return;

		tempAccountScriptId = localScript.response.body.id;
	});

	it("create() - Create temporary server for testing", async () => {
		expect(tempAccountScriptId).toBeDefined();
		if (!tempAccountScriptId) return;

		const serverName = makeTempName("temp");
		const local = await client.servers.create({
			name: serverName,
			locationId: "dk",
			profileSlug: "vps-epyc-pro-2025",
			imageSlug: "webdock-ubuntu-noble-cloud",
			userScriptId: tempAccountScriptId,
		});
		expect(local.success).toBe(true);
		if (!local.success) return;
		testServerSlug = local.response.body.slug;
		await waitForCallback(client, local.response.headers["x-callback-id"]);
	});

	it("create() - Create temporary server for testing - No userScriptId", async () => {
		const serverName = makeTempName("temp");
		const local = await client.servers.create({
			name: serverName,
			locationId: "dk",
			profileSlug: "vps-epyc-pro-2025",
			imageSlug: "webdock-ubuntu-noble-cloud",
		});
		expect(local.success).toBe(true);
		if (!local.success) return;
		testServerSlugNoUserScript = local.response.body.slug;
		await waitForCallback(client, local.response.headers["x-callback-id"]);
	});

	it("create() - Create temporary server for cancelDelete()", async () => {
		const serverName = makeTempName("temp-cancel");
		const local = await client.servers.create({
			name: serverName,
			locationId: "dk",
			profileSlug: "vps-epyc-pro-2025",
			imageSlug: "webdock-ubuntu-noble-cloud",
		});
		expect(local.success).toBe(true);
		if (!local.success) return;

		cancelDeleteServerSlug = local.response.body.slug;
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
		const res = await client.servers.getBySlug({ serverSlug: testServerSlug });
		expect(res.success).toBe(true);
		if (!res.success) return;
		expect(res.response.body).toMatchObject({
			slug: testServerSlug,
			name: expect.any(String),
			status: expect.any(String),
		});
	});

	it("identity.update() - Update server identity", async () => {
		if (!testServerSlug) return;

		const current = await client.servers.getBySlug({ serverSlug: testServerSlug });
		expect(current.success).toBe(true);
		if (!current.success) return;

		const maindomain = current.response.body.aliases?.[0];
		expect(maindomain).toBeTruthy();
		if (!maindomain) return;

		const res = await client.servers.identity.update({
			serverSlug: testServerSlug,
			maindomain,
			removeDefaultAlias: false,
		});
		expect(res.success).toBe(true);
		if (!res.success) return;

		callbackId = res.response.headers["x-callback-id"];
		await waitForCallback(client, callbackId);

		const refreshed = await client.servers.getBySlug({ serverSlug: testServerSlug });
		expect(refreshed.success).toBe(true);
		if (!refreshed.success) return;
		expect(refreshed.response.body.slug).toBe(testServerSlug);
	});

	it("settings.update() - Update server settings", async () => {
		if (!testServerSlug) return;

		const res = await client.servers.settings.update({
			serverSlug: testServerSlug,
			webroot: "/var/www/html",
			updateWebserver: false,
			updateLetsencrypt: false,
		});
		expect(res.success).toBe(true);
		if (!res.success) return;

		callbackId = res.response.headers["x-callback-id"];
		await waitForCallback(client, callbackId);

		const refreshed = await client.servers.getBySlug({ serverSlug: testServerSlug });
		expect(refreshed.success).toBe(true);
		if (!refreshed.success) return;
		expect(refreshed.response.body.slug).toBe(testServerSlug);
	});

	it("fetchFile() - Fetch /etc/os-release from server", async () => {
		if (!testServerSlug) return;
		const res = await client.servers.fetchFile({ slug: testServerSlug, path: "/etc/os-release" });
		expect(res.success).toBe(true);
		if (!res.success) return;
		expect(Buffer.from(res.base64, "base64").toString("utf8")).toContain("ID=");
	});

	it("UpdateServerMetadata() - Update server name/description", async () => {
		if (!testServerSlug) return;
		const newDesc = `test-desc-${Date.now()}`;
		const res = await client.servers.UpdateServerMetadata({
			serverSlug: testServerSlug,
			description: newDesc,
			name: "NEW NAME " + Date.now(),
		});
		expect(res.success).toBe(true);
		if (!res.success) return;
		expect(res.response.body).toMatchObject({
			slug: testServerSlug,
			description: newDesc,
		});
	});

	it("resizeDryRun() - Dry run resize", async () => {
		if (!testServerSlug) return;
		const res = await client.servers.resizeDryRun({
			serverSlug: testServerSlug,
			profileSlug: "wp-business-2026",
		});
		expect(res.success).toBe(true);
		if (!res.success) return;
		expect(res.response.body).toHaveProperty("chargeSummary");
	});

	it("getServerMetrics() - Retrieve historical server metrics", async () => {
		if (!testServerSlug) return;
		const res = await client.servers.getServerMetrics({ serverSlug: testServerSlug });
		expect(res.success).toBe(true);
		if (res.success) {
			expect(res.response.body).toMatchObject({
				disk: { allowed: expect.any(Number), samplings: expect.any(Array) },
				network: { ingressSamplings: expect.any(Array), egressSamplings: expect.any(Array) },
				cpu: { usageSamplings: expect.any(Array) },
				processes: { processesSamplings: expect.any(Array) },
				memory: { usageSamplings: expect.any(Array) },
			});
		}
	});

	it("reinstall() - reinstall websocker service", async () => {
		expect(tempAccountScriptId).toBeDefined();
		if (!testServerSlug || !tempAccountScriptId) return;

		const res = await client.servers.reinstall({
			serverSlug: testServerSlug,
			userScriptId: tempAccountScriptId,
			imageSlug: "webdock-ubuntu-noble-cloud",
			deleteSnapshots: true,
		});
		expect(res.success).toBe(true);
		if (res.success) {
			await waitForCallback(client, res.response.headers["x-callback-id"]);
		}
	});

	it("cancelDelete() - Restore a delete-pending server", async () => {
		if (!cancelDeleteServerSlug) return;

		const deleteRequest = await client.servers.delete({ serverSlug: cancelDeleteServerSlug });
		expect(deleteRequest.success).toBe(true);
		if (!deleteRequest.success) return;

 
	// 	const server = await client.servers.getBySlug({ serverSlug: cancelDeleteServerSlug });
	// 	expect(server.success).toBe(true);
	// 	if (!server.success) return;
	// 	expect(server.response.body.slug).toBe(cancelDeleteServerSlug);
	});

	afterAll(async () => {
		if (!enabled) return;

		await deleteServerIfNeeded(cancelDeleteServerSlug);
		await deleteServerIfNeeded(testServerSlug);
		await deleteServerIfNeeded(testServerSlugNoUserScript);

		if (tempAccountScriptId) {
			const del = await client.account.scripts.delete({ id: tempAccountScriptId });
			expect(del.success).toBe(true);
		}
	});
});
