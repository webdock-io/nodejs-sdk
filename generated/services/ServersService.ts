/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchServerModelDTO } from '../models/PatchServerModelDTO';
import type { PostServerModelDTO } from '../models/PostServerModelDTO';
import type { ServerDTO } from '../models/ServerDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServersService {

    /**
     * Get a list of servers
     * @param status Filter by current status of the server
     * @returns ServerDTO List of servers
     * @throws ApiError
     */
    public static getServers(
        status: 'all' | 'suspended' | 'active' = 'all',
    ): CancelablePromise<Array<ServerDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/servers',
            query: {
                'status': status,
            },
        });
    }

    /**
     * Provision a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * You need to query the Server Configurations endpoints first in order to gather appropriate data for this method.
     * @param requestBody Post server model
     * @returns ServerDTO Server provisioning initiated
     * @throws ApiError
     */
    public static createServer(
        requestBody: PostServerModelDTO,
    ): CancelablePromise<ServerDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Get a specific server by slug
     * Get a specific server by slug (shortname)
     * @param serverSlug Slug of the server
     * @returns ServerDTO Server
     * @throws ApiError
     */
    public static getServerBySlug(
        serverSlug: string,
    ): CancelablePromise<ServerDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/servers/{serverSlug}',
            path: {
                'serverSlug': serverSlug,
            },
            errors: {
                404: `Server not found`,
            },
        });
    }

    /**
     * Delete a server (restricted)
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * This will nuke the server from orbit including all data and server snapshots. Use with care.\
     * \
     * _**Server Deletion requires special privileges which cannot be obtained in the Webdock dashboard without first contacting Webdock Support!**_
     * @param serverSlug Slug of the server
     * @returns string Server deletion initiated
     * @throws ApiError
     */
    public static deleteServer(
        serverSlug: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/servers/{serverSlug}',
            path: {
                'serverSlug': serverSlug,
            },
            responseHeader: 'X-Callback-ID',
            errors: {
                404: `Server not found`,
            },
        });
    }

    /**
     * Update server metadata
     * @param serverSlug Slug of the server
     * @param requestBody Patch server model
     * @returns ServerDTO Server Updated
     * @throws ApiError
     */
    public static patchServer(
        serverSlug: string,
        requestBody: PatchServerModelDTO,
    ): CancelablePromise<ServerDTO> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/servers/{serverSlug}',
            path: {
                'serverSlug': serverSlug,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Server not found`,
            },
        });
    }

}
