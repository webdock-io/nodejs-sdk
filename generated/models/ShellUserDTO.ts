/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PublicKeyDTO } from './PublicKeyDTO';

/**
 * Shell user model
 */
export type ShellUserDTO = {
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
    created?: string;
};

