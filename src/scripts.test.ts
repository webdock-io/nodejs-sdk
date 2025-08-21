import { Webdock } from "./index.js";
import { waitForCallback } from "./testUtils.js";

describe("Scripts API Integration Tests", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const client = new Webdock(token || "");

	let testServerSlug: string | undefined;
	let testScriptId: number | undefined;
	let testScriptIdOnServer: number | undefined;

	it("Setup: Create test server for script operations", async () => {

		const response = await client.servers.create({
			name: "test-script-server",
			locationId: "dk",
			slug: `server-${Math.random().toString(36).slice(2)}`,
			profileSlug: "webdockepyc-bit",
			imageSlug: "webdock-ubuntu-jammy-cloud",
		});

		expect(response.success).toBe(true);
		if (!response.success) {
			return;
		}

		testServerSlug = response.response.body.slug;

		await waitForCallback(client, response.response.headers["x-callback-id"]);
	});

	it("list() - Retrieve all available scripts", async () => {

		const response = await client.scripts.list();
		expect(response.success).toBe(true);
		if (!response.success) {
			return;
		}

		const scripts = response.response.body;
		expect(scripts).toBeInstanceOf(Array);

		scripts.forEach((script, index) => {
			console.log(`   ${index + 1}. ${script.name} (ID: ${script.id}) - ${script.filename}`);
			expect(script).toMatchObject({
				id: expect.any(Number),
				name: expect.any(String),
				description: expect.any(String),
				filename: expect.any(String),
				content: expect.any(String),
			});
		});
	});

	it("create() - Create a new script", async () => {

		const testScript = {
			name: "test-script",
			filename: "test.sh",
			content: "echo 'Hello World'"
		};

		const response = await client.scripts.create(testScript);
		expect(response.success).toBe(true);
		if (!response.success) {
			return;
		}

		const script = response.response.body;
		testScriptId = script.id;

		expect(script).toMatchObject({
			id: expect.any(Number),
			name: testScript.name,
			description: expect.any(String),
			filename: testScript.filename,
			content: testScript.content,
		});
	});

	it("getById() - Retrieve specific script by ID", async () => {

		if (!testScriptId) {
			return;
		}

		const response = await client.scripts.getById({ scriptId: testScriptId });
		expect(response.success).toBe(true);
		if (!response.success) {
			return;
		}

		const script = response.response.body;

		expect(script.id).toBe(testScriptId);
	});

	it("update() - Modify existing script", async () => {

		if (!testScriptId) {
			return;
		}

		const updatedScript = {
			id: testScriptId,
			name: "updated-test-script",
			filename: "updated-test.sh",
			content: "echo 'Updated Test'"
		};

		const response = await client.scripts.update(updatedScript);
		expect(response.success).toBe(true);
		if (!response.success) {
			return;
		}

		const script = response.response.body;

		expect(script.id).toBe(testScriptId);
		expect(script.name).toBe(updatedScript.name);
		expect(script.filename).toBe(updatedScript.filename);
		expect(script.content).toBe(updatedScript.content);
	});

	it("createOnServer() - Deploy script to server", async () => {

		if (!testScriptId || !testServerSlug) {
			return;
		}

		const response = await client.scripts.createOnServer({
			scriptId: testScriptId,
			serverSlug: testServerSlug,
			path: "/home/admin",
			makeScriptExecutable: true,
			executeImmediately: false,
		});

		console.log(`📡 Script deployment response success: ${response.success}`);
		expect(response.success).toBe(true);
		if (!response.success) {
			console.log("❌ Script deployment failed");
			return;
		}

		await waitForCallback(client, response.response.headers["x-callback-id"]);
	});

	it("listOnServer() - List scripts deployed on server", async () => {

		if (!testServerSlug) {
			return;
		}

		const response = await client.scripts.listOnServer({ serverSlug: testServerSlug });
		expect(response.success).toBe(true);
		if (!response.success) {
			console.log("❌ Failed to list server scripts");
			return;
		}

		const scripts = response.response.body;
		expect(scripts).toBeInstanceOf(Array);

		scripts.forEach((script, index) => {
			console.log(`   ${index + 1}. ${script.name} (ID: ${script.id})`);
		});

		const serverScript = scripts.find((script) =>
			script.name === "test-script" || script.name === "updated-test-script"
		);

		if (serverScript) {
			testScriptIdOnServer = serverScript.id;
		}
	});

	it("executeOnServer() - Run script on server", async () => {

		if (!testScriptIdOnServer || !testServerSlug) {
			console.log("❌ Missing script ID on server or server slug");
			return;
		}

		const response = await client.scripts.executeOnServer({
			serverSlug: testServerSlug,
			scriptID: testScriptIdOnServer
		});

		expect(response.success).toBe(true);
		if (!response.success) {
			return;
		}

		await waitForCallback(client, response.response.headers["x-callback-id"]);
	});

	it("deleteScriptFromServer() - Remove script from server", async () => {

		if (!testScriptIdOnServer || !testServerSlug) {
			console.log("❌ Missing script ID on server or server slug");
			return;
		}

		const response = await client.scripts.deleteScriptFromServer({
			serverSlug: testServerSlug,
			scriptId: testScriptIdOnServer
		});

		expect(response.success).toBe(true);

	});

	it("delete() - Remove script from account", async () => {

		if (!testScriptId) {
			console.log("❌ No test script ID available");
			return;
		}

		const response = await client.scripts.delete({ id: testScriptId });
		expect(response.success).toBe(true);

	});

	afterAll(async () => {



		if (testServerSlug) {
			console.log(`🗑️ Deleting test server: ${testServerSlug}`);
			const deleteResponse = await client.servers.delete({ serverSlug: testServerSlug });
			if (deleteResponse.success) {
				console.log("⏳ Waiting for server deletion callback...");
				await waitForCallback(client, deleteResponse.response.headers["x-callback-id"]);
				console.log("✅ Test server deleted successfully");
			} else {
				console.log("❌ Failed to delete test server");
			}
		}

		console.log("🏁 Cleanup completed");
	});
});