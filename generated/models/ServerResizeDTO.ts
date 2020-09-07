/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { ChargeSummaryDTO } from './ChargeSummaryDTO';
import { WarningDTO } from './WarningDTO';

/**
 * Server resize model
 */
export interface ServerResizeDTO {
    warnings?: Array<WarningDTO>;
    chargeSummary?: ChargeSummaryDTO;
}
