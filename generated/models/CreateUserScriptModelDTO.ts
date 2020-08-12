/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */


/**
 * User script model
 */
export interface CreateUserScriptModelDTO {
    /**
     * Name of the script
     */
    name?: string;
    /**
     * Filename of the script
     */
    filename?: string;
    /**
     * The script
     */
    content?: string;
}
