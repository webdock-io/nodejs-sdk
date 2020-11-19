/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
    data?: Record<string, any>;
}
