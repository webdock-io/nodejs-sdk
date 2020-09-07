/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * CPU metrics model
 */
export interface CpuMetricsDTO {
    /**
     * CPU Usage Sampling
     */
    usageSamplings?: Array<MetricsSamplingDTO>;
}
