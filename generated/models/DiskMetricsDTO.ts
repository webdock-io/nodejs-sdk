/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Disk metrics model
 */
export interface DiskMetricsDTO {
    /**
     * Maximum allowed disk size(in Mb)
     */
    allowed?: number;
    /**
     * Disk Metrics
     */
    samplings?: Array<MetricsSamplingDTO>;
}
