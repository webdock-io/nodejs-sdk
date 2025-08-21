import { Webdock } from "./index.js";

describe("Server Profiles API - List and Validation", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const client = new Webdock(token || "");

	it("list profiles and validate schema", async () => {
		const response = await client.profiles.list({ locationId: "dk" });
		expect(response.success).toBe(true);
		if (!response.success) return;
		const profiles = response.response.body;
		expect(profiles).toBeInstanceOf(Array);
		expect(profiles.length).toBeGreaterThan(0);
		profiles.forEach((profile) => {
			expect(profile).toMatchObject({
				slug: expect.any(String),
				name: expect.any(String),
				ram: expect.any(Number),
				disk: expect.any(Number),
				cpu: {
					cores: expect.any(Number),
					threads: expect.any(Number),
				},
				price: {
					amount: expect.any(Number),
					currency: expect.any(String),
				},
			});
			expect(profile.slug).toMatch(/^[\w-]+$/);
			expect(profile.name.length).toBeGreaterThan(0);
			expect(profile.ram).toBeGreaterThan(0);
			expect(profile.disk).toBeGreaterThan(0);
			expect(profile.price.amount).toBeGreaterThan(0);
			expect(profile.price.currency).toMatch(/^[A-Z]{3}$/);
		});
	});
});

