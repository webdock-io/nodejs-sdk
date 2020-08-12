/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ServerImageDTO } from '../models/ServerImageDTO';
import { ServerLocationDTO } from '../models/ServerLocationDTO';
import { ServerProfileDTO } from '../models/ServerProfileDTO';
import { catchGenericError } from '../core/ApiError';
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
            method: 'get',
            path: `/locations`,
        });

        catchGenericError(result);

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
            method: 'get',
            path: `/profiles`,
            query: {
                'locationId': locationId,
            },
        });

        catchGenericError(result);

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
            method: 'get',
            path: `/images`,
        });

        catchGenericError(result);

        return result.body;
    }

}