import { Webdock } from "./index.js";
import {
	CALLBACK_ID,
	expectCallback,
	expectRequest,
	lastRequest,
	mockNextResponse,
	mockNextServerError,
	mockedAxios,
	resetAxiosMock,
} from "./requestTestUtils.js";

jest.mock("axios");

const serverSlug = "example-server";

describe("Servers API requests", () => {
	const client = new Webdock("test-token");

	beforeEach(resetAxiosMock);

	describe("create()", () => {
		it("creates a server from an image with a user script", async () => {
			mockNextResponse({ slug: serverSlug }, { "x-callback-id": CALLBACK_ID });

			const result = await client.servers.create({
				name: "My Server",
				locationId: "dk",
				profileSlug: "vps-epyc-pro-2025",
				imageSlug: "webdock-ubuntu-noble-cloud",
				userScriptId: 42,
			});

			expectRequest("POST", "/servers", {
				name: "My Server",
				locationId: "dk",
				profileSlug: "vps-epyc-pro-2025",
				imageSlug: "webdock-ubuntu-noble-cloud",
				userScriptId: 42,
			});
			expect(result).toMatchObject({
				success: true,
				response: { body: { slug: serverSlug }, headers: { "x-callback-id": CALLBACK_ID } },
			});
		});

		it("creates a server from a snapshot and sends only supported fields", async () => {
			await client.servers.create({ name: "From Snapshot", locationId: "fi", snapshotId: 77 });

			expectRequest("POST", "/servers", {
				name: "From Snapshot",
				locationId: "fi",
				snapshotId: 77,
			});
			expect(Object.keys(lastRequest().data).sort()).toEqual(
				["imageSlug", "locationId", "name", "profileSlug", "snapshotId", "userScriptId"],
			);
		});
	});

	it("list() defaults to all servers", async () => {
		await client.servers.list();
		expectRequest("GET", "/servers?status=all");
	});

	it("list() filters by status, including archived", async () => {
		await client.servers.list({ status: "archived" });
		expectRequest("GET", "/servers?status=archived");
	});

	it("getBySlug() gets one server", async () => {
		await client.servers.getBySlug({ serverSlug });
		expectRequest("GET", `/servers/${serverSlug}`);
	});

	it("delete() deletes a server and exposes the callback ID", async () => {
		const result = await client.servers.delete({ serverSlug });
		expectRequest("DELETE", `/servers/${serverSlug}`);
		expectCallback(result);
	});

 
	it("UpdateServerMetadata() patches the server", async () => {
		await client.servers.UpdateServerMetadata({
			serverSlug,
			name: "Renamed",
			description: "desc",
			notes: "notes",
			nextActionDate: "2026-12-01",
		});

		expectRequest("PATCH", `/servers/${serverSlug}`, {
			name: "Renamed",
			description: "desc",
			notes: "notes",
			nextActionDate: "2026-12-01",
		});
	});

	const serverActions = [
		["reboot", "reboot"],
		["start", "start"],
		["stop", "stop"],
		["archive", "archive"],
		["enableIpv6", "enable-ipv6"],
		["disableIpv6", "disable-ipv6"],
	] as const;

	for (const [method, action] of serverActions) {
		it(`${method}() posts to /actions/${action} and exposes the callback ID`, async () => {
			const result = await client.servers[method]({ serverSlug });

			expectRequest("POST", `/servers/${serverSlug}/actions/${action}`);
			expectCallback(result);
		});
	}

	it("snapshot() creates a snapshot through the server action", async () => {
		const result = await client.servers.snapshot({ serverSlug, name: "before-upgrade" });

		expectRequest("POST", `/servers/${serverSlug}/actions/snapshot`, { name: "before-upgrade" });
		expectCallback(result);
	});

	it("toggleSSHSettings() posts SSH settings without the server slug in the body", async () => {
		const result = await client.servers.toggleSSHSettings({
			serverSlug,
			passwordSshAuthEnabled: false,
			passwordlessSudoEnabled: true,
			sshPort: 2222,
		});

		expectRequest("POST", `/servers/${serverSlug}/sshSettings`, {
			passwordSshAuthEnabled: false,
			passwordlessSudoEnabled: true,
			sshPort: 2222,
		});
		expect(lastRequest().data).not.toHaveProperty("serverSlug");
		expectCallback(result);
	});

	it("reinstall() sends the image, script and snapshot options", async () => {
		const result = await client.servers.reinstall({
			serverSlug,
			imageSlug: "webdock-ubuntu-noble-cloud",
			userScriptId: "my-script",
			deleteSnapshots: true,
		});

		expectRequest("POST", `/servers/${serverSlug}/actions/reinstall`, {
			imageSlug: "webdock-ubuntu-noble-cloud",
			userScriptId: "my-script",
			deleteSnapshots: true,
		});
		expectCallback(result);
	});

	it("resize() changes the profile", async () => {
		const result = await client.servers.resize({ serverSlug, profileSlug: "wp-business-2026" });

		expectRequest("POST", `/servers/${serverSlug}/actions/resize`, { profileSlug: "wp-business-2026" });
		expectCallback(result);
	});

	it("resizeDryRun() previews the resize", async () => {
		await client.servers.resizeDryRun({ serverSlug, profileSlug: "wp-business-2026" });

		expectRequest("POST", `/servers/${serverSlug}/actions/resize/dryrun`, { profileSlug: "wp-business-2026" });
	});

	describe("fetchFile()", () => {
		it("starts a file fetch, waits for the event and returns its base64 content", async () => {
			const content = Buffer.from("ID=ubuntu\n").toString("base64");
			mockNextResponse({}, { "x-callback-id": CALLBACK_ID });
			mockNextResponse([{ status: "finished", message: content }]);

			const result = await client.servers.fetchFile({ slug: serverSlug, path: "/etc/os-release" });

			expect(mockedAxios).toHaveBeenNthCalledWith(1, expect.objectContaining({
				method: "POST",
				url: `https://api.webdock.io/v1/servers/${serverSlug}/fetchFile`,
				data: { filePath: "/etc/os-release" },
			}));
			expectRequest("GET", `/events?callbackId=${CALLBACK_ID}`);
			expect(result).toEqual({ success: true, base64: content });
		});

		it("fails when the fetch cannot be started", async () => {
			mockNextServerError(404, "Server not found");

			const result = await client.servers.fetchFile({ slug: serverSlug, path: "/etc/os-release" });

			expect(result).toEqual({
				success: false,
				message: `Failed to initiate file fetch for '/etc/os-release' on server '${serverSlug}'`,
			});
			expect(mockedAxios).toHaveBeenCalledTimes(1);
		});

		it("fails when the fetch event ends in an error", async () => {
			mockNextResponse({}, { "x-callback-id": CALLBACK_ID });
			mockNextResponse([{ status: "error", message: "No such file" }]);

			const result = await client.servers.fetchFile({ slug: serverSlug, path: "/missing" });

			expect(result).toEqual({
				success: false,
				message: `Failed to retrieve operation status (callback ID: ${CALLBACK_ID})`,
			});
		});
	});

	describe("identity", () => {
		it("update() patches the server identity", async () => {
			const result = await client.servers.identity.update({
				serverSlug,
				maindomain: "example.com",
				aliasdomains: "www.example.com",
				removeDefaultAlias: true,
			});

			expectRequest("PATCH", `/servers/${serverSlug}/identity`, {
				maindomain: "example.com",
				aliasdomains: "www.example.com",
				removeDefaultAlias: true,
			});
			expectCallback(result);
		});

		it("renewCertificates() runs Certbot", async () => {
			const result = await client.servers.identity.renewCertificates({
				serverSlug,
				domains: ["example.com"],
				email: "admin@example.com",
				forceSSL: true,
			});

			expectRequest("POST", `/servers/${serverSlug}/actions/run-certbot`, {
				domains: ["example.com"],
				email: "admin@example.com",
				forceSSL: true,
			});
			expectCallback(result);
		});
	});

	describe("settings", () => {
		it("update() sends all provided settings", async () => {
			const result = await client.servers.settings.update({
				serverSlug,
				webroot: "/var/www/html",
				updateWebserver: true,
				updateLetsencrypt: false,
			});

			expectRequest("POST", `/servers/${serverSlug}/actions/settings`, {
				webroot: "/var/www/html",
				updateWebserver: true,
				updateLetsencrypt: false,
			});
			expectCallback(result);
		});

		it("update() leaves out settings that were not provided", async () => {
			await client.servers.settings.update({ serverSlug, webroot: "/srv/www" });

			expect(lastRequest().data).toStrictEqual({ webroot: "/srv/www" });
		});
	});

	describe("scripts", () => {
		it("create() adds an account script to the server", async () => {
			const result = await client.servers.scripts.create({
				serverSlug,
				scriptId: 12,
				path: "/root/script.sh",
				makeScriptExecutable: true,
				executeImmediately: false,
			});

			expectRequest("POST", `/servers/${serverSlug}/scripts`, {
				scriptId: 12,
				path: "/root/script.sh",
				makeScriptExecutable: true,
				executeImmediately: false,
			});
			expectCallback(result);
		});

		it("listOnServer() lists server scripts", async () => {
			await client.servers.scripts.listOnServer({ serverSlug });
			expectRequest("GET", `/servers/${serverSlug}/scripts`);
		});

		it("getById() gets one server script", async () => {
			await client.servers.scripts.getById({ serverSlug, scriptId: 5 });
			expectRequest("GET", `/servers/${serverSlug}/scripts/5`);
		});

		it("execute() runs a server script", async () => {
			const result = await client.servers.scripts.execute({ serverSlug, scriptID: "5" });

			expectRequest("POST", `/servers/${serverSlug}/scripts/5/execute`);
			expectCallback(result);
		});

		it("delete() removes a server script", async () => {
			const result = await client.servers.scripts.delete({ serverSlug, scriptId: "5" });

			expectRequest("DELETE", `/servers/${serverSlug}/scripts/5`);
			expectCallback(result);
		});
	});

	it("IpBlock.ListIpBlocks() lists the IP blocks available to the server", async () => {
		mockNextResponse({ "412": { cidr: "203.0.113.0/24", total: 256, free: 10, used: 240, banned: 1, reserved: 5 } });

		const result = await client.servers.IpBlock.ListIpBlocks({ serverSlug });

		expectRequest("GET", `/servers/${serverSlug}/ipBlocks`);
		expect(result).toMatchObject({
			success: true,
			response: { body: { "412": { cidr: "203.0.113.0/24", free: 10 } } },
		});
	});
});
