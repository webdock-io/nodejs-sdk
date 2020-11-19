/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchServerModelDTO } from '../models/PatchServerModelDTO';
import type { PostServerModelDTO } from '../models/PostServerModelDTO';
import type { ServerDTO } from '../models/ServerDTO';
import { request as __request } from '../core/request';

export class ServersService {

    /**
     * Get a list of servers
     * webServer can be one of
     * @param status Filter by current status of the server
     * @result ServerDTO List of servers
     * @throws ApiError
     */
    public static async getServers(
        status: 'all' | 'suspended' | 'active' = 'all',
    ): Promise<Array<ServerDTO>> {
        const result = await __request({
            method: 'GET',
            path: `/servers`,
            query: {
                'status': status,
            },
        });
        return result.body;
    }

    /**
     * Provision a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * You need to query the Server Configurations endpoints first in order to gather appropriate data for this method.
     * @param requestBody Post server model
     * @result string Server provisioning initiated
     * @throws ApiError
     */
    public static async createServer(
        requestBody: PostServerModelDTO,
    ): Promise<string> {
        const result = await __request({
            method: 'POST',
            path: `/servers`,
            body: requestBody,
            responseHeader: 'X-Callback-ID',
            errors: {
                400: `Bad Request`,
            },
        });
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
            method: 'GET',
            path: `/servers/${serverSlug}`,
            errors: {
                404: `Server not found`,
            },
        });
        return result.body;
    }

    /**
     * Delete a server (restricted)
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * This will nuke the server from orbit including all data and server snapshots. Use with care.\
     * \
     * _**Server Deletion requires special privileges which cannot be obtained in the Webdock dashboard without first contacting Webdock Support!**_
     * @param serverSlug Slug of the server
     * @result string Server deletion initiated
     * @throws ApiError
     */
    public static async deleteServer(
        serverSlug: string,
    ): Promise<string> {
        const result = await __request({
            method: 'DELETE',
            path: `/servers/${serverSlug}`,
            responseHeader: 'X-Callback-ID',
            errors: {
                404: `Server not found`,
            },
        });
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
            method: 'PATCH',
            path: `/servers/${serverSlug}`,
            body: requestBody,
            errors: {
                404: `Server not found`,
            },
        });
        return result.body;
    }

}