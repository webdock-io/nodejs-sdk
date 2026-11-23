import { Webdock } from "../../../index.js";
import { expectCallback, expectRequest, mockNextResponse, resetAxiosMock } from "../../../requestTestUtils.js";

jest.mock("axios");

describe("Server MySQL database requests", () => {
  const databases = new Webdock("test-token").servers.mysql.databases;
  const base = "/servers/example-server/mysql/databases";

  beforeEach(resetAxiosMock);

  it("lists tracked databases", async () => {
    const rows = [{ id: 4, name: "site", created: "2026-11-23", host: "localhost", dbUser: null }];
    mockNextResponse(rows);

    const result = await databases.list({ serverSlug: "example-server" });

    expectRequest("GET", base);
    expect(result).toMatchObject({ success: true, response: { body: rows } });
  });

  it("creates a database", async () => {
    const result = await databases.create({ serverSlug: "example-server", dbName: "site", dbUser: "site_user", dbUserPassword: "testpassword" });

    expectRequest("POST", base, { dbName: "site", dbUser: "site_user", dbUserPassword: "testpassword" });
    expectCallback(result);
  });

  it("removes a database and forwards optional user deletion query parameters", async () => {
    const result = await databases.remove({ serverSlug: "example-server", databaseId: 4, deleteDbUser: true, dbUserId: 9 });

    expectRequest("DELETE", `${base}/4?deleteDbUser=true&dbUserId=9`);
    expectCallback(result);
  });

  it("removes a database without a query string by default", async () => {
    await databases.remove({ serverSlug: "example-server", databaseId: 4 });

    expectRequest("DELETE", `${base}/4`);
  });
});
