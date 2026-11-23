import { Webdock } from "../../../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../../../requestTestUtils.js";

jest.mock("axios");

describe("Server ImprovMX API requests", () => {
  const improvmx = new Webdock("test-token").servers.mail.improvmx;
  const base = "/servers/example-server/mail/improvmx";

  beforeEach(resetAxiosMock);

  it("enables ImprovMX", async () => {
    const state = { improvmx: { connected: true, status: "pending_verified" } };
    mockNextResponse(state);

    const result = await improvmx.enable({
      serverSlug: "example-server",
      domain: "example.com",
      cfZoneId: "zone-1",
      cfAccountId: 7,
    });

    expectRequest("POST", `${base}/enable`, {
      domain: "example.com",
      cfZoneId: "zone-1",
      cfAccountId: 7,
      zone: undefined,
    });
    expect(result).toMatchObject({ success: true, response: { body: state } });
  });

  it("disables ImprovMX", async () => {
    await improvmx.disable({ serverSlug: "example-server" });

    expectRequest("POST", `${base}/disable`);
  });
});
