import { Webdock } from "./index.js";
import { req } from "./utils/req"

interface EventLog {
    id: number;
    startTime: string;
    endTime: string | null;
    callbackId: string;
    serverSlug: string;
    eventType: string;
    action: string;
    actionData: string;
    status: "waiting" | "working" | "finished" | "error";
    message: string;
}

type EventLogResponse = {
    body: EventLog[];
};
export class OperationClass {
    private parent: Webdock;

    constructor(parent: Webdock) {
        this.parent = parent;
    }

    async fetch(callbackId: string) {
        return await req<EventLogResponse>({
            token: this.parent.string_token,
            endpoint: `/events?callbackId=${callbackId}`,
            log: false,
            method: "GET",
        })
    }
}