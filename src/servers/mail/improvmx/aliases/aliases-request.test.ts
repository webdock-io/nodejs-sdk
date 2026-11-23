import { Webdock } from "../../../../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../../../../requestTestUtils.js";

jest.mock("axios");

describe("Server ImprovMX alias API requests", () => {
  const aliases = new Webdock("test-token").servers.mail.improvmx.aliases;
  const base = "/servers/example-server/mail/improvmx/aliases";

  beforeEach(resetAxiosMock);

  it("lists aliases", async () => {
    const items = [{ alias: "support", email: "support@example.com", destination: "team@example.org", count: 2 }];
    mockNextResponse(items);

    const result = await aliases.list({ serverSlug: "example-server" });

    expectRequest("GET", base);
    expect(result).toMatchObject({ success: true, response: { body: items } });
  });

  it("creates a forwarding alias", async () => {
    await aliases.create({ serverSlug: "example-server", alias: "support", destination: "team@example.org" });

    expectRequest("POST", base, { alias: "support", destination: "team@example.org" });
  });

  it("removes a forwarding alias", async () => {
    await aliases.remove({ serverSlug: "example-server", alias: "*" });

    expectRequest("POST", `${base}/remove`, { alias: "*" });
  });
});
