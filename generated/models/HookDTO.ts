/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { HookFilterDTO } from './HookFilterDTO';

/**
 * Hook model
 */
export interface HookDTO {
    /**
     * Hook ID
     */
    id?: number;
    /**
     * Callback URL
     */
    callbackUrl?: string;
    /**
     * Event filters
     */
    filters?: Array<HookFilterDTO>;
}
