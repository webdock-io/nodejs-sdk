/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { CreateUserScriptModelDTO } from '../models/CreateUserScriptModelDTO';
import { ScriptDTO } from '../models/ScriptDTO';
import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class AccountScriptsFilesService {

    /**
     * Get a list of account scripts
     * Get a list of scripts in your Webdock Account
     * @result ScriptDTO List of account scripts
     * @throws ApiError
     */
    public static async getUserScripts(): Promise<Array<ScriptDTO>> {

        const result = await __request({
            method: 'get',
            path: `/account/scripts`,
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * Create an account script
     * Create an account script
     * @param requestBody User script to be created
     * @result ScriptDTO The newly created account script
     * @throws ApiError
     */
    public static async createUserScript(
        requestBody: CreateUserScriptModelDTO,
    ): Promise<ScriptDTO> {

        const result = await __request({
            method: 'post',
            path: `/account/scripts`,
            body: requestBody,
        });

        if (!result.ok) {
            switch (result.status) {
                case 400: throw new ApiError(result, `Bad request`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

    /**
     * Get an account script by ID
     * Get an account script by ID
     * @param scriptId ID of the script
     * @result ScriptDTO A script
     * @throws ApiError
     */
    public static async getUserScriptById(
        scriptId: number,
    ): Promise<ScriptDTO> {

        const result = await __request({
            method: 'get',
            path: `/account/scripts/${scriptId}`,
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `Script not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

    /**
     * Delete an account script
     * Delete an account script
     * @param scriptId ID of the script
     * @result any Account script deleted sucessfully
     * @throws ApiError
     */
    public static async deleteUserScript(
        scriptId: number,
    ): Promise<any> {

        const result = await __request({
            method: 'delete',
            path: `/account/scripts/${scriptId}`,
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `Script not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

    /**
     * Update an account script
     * Update an account script
     * @param scriptId ID of the script
     * @param requestBody User script to be created
     * @result ScriptDTO The updated account script
     * @throws ApiError
     */
    public static async patchUserScript(
        scriptId: number,
        requestBody: CreateUserScriptModelDTO,
    ): Promise<ScriptDTO> {

        const result = await __request({
            method: 'patch',
            path: `/account/scripts/${scriptId}`,
            body: requestBody,
        });

        if (!result.ok) {
            switch (result.status) {
                case 400: throw new ApiError(result, `Bad request`);
                case 404: throw new ApiError(result, `Script not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

}