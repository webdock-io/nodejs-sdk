/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Ping } from '../models/Ping';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PingService {

    /**
     * Send a ping request to the Webdock API
     * This is a simple ping which performs no purpose other than return a status code so you can see if you can reach the Webdock API and authenticate properly.
     * @returns Ping Ping response
     * @throws ApiError
     */
    public static getPing(): CancelablePromise<Ping> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ping',
        });
    }

}
