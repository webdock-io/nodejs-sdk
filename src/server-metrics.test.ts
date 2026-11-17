import axios from "axios";
import { Webdock } from "./index.js";

jest.mock("axios");

const mockedAxios = axios as jest.MockedFunction<typeof axios>;
const client = new Webdock("test-token");

describe("Server metrics API", () => {
	beforeEach(() => {
		mockedAxios.mockReset();
		mockedAxios.mockResolvedValue({ data: {}, headers: {} });
	});

	it("gets historical metrics with sampling and window options", async () => {
		await client.servers.getServerMetrics({
			serverSlug: "example-server",
			resolutionSeconds: 60,
			maxSamples: 100,
			from: "2026-11-16T00:00:00Z",
			to: 1794873600,
		});

		expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining({
			method: "GET",
			url: "https://api.webdock.io/v1/servers/example-server/metrics?resolutionSeconds=60&maxSamples=100&from=2026-11-16T00%3A00%3A00Z&to=1794873600",
		}));
	});

	it("gets instant metrics from the now endpoint", async () => {
		await client.servers.getInstantMetrics({ serverSlug: "example-server" });

		expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining({
			method: "GET",
			url: "https://api.webdock.io/v1/servers/example-server/metrics/now",
		}));
	});

	it("gets warnings with optional filters", async () => {
		await client.servers.getServerMetricsWarningsOverview({ serverSlug: "example-server", includeOk: false });

		expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining({
			method: "GET",
			url: "https://api.webdock.io/v1/servers/metrics/warnings?serverSlug=example-server&includeOk=false",
		}));
	});
});
