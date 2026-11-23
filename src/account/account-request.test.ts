import { Webdock } from "../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../requestTestUtils.js";

jest.mock("axios");

const accountInfo = {
	userId: 1,
	companyName: "Webdock",
	userName: "Test User",
	userAvatar: "",
	userEmail: "test@example.com",
	isTeamMember: false,
	teamLeader: "",
	accountBalance: "0.00",
	accountBalanceRaw: "0",
	accountBalanceCurrency: "EUR",
};

describe("Account API requests", () => {
	const client = new Webdock("test-token");

	beforeEach(resetAxiosMock);

	it("info() unwraps an array response into a single object", async () => {
		mockNextResponse([accountInfo]);

		const result = await client.account.info();

		expectRequest("GET", "/account/accountInformation");
		expect(result).toMatchObject({ success: true, response: { body: accountInfo } });
	});

	it("info() returns an object response unchanged", async () => {
		mockNextResponse(accountInfo);

		const result = await client.account.info();

		expect(result).toMatchObject({ success: true, response: { body: accountInfo } });
	});

	it("updateInformation() patches host affinity mode", async () => {
		mockNextResponse({ ...accountInfo, hostAffinityMode: "pack" });
		const result = await client.account.updateInformation({ hostAffinityMode: "pack" });
		expectRequest("PATCH", "/account/accountInformation", { hostAffinityMode: "pack" });
		expect(result).toMatchObject({ success: true, response: { body: { hostAffinityMode: "pack" } } });
	});

	it("listArchivedServers() uses the archived servers endpoint", async () => {
		await client.account.listArchivedServers();
		expectRequest("GET", "/servers/archived");
	});

	describe("scripts", () => {
		const script = { name: "hello", filename: "hello.sh", content: "#!/bin/bash\necho hi\n" };

		it("list() lists account scripts", async () => {
			await client.account.scripts.list();
			expectRequest("GET", "/account/scripts");
		});

		it("getById() gets one account script", async () => {
			await client.account.scripts.getById({ scriptId: 3 });
			expectRequest("GET", "/account/scripts/3");
		});

		it("create() creates an account script", async () => {
			await client.account.scripts.create(script);
			expectRequest("POST", "/account/scripts", script);
		});

		it("update() updates an account script", async () => {
			await client.account.scripts.update({ id: 3, ...script });
			expectRequest("PATCH", "/account/scripts/3", script);
		});

		it("delete() deletes an account script", async () => {
			await client.account.scripts.delete({ id: 3 });
			expectRequest("DELETE", "/account/scripts/3");
		});
	});
});
