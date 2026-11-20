import { Webdock } from "./index.js";
import { expectCallback, expectRequest, resetAxiosMock } from "./requestTestUtils.js";

jest.mock("axios");

const serverSlug = "example-server";

describe("Shell users API requests", () => {
	const client = new Webdock("test-token");

	beforeEach(resetAxiosMock);

	it("create() creates a shell user", async () => {
		const result = await client.shellUsers.create({
			serverSlug,
			username: "deploy",
			password: "secret",
			group: "sudo",
			shell: "/bin/bash",
			publicKeys: [1, 2],
		});

		expectRequest("POST", `/servers/${serverSlug}/shellUsers`, {
			username: "deploy",
			password: "secret",
			group: "sudo",
			shell: "/bin/bash",
			publicKeys: [1, 2],
		});
		expectCallback(result);
	});

	it("create() sends an empty key list when no keys are given", async () => {
		await client.shellUsers.create({ serverSlug, username: "deploy", password: "secret" });

		expectRequest("POST", `/servers/${serverSlug}/shellUsers`, {
			username: "deploy",
			password: "secret",
			publicKeys: [],
		});
	});

	it("list() lists shell users", async () => {
		await client.shellUsers.list({ serverSlug });
		expectRequest("GET", `/servers/${serverSlug}/shellUsers`);
	});

	it("edit() replaces a shell user's public keys", async () => {
		const result = await client.shellUsers.edit({ slug: serverSlug, id: 9, keys: [3] });

		expectRequest("PATCH", `/servers/${serverSlug}/shellUsers/9`, { publicKeys: [3] });
		expectCallback(result);
	});

	it("resetPassword() resets a shell user's password", async () => {
		const result = await client.shellUsers.resetPassword({ serverSlug, userId: 9, newPassword: "new-secret" });

		expectRequest("POST", `/servers/${serverSlug}/shellUsers/9/resetPassword`, { newPassword: "new-secret" });
		expectCallback(result);
	});

	it("delete() deletes a shell user", async () => {
		const result = await client.shellUsers.delete({ serverSlug, userId: 9 });

		expectRequest("DELETE", `/servers/${serverSlug}/shellUsers/9`);
		expectCallback(result);
	});

	it("websshToken() creates a WebSSH token", async () => {
		await client.shellUsers.websshToken({ serverSlug, username: "admin" });

		expectRequest("POST", `/servers/${serverSlug}/shellUsers/WebsshToken`, { username: "admin" });
	});
});
