/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ChargeSummaryItemDTO } from './ChargeSummaryItemDTO';
import { ChargeSummaryTotalDTO } from './ChargeSummaryTotalDTO';

/**
 * Server resize model
 */
export interface ChargeSummaryDTO {
    /**
     * List of charges to be applied or refunded
     */
    items?: Array<ChargeSummaryItemDTO>;
    /**
     * True if the amount will be refunded
     */
    isRefund?: boolean;
    /**
     * Summary total
     */
    totalSummary?: ChargeSummaryTotalDTO;
}