import { Webdock } from "./index.js";
import { isE2EEnabled } from "./testUtils.js";

describe("Account API", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const api = new Webdock({
		token,
		secret_dev_client: "super_secret_client",
	});
	const enabled = Boolean(token) && isE2EEnabled();
	const e2eIt = enabled ? test : test.skip;

	it("Validate Authentication Token", async () => {
		const res = await api.account.info();
		expect(res.success).toBe(token ? true : false);
	});

	it("Handle Invalid Token", async () => {
		const res = await api.account.info();
		if (!token) {
			expect(res.success).toBe(false);
		} else {
			expect(res.success).toBe(true);
		}
	});

	it("Validate Account Information Structure (when authorized)", async () => {
		if (!token) return;
		const res = await api.account.info();
		expect(res.success).toBe(true);
		if (res.success) {
			expect(res.response).toMatchObject({
				body: {
					userId: expect.any(Number),
					companyName: expect.any(String),
					userName: expect.any(String),
					userAvatar: expect.any(String),
					userEmail: expect.any(String),
					isTeamMember: expect.any(Boolean),
					teamLeader: expect.any(String),
					accountBalance: expect.any(String),
					accountBalanceRaw: expect.any(String),
					accountBalanceCurrency: expect.any(String),
				},
				headers: {},
			});
		}
	});

	e2eIt("listArchivedServers() - List archived server backups", async () => {
		const res = await api.account.listArchivedServers();
		expect(res.success).toBe(true);
		if (!res.success) return;

		expect(res.response.body).toBeInstanceOf(Array);
		res.response.body.forEach((backup) => {
			expect(backup).toMatchObject({
				id: expect.any(Number),
				name: expect.any(String),
				virtualization: "kvm",
				completed: expect.any(Boolean),
				date: expect.any(String),
				deletable: expect.any(Boolean),
				serverSlug: expect.any(String),
			});

		});
	});
});
