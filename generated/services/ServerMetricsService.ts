/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InstantServerMetricsDTO } from '../models/InstantServerMetricsDTO';
import type { ServerMetricsDTO } from '../models/ServerMetricsDTO';
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
            method: 'GET',
            path: `/servers/${serverSlug}/metrics`,
            errors: {
                404: `Server not found`,
            },
        });
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
            method: 'GET',
            path: `/servers/${serverSlug}/metrics/now`,
            errors: {
                404: `Server not found`,
            },
        });
        return result.body;
    }

}