/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { InstantCpuMetricsDTO } from './InstantCpuMetricsDTO';
import { InstantDiskMetricsDTO } from './InstantDiskMetricsDTO';
import { InstantMemoryMetricsDTO } from './InstantMemoryMetricsDTO';
import { InstantProcessesMetricsDTO } from './InstantProcessesMetricsDTO';

/**
 * Instant Server metrics model
 */
export interface InstantServerMetricsDTO {
    disk?: InstantDiskMetricsDTO;
    cpu?: InstantCpuMetricsDTO;
    processes?: InstantProcessesMetricsDTO;
    memory?: InstantMemoryMetricsDTO;
}
