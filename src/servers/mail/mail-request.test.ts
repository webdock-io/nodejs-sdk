import { Webdock } from "../../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../../requestTestUtils.js";

jest.mock("axios");

describe("Server mail API requests", () => {
  const mail = new Webdock("test-token").servers.mail;

  beforeEach(resetAxiosMock);

  it("gets the mail-management state", async () => {
    const state = { qualifiers: {}, postmark: { connected: false }, improvmx: { connected: false } };
    mockNextResponse(state);

    const result = await mail.get({ serverSlug: "example-server" });

    expectRequest("GET", "/servers/example-server/mail");
    expect(result).toMatchObject({ success: true, response: { body: state } });
  });
});
