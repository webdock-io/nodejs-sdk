import { Webdock } from "./index.js";
import { isE2EEnabled, waitForCallback } from "./testUtils.js";

describe("Server API", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const enabled = Boolean(token) && isE2EEnabled();
	const client = new Webdock(token || "");
	const it = enabled ? test : test.skip;

	let testServerSlug: string | undefined;
	let callbackId: string | undefined;

	it("list() - Retrieve all servers", async () => {
		const servers = await client.servers.list();
		expect(servers.success).toBe(true);
		if (!servers.success) return;
		expect(servers.response.body).toBeInstanceOf(Array);
	});

	it("create() - Create temporary server for testing", async () => {
		const local = await client.servers.create({
			name: `temp-${Date.now()}`,
			locationId: "dk",
			profileSlug: "webdockepyc-premium",
			imageSlug: "krellide:webdock-noble-lemp",
			slug: `temp-${Date.now()}`,
		});
		expect(local.success).toBe(true);
		if (!local.success) return;
		testServerSlug = local.response.body.slug;
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

	afterAll(async () => {
		if (!enabled) return;
		if (testServerSlug) {
			const del = await client.servers.delete({ serverSlug: testServerSlug });
			if (del.success) {
				await waitForCallback(client, del.response.headers["x-callback-id"]);
			}
		}
	});
});

