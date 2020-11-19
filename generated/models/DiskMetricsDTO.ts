/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Disk metrics model. Returns disk utilization in 24 hour intervals last 7 days, in MiB.
 */
export interface DiskMetricsDTO {
    /**
     * Maximum allowed disk size(in MiB)
     */
    allowed?: number;
    /**
     * Disk Metrics
     */
    samplings?: Array<MetricsSamplingDTO>;
}
