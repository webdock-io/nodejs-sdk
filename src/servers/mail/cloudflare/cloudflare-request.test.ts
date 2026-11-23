import { Webdock } from "../../../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../../../requestTestUtils.js";

jest.mock("axios");

describe("Server mail Cloudflare API requests", () => {
  const cloudflare = new Webdock("test-token").servers.mail.cloudflare;
  const serverSlug = "example-server";
  const base = `/servers/${serverSlug}/mail/cloudflare`;
  const options = {
    hasCredentials: true,
    accounts: [{ id: 7, accountName: "Primary" }],
    defaultAliasSettings: {
      cloudflareAccountId: 7,
      zoneId: "zone-1",
      zoneName: "example.com",
      aliasPattern: "srv",
      customAliasExample: "example-server.srv.example.com",
      defaultWebdockAliasExample: "example-server.vps.webdock.cloud",
      mainUseCase: "Custom alias domain",
    },
  };

  beforeEach(resetAxiosMock);

  it("gets Cloudflare options for a server", async () => {
    mockNextResponse(options);

    const result = await cloudflare.options({ serverSlug });

    expectRequest("GET", `${base}/options`);
    expect(result).toMatchObject({ success: true, response: { body: options } });
  });

  it("lists zones for a connected account", async () => {
    const zones = [{ id: "zone-1", name: "example.com", value: "zone-1|example.com" }];
    mockNextResponse(zones);

    const result = await cloudflare.zones({ serverSlug, accountId: 7 });

    expectRequest("GET", `${base}/accounts/7/zones`);
    expect(result).toMatchObject({ success: true, response: { body: zones } });
  });

  it("updates default alias settings without sending the server slug in the body", async () => {
    const args = { serverSlug, accountId: 7, zoneId: "zone-1", zoneName: "example.com", pattern: "srv" };
    mockNextResponse(options);

    const result = await cloudflare.defaultAlias.update(args);

    expectRequest("PATCH", `${base}/default-alias`, {
      accountId: 7,
      zoneId: "zone-1",
      zoneName: "example.com",
      pattern: "srv",
    });
    expect(result).toMatchObject({ success: true, response: { body: options } });
  });

  it("clears default alias settings", async () => {
    const cleared = {
      ...options,
      defaultAliasSettings: { ...options.defaultAliasSettings, cloudflareAccountId: 0, customAliasExample: null },
    };
    mockNextResponse(cleared);

    const result = await cloudflare.defaultAlias.clear({ serverSlug });

    expectRequest("DELETE", `${base}/default-alias`);
    expect(result).toMatchObject({ success: true, response: { body: cleared } });
  });
});
