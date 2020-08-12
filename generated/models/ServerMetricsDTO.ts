/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { CpuMetricsDTO } from './CpuMetricsDTO';
import { DiskMetricsDTO } from './DiskMetricsDTO';
import { MemoryMetricsDTO } from './MemoryMetricsDTO';
import { NetworkMetricsDTO } from './NetworkMetricsDTO';
import { ProcessesMetricsDTO } from './ProcessesMetricsDTO';

/**
 * Server metrics model
 */
export interface ServerMetricsDTO {
    /**
     * Disk Metrics
     */
    disk?: DiskMetricsDTO;
    /**
     * Network Metrics
     */
    network?: NetworkMetricsDTO;
    /**
     * CPU Metrics
     */
    cpu?: CpuMetricsDTO;
    /**
     * CPU Metrics
     */
    processes?: ProcessesMetricsDTO;
    /**
     * Memory Metrics
     */
    memory?: MemoryMetricsDTO;
}
