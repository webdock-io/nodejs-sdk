/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */


/**
 * Event hook model
 */
export interface CreateEventHookModelDTO {
    /**
     * Callback URL
     */
    callbackUrl?: string;
    /**
     * (Optional) Callback ID
     */
    callbackId?: string | null;
    /**
     * (Optional) Event Type
     */
    eventType?: CreateEventHookModelDTO.eventType | null;
}

export namespace CreateEventHookModelDTO {

    /**
     * (Optional) Event Type
     */
    export enum eventType {
        PROVISION = 'provision',
    }


}
