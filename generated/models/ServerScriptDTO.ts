/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * ServerScript model
 */
export type ServerScriptDTO = {
    /**
     * Script ID
     */
    id?: number;
    /**
     * Script name
     */
    name?: string;
    /**
     * Script path
     */
    path?: string;
    /**
     * Date/time of the last run
     */
    lastRun?: string | null;
    /**
     * Callback ID of the last script run
     */
    lastRunCallbackId?: string | null;
    /**
     * Creation date/time
     */
    created?: string;
};

