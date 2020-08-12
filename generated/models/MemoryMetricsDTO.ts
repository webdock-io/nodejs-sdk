/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

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
