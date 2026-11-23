import { Webdock } from "../../../index.js";
import { expectCallback, expectRequest, mockNextResponse, resetAxiosMock } from "../../../requestTestUtils.js";

jest.mock("axios");

describe("Server WordPress installation requests", () => {
  const installation = new Webdock("test-token").servers.wordpress.installation;
  const base = "/servers/example-server/wordpress";

  beforeEach(resetAxiosMock);

  it("registers an existing installation synchronously", async () => {
    const metadata = { status: "installed", path: "/var/www/html", url: "https://example.com" };
    mockNextResponse(metadata);

    const result = await installation.register({
      serverSlug: "example-server",
      path: "/var/www/html",
      url: "https://example.com",
    });

    expectRequest("PATCH", `${base}/installation`, { path: "/var/www/html", url: "https://example.com" });
    expect(result).toMatchObject({ success: true, response: { body: metadata } });
  });

  it("installs WordPress with explicit database credentials", async () => {
    const args = {
      serverSlug: "example-server",
      locale: "en_US",
      path: "/var/www/html",
      url: "https://example.com",
      title: "Example",
      username: "admin",
      email: "admin@example.com",
      dbUser: "wordpress",
      dbPass: "test-db-password",
    };

    const result = await installation.install(args);

    expectRequest("POST", `${base}/install`, {
      locale: args.locale,
      path: args.path,
      url: args.url,
      title: args.title,
      username: args.username,
      email: args.email,
      dbUser: args.dbUser,
      dbPass: args.dbPass,
      dbName: undefined,
      dbHost: undefined,
      adminPassword: undefined,
    });
    expectCallback(result);
  });

  it("uses stored database credentials when no override is provided", async () => {
    const result = await installation.install({
      serverSlug: "example-server",
      locale: "en_US",
      path: "/var/www/html",
      url: "https://example.com",
      title: "Example",
      username: "admin",
      email: "admin@example.com",
    });

    expectRequest("POST", `${base}/install`, expect.objectContaining({ dbUser: undefined, dbPass: undefined }));
    expectCallback(result);
  });
});
