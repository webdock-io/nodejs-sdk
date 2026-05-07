import { createTestClient, isE2EEnabled } from "./testUtils.js";

describe("Webdock API", () => {
	const client = createTestClient();
	const enabled = Boolean(process.env.WEBDOCK_TOKEN) && isE2EEnabled();
	const e2eIt = enabled ? test : test.skip;

	e2eIt("ping() - Return the healthcheck response", async () => {
		const res = await client.webdock.ping();
		expect(res.success).toBe(true);
		if (!res.success) return;

		expect(res.response.body).toEqual({ webdock: "rocks" });
	});
});
