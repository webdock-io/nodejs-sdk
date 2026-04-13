import { Webdock } from ".";
import { ResourceLimit } from "./platforms";
import { isE2EEnabled } from "./testUtils";

describe("Test Platform", () => {
    const token = process.env.WEBDOCK_TOKEN ?? "";
    const enabled = Boolean(token) && isE2EEnabled();
    const client = new Webdock(token || "");
    // const it = enabled ? test : test.skip;

    it("list platforms", async () => {
        const platforms = await client.platforms.list({ currency: "DKK" })
        expect(platforms.success).toBeTruthy()
        if (!platforms.success) return
        expect(platforms.response.body).toBeInstanceOf(Array)
        expect(platforms.response.body.length).toBeGreaterThan(0)
        platforms.response.body.forEach((platform) => {
            expect(platform.slug).toBeTruthy()
            expect(platform.description).toBeTruthy()
            expect(platform.resourceLimits.cpuThreads).toMatchObject({
                costCents: expect.any(Number),
                freeUnits: expect.any(Number),
                max: expect.any(Number),
                min: expect.any(Number)
            } as ResourceLimit)
        })
    })
})