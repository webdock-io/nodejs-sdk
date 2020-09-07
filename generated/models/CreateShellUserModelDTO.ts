/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */


/**
 * Shell user model
 */
export interface CreateShellUserModelDTO {
    /**
     * Shell username
     */
    username: string;
    /**
     * Password for the shell user
     */
    password: string;
    /**
     * Group for the shell user
     */
    group: string;
    /**
     * Shell for the shell user
     */
    shell: string;
    /**
     * List of PublicKeys IDs to the assigned to the shell user
     */
    publicKeys: Array<number>;
}
