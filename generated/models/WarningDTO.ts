/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Dictionary } from './Dictionary';

/**
 * Warning model
 */
export interface WarningDTO {
    /**
     * Warning type
     */
    type?: string;
    /**
     * Warning message
     */
    message?: string;
    /**
     * Warning message
     */
    data?: Dictionary<any>;
}
