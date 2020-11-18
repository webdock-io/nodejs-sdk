/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Instant network metrics model. Ingress and Egress in MiB last ~24 hours. To get a more accurate reading, query the general metrics endpoint.
 */
export interface InstantNetworkMetricsDTO {
    /**
     * Total network usage (in GiB) this month.
     */
    total?: number;
    /**
     * Maximum allowed network usage (in GiB)
     */
    allowed?: number;
    latestIngressSampling?: MetricsSamplingDTO;
    latestEgressSampling?: MetricsSamplingDTO;
}
