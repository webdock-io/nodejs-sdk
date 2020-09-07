/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Ping } from '../models/Ping';
import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class PingService {

    /**
     * Send a ping request to the Webdock API
     * This is a simple ping which performs no purpose other than return a status code so you can see if you can reach the Webdock API and authenticate properly.
     * @result Ping Ping response
     * @throws ApiError
     */
    public static async getPing(): Promise<Ping> {

        const result = await __request({
            method: 'get',
            path: `/ping`,
        });

        catchGenericError(result);

        return result.body;
    }

}