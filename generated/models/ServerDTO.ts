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
     * Creation date/time
     */
    date?: string;
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
    webServer?: ServerDTO.webServer;
    /**
     * Aliases - Domain names for the server as known by Webdock. First entry should be treated as the &quot;Main Domain&quot; for the server.
     */
    aliases?: Array<string>;
    /**
     * Last known snapshot runtime (seconds)
     */
    snapshotRunTime?: number;
    /**
     * Server Description (what's installed here?) as entered by admin in Server Metadata
     */
    description?: string;
    /**
     * Wordpress lockdown status
     */
    WordPressLockDown?: boolean;
    /**
     * SSH Password Authentication Enabled for this Server
     */
    SSHPasswordAuthEnabled?: boolean;
    /**
     * Notes as entered by admin in Server Metadata
     */
    notes?: string;
    /**
     * Next Action date/time as entered by admin in Server Metadata
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

    /**
     * Webserver type
     */
    export enum webServer {
        APACHE = 'Apache',
        NGINX = 'Nginx',
        NONE = 'None',
    }


}
