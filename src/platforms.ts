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
    async list(args:  { currency?: "EUR" | "USD" | "DKK" | (string & {}) }) {

        const query= new URLSearchParams()
        if (!!args.currency ) {
            query.append("currency", args.currency)
        }

        let url =  `/platforms`
        if (query.size != 0) {
           url = url.concat("&"+query.toString())
        }
        
        return req<PlatformsResponse>({
            token: this.parent.string_token,
            endpoint: url,
            method: "GET",
        })
    }

}
