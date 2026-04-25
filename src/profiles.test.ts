import { Webdock } from "./index.js";
import { isE2EEnabled } from "./testUtils.js";

describe("Server Profiles API - List and Validation", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const enabled = Boolean(token) && isE2EEnabled();
	const client = new Webdock({
		token: token || "",
		secret_dev_client: "super_secret_client",
	});
	const it = enabled ? test : test.skip;
	let custom_profile_slug = "";

	function expectProfileShape(profile: {
		slug: string;
		name: string;
		ram: number;
		disk: number;
		cpu: { cores: number; threads: number };
		price: { amount: number; currency: string };
		platform: string;
	}) {
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
			platform: expect.any(String),
		});
		expect(profile.slug).toMatch(/^[\w-]+$/);
		expect(profile.name.length).toBeGreaterThan(0);
		expect(profile.ram).toBeGreaterThan(0);
		expect(profile.disk).toBeGreaterThan(0);
		expect(profile.price.amount).toBeGreaterThan(0);
		expect(profile.price.currency).toMatch(/^[A-Z]{3}$/);
		expect(["epyc_vps", "intel_vps"]).toContain(profile.platform);
	}

	it("list() - list profiles and validate schema", async () => {
		const response = await client.profiles.list({ locationId: "dk" });
		expect(response.success).toBe(true);
		if (!response.success) return;

		const profiles = response.response.body;
		expect(profiles).toBeInstanceOf(Array);
		expect(profiles.length).toBeGreaterThan(0);
		profiles.forEach(expectProfileShape);
	});

	it("create() - Create custom profile", async () => {
		const response = await client.profiles.create({
			cpu_threads: 1,
			disk_space: 2,
			network_bandwidth: 1,
			platform: "epyc_vps",
			ram: 1,
		});
		expect(response.success).toBe(true);
		if (!response.success) return;

		const profile = response.response.body;
		expectProfileShape(profile);
		expect(profile.platform).toBe("epyc_vps");
		custom_profile_slug = response.response.body.slug;
	});

	afterAll(async () => {
		if (!enabled) return;
		if (custom_profile_slug) {
			const del = await client.profiles.delete({
				profileSlug: custom_profile_slug,
			});
			expect(del.success).toBeTruthy();
		}
	});
});
