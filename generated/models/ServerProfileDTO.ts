/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { CPUDTO } from './CPUDTO';
import { PriceDTO } from './PriceDTO';

/**
 * ServerProfile model
 */
export interface ServerProfileDTO {
    /**
     * Profile slug
     */
    slug?: string;
    /**
     * Profile name
     */
    name?: string;
    /**
     * RAM memory (in MiB)
     */
    ram?: number;
    /**
     * Disk size (in MiB)
     */
    disk?: number;
    cpu?: CPUDTO;
    price?: PriceDTO;
}
