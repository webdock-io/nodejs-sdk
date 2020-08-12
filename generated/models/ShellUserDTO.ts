/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { PublicKeyDTO } from './PublicKeyDTO';

/**
 * Shell user model
 */
export interface ShellUserDTO {
    /**
     * Shell user ID
     */
    id?: number;
    /**
     * Username
     */
    username?: string;
    /**
     * Shell user group
     */
    group?: string;
    /**
     * Shell
     */
    shell?: string;
    /**
     * Shell
     */
    publicKeys?: Array<PublicKeyDTO>;
    /**
     * Shell user creation datetime
     */
    date?: string;
}
