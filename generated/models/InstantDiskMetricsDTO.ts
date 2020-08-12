/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Instant disk metrics model
 */
export interface InstantDiskMetricsDTO {
    /**
     * Maximum allowed disk size(in Mb)
     */
    allowed?: number;
    /**
     * Disk Metric
     */
    lastSamplings?: MetricsSamplingDTO;
}
