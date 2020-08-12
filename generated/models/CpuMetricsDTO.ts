/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

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
