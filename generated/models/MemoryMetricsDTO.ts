/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Memory metrics model
 */
export interface MemoryMetricsDTO {
    /**
     * Usage Sampling
     */
    usageSamplings?: Array<MetricsSamplingDTO>;
}
