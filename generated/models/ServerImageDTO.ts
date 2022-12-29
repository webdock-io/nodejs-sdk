/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * ServerImage model
 */
export type ServerImageDTO = {
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
     * PHP Version. For example &quot;7.4&quot;
     */
    phpVersion?: string | null;
};

export namespace ServerImageDTO {

    /**
     * Web server type
     */
    export enum webServer {
        APACHE = 'Apache',
        NGINX = 'Nginx',
    }


}

