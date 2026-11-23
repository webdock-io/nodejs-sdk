import { Webdock } from "../../index.js";
import { expectCallback, expectRequest, resetAxiosMock } from "../../requestTestUtils.js";

jest.mock("axios");

describe("Server WordPress setup requests", () => {
  const wordpress = new Webdock("test-token").servers.wordpress;

  beforeEach(resetAxiosMock);

  it("prepares WP-CLI without an installation body", async () => {
    const result = await wordpress.setupCli({ serverSlug: "example-server" });

    expectRequest("POST", "/servers/example-server/wordpress/setup-cli");
    expectCallback(result);
  });

  it("links an existing installation during WP-CLI setup", async () => {
    const result = await wordpress.setupCli({
      serverSlug: "example-server",
      path: "/var/www/html",
      url: "https://example.com",
    });

    expectRequest("POST", "/servers/example-server/wordpress/setup-cli", {
      path: "/var/www/html",
      url: "https://example.com",
    });
    expectCallback(result);
  });
});
