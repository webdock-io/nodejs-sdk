/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { SnapshotDTO } from '../models/SnapshotDTO';
import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class ServerSnapshotsService {

    /**
     * Get a list of snapshots for a server
     * Get a list of snapshots for a server
     * @param serverSlug Slug of the server
     * @result SnapshotDTO List of snapshots
     * @throws ApiError
     */
    public static async getServerSnapshots(
        serverSlug: string,
    ): Promise<Array<SnapshotDTO>> {

        const result = await __request({
            method: 'get',
            path: `/servers/${serverSlug}/snapshots`,
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `Server not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

    /**
     * Get a snapshot by ID for a server
     * Get a snapshot by ID for a server
     * @param serverSlug Slug of the server
     * @param snapshotId Snapshot ID
     * @result SnapshotDTO Snapshot
     * @throws ApiError
     */
    public static async getServerSnapshotById(
        serverSlug: string,
        snapshotId: number,
    ): Promise<SnapshotDTO> {

        const result = await __request({
            method: 'get',
            path: `/servers/${serverSlug}/snapshots/${snapshotId}`,
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `Server or snapshot not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

    /**
     * Deletes a snapshot by ID for a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * Please note that only user created snapshots can be deleted.
     * @param serverSlug Slug of the server
     * @param snapshotId Snapshot ID
     * @result string Snapshot deletion initiated
     * @throws ApiError
     */
    public static async deleteServerSnapshotById(
        serverSlug: string,
        snapshotId: number,
    ): Promise<string> {

        const result = await __request({
            method: 'delete',
            path: `/servers/${serverSlug}/snapshots/${snapshotId}`,
            responseHeader: 'X-Callback-ID',
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `Server or snapshot not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

}