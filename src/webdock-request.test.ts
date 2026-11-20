import { Webdock } from "./index.js";
import { expectRequest, resetAxiosMock } from "./requestTestUtils.js";

jest.mock("axios");

describe("Webdock API requests", () => {
	const client = new Webdock("test-token");

	beforeEach(resetAxiosMock);

	it("ping() calls the healthcheck endpoint", async () => {
		await client.webdock.ping();
		expectRequest("GET", "/ping");
	});

	it("scripts.list() lists Webdock's public scripts", async () => {
		await client.webdock.scripts.list();
		expectRequest("GET", "/scripts");
	});

	describe("IpBlocks", () => {
		it("inspectIpBlock() defaults to all statuses", async () => {
			await client.webdock.IpBlocks.inspectIpBlock({ blockId: 412 });
			expectRequest("GET", "/servers/ipBlocks/inspect?blockId=412&status=all");
		});

		it("inspectIpBlock() filters by status", async () => {
			await client.webdock.IpBlocks.inspectIpBlock({ blockId: 412, status: "free" });
			expectRequest("GET", "/servers/ipBlocks/inspect?blockId=412&status=free");
		});

		it("BanIp() bans an IP", async () => {
			await client.webdock.IpBlocks.BanIp({ ipId: 8813 });
			expectRequest("PATCH", "/servers/ipBlocks/8813/banned", { banned: true });
		});

		it("UnBanIp() unbans an IP", async () => {
			await client.webdock.IpBlocks.UnBanIp({ ipId: 8813 });
			expectRequest("PATCH", "/servers/ipBlocks/8813/banned", { banned: false });
		});
	});
});
