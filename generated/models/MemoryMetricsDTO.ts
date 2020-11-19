/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Memory metrics model. Memory use in 1 hour intervals last 24 hours, in MiB
 */
export interface MemoryMetricsDTO {
    /**
     * Usage Sampling
     */
    usageSamplings?: Array<MetricsSamplingDTO>;
}
