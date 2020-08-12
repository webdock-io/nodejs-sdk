/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { InstantCpuMetricsDTO } from './InstantCpuMetricsDTO';
import { InstantDiskMetricsDTO } from './InstantDiskMetricsDTO';
import { InstantMemoryMetricsDTO } from './InstantMemoryMetricsDTO';
import { InstantNetworkMetricsDTO } from './InstantNetworkMetricsDTO';
import { InstantProcessesMetricsDTO } from './InstantProcessesMetricsDTO';

/**
 * Instant Server metrics model
 */
export interface InstantServerMetricsDTO {
    /**
     * Disk Metrics
     */
    disk?: InstantDiskMetricsDTO;
    /**
     * Network Metrics
     */
    network?: InstantNetworkMetricsDTO;
    /**
     * CPU Metrics
     */
    cpu?: InstantCpuMetricsDTO;
    /**
     * Processes Metrics
     */
    processes?: InstantProcessesMetricsDTO;
    /**
     * Memory Metrics
     */
    memory?: InstantMemoryMetricsDTO;
}
