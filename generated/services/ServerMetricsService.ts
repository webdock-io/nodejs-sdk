/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InstantServerMetricsDTO } from '../models/InstantServerMetricsDTO';
import type { ServerMetricsDTO } from '../models/ServerMetricsDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServerMetricsService {

    /**
     * Get server metrics
     * Get server metrics
     * @param serverSlug Slug of the server
     * @returns ServerMetricsDTO Server metrics
     * @throws ApiError
     */
    public static getServerMetrics(
        serverSlug: string,
    ): CancelablePromise<ServerMetricsDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/servers/{serverSlug}/metrics',
            path: {
                'serverSlug': serverSlug,
            },
            errors: {
                404: `Server not found`,
            },
        });
    }

    /**
     * Get instant metrics
     * Get instant metrics
     * @param serverSlug Slug of the server
     * @returns InstantServerMetricsDTO Instant server metrics
     * @throws ApiError
     */
    public static getInstantMetrics(
        serverSlug: string,
    ): CancelablePromise<InstantServerMetricsDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/servers/{serverSlug}/metrics/now',
            path: {
                'serverSlug': serverSlug,
            },
            errors: {
                404: `Server not found`,
            },
        });
    }

}
