import { EventStatus } from "./events.mts";
import { Webdock } from "./index.mts";
import { req } from "./utils/req.mts";
import { type } from "arktype";

const EventLog = type({
    id: "number",
    startTime: "string",
    endTime: "string | null",
    callbackId: "string",
    serverSlug: "string",
    eventType: "string",
    action: "string",
    actionData: "string",
    status: EventStatus,
    message: "string",
});

const EventLogResponse = type({
    body: [EventLog],
});

export class OperationClass {
    private parent: Webdock;

    constructor(parent: Webdock) {
        this.parent = parent;
    }

    async fetch(callbackId: string) {
        return await req(
            {
                token: this.parent.string_token,
                endpoint: `/events?callbackId=${callbackId}`,
                log: false,
                method: "GET",
            },
            EventLogResponse
        );
    }
}
