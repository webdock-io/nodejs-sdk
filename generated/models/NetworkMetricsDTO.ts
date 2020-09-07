/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Network metrics model
 */
export interface NetworkMetricsDTO {
    /**
     * Total network usage (in Gb)
     */
    total?: number;
    /**
     * Maximum allowed network usage (in Gb)
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
}
