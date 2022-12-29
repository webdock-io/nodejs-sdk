/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChargeSummaryDTO } from './ChargeSummaryDTO';
import type { WarningDTO } from './WarningDTO';

/**
 * Server resize model
 */
export type ServerResizeDTO = {
    warnings?: Array<WarningDTO>;
    chargeSummary?: ChargeSummaryDTO;
};

