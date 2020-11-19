/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServerImageDTO } from '../models/ServerImageDTO';
import type { ServerLocationDTO } from '../models/ServerLocationDTO';
import type { ServerProfileDTO } from '../models/ServerProfileDTO';
import { request as __request } from '../core/request';

export class ServerConfigurationsService {

    /**
     * Possible server locations
     * Get a list of possible server datacenter locations
     * @result ServerLocationDTO List of locations
     * @throws ApiError
     */
    public static async getServersLocations(): Promise<ServerLocationDTO> {
        const result = await __request({
            method: 'GET',
            path: `/locations`,
        });
        return result.body;
    }

    /**
     * Possible server profiles
     * Get a list of possible server hardware profiles
     * @param locationId Location of the profile
     * @result ServerProfileDTO List of available server hardware profiles
     * @throws ApiError
     */
    public static async getServersProfiles(
        locationId?: any,
    ): Promise<ServerProfileDTO> {
        const result = await __request({
            method: 'GET',
            path: `/profiles`,
            query: {
                'locationId': locationId,
            },
        });
        return result.body;
    }

    /**
     * Possible server images
     * Get a list of possible server software images
     * @result ServerImageDTO List of available server images
     * @throws ApiError
     */
    public static async getServersImages(): Promise<ServerImageDTO> {
        const result = await __request({
            method: 'GET',
            path: `/images`,
        });
        return result.body;
    }

}