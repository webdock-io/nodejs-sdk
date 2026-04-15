import { Webdock } from "./index.js";

describe("Test Platform", () => {
	const client = new Webdock(process.env.WEBDOCK_TOKEN ?? "");

	function expectResourceLimit(resourceLimit: {
		costCents: number;
		freeUnits: number;
		max: number;
		min: number;
	}) {
		expect(resourceLimit).toMatchObject({
			costCents: expect.any(Number),
			freeUnits: expect.any(Number),
			max: expect.any(Number),
			min: expect.any(Number),
		});
	}

	test("list() - list platforms", async () => {
		const platforms = await client.platforms.list({ currency: "DKK" });
		expect(platforms.success).toBe(true);
		if (!platforms.success) return;

		expect(platforms.response.body).toBeInstanceOf(Array);
		expect(platforms.response.body.length).toBeGreaterThan(0);
		platforms.response.body.forEach((platform) => {
			expect(platform.slug).toEqual(expect.any(String));
			expect(platform.name).toEqual(expect.any(String));
			expectResourceLimit(platform.resourceLimits.cpuThreads);
			expectResourceLimit(platform.resourceLimits.ram);
			expectResourceLimit(platform.resourceLimits.diskSpace);
			expectResourceLimit(platform.resourceLimits.networkBandwidth);
		});
	});
});
