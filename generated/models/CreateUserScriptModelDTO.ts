/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * User script model
 */
export type CreateUserScriptModelDTO = {
    /**
     * Name of the script
     */
    name: string;
    /**
     * Filename of the script
     */
    filename: string;
    /**
     * The script
     */
    content: string;
};

