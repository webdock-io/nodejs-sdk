import { createTestClient, isE2EEnabled } from "./testUtils";


describe("Events API - List and Structure Validation", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const api = createTestClient(token);
	const enabled = Boolean(token) && isE2EEnabled();
	const e2eIt = enabled ? test : test.skip;

	e2eIt("list and validate structure", async () => {
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

