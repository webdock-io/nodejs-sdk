import { Webdock } from "./index.js";

describe("Locations API", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const client = new Webdock(token || "");

	it("locations.list() returns array", async () => {
		const locations = await client.location.list();
		expect(locations.success).toBe(true);
		if (!locations.success) return;
		expect(locations.response.body).toBeInstanceOf(Array);
	});
});

