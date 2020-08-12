/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

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
    /**
     * Latest ingress Traffic Sampling
     */
    latestIngressSampling?: MetricsSamplingDTO;
    /**
     * Latest egress Traffic Sampling
     */
    latestEgressSampling?: MetricsSamplingDTO;
}
