/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CPUDTO } from './CPUDTO';
import type { PriceDTO } from './PriceDTO';

/**
 * ServerProfile model
 */
export type ServerProfileDTO = {
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
};

