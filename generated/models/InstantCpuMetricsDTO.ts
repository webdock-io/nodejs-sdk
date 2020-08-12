/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Instant CPU metrics model
 */
export interface InstantCpuMetricsDTO {
    /**
     * Latest CPU Usage Sampling
     */
    latestUsageSampling?: MetricsSamplingDTO;
}
