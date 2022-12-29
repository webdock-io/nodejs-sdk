/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PriceDTO } from './PriceDTO';

/**
 * Server resize model
 */
export type ChargeSummaryTotalDTO = {
    subTotal?: PriceDTO;
    vat?: PriceDTO;
    total?: PriceDTO;
};

