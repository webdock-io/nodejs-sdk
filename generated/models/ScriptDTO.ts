/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */


/**
 * Script model
 */
export interface ScriptDTO {
    /**
     * Script ID
     */
    id?: number;
    /**
     * Script name
     */
    name?: string;
    /**
     * Script description
     */
    description?: string;
    /**
     * Script filename
     */
    filename?: string;
    /**
     * Script content
     */
    content?: string;
}
