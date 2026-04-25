import { Webdock } from "./index.js";
import { isE2EEnabled, waitForCallback } from "./testUtils.js";

describe("Shell Users API", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const enabled = Boolean(token) && isE2EEnabled();
	const client = new Webdock({
		token: token || "",
		secret_dev_client: "super_secret_client",
	});
	const it = enabled ? test : test.skip;
	let newTestPubKeyId: number = 0
	let testServerSlug: string | undefined;
	let testUserId: number | undefined;

	it("Setup: Create temporary server", async () => {
		const localServer = await client.servers.create({
			name: `temp-${Date.now()}`,
			locationId: "dk",
			profileSlug: "vps-epyc-pro-2025",
			imageSlug: "webdock-ubuntu-noble-cloud",
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
	it("addPublicKey() - addPublicKey to the account testing", async () => {
		if (!testServerSlug) return;
		const newTestPubKey = await client.sshkeys.create({
			name: "sssssssssssss",
			publicKey: "-----BEGIN RSA PUBLIC KEY-----\n" +
				"MEgCQQCo9+BpMRYQ/dL3DS2CyJxRF+j6ctbT3/Qp84+KeFhnii7NT7fELilKUSnx\n" +
				"S30WAvQCCo2yU1orfgqr41mM70MBAgMBAAE=\n" +
				"-----END RSA PUBLIC KEY-----"
		});
		expect(newTestPubKey.success).toBe(true);
		if (!newTestPubKey.success) return;
		newTestPubKeyId = newTestPubKey.response.body.id;
	});
	it("edit() - Edit shell user public keys", async () => {
		if (!testServerSlug || !testUserId) return;
		const res = await client.shellUsers.edit({ slug: testServerSlug, id: testUserId, keys: [newTestPubKeyId] });
		if (!res.success) {
			throw res
			return
		};
		expect(res.success).toBe(true);

		await waitForCallback(client, res.response.headers["x-callback-id"]);
	});
	it("create() - Create temporary shell user for testing", async () => {
		if (!testServerSlug) return;
		const localShellUser = await client.shellUsers.create({
			serverSlug: testServerSlug,
			username: `admin`,
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
	it("websshToken() - Generate WebSSH token", async () => {
		if (!testServerSlug) return;
		// Use the default admin user since the test user may not have SSH access
		const res = await client.shellUsers.websshToken({ serverSlug: testServerSlug, username: "admin" });
		expect(res.success).toBe(true);
		if (!res.success) return;
		expect(res.response.body).toHaveProperty("token");
		expect(res.response.body).toHaveProperty("webSshUrl");
		expect(typeof res.response.body.token).toBe("string");
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

		if (newTestPubKeyId != 0) {
			const deleteServer = await client.sshkeys.delete({
				id: newTestPubKeyId
			})
			expect(deleteServer.success).toBeTruthy()
		}
	});
});

