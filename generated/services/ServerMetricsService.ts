/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { InstantServerMetricsDTO } from '../models/InstantServerMetricsDTO';
import { ServerMetricsDTO } from '../models/ServerMetricsDTO';
import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class ServerMetricsService {

    /**
     * Get server metrics
     * Get server metrics
     * @param serverSlug Slug of the server
     * @result ServerMetricsDTO Server metrics
     * @throws ApiError
     */
    public static async getServerMetrics(
        serverSlug: string,
    ): Promise<ServerMetricsDTO> {

        const result = await __request({
            method: 'get',
            path: `/servers/${serverSlug}/metrics`,
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
     * Get instant metrics
     * Get instant metrics
     * @param serverSlug Slug of the server
     * @result InstantServerMetricsDTO Instant server metrics
     * @throws ApiError
     */
    public static async getInstantMetrics(
        serverSlug: string,
    ): Promise<InstantServerMetricsDTO> {

        const result = await __request({
            method: 'get',
            path: `/servers/${serverSlug}/metrics/now`,
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