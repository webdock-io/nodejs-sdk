import { Webdock } from "./index.js";
import { expectRequest, resetAxiosMock } from "./requestTestUtils.js";

jest.mock("axios");

describe("Hooks API requests", () => {
	const client = new Webdock("test-token");

	beforeEach(resetAxiosMock);

	it("create() creates a webhook", async () => {
		await client.hooks.create({ callbackUrl: "https://example.com/hook", eventType: "backup", callbackId: "cb-1" });

		expectRequest("POST", "/hooks", {
			callbackUrl: "https://example.com/hook",
			eventType: "backup",
			callbackId: "cb-1",
		});
	});

	it("list() lists webhooks", async () => {
		await client.hooks.list();
		expectRequest("GET", "/hooks");
	});

	it("getById() gets one webhook", async () => {
		await client.hooks.getById({ id: 11 });
		expectRequest("GET", "/hooks/11");
	});

	it("deleteById() deletes a webhook", async () => {
		await client.hooks.deleteById({ id: 11 });
		expectRequest("DELETE", "/hooks/11");
	});
});
