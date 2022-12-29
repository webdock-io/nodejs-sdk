/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScriptDTO } from '../models/ScriptDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ScriptLibraryService {

    /**
     * Get a list of public scripts
     * @returns ScriptDTO List of public scripts
     * @throws ApiError
     */
    public static getScripts(): CancelablePromise<Array<ScriptDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/scripts',
        });
    }

}
