/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

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
