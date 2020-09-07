/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */


/**
 * ServerImage model
 */
export interface ServerImageDTO {
    /**
     * Image slug
     */
    slug?: string;
    /**
     * Image name
     */
    name?: string;
    /**
     * Web server type
     */
    webServer?: ServerImageDTO.webServer | null;
    /**
     * PHP Version
     */
    phpVersion?: string | null;
}

export namespace ServerImageDTO {

    /**
     * Web server type
     */
    export enum webServer {
        APACHE = 'Apache',
        NGINX = 'Nginx',
    }


}
