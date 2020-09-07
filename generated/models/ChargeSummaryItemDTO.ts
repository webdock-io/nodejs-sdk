/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { PriceDTO } from './PriceDTO';

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
