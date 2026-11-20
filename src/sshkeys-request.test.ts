import { Webdock } from "./index.js";
import { expectRequest, resetAxiosMock } from "./requestTestUtils.js";

jest.mock("axios");

describe("SSH keys API requests", () => {
	const client = new Webdock("test-token");

	beforeEach(resetAxiosMock);

	it("create() adds a public key to the account", async () => {
		await client.sshkeys.create({ name: "laptop", publicKey: "ssh-ed25519 AAAA test@example" });

		expectRequest("POST", "/account/publicKeys", {
			name: "laptop",
			publicKey: "ssh-ed25519 AAAA test@example",
		});
	});

	it("list() lists the account's public keys", async () => {
		await client.sshkeys.list();
		expectRequest("GET", "/account/publicKeys");
	});

	it("delete() removes a public key", async () => {
		await client.sshkeys.delete({ id: 4 });
		expectRequest("DELETE", "/account/publicKeys/4");
	});

	it("no longer exposes server SSH settings (moved to servers.toggleSSHSettings)", () => {
		expect("toggleSSHSettings" in client.sshkeys).toBe(false);
		expect(typeof client.servers.toggleSSHSettings).toBe("function");
	});
});
