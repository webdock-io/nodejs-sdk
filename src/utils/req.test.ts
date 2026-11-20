import { Webdock } from "../index.js";
import { registerSecretDevClient } from "./req.js";
import {
	lastRequest,
	mockNextServerError,
	mockedAxios,
	resetAxiosMock,
} from "../requestTestUtils.js";

jest.mock("axios");

describe("req()", () => {
	beforeEach(resetAxiosMock);

	it("sends the auth, client and version headers", async () => {
		const client = new Webdock("header-token");
		await client.webdock.ping();

		expect(lastRequest().headers).toMatchObject({
			"Content-Type": "application/json",
			Authorization: "Bearer header-token",
			"X-Client": "node-sdk",
			"X-Application": expect.any(String),
			"X-Version": expect.any(String),
		});
	});

	it("omits the Authorization header when no token is set", async () => {
		const client = new Webdock();
		await client.webdock.ping();

		expect(lastRequest().headers).not.toHaveProperty("Authorization");
	});

	it("uses a registered dev client name for its token", async () => {
		const client = new Webdock("dev-token");
		registerSecretDevClient("dev-token", "dev-client");
		await client.webdock.ping();

		expect(lastRequest().headers).toMatchObject({ "X-Client": "dev-client" });
	});

	it("returns only the response headers that were asked for", async () => {
		mockedAxios.mockResolvedValueOnce({
			data: { slug: "example-server" },
			headers: { "x-callback-id": "callback-1", "x-other": "ignored" },
		});

		const result = await new Webdock("t").servers.reboot({ serverSlug: "example-server" });

		expect(result).toEqual({
			success: true,
			response: {
				body: { slug: "example-server" },
				headers: { "x-callback-id": "callback-1" },
			},
		});
	});

	it("maps HTTP errors to a server error result", async () => {
		mockNextServerError(404, "Server not found");

		const result = await new Webdock("t").servers.getBySlug({ serverSlug: "missing" });

		expect(result).toEqual({
			success: false,
			error: "Server not found",
			errorType: "server",
			code: 404,
		});
	});

	it("maps failures without a response to a network error result", async () => {
		mockedAxios.mockRejectedValueOnce(new Error("socket hang up"));

		const result = await new Webdock("t").servers.getBySlug({ serverSlug: "example-server" });

		expect(result).toEqual({
			success: false,
			error: "Unknown error",
			errorType: "network",
			code: 0,
		});
	});
});
