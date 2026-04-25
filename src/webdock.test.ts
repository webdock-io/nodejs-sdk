import { Webdock } from "./index.js";

describe("Webdock API", () => {
	const client = new Webdock({
		token: process.env.WEBDOCK_TOKEN ?? "",
		secret_dev_client: "super_secret_client",
	});

	test("ping() - Return the public healthcheck response", async () => {
		const res = await client.webdock.ping();
		expect(res.success).toBe(true);
		if (!res.success) return;

		expect(res.response.body).toEqual({ webdock: "rocks" });
	});
});
