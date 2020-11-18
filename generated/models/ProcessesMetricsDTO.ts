/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Processes metrics model. Returns the number of processes in 30 minute intervals last 12 hours. Count as seen at timestamp.
 */
export interface ProcessesMetricsDTO {
    /**
     * Processes Sampling
     */
    processesSamplings?: Array<MetricsSamplingDTO>;
}
