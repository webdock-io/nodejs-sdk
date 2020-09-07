/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Processes metrics model
 */
export interface ProcessesMetricsDTO {
    /**
     * Processes Sampling
     */
    processesSamplings?: Array<MetricsSamplingDTO>;
}
