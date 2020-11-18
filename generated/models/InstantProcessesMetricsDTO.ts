/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MetricsSamplingDTO } from './MetricsSamplingDTO';

/**
 * Instant Processes metrics model. Count of processes right now.
 */
export interface InstantProcessesMetricsDTO {
    latestProcessesSampling?: MetricsSamplingDTO;
}
