/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CpuMetricsDTO } from './CpuMetricsDTO';
import type { DiskMetricsDTO } from './DiskMetricsDTO';
import type { MemoryMetricsDTO } from './MemoryMetricsDTO';
import type { NetworkMetricsDTO } from './NetworkMetricsDTO';
import type { ProcessesMetricsDTO } from './ProcessesMetricsDTO';

/**
 * Server metrics model
 */
export interface ServerMetricsDTO {
    disk?: DiskMetricsDTO;
    network?: NetworkMetricsDTO;
    cpu?: CpuMetricsDTO;
    processes?: ProcessesMetricsDTO;
    memory?: MemoryMetricsDTO;
}
