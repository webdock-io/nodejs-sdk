import { Webdock } from "./index.js";


describe("Events API - List and Structure Validation", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const api = new Webdock(token || "");

	it("list and validate structure", async () => {
		const res = await api.events.list({});
		expect(res.success).toBe(true);
		if (!res.success) return;
		const body = res.response.body;
		body.forEach((event) => {
			expect(event).toMatchObject({
				id: expect.any(Number),
				startTime: expect.anything(),
				callbackId: expect.anything(),
				serverSlug: expect.any(String),
				eventType: expect.any(String),
				action: expect.any(String),
				actionData: expect.any(String),
				status: expect.any(String),
			});
		});
		const countHeader = Number(res.response.headers["x-total-count"] ?? 0);
		expect(countHeader).toBeGreaterThanOrEqual(0);
	});
});

