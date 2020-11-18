/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Instant memory metrics model. Memory use in MiB right now.
 */
export interface InstantMemoryMetricsDTO {
    latestUsageSampling?: MetricsSamplingDTO;
}
