import { Webdock } from "../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../requestTestUtils.js";

jest.mock("axios");

describe("WAF requests", () => {
  const wafs = new Webdock("test-token").wafs;
  const base = "/wafs";
  const upstreams = [{ name: "origin", ipv4: "203.0.113.1" }];
  const waf = { id: "waf-1", name: "Site", domain: "example.com", protectionLevel: "full", upstreams, settings: {} };

  beforeEach(resetAxiosMock);

  it("lists WAFs", async () => {
    mockNextResponse([waf]);
    const result = await wafs.list();
    expectRequest("GET", base);
    expect(result).toMatchObject({ success: true, response: { body: [waf] } });
  });

  it("creates a WAF", async () => {
    const args = { name: "Site", domain: "example.com", upstreams, protectionLevel: "full" as const };
    mockNextResponse(waf);
    const result = await wafs.create(args);
    expectRequest("POST", base, args);
    expect(result).toMatchObject({ success: true, response: { body: waf } });
  });

  it("gets one WAF", async () => {
    await wafs.getById({ wafId: "waf-1" });
    expectRequest("GET", `${base}/waf-1`);
  });

  it("updates a WAF", async () => {
    await wafs.update({ wafId: "waf-1", protectionLevel: "advanced", ddosProtection: true });
    expectRequest("PATCH", `${base}/waf-1`, expect.objectContaining({ protectionLevel: "advanced", ddosProtection: true }));
  });

  it("removes a WAF", async () => {
    mockNextResponse(undefined);
    const result = await wafs.remove({ wafId: "waf-1" });
    expectRequest("DELETE", `${base}/waf-1`);
    expect(result).toMatchObject({ success: true, response: { body: undefined } });
  });
});
