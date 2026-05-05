import { Webdock } from ".";
import { req } from "./utils/req";

export type ResourceLimit = {
    min: number;
    max: number;
    costCents: number;
    freeUnits: number;
};

type Platform = {
    slug: string;
    name: string;
    description: string | null;
    resourceLimits: {
        cpuThreads: ResourceLimit;
        ram: ResourceLimit;
        diskSpace: ResourceLimit;
        networkBandwidth: ResourceLimit;
    };
};

type PlatformsResponse = {
    body: Platform[]
};



export default class PlatformsClass {
    private parent: Webdock
    constructor(parent: Webdock) {
        this.parent = parent
    }
    async list({ currency = "EUR" }: { currency?: "EUR" | "USD" | "DKK" | (string & {}) }) {
        return req<PlatformsResponse>({
            token: this.parent.string_token,
            endpoint: `/platforms?currency=${currency}`,
            method: "GET",
        })
    }

}
