/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Instant disk metrics model. Disk utilization right now in MiB.
 */
export type InstantDiskMetricsDTO = {
    /**
     * Maximum allowed disk size(in Mb)
     */
    allowed?: number;
    lastSamplings?: MetricsSamplingDTO;
};

