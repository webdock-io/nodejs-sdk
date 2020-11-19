/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * PatchServer model
 */
export interface PatchServerModelDTO {
    /**
     * Name of the server
     */
    name: string;
    /**
     * Description of the server
     */
    description: string;
    /**
     * Internal notes or comments regarding the server
     */
    notes: string;
    /**
     * Next action of the server
     */
    nextActionDate: string;
}
