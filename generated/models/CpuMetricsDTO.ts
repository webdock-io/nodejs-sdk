/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * CPU metrics model. CPU use is returned as aggregate of whole seconds every 30 minute window, last 12 hours.
 */
export interface CpuMetricsDTO {
    /**
     * CPU Usage Sampling
     */
    usageSamplings?: Array<MetricsSamplingDTO>;
}
