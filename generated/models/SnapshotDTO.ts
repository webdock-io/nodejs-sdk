/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Snapshot model
 */
export type SnapshotDTO = {
    /**
     * ID
     */
    id?: number;
    /**
     * Name
     */
    name?: string;
    /**
     * Creation date/time
     */
    date?: string;
    /**
     * Snapshot type
     */
    type?: SnapshotDTO.type;
    /**
     * Virtualization type
     */
    virtualization?: SnapshotDTO.virtualization;
    /**
     * Snapshot completed
     */
    completed?: boolean;
    /**
     * Can the snapshot be deleted
     */
    deletable?: boolean;
};

export namespace SnapshotDTO {

    /**
     * Snapshot type
     */
    export enum type {
        DAILY = 'daily',
        WEEKLY = 'weekly',
        MONTHLY = 'monthly',
    }

    /**
     * Virtualization type
     */
    export enum virtualization {
        CONTAINER = 'container',
        KVM = 'kvm',
    }


}

