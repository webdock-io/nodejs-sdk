/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */


/**
 * Event log model
 */
export interface EventLogDTO {
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
     * Status
     */
    status?: EventLogDTO.status;
    /**
     * Message
     */
    message?: string;
}

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
