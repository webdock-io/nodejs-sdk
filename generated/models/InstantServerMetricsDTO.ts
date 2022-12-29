/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InstantCpuMetricsDTO } from './InstantCpuMetricsDTO';
import type { InstantDiskMetricsDTO } from './InstantDiskMetricsDTO';
import type { InstantMemoryMetricsDTO } from './InstantMemoryMetricsDTO';
import type { InstantNetworkMetricsDTO } from './InstantNetworkMetricsDTO';
import type { InstantProcessesMetricsDTO } from './InstantProcessesMetricsDTO';

/**
 * Instant Server metrics model
 */
export type InstantServerMetricsDTO = {
    disk?: InstantDiskMetricsDTO;
    network?: InstantNetworkMetricsDTO;
    cpu?: InstantCpuMetricsDTO;
    processes?: InstantProcessesMetricsDTO;
    memory?: InstantMemoryMetricsDTO;
};

