/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { ScriptDTO } from '../models/ScriptDTO';
import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class ScriptLibraryService {

    /**
     * Get a list of public scripts
     * @result ScriptDTO List of public scripts
     * @throws ApiError
     */
    public static async getScripts(): Promise<Array<ScriptDTO>> {

        const result = await __request({
            method: 'get',
            path: `/scripts`,
        });

        catchGenericError(result);

        return result.body;
    }

}