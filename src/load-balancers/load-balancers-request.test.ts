import { Webdock } from "../index.js";
import { expectRequest, mockNextResponse, resetAxiosMock } from "../requestTestUtils.js";

jest.mock("axios");

describe("Load balancer requests", () => {
  const loadBalancers = new Webdock("test-token").loadBalancers;
  const base = "/loadbalancers";
  const upstreams = [{ name: "one", ipv4: "203.0.113.1" }, { name: "two", ipv4: "203.0.113.2" }];
  const balancer = { id: "lb-1", name: "Public", domain: "example.com", upstreams, settings: {} };

  beforeEach(resetAxiosMock);

  it("lists load balancers", async () => {
    mockNextResponse([balancer]);
    const result = await loadBalancers.list();
    expectRequest("GET", base);
    expect(result).toMatchObject({ success: true, response: { body: [balancer] } });
  });

  it("creates a load balancer", async () => {
    const args = { name: "Public", domain: "example.com", upstreams, enableHttp3: true };
    mockNextResponse(balancer);
    const result = await loadBalancers.create(args);
    expectRequest("POST", base, args);
    expect(result).toMatchObject({ success: true, response: { body: balancer } });
  });

  it("gets one load balancer", async () => {
    await loadBalancers.getById({ loadBalancerId: "lb-1" });
    expectRequest("GET", `${base}/lb-1`);
  });

  it("updates one load balancer", async () => {
    await loadBalancers.update({ loadBalancerId: "lb-1", name: "Renamed", cacheStaticFiles: true });
    expectRequest("PATCH", `${base}/lb-1`, expect.objectContaining({ name: "Renamed", cacheStaticFiles: true }));
  });

  it("removes one load balancer", async () => {
    mockNextResponse(undefined);
    const result = await loadBalancers.remove({ loadBalancerId: "lb-1" });
    expectRequest("DELETE", `${base}/lb-1`);
    expect(result).toMatchObject({ success: true, response: { body: undefined } });
  });
});
