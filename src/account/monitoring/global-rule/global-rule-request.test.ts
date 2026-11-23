import { Webdock } from "../../../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../../../requestTestUtils.js";

jest.mock("axios");

describe("Account global monitoring rule requests", () => {
  const globalRule = new Webdock("test-token").account.monitoring.globalRule;
  const endpoint = "/account/monitoring/globalRule";
  const rule = {
    id: 1,
    scope: "global",
    serverSlug: null,
    checks: ["httpcheck"],
    checkInterval: 5,
    notifyUserIds: [1],
    callbackUrl: null,
  };

  beforeEach(resetAxiosMock);

  it("gets the global rule", async () => {
    mockNextResponse(rule);

    const result = await globalRule.get();

    expectRequest("GET", endpoint);
    expect(result).toMatchObject({ success: true, response: { body: rule } });
  });

  it("updates the global rule", async () => {
    const args = { checks: ["httpcheck" as const], checkInterval: 5 as const, notifyUserIds: [1] };
    mockNextResponse(rule);

    const result = await globalRule.update(args);

    expectRequest("PATCH", endpoint, { ...args, callbackUrl: undefined });
    expect(result).toMatchObject({ success: true, response: { body: rule } });
  });

  it("clears the global rule", async () => {
    mockNextResponse(undefined);

    const result = await globalRule.clear();

    expectRequest("DELETE", endpoint);
    expect(result).toMatchObject({ success: true, response: { body: undefined } });
  });
});
