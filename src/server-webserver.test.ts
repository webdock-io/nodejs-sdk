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

	it("exposes the database and WordPress subclasses", () => {
		expect(client.servers.webserver.db).toBeDefined();
		expect(client.servers.webserver.wordpress).toBeDefined();
	});

	it("db.status() gets the backup-on-disk status synchronously", async () => {
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

		const result = await client.servers.webserver.db.status({ serverSlug });

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

	it("db.enable() starts database backups and exposes the callback ID", async () => {
		const result = await client.servers.webserver.db.enable({
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

	it("db.update() updates database backup settings", async () => {
		const result = await client.servers.webserver.db.update({
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

	it("db.disable() disables database backups", async () => {
		const result = await client.servers.webserver.db.disable({ serverSlug });

		expectRequest(
			"POST",
			`/servers/${serverSlug}/actions/db-backup-on-disk/disable`,
		);
		expectCallback(result);
	});

	it("db.run() starts an immediate database backup", async () => {
		const result = await client.servers.webserver.db.run({ serverSlug });

		expectRequest(
			"POST",
			`/servers/${serverSlug}/actions/db-backup-on-disk/run`,
		);
		expectCallback(result);
	});

	it("wordpress.blockSearchEngines() supports custom robots.txt content", async () => {
		const robotsTxt = "User-agent: *\nDisallow: /staging";

		const result = await client.servers.webserver.wordpress.blockSearchEngines({
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

	it("wordpress.unblockSearchEngines() restores search-engine access", async () => {
		const result = await client.servers.webserver.wordpress.unblockSearchEngines({ serverSlug });

		expectRequest(
			"POST",
			`/servers/${serverSlug}/actions/unblock-search-engines`,
		);
		expectCallback(result);
	});

	it("wordpress.enableBasicAuth() protects a path", async () => {
		const result = await client.servers.webserver.wordpress.enableBasicAuth({
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

	it("wordpress.disableBasicAuth() unprotects a path", async () => {
		const result = await client.servers.webserver.wordpress.disableBasicAuth({
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

	it("wordpress.testCertbot() starts a Certbot dry run", async () => {
		const result = await client.servers.webserver.wordpress.testCertbot({
			serverSlug,
		});

		expectRequest("POST", `/servers/${serverSlug}/actions/test-certbot`);
		expectCallback(result);
	});
});
