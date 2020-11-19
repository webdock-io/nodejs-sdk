/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PriceDTO } from './PriceDTO';

/**
 * Charge summary items model
 */
export interface ChargeSummaryItemDTO {
    /**
     * Charge text
     */
    text?: string;
    price?: PriceDTO;
}
