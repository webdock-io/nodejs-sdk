/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { PriceDTO } from './PriceDTO';

/**
 * Server resize model
 */
export interface ChargeSummaryTotalDTO {
    subTotal?: PriceDTO;
    vat?: PriceDTO;
    total?: PriceDTO;
}
