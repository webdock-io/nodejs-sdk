import { Webdock } from "../../../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../../../requestTestUtils.js";

jest.mock("axios");

describe("Server Postmark API requests", () => {
  const postmark = new Webdock("test-token").servers.mail.postmark;
  const base = "/servers/example-server/mail/postmark";

  beforeEach(resetAxiosMock);

  it("enables Postmark with manual DNS setup", async () => {
    const state = { postmark: { connected: true, status: "pending_verified" } };
    mockNextResponse(state);

    const result = await postmark.enable({ serverSlug: "example-server", domain: "example.com" });

    expectRequest("POST", `${base}/enable`, {
      domain: "example.com",
      cfZoneId: undefined,
      cfAccountId: undefined,
      zone: undefined,
    });
    expect(result).toMatchObject({ success: true, response: { body: state } });
  });

  it("enables Postmark with Cloudflare DNS setup", async () => {
    await postmark.enable({
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
  });

  it("disables Postmark", async () => {
    await postmark.disable({ serverSlug: "example-server" });

    expectRequest("POST", `${base}/disable`);
  });
});
