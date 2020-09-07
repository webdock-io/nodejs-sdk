/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Instant disk metrics model
 */
export interface InstantDiskMetricsDTO {
    /**
     * Maximum allowed disk size(in Mb)
     */
    allowed?: number;
    lastSamplings?: MetricsSamplingDTO;
}
