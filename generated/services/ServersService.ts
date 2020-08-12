/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { PatchServerModelDTO } from '../models/PatchServerModelDTO';
import { PostServerModelDTO } from '../models/PostServerModelDTO';
import { ServerDTO } from '../models/ServerDTO';
import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class ServersService {

    /**
     * Get a list of servers
     * @param status Filter by current status of the server
     * @result ServerDTO List of servers
     * @throws ApiError
     */
    public static async getServers(
        status: ('all' | 'suspended' | 'active') = 'all',
    ): Promise<Array<ServerDTO>> {

        const result = await __request({
            method: 'get',
            path: `/servers`,
            query: {
                'status': status,
            },
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * Provision a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param requestBody Post server model
     * @result string Server provisioning initiated
     * @throws ApiError
     */
    public static async createServer(
        requestBody: PostServerModelDTO,
    ): Promise<string> {

        const result = await __request({
            method: 'post',
            path: `/servers`,
            body: requestBody,
            responseHeader: 'X-Callback-ID',
        });

        if (!result.ok) {
            switch (result.status) {
                case 400: throw new ApiError(result, `Bad Request`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

    /**
     * Get a specific server by slug
     * Get a specific server by slug (shortname)
     * @param serverSlug Slug of the server
     * @result ServerDTO Server
     * @throws ApiError
     */
    public static async getServerBySlug(
        serverSlug: string,
    ): Promise<ServerDTO> {

        const result = await __request({
            method: 'get',
            path: `/servers/${serverSlug}`,
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
     * Delete a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * This will nuke the server from orbit including all data and server snapshots. Use with care.
     * @param serverSlug Slug of the server
     * @result string Server deletion initiated
     * @throws ApiError
     */
    public static async deleteServer(
        serverSlug: string,
    ): Promise<string> {

        const result = await __request({
            method: 'delete',
            path: `/servers/${serverSlug}`,
            responseHeader: 'X-Callback-ID',
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
     * Update server metadata
     * @param serverSlug Slug of the server
     * @param requestBody Patch server model
     * @result ServerDTO Server Updated
     * @throws ApiError
     */
    public static async patchServer(
        serverSlug: string,
        requestBody: PatchServerModelDTO,
    ): Promise<ServerDTO> {

        const result = await __request({
            method: 'patch',
            path: `/servers/${serverSlug}`,
            body: requestBody,
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `Server not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

}