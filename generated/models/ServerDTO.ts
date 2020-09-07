/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */


/**
 * Server model
 */
export interface ServerDTO {
    /**
     * Server slug
     */
    slug?: string;
    /**
     * Server name
     */
    name?: string;
    /**
     * Location ID of the server
     */
    location?: string | null;
    /**
     * Server image
     */
    image?: string;
    /**
     * Server profile
     */
    profile?: string | null;
    /**
     * IPv4 address
     */
    ipv4?: string | null;
    /**
     * IPv6 address
     */
    ipv6?: string | null;
    /**
     * Server status
     */
    status?: ServerDTO.status;
    /**
     * Webserver type
     */
    webServer?: string;
    /**
     * Aliases
     */
    aliases?: Array<string>;
    /**
     * Last known snapshot runtime (seconds)
     */
    snapshotRunTime?: number;
    /**
     * Description
     */
    description?: string;
    /**
     * Wordpress lockdown status
     */
    wordPressLockDown?: boolean;
    /**
     * Notes
     */
    notes?: string;
    /**
     * Creation date/time
     */
    date?: string;
    /**
     * Next Action date/time
     */
    nextActionDate?: string;
}

export namespace ServerDTO {

    /**
     * Server status
     */
    export enum status {
        PROVISIONING = 'provisioning',
        RUNNING = 'running',
        STOPPED = 'stopped',
        ERROR = 'error',
        REBOOTING = 'rebooting',
        STARTING = 'starting',
        STOPPING = 'stopping',
        REINSTALLING = 'reinstalling',
    }


}
