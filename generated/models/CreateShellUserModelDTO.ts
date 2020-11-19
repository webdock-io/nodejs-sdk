/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Shell user model
 */
export interface CreateShellUserModelDTO {
    /**
     * Shell username. Aphanumeric. Underscore allowed. [a-zA-Z0-9_]
     */
    username: string;
    /**
     * Password for the shell user. Aphanumeric. Underscore and dashes allowed. [a-zA-Z0-9_-]
     */
    password: string;
    /**
     * Group assignment for the shell user. Only a single group is allowed here.
     */
    group: string;
    /**
     * Default Shell assigned to the shell user
     */
    shell: string;
    /**
     * List of PublicKeys IDs to be assigned to the shell user
     */
    publicKeys?: Array<number>;
}
