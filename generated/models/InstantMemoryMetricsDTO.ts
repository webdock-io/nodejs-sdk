/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Instant memory metrics model. Memory use in MiB right now.
 */
export type InstantMemoryMetricsDTO = {
    latestUsageSampling?: MetricsSamplingDTO;
};

