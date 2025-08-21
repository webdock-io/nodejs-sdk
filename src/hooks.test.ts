import { Webdock } from "./index.js";
import { isE2EEnabled } from "./testUtils.js";

describe("Webhooks API", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const client = new Webdock(token || "");
	let createdId: number | undefined;

	it("list hooks structure", async () => {
		const response = await client.hooks.list();
		expect(response.success).toBe(true);
		if (!response.success) return;
		response.response.body.forEach((hook) => {
			expect(hook).toMatchObject({
				id: expect.any(Number),
				callbackUrl: expect.any(String),
			});
			(hook.filters ?? []).forEach((filter: any) => {
				expect(filter).toMatchObject({
					type: expect.any(String),
					value: expect.any(String),
				});
			});
		});
	});

	it("create, getById, delete webhook", async () => {
		const randomTestUrl = "http://apitest.vps.webdock.cloud/?" + Math.random().toString(36).slice(2);
		const testEventType = "backup";
		const createRes = await client.hooks.create({ callbackUrl: randomTestUrl, eventType: testEventType });


		expect(createRes.success).toBe(true);
		if (!createRes.success) return;
		createdId = createRes.response.body.id;
		expect(createRes.response.body).toMatchObject({
			id: expect.any(Number),
			callbackUrl: randomTestUrl,
			filters: expect.arrayContaining([
				expect.objectContaining({ type: expect.any(String), value: expect.any(String) }),
			]),
		});

		const getRes = await client.hooks.getById({ id: createdId! });
		expect(getRes.success).toBe(true);
		if (!getRes.success) return;
		expect(getRes.response.body.id).toBe(createdId);

		const delRes = await client.hooks.deleteById({ id: createdId! });
		expect(delRes.success).toBe(true);
	});
});

