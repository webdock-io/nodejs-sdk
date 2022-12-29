/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServerImageDTO } from '../models/ServerImageDTO';
import type { ServerLocationDTO } from '../models/ServerLocationDTO';
import type { ServerProfileDTO } from '../models/ServerProfileDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServerConfigurationsService {

    /**
     * Possible server locations
     * Get a list of possible server datacenter locations
     * @returns ServerLocationDTO List of locations
     * @throws ApiError
     */
    public static getServersLocations(): CancelablePromise<ServerLocationDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations',
        });
    }

    /**
     * Possible server profiles
     * Get a list of possible server hardware profiles
     * @param locationId Location of the profile
     * @returns ServerProfileDTO List of available server hardware profiles
     * @throws ApiError
     */
    public static getServersProfiles(
        locationId?: any,
    ): CancelablePromise<ServerProfileDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profiles',
            query: {
                'locationId': locationId,
            },
        });
    }

    /**
     * Possible server images
     * Get a list of possible server software images
     * @returns ServerImageDTO List of available server images
     * @throws ApiError
     */
    public static getServersImages(): CancelablePromise<ServerImageDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/images',
        });
    }

}
