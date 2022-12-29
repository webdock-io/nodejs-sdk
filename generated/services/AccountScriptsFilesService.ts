/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserScriptModelDTO } from '../models/CreateUserScriptModelDTO';
import type { ScriptDTO } from '../models/ScriptDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountScriptsFilesService {

    /**
     * Get a list of account scripts
     * Get a list of scripts in your Webdock Account
     * @returns ScriptDTO List of account scripts
     * @throws ApiError
     */
    public static getUserScripts(): CancelablePromise<Array<ScriptDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/scripts',
        });
    }

    /**
     * Create an account script
     * Create an account script
     * @param requestBody User script to be created
     * @returns ScriptDTO The newly created account script
     * @throws ApiError
     */
    public static createUserScript(
        requestBody: CreateUserScriptModelDTO,
    ): CancelablePromise<ScriptDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/scripts',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }

    /**
     * Get an account script by ID
     * Get an account script by ID
     * @param scriptId ID of the script
     * @returns ScriptDTO A script
     * @throws ApiError
     */
    public static getUserScriptById(
        scriptId: number,
    ): CancelablePromise<ScriptDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/scripts/{scriptId}',
            path: {
                'scriptId': scriptId,
            },
            errors: {
                404: `Script not found`,
            },
        });
    }

    /**
     * Delete an account script
     * Delete an account script
     * @param scriptId ID of the script
     * @returns any Account script deleted sucessfully
     * @throws ApiError
     */
    public static deleteUserScript(
        scriptId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/account/scripts/{scriptId}',
            path: {
                'scriptId': scriptId,
            },
            errors: {
                404: `Script not found`,
            },
        });
    }

    /**
     * Update an account script
     * Update an account script
     * @param scriptId ID of the script
     * @param requestBody User script to be created
     * @returns ScriptDTO The updated account script
     * @throws ApiError
     */
    public static patchUserScript(
        scriptId: number,
        requestBody: CreateUserScriptModelDTO,
    ): CancelablePromise<ScriptDTO> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/account/scripts/{scriptId}',
            path: {
                'scriptId': scriptId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                404: `Script not found`,
            },
        });
    }

}
