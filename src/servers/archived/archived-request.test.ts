import { Webdock } from "../../index.js";
import { expectCallback, expectRequest, mockNextResponse, resetAxiosMock } from "../../requestTestUtils.js";

jest.mock("axios");

describe("Archived server requests", () => {
  const archived = new Webdock("test-token").servers.archived;

  beforeEach(resetAxiosMock);

  it("lists archived servers", async () => {
    const rows = [{ id: 8, slug: "old-server" }];
    mockNextResponse(rows);

    const result = await archived.list();

    expectRequest("GET", "/servers/archived");
    expect(result).toMatchObject({ success: true, response: { body: rows } });
  });

  it("gets one archived server", async () => {
    const row = { id: 8, slug: "old-server" };
    mockNextResponse(row);

    const result = await archived.getById({ archivedServerId: 8 });

    expectRequest("GET", "/servers/archived/8");
    expect(result).toMatchObject({ success: true, response: { body: row } });
  });

  it("starts permanent deletion of an archived server", async () => {
    const result = await archived.remove({ archivedServerId: 8 });

    expectRequest("DELETE", "/servers/archived/8");
    expectCallback(result);
  });
});
