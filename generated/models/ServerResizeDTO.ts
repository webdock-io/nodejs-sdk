/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChargeSummaryDTO } from './ChargeSummaryDTO';
import type { WarningDTO } from './WarningDTO';

/**
 * Server resize model
 */
export interface ServerResizeDTO {
    warnings?: Array<WarningDTO>;
    chargeSummary?: ChargeSummaryDTO;
}
