/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Event log model
 */
export type EventLogDTO = {
    /**
     * Event log ID
     */
    id?: number;
    /**
     * Start Time of the event
     */
    startTime?: string;
    /**
     * End Time of the event
     */
    endTime?: string | null;
    /**
     * Callback ID
     */
    callbackId?: string;
    /**
     * Server Slug
     */
    serverSlug?: string;
    /**
     * Event Type
     */
    eventType?: string;
    /**
     * Just a plain text description of the action. Same text as you see in the Event Log in the Webdock Dashboard.
     */
    action?: string;
    /**
     * Action Data. A more static/parseable string representation of the action.
     */
    actionData?: string;
    /**
     * Status
     */
    status?: EventLogDTO.status;
    /**
     * Any &quot;Message&quot; or return data from the action once finished executing.
     */
    message?: string;
};

export namespace EventLogDTO {

    /**
     * Status
     */
    export enum status {
        WAITING = 'waiting',
        WORKING = 'working',
        FINISHED = 'finished',
        ERROR = 'error',
    }


}

