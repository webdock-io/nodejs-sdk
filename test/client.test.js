const WebdockApi = require("../dist");

// can be set in .env file at the package root
WebdockApi.OpenAPI.TOKEN = process.env.WEBDOCK_TOKEN;

test("Ensure token is set", () => {
    expect(WebdockApi.OpenAPI.TOKEN).toBeTruthy();
});

test("Ping", async () => {
    const pingResponse = await WebdockApi.PingService.getPing();
    expect(pingResponse).toEqual({ webdock: "rocks" });
});

test("ServersService", async () => {
    const serversResponse = await WebdockApi.ServersService.getServers();
    expect(Array.isArray(serversResponse)).toBe(true);

    const slug = serversResponse[0].slug;
    const singleServerResponse = await WebdockApi.ServersService.getServerBySlug(
        slug
    );
    expect(singleServerResponse.slug).toBe(slug);

    const randomName = `Random name ${parseInt(Math.random() * 10)}`;
    const patchServerResponse = await WebdockApi.ServersService.patchServer(
        slug,
        {
            ...singleServerResponse,
            name: randomName,
        }
    );
    expect(patchServerResponse.name).toBe(randomName);
});
