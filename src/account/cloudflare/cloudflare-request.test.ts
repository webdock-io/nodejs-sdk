import { Webdock } from "../../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../../requestTestUtils.js";

jest.mock("axios");

describe("Cloudflare credential API requests", () => {
  const credentials = new Webdock("test-token").account.cloudflare.credentials!;

  beforeEach(resetAxiosMock);

  it("lists connected credentials", async () => {
    const items = [{ id: 1, accountName: "Primary", username: "", authMode: "api_token" }];
    mockNextResponse(items);

    const result = await credentials.list();

    expectRequest("GET", "/account/cloudflare/credentials");
    expect(result).toMatchObject({ success: true, response: { body: items } });
  });

  it("creates a credential", async () => {
    const args = { accountName: "Primary", authMode: "api_token" as const, apiKey: "test-api-key" };

    await credentials.create(args);

    expectRequest("POST", "/account/cloudflare/credentials", args);
  });

  it("updates a credential with PATCH", async () => {
    const args = { credentialId: 7, accountName: "Renamed", apiKey: "new-test-api-key" };

    await credentials.update(args);

    expectRequest("PATCH", "/account/cloudflare/credentials/7", {
      accountName: args.accountName,
      apiKey: args.apiKey,
      authMode: undefined,
      username: undefined,
    });
  });

  it("removes a credential", async () => {
    await credentials.remove({ credentialId: 7 });

    expectRequest("DELETE", "/account/cloudflare/credentials/7");
  });

  it("lists zones for a credential", async () => {
    const zones = [{ id: "zone-1", name: "example.com", value: "example.com" }];
    mockNextResponse(zones);

    const result = await credentials.ListZones({ credentialId: 7 });

    expectRequest("GET", "/account/cloudflare/credentials/7/zones");
    expect(result).toMatchObject({ success: true, response: { body: zones } });
  });
});
