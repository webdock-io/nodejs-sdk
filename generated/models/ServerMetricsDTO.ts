/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { CpuMetricsDTO } from './CpuMetricsDTO';
import { DiskMetricsDTO } from './DiskMetricsDTO';
import { MemoryMetricsDTO } from './MemoryMetricsDTO';
import { NetworkMetricsDTO } from './NetworkMetricsDTO';
import { ProcessesMetricsDTO } from './ProcessesMetricsDTO';

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
