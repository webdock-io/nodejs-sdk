import { Webdock } from "../../index.js";
import { expectCallback, expectRequest, mockNextResponse, resetAxiosMock } from "../../requestTestUtils.js";

jest.mock("axios");

describe("Server cron job requests", () => {
  const cronjobs = new Webdock("test-token").servers.cronjobs;
  const base = "/servers/example-server/cronjobs";

  beforeEach(resetAxiosMock);

  it("lists tracked cron jobs", async () => {
    const jobs = [{ id: 7, command: "date", minute: "0", hour: "*", day: "*", month: "*", dayOfWeek: "*", user: "root", isPaused: false, created: "2026-11-23" }];
    mockNextResponse(jobs);

    const result = await cronjobs.list({ serverSlug: "example-server" });

    expectRequest("GET", base);
    expect(result).toMatchObject({ success: true, response: { body: jobs } });
  });

  it("creates a cron job", async () => {
    const result = await cronjobs.create({ serverSlug: "example-server", command: "date", minute: "0" });

    expectRequest("POST", base, { command: "date", minute: "0", hour: undefined, day: undefined, month: undefined, dayOfWeek: undefined, user: undefined });
    expectCallback(result);
  });

  it("removes a cron job with a callback when asynchronous", async () => {
    const result = await cronjobs.remove({ serverSlug: "example-server", cronjobId: 7 });

    expectRequest("DELETE", `${base}/7`);
    expectCallback(result);
  });

  it("allows a 204 cron deletion without a callback", async () => {
    mockNextResponse(undefined);

    const result = await cronjobs.remove({ serverSlug: "example-server", cronjobId: 7 });

    expectRequest("DELETE", `${base}/7`);
    expect(result).toMatchObject({ success: true, response: { body: undefined } });
    if (result.success) expect(result.response.headers["x-callback-id"]).toBeUndefined();
  });

  for (const method of ["pause", "unpause"] as const) {
    it(`${method}() updates a cron job`, async () => {
      const result = await cronjobs[method]({ serverSlug: "example-server", cronjobId: 7 });

      expectRequest("POST", `${base}/7/${method}`);
      expectCallback(result);
    });
  }
});
