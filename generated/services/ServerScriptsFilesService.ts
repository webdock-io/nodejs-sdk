/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateServerScriptModelDTO } from '../models/CreateServerScriptModelDTO';
import type { FetchServerFileModelDTO } from '../models/FetchServerFileModelDTO';
import type { ServerScriptDTO } from '../models/ServerScriptDTO';
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
            method: 'GET',
            path: `/servers/${serverSlug}/scripts`,
            errors: {
                404: `Server not found`,
            },
        });
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
            method: 'POST',
            path: `/servers/${serverSlug}/scripts`,
            body: requestBody,
            responseHeader: 'X-Callback-ID',
            errors: {
                400: `Bad request`,
                404: `Server or script not found`,
            },
        });
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
            method: 'GET',
            path: `/servers/${serverSlug}/scripts/${scriptId}`,
            errors: {
                404: `Server not found`,
            },
        });
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
            method: 'DELETE',
            path: `/servers/${serverSlug}/scripts/${scriptId}`,
            responseHeader: 'X-Callback-ID',
            errors: {
                404: `Server or script not found`,
            },
        });
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
            method: 'POST',
            path: `/servers/${serverSlug}/scripts/${scriptId}/execute`,
            responseHeader: 'X-Callback-ID',
            errors: {
                404: `Server or script not found`,
            },
        });
        return result.body;
    }

    /**
     * Fetches a file from the server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * Fetches a file from the server. Please note that the file contents will be returned in the event result &quot;message&quot; field as Base64 encoded data. If the Base64 encoded data is longer than 120.000 characters the callback from this method will return an error.
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
            method: 'POST',
            path: `/servers/${serverSlug}/fetchFile`,
            body: requestBody,
            responseHeader: 'X-Callback-ID',
            errors: {
                404: `Server not found`,
            },
        });
        return result.body;
    }

}