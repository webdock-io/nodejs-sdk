/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */


/**
 * Server script model
 */
export interface CreateServerScriptModelDTO {
    /**
     * ID of the user script to be deployed
     */
    scriptId: number;
    /**
     * Absolute path and filename of deployment. Must start with a forward slash (/). If path doesn't exist it will be created.Existing files will be overwritten. Example: /root/myscript.sh
     */
    path?: string;
    /**
     * Whether the script file should be made executable
     */
    makeScriptExecutable?: boolean;
    /**
     * If script should be executed immediately after deployment. Requires makeScriptExecutable is set to true.
     */
    executeImmediately?: boolean;
}
