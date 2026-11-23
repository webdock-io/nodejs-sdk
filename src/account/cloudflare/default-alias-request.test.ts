import { Webdock } from "../../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../../requestTestUtils.js";

jest.mock("axios");

describe("Cloudflare default alias API requests", () => {
  const defaultAlias = new Webdock("test-token").account.cloudflare.defaultAlias;
  const settings = {
    cloudflareAccountId: 7,
    zoneId: "zone-1",
    zoneName: "example.com",
    aliasPattern: "vps",
    hasDefaultAlias: true,
    customAliasExample: "server.vps.example.com",
    defaultWebdockAliasExample: "server.vps.webdock.cloud",
    mainUseCase: "Custom alias domain",
  };

  beforeEach(resetAxiosMock);

  it("gets the current settings", async () => {
    mockNextResponse(settings);

    const result = await defaultAlias.get();

    expectRequest("GET", "/account/cloudflare/defaultAlias");
    expect(result).toMatchObject({ success: true, response: { body: settings } });
  });

  it("updates the settings", async () => {
    const args = { accountId: 7, zoneId: "zone-1", zoneName: "example.com", pattern: "vps" };
    mockNextResponse(settings);

    const result = await defaultAlias.update(args);

    expectRequest("PATCH", "/account/cloudflare/defaultAlias", args);
    expect(result).toMatchObject({ success: true, response: { body: settings } });
  });

  it("clears the settings", async () => {
    const cleared = { ...settings, cloudflareAccountId: 0, hasDefaultAlias: false };
    mockNextResponse(cleared);

    const result = await defaultAlias.clear();

    expectRequest("DELETE", "/account/cloudflare/defaultAlias");
    expect(result).toMatchObject({ success: true, response: { body: cleared } });
  });
});
