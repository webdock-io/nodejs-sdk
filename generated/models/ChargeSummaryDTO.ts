/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChargeSummaryItemDTO } from './ChargeSummaryItemDTO';
import type { ChargeSummaryTotalDTO } from './ChargeSummaryTotalDTO';

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
    total?: ChargeSummaryTotalDTO;
}
