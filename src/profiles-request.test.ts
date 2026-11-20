import { Webdock } from "./index.js";
import { expectRequest, mockNextResponse, mockNextServerError, resetAxiosMock } from "./requestTestUtils.js";

jest.mock("axios");

const profile = {
	slug: "vps-epyc-pro-2025",
	name: "Pro",
	ram: 4096,
	disk: 81920,
	cpu: { cores: 2, threads: 4 },
	price: { amount: 1500, currency: "EUR" },
	network_bandwidth: 1,
	platform: "epyc_vps",
};

describe("Profiles API requests", () => {
	const client = new Webdock("test-token");

	beforeEach(resetAxiosMock);

	it("list() defaults to the dk location", async () => {
		mockNextResponse([profile]);

		const result = await client.profiles.list();

		expectRequest("GET", "/profiles?locationId=dk");
		expect(result).toMatchObject({ success: true, response: { body: [profile] } });
	});

	it("list() wraps a single-profile response in an array", async () => {
		mockNextResponse(profile);

		const result = await client.profiles.list({ locationId: "fi", profileSlug: profile.slug });

		expectRequest("GET", `/profiles?locationId=fi&profileSlug=${profile.slug}`);
		expect(result).toMatchObject({ success: true, response: { body: [profile] } });
	});

	it("list() passes errors through", async () => {
		mockNextServerError(400, "Invalid location");

		const result = await client.profiles.list({ locationId: "nowhere" });

		expect(result).toEqual({ success: false, error: "Invalid location", errorType: "server", code: 400 });
	});

	it("create() creates a custom profile", async () => {
		await client.profiles.create({
			platform: "epyc_vps",
			cpu_threads: 1,
			ram: 1,
			disk_space: 2,
			network_bandwidth: 1,
		});

		expectRequest("POST", "/profiles", {
			platform: "epyc_vps",
			cpu_threads: 1,
			ram: 1,
			disk_space: 2,
			network_bandwidth: 1,
		});
	});

	it("delete() deletes a custom profile", async () => {
		await client.profiles.delete({ profileSlug: "custom-123" });
		expectRequest("DELETE", "/profiles/custom-123");
	});
});
