import { createTestClient, isE2EEnabled } from "./testUtils.js";

describe("SSH Keys API", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const client = createTestClient(token);
	const enabled = Boolean(token) && isE2EEnabled();
	const e2eIt = enabled ? test : test.skip;
	let createdId: number | undefined;

	e2eIt("list() - Retrieve all SSH keys", async () => {
		const response = await client.sshkeys.list();
		expect(response.success).toBe(true);
		if (!response.success) return;
		expect(response.response.body).toBeInstanceOf(Array);
		response.response.body.forEach((key) => {
			expect(key).toMatchObject({
				id: expect.any(Number),
				name: expect.any(String),
				key: expect.any(String),
				created: expect.any(String),
			});
		});
	});

	e2eIt("create() - Create a new SSH key", async () => {
		const dummyKey =
			"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGtest1234567890abcdefghijklmnopqrstuvwxyz test-sdk@webdock";
		const createRes = await client.sshkeys.create({
			name: `test-key-${Date.now()}`,
			publicKey: dummyKey,
		});

		expect(createRes.success).toBe(true);
		if (!createRes.success) return;
		createdId = createRes.response.body.id;
		expect(createRes.response.body).toMatchObject({
			id: expect.any(Number),
			name: expect.any(String),
			key: expect.any(String),
		});
	});

	e2eIt("delete() - Remove the created SSH key", async () => {
		if (!createdId) return;
		const delRes = await client.sshkeys.delete({ id: createdId });
		expect(delRes.success).toBe(true);
	});

	afterAll(async () => {
		if (!enabled) return;
		// Cleanup in case delete test didn't run
		if (createdId) {
			await client.sshkeys.delete({ id: createdId }).catch(() => {});
		}
	});
});
