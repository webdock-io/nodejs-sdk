import { Webdock } from "./index.js";
import { expectCallback, expectRequest, resetAxiosMock } from "./requestTestUtils.js";

jest.mock("axios");

const serverSlug = "example-server";

describe("Snapshots API requests", () => {
	const client = new Webdock("test-token");

	beforeEach(resetAxiosMock);

	it("create() creates a snapshot", async () => {
		const result = await client.snapshots.create({ serverSlug, name: "nightly" });

		expectRequest("POST", `/servers/${serverSlug}/snapshots`, { name: "nightly" });
		expectCallback(result);
	});

	it("list() lists a server's snapshots", async () => {
		await client.snapshots.list({ serverSlug });
		expectRequest("GET", `/servers/${serverSlug}/snapshots`);
	});

	it("listAll() lists snapshots across all servers", async () => {
		await client.snapshots.listAll();
		expectRequest("GET", "/servers/snapshots");
	});

	it("getById() gets one snapshot", async () => {
		await client.snapshots.getById({ serverSlug, snapshotId: 7 });
		expectRequest("GET", `/servers/${serverSlug}/snapshots/7`);
	});

	it("delete() deletes a snapshot", async () => {
		const result = await client.snapshots.delete({ serverSlug, snapshotId: 7 });

		expectRequest("DELETE", `/servers/${serverSlug}/snapshots/7`);
		expectCallback(result);
	});

	it("restore() posts to the snapshots restore endpoint", async () => {
		const result = await client.snapshots.restore({ serverSlug, snapshotId: 7 });

		expectRequest("POST", `/servers/${serverSlug}/snapshots/restore`, { snapshotId: 7 });
		expectCallback(result);
	});
});
