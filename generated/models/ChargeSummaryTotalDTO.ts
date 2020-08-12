/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { PriceDTO } from './PriceDTO';

/**
 * Server resize model
 */
export interface ChargeSummaryTotalDTO {
    subTotal?: PriceDTO;
    vat?: PriceDTO;
    total?: PriceDTO;
}
