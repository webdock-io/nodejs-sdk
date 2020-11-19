/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Price model
 */
export interface PriceDTO {
    /**
     * Price amount
     */
    amount?: number;
    /**
     * Price currency
     */
    currency?: PriceDTO.currency;
}

export namespace PriceDTO {

    /**
     * Price currency
     */
    export enum currency {
        EUR = 'EUR',
        DKK = 'DKK',
        USD = 'USD',
    }


}
