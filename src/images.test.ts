import { Webdock } from "./index.js";

describe("Server Images API - List and Validation", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const client = new Webdock(token || "");

	it("list images and validate fields", async () => {
		const response = await client.images.list();
		expect(response.success).toBe(true);
		if (!response.success) return;
		response.response.body.forEach((e) => {
			expect(e).toMatchObject({
				slug: expect.any(String),
				name: expect.any(String),
			});
		});
	});
});

