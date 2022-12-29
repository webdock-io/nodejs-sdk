/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateServerSnapshotModelDTO } from '../models/CreateServerSnapshotModelDTO';
import type { SnapshotDTO } from '../models/SnapshotDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServerSnapshotsService {

    /**
     * Get a list of snapshots for a server
     * Get a list of snapshots for a server
     * @param serverSlug Slug of the server
     * @returns SnapshotDTO List of snapshots
     * @throws ApiError
     */
    public static getServerSnapshots(
        serverSlug: string,
    ): CancelablePromise<Array<SnapshotDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/servers/{serverSlug}/snapshots',
            path: {
                'serverSlug': serverSlug,
            },
            errors: {
                404: `Server not found`,
            },
        });
    }

    /**
     * Create a server snapshot
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param serverSlug Slug of the server
     * @param requestBody Server snapshot to be created
     * @returns SnapshotDTO Snapshot creation initiated
     * @throws ApiError
     */
    public static createSnapshot(
        serverSlug: string,
        requestBody: CreateServerSnapshotModelDTO,
    ): CancelablePromise<SnapshotDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/snapshots',
            path: {
                'serverSlug': serverSlug,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Get a snapshot by ID for a server
     * Get a snapshot by ID for a server
     * @param serverSlug Slug of the server
     * @param snapshotId Snapshot ID
     * @returns SnapshotDTO Snapshot
     * @throws ApiError
     */
    public static getServerSnapshotById(
        serverSlug: string,
        snapshotId: number,
    ): CancelablePromise<SnapshotDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/servers/{serverSlug}/snapshots/{snapshotId}',
            path: {
                'serverSlug': serverSlug,
                'snapshotId': snapshotId,
            },
            errors: {
                404: `Server or snapshot not found`,
            },
        });
    }

    /**
     * Deletes a snapshot by ID for a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * Please note that only user created snapshots can be deleted.
     * @param serverSlug Slug of the server
     * @param snapshotId Snapshot ID
     * @returns string Snapshot deletion initiated
     * @throws ApiError
     */
    public static deleteServerSnapshotById(
        serverSlug: string,
        snapshotId: number,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/servers/{serverSlug}/snapshots/{snapshotId}',
            path: {
                'serverSlug': serverSlug,
                'snapshotId': snapshotId,
            },
            responseHeader: 'X-Callback-ID',
            errors: {
                404: `Server or snapshot not found`,
            },
        });
    }

}
