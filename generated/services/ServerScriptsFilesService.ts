/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateServerScriptModelDTO } from '../models/CreateServerScriptModelDTO';
import type { FetchServerFileModelDTO } from '../models/FetchServerFileModelDTO';
import type { ServerScriptDTO } from '../models/ServerScriptDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServerScriptsFilesService {

    /**
     * Get a list of server scripts
     * This method does not actually reach out to your server and fetches a list of scripts or files - it merely lists the scripts you have deployed as it is known by Webdock.
     * @param serverSlug Slug of the server
     * @returns ServerScriptDTO List of server scripts
     * @throws ApiError
     */
    public static getServerScripts(
        serverSlug: string,
    ): CancelablePromise<Array<ServerScriptDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/servers/{serverSlug}/scripts',
            path: {
                'serverSlug': serverSlug,
            },
            errors: {
                404: `Server not found`,
            },
        });
    }

    /**
     * Create a server script
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * Here you reference a script in your Account Scripts by ID which will be deployed to your server.
     * @param serverSlug Slug of the server
     * @param requestBody User script to be created
     * @returns ServerScriptDTO Server script deployment initiated
     * @throws ApiError
     */
    public static createServerScript(
        serverSlug: string,
        requestBody: CreateServerScriptModelDTO,
    ): CancelablePromise<ServerScriptDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/scripts',
            path: {
                'serverSlug': serverSlug,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                404: `Server or script not found`,
            },
        });
    }

    /**
     * Get a server script by ID
     * This method does not fetch any data from your server but merely returns the script by ID from the list of scripts as known by Webdock. If you want to get a physical file from your server, use the Pull a server script method
     * @param serverSlug Slug of the server
     * @param scriptId ID of the script
     * @returns ServerScriptDTO Server script
     * @throws ApiError
     */
    public static getServerScriptById(
        serverSlug: string,
        scriptId: number,
    ): CancelablePromise<ServerScriptDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/servers/{serverSlug}/scripts/{scriptId}',
            path: {
                'serverSlug': serverSlug,
                'scriptId': scriptId,
            },
            errors: {
                404: `Server not found`,
            },
        });
    }

    /**
     * Delete a server script
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param serverSlug Slug of the server
     * @param scriptId ID of the script
     * @returns string Server script deletion initiated
     * @throws ApiError
     */
    public static deleteServerScriptById(
        serverSlug: string,
        scriptId: number,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/servers/{serverSlug}/scripts/{scriptId}',
            path: {
                'serverSlug': serverSlug,
                'scriptId': scriptId,
            },
            responseHeader: 'X-Callback-ID',
            errors: {
                404: `Server or script not found`,
            },
        });
    }

    /**
     * Execute a server script
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * Executes an already deployed server script.
     * @param serverSlug Slug of the server
     * @param scriptId ID of the script
     * @returns string Server script execution initiated
     * @throws ApiError
     */
    public static executeServerScript(
        serverSlug: string,
        scriptId: number,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/scripts/{scriptId}/execute',
            path: {
                'serverSlug': serverSlug,
                'scriptId': scriptId,
            },
            responseHeader: 'X-Callback-ID',
            errors: {
                404: `Server or script not found`,
            },
        });
    }

    /**
     * Fetches a file from the server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * Fetches a file from the server. Please note that the file contents will be returned in the event result &quot;message&quot; field as Base64 encoded data. If the Base64 encoded data is longer than 120.000 characters the callback from this method will return an error.
     * @param serverSlug Slug of the server
     * @param requestBody Fetch server file model
     * @returns string Fetch initiated
     * @throws ApiError
     */
    public static fetchServerFile(
        serverSlug: string,
        requestBody: FetchServerFileModelDTO,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/fetchFile',
            path: {
                'serverSlug': serverSlug,
            },
            body: requestBody,
            mediaType: 'application/json',
            responseHeader: 'X-Callback-ID',
            errors: {
                404: `Server not found`,
            },
        });
    }

}
