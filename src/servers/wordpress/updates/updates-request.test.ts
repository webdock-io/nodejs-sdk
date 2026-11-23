import { Webdock } from "../../../index.js";
import { expectCallback, expectRequest, resetAxiosMock } from "../../../requestTestUtils.js";

jest.mock("axios");

describe("Server WordPress update requests", () => {
  const updates = new Webdock("test-token").servers.wordpress.updates;
  const base = "/servers/example-server/wordpress";

  beforeEach(resetAxiosMock);

  it("checks for updates", async () => {
    const result = await updates.check({ serverSlug: "example-server" });

    expectRequest("POST", `${base}/check-updates`);
    expectCallback(result);
  });

  it("applies the requested update type", async () => {
    const result = await updates.apply({ serverSlug: "example-server", updateType: "all" });

    expectRequest("POST", `${base}/update`, { updateType: "all" });
    expectCallback(result);
  });
});
