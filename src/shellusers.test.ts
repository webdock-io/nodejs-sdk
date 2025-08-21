import { Webdock } from "./index.js";
import { isE2EEnabled, waitForCallback } from "./testUtils.js";

describe("Shell Users API", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const enabled = Boolean(token) && isE2EEnabled();
	const client = new Webdock(token || "");
	const it = enabled ? test : test.skip;

	let testServerSlug: string | undefined;
	let testUserId: number | undefined;

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

	it("list() - Retrieve all shell users", async () => {
		if (!testServerSlug) return;
		const shellUsers = await client.shellUsers.list({ serverSlug: testServerSlug });
		expect(shellUsers.success).toBe(true);
		if (!shellUsers.success) return;
		expect(shellUsers.response.body).toBeInstanceOf(Array);
	});

	it("create() - Create temporary shell user for testing", async () => {
		if (!testServerSlug) return;
		const localShellUser = await client.shellUsers.create({
			serverSlug: testServerSlug,
			username: `testuser-${Date.now()}`,
			password: "testpassword123",
			group: "sudo",
			shell: "/bin/bash",
			publicKeys: [],
		});
		expect(localShellUser.success).toBe(true);
		if (!localShellUser.success) return;
		testUserId = localShellUser.response.body.id;
		await waitForCallback(client, localShellUser.response.headers["x-callback-id"]);
	});

	it("delete() - Remove temporary shell user", async () => {
		if (!testServerSlug || !testUserId) return;
		const deleteShellUser = await client.shellUsers.delete({ serverSlug: testServerSlug, userId: testUserId });
		expect(deleteShellUser.success).toBe(true);
		if (!deleteShellUser.success) return;
		await waitForCallback(client, deleteShellUser.response.headers["x-callback-id"]);
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

