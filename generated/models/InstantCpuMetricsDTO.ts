/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Instant CPU metrics model. CPU use in seconds last 30 minutes.
 */
export interface InstantCpuMetricsDTO {
    latestUsageSampling?: MetricsSamplingDTO;
}
