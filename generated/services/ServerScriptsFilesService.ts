/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { CreateServerScriptModelDTO } from '../models/CreateServerScriptModelDTO';
import { FetchServerFileModelDTO } from '../models/FetchServerFileModelDTO';
import { ServerScriptDTO } from '../models/ServerScriptDTO';
import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class ServerScriptsFilesService {

    /**
     * Get a list of server scripts
     * This method does not actually reach out to your server and fetches a list of scripts or files - it merely lists the scripts you have deployed as it is known by Webdock.
     * @param serverSlug Slug of the server
     * @result ServerScriptDTO List of server scripts
     * @throws ApiError
     */
    public static async getServerScripts(
        serverSlug: string,
    ): Promise<Array<ServerScriptDTO>> {

        const result = await __request({
            method: 'get',
            path: `/servers/${serverSlug}/scripts`,
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `Server not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

    /**
     * Create a server script
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * Here you reference a script in your Account Scripts by ID which will be deployed to your server.
     * @param serverSlug Slug of the server
     * @param requestBody User script to be created
     * @result string Server script deployment initiated
     * @throws ApiError
     */
    public static async createServerScript(
        serverSlug: string,
        requestBody: CreateServerScriptModelDTO,
    ): Promise<string> {

        const result = await __request({
            method: 'post',
            path: `/servers/${serverSlug}/scripts`,
            body: requestBody,
            responseHeader: 'X-Callback-ID',
        });

        if (!result.ok) {
            switch (result.status) {
                case 400: throw new ApiError(result, `Bad request`);
                case 404: throw new ApiError(result, `Server or script not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

    /**
     * Get a server script by ID
     * This method does not fetch any data from your server but merely returns the script by ID from the list of scripts as known by Webdock. If you want to get a physical file from your server, use the Pull a server script method
     * @param serverSlug Slug of the server
     * @param scriptId ID of the script
     * @result ServerScriptDTO Server script
     * @throws ApiError
     */
    public static async getServerScriptById(
        serverSlug: string,
        scriptId: number,
    ): Promise<ServerScriptDTO> {

        const result = await __request({
            method: 'get',
            path: `/servers/${serverSlug}/scripts/${scriptId}`,
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `Server not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

    /**
     * Delete a server script
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param serverSlug Slug of the server
     * @param scriptId ID of the script
     * @result string Server script deletion initiated
     * @throws ApiError
     */
    public static async deleteServerScriptById(
        serverSlug: string,
        scriptId: number,
    ): Promise<string> {

        const result = await __request({
            method: 'delete',
            path: `/servers/${serverSlug}/scripts/${scriptId}`,
            responseHeader: 'X-Callback-ID',
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `Server or script not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

    /**
     * Execute a server script
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * Executes an already deployed server script.
     * @param serverSlug Slug of the server
     * @param scriptId ID of the script
     * @result string Server script execution initiated
     * @throws ApiError
     */
    public static async executeServerScript(
        serverSlug: string,
        scriptId: number,
    ): Promise<string> {

        const result = await __request({
            method: 'post',
            path: `/servers/${serverSlug}/scripts/${scriptId}/execute`,
            responseHeader: 'X-Callback-ID',
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `Server or script not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

    /**
     * Fetches a file from the server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * Fetches a file from the server.
     * @param serverSlug Slug of the server
     * @param requestBody Fetch server file model
     * @result string Fetch initiated
     * @throws ApiError
     */
    public static async fetchServerFile(
        serverSlug: string,
        requestBody: FetchServerFileModelDTO,
    ): Promise<string> {

        const result = await __request({
            method: 'post',
            path: `/servers/${serverSlug}/fetchFile`,
            body: requestBody,
            responseHeader: 'X-Callback-ID',
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `Server not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

}