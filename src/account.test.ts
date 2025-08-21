import { Webdock } from "./index.js";

describe("Account API", () => {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	const api = new Webdock(token);

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
});

