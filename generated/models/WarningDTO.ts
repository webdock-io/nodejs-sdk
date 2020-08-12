/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

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
    data?: Dictionary<>;
}
