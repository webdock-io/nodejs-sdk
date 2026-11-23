import { Webdock } from "../../index.js";
import { expectCallback, expectRequest, mockNextResponse, resetAxiosMock } from "../../requestTestUtils.js";

jest.mock("axios");

describe("Server FTP requests", () => {
  const ftp = new Webdock("test-token").servers.ftp;
  const base = "/servers/example-server/ftp";

  beforeEach(resetAxiosMock);

  it("lists tracked FTP users", async () => {
    const users = [{ id: 3, username: "deploy", group: "www-data", homeDir: "/var/www", created: "2026-11-23" }];
    mockNextResponse(users);

    const result = await ftp.users.list({ serverSlug: "example-server" });

    expectRequest("GET", `${base}/users`);
    expect(result).toMatchObject({ success: true, response: { body: users } });
  });

  it("creates an FTP user", async () => {
    const result = await ftp.users.create({ serverSlug: "example-server", username: "deploy", password: "testpassword" });

    expectRequest("POST", `${base}/users`, {
      username: "deploy", password: "testpassword", group: undefined, homeDir: undefined,
    });
    expectCallback(result);
  });

  it("removes an FTP user", async () => {
    const result = await ftp.users.remove({ serverSlug: "example-server", ftpUserId: 3 });

    expectRequest("DELETE", `${base}/users/3`);
    expectCallback(result);
  });

  it("gets the FTP daemon state", async () => {
    const status = { enabled: true, manageable: true };
    mockNextResponse(status);

    const result = await ftp.daemon.get({ serverSlug: "example-server" });

    expectRequest("GET", `${base}/daemon`);
    expect(result).toMatchObject({ success: true, response: { body: status } });
  });

  for (const method of ["enable", "disable"] as const) {
    it(`${method}() changes the FTP daemon state`, async () => {
      const result = await ftp.daemon[method]({ serverSlug: "example-server" });

      expectRequest("POST", `${base}/daemon/${method}`);
      expectCallback(result);
    });
  }
});
