/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ChargeSummaryDTO } from './ChargeSummaryDTO';
import { WarningDTO } from './WarningDTO';

/**
 * Server resize model
 */
export interface ServerResizeDTO {
    /**
     * Resize warnings
     */
    warnings?: Array<WarningDTO>;
    /**
     * Resize charges
     */
    chargeSummary?: ChargeSummaryDTO;
}
