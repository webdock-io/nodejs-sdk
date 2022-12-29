/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Network metrics model. Ingress and egress in 24 hour intervals last 7 days, in MiB.
 */
export type NetworkMetricsDTO = {
    /**
     * Total network usage (in GiB) this month
     */
    total?: number;
    /**
     * Maximum allowed network usage (in GiB)
     */
    allowed?: number;
    /**
     * Ingress Traffic Sampling
     */
    ingressSamplings?: Array<MetricsSamplingDTO>;
    /**
     * Egress Traffic Sampling
     */
    egressSamplings?: Array<MetricsSamplingDTO>;
};

