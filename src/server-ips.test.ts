import axios from "axios";
import { Webdock } from "./index.js";

jest.mock("axios");

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe("Server IP API", () => {
	const client = new Webdock("test-token");

	beforeEach(() => {
		mockedAxios.mockReset();
		mockedAxios.mockResolvedValue({
			data: [{ id: 9001, primary: true }],
			headers: { "x-callback-id": "callback-123" },
		});
	});

	it("sends the updateServerIps request body and returns the IP list and callback", async () => {
		const result = await client.servers.IpBlock.ChangeIPAddress({
			serverSlug: "example-server",
			add: [{ blockId: 412, reverseDns: "mail.example.com" }],
			remove: [8813],
			banRemovedIpIds: [8813],
			primaryIpId: 8812,
			reverseDns: [{ ipId: 8812, hostname: null }],
		});

		expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining({
			url: "https://api.webdock.io/v1/servers/example-server/ips",
			method: "PATCH",
			data: {
				add: [{ blockId: 412, reverseDns: "mail.example.com" }],
				remove: [8813],
				banRemovedIpIds: [8813],
				primaryIpId: 8812,
				reverseDns: [{ ipId: 8812, hostname: null }],
			},
		}));
		expect(result).toMatchObject({
			success: true,
			response: {
				body: [{ id: 9001, primary: true }],
				headers: { "x-callback-id": "callback-123" },
			},
		});
	});
});
