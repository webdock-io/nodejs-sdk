/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Instant memory metrics model
 */
export interface InstantMemoryMetricsDTO {
    /**
     * Usage Sampling
     */
    latestUsageSampling?: MetricsSamplingDTO;
}
