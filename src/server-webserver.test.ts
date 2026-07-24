import axios from "axios";
import { Webdock } from "./index.js";

jest.mock("axios");

const mockedAxios = axios as jest.MockedFunction<typeof axios>;
const serverSlug = "example-server";
const callbackId = "callback-123";

describe("Server webserver API", () => {
	const client = new Webdock("test-token");

	beforeEach(() => {
		mockedAxios.mockReset();
		mockedAxios.mockResolvedValue({
			data: {},
			headers: {
				"x-callback-id": callbackId,
			},
		});
	});

	function expectRequest(method: string, endpoint: string, body?: unknown) {
		expect(mockedAxios).toHaveBeenCalledWith(
			expect.objectContaining({
				url: `https://api.webdock.io/v1${endpoint}`,
				method,
				data: body,
			}),
		);
	}

	function expectCallback(result: unknown) {
		expect(result).toMatchObject({
			success: true,
			response: {
				headers: {
					"x-callback-id": callbackId,
				},
			},
		});
	}

	it("exposes feature-specific webserver subclasses", () => {
		expect(client.servers.webserver.databaseBackup).toBeDefined();
		expect(client.servers.webserver.searchEngines).toBeDefined();
		expect(client.servers.webserver.basicAuth).toBeDefined();
		expect(client.servers.webserver.certbot).toBeDefined();
	});

	it("databaseBackup.status() gets the backup-on-disk status synchronously", async () => {
		mockedAxios.mockResolvedValueOnce({
			data: {
				enabled: true,
				backupDir: "/root/db-backups",
				keep: 7,
				schedule: "daily",
				scriptPath: "/root/webdock/db-backup-on-disk.sh",
				lastRun: "2026-07-23T10:00:00.000Z",
				lastStatus: "Backup completed successfully",
			},
			headers: {},
		});

		const result = await client.servers.webserver.databaseBackup.status({ serverSlug });

		expectRequest("GET", `/servers/${serverSlug}/actions/db-backup-on-disk`);
		expect(result).toMatchObject({
			success: true,
			response: {
				body: {
					enabled: true,
					schedule: "daily",
				},
			},
		});
	});

	it("databaseBackup.enable() starts database backups and exposes the callback ID", async () => {
		const result = await client.servers.webserver.databaseBackup.enable({
			serverSlug,
			backupDir: "/root/custom-backups",
			keep: 14,
			schedule: "weekly",
		});

		expectRequest("POST", `/servers/${serverSlug}/actions/db-backup-on-disk`, {
			backupDir: "/root/custom-backups",
			keep: 14,
			schedule: "weekly",
		});
		expectCallback(result);
	});

	it("databaseBackup.update() updates database backup settings", async () => {
		const result = await client.servers.webserver.databaseBackup.update({
			serverSlug,
			keep: 30,
		});

		expectRequest("PATCH", `/servers/${serverSlug}/actions/db-backup-on-disk`, {
			backupDir: undefined,
			keep: 30,
			schedule: undefined,
		});
		expectCallback(result);
	});

	it("databaseBackup.disable() disables database backups", async () => {
		const result = await client.servers.webserver.databaseBackup.disable({ serverSlug });

		expectRequest(
			"POST",
			`/servers/${serverSlug}/actions/db-backup-on-disk/disable`,
		);
		expectCallback(result);
	});

	it("databaseBackup.run() starts an immediate database backup", async () => {
		const result = await client.servers.webserver.databaseBackup.run({ serverSlug });

		expectRequest(
			"POST",
			`/servers/${serverSlug}/actions/db-backup-on-disk/run`,
		);
		expectCallback(result);
	});

	it("searchEngines.block() supports custom robots.txt content", async () => {
		const robotsTxt = "User-agent: *\nDisallow: /staging";

		const result = await client.servers.webserver.searchEngines.block({
			serverSlug,
			robotsTxt,
		});

		expectRequest(
			"POST",
			`/servers/${serverSlug}/actions/block-search-engines`,
			{ robotsTxt },
		);
		expectCallback(result);
	});

	it("searchEngines.unblock() restores search-engine access", async () => {
		const result = await client.servers.webserver.searchEngines.unblock({ serverSlug });

		expectRequest(
			"POST",
			`/servers/${serverSlug}/actions/unblock-search-engines`,
		);
		expectCallback(result);
	});

	it("basicAuth.enable() protects a path", async () => {
		const result = await client.servers.webserver.basicAuth.enable({
			serverSlug,
			path: "/admin",
			username: "staging",
			password: "secret",
		});

		expectRequest(
			"POST",
			`/servers/${serverSlug}/actions/enable-basic-auth`,
			{
				path: "/admin",
				username: "staging",
				password: "secret",
			},
		);
		expectCallback(result);
	});

	it("basicAuth.disable() unprotects a path", async () => {
		const result = await client.servers.webserver.basicAuth.disable({
			serverSlug,
			path: "/admin",
		});

		expectRequest(
			"POST",
			`/servers/${serverSlug}/actions/disable-basic-auth`,
			{
				path: "/admin",
			},
		);
		expectCallback(result);
	});

	it("certbot.test() starts a Certbot dry run", async () => {
		const result = await client.servers.webserver.certbot.test({
			serverSlug,
		});

		expectRequest("POST", `/servers/${serverSlug}/actions/test-certbot`);
		expectCallback(result);
	});
});
