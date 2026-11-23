import { Webdock } from "../../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../../requestTestUtils.js";

jest.mock("axios");

describe("Account monitoring overview request", () => {
  const monitoring = new Webdock("test-token").account.monitoring;

  beforeEach(resetAxiosMock);

  it("lists monitoring status for servers", async () => {
    const rows = [{
      serverSlug: "example-server",
      serverName: "Example",
      ruleType: "global",
      checkInterval: null,
      notifyUserIds: [],
      callbackUrl: null,
      lastChecks: [{ checkType: "httpcheck", lastChecked: "2026-11-23T00:00:00Z", result: true }],
    }];
    mockNextResponse(rows);

    const result = await monitoring.overview();

    expectRequest("GET", "/account/monitoring/overview");
    expect(result).toMatchObject({ success: true, response: { body: rows } });
  });
});
