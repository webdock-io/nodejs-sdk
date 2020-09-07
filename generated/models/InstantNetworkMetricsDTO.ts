/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Instant network metrics model
 */
export interface InstantNetworkMetricsDTO {
    /**
     * Total network usage (in Gb)
     */
    total?: number;
    /**
     * Maximum allowed network usage (in Gb)
     */
    allowed?: number;
    latestIngressSampling?: MetricsSamplingDTO;
    latestEgressSampling?: MetricsSamplingDTO;
}
