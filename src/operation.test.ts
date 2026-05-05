import { createTestClient, isE2EEnabled } from "./testUtils.js";

describe("Operation API", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const client = createTestClient(token);
	const enabled = Boolean(token) && isE2EEnabled();
	const e2eIt = enabled ? test : test.skip;

	e2eIt("fetch() - Fetch event log by callbackId", async () => {
		const res = await client.operation.fetch("non-existent-callback-id");
		expect(res.success).toBe(true);
		if (!res.success) return;
		// A non-existent callbackId should return an empty array
		expect(res.response.body).toBeInstanceOf(Array);
	});
});
