import { Webdock } from "../../../index.js";
import { expectCallback, expectRequest, resetAxiosMock } from "../../../requestTestUtils.js";

jest.mock("axios");

describe("Server WordPress lockdown requests", () => {
  const lockdown = new Webdock("test-token").servers.wordpress.lockdown;
  const base = "/servers/example-server/wordpress";

  beforeEach(resetAxiosMock);

  it("locks down the registered installation with default settings", async () => {
    const result = await lockdown.enable({ serverSlug: "example-server" });

    expectRequest("POST", `${base}/lockdown`);
    expectCallback(result);
  });

  it("sends custom lockdown settings", async () => {
    const settings = { allowedWritePaths: ["/wp-content/uploads"], webUserGroup: "www-data:www-data" };

    const result = await lockdown.enable({ serverSlug: "example-server", ...settings });

    expectRequest("POST", `${base}/lockdown`, { ...settings, disallowPhpPaths: undefined });
    expectCallback(result);
  });

  it("unlocks the registered installation", async () => {
    const result = await lockdown.disable({ serverSlug: "example-server" });

    expectRequest("POST", `${base}/unlock`);
    expectCallback(result);
  });
});
