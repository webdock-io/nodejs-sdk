import { Webdock } from "../../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../../requestTestUtils.js";

jest.mock("axios");

describe("Server monitoring requests", () => {
  const monitoring = new Webdock("test-token").servers.monitoring;
  const endpoint = "/servers/example-server/monitoring";
  const rule = {
    id: 2,
    scope: "server",
    serverSlug: "example-server",
    checks: ["httpcheck", "pingcheck"],
    checkInterval: 10,
    notifyUserIds: [1],
    callbackUrl: null,
  };

  beforeEach(resetAxiosMock);

  it("gets the effective server monitoring configuration", async () => {
    const configuration = { ruleType: "custom", serverRule: rule, effectiveRule: rule };
    mockNextResponse(configuration);

    const result = await monitoring.get({ serverSlug: "example-server" });

    expectRequest("GET", endpoint);
    expect(result).toMatchObject({ success: true, response: { body: configuration } });
  });

  it("updates a server-specific rule", async () => {
    const args = {
      serverSlug: "example-server",
      checks: ["httpcheck" as const, "pingcheck" as const],
      checkInterval: 10 as const,
      notifyUserIds: [1],
    };
    mockNextResponse(rule);

    const result = await monitoring.update(args);

    expectRequest("PATCH", endpoint, {
      checks: args.checks,
      checkInterval: args.checkInterval,
      notifyUserIds: args.notifyUserIds,
      callbackUrl: undefined,
    });
    expect(result).toMatchObject({ success: true, response: { body: rule } });
  });

  it("removes the override to use the global rule", async () => {
    mockNextResponse(undefined);

    const result = await monitoring.useGlobal({ serverSlug: "example-server" });

    expectRequest("DELETE", endpoint);
    expect(result).toMatchObject({ success: true, response: { body: undefined } });
  });

  it("disables monitoring for the server", async () => {
    const disabled = { ...rule, scope: "disabled" };
    mockNextResponse(disabled);

    const result = await monitoring.disable({ serverSlug: "example-server" });

    expectRequest("POST", `${endpoint}/disable`);
    expect(result).toMatchObject({ success: true, response: { body: disabled } });
  });
});
