/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateShellUserModelDTO } from '../models/CreateShellUserModelDTO';
import type { PatchShellUserModelDTO } from '../models/PatchShellUserModelDTO';
import type { ShellUserDTO } from '../models/ShellUserDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ShellUsersService {

    /**
     * Get a list of shell users for a server
     * This method does not actually reach out and query the server for which shell users are present on the system but merely reports the list of shell users as it is known to Webdock.
     * @param serverSlug Slug of the server
     * @returns ShellUserDTO List of shell users
     * @throws ApiError
     */
    public static getServerShellUsers(
        serverSlug: string,
    ): CancelablePromise<Array<ShellUserDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/servers/{serverSlug}/shellUsers',
            path: {
                'serverSlug': serverSlug,
            },
            errors: {
                404: `Server not found`,
            },
        });
    }

    /**
     * Create a shell user in a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param serverSlug Slug of the server
     * @param requestBody Shell user that will be added to the server
     * @returns ShellUserDTO Shell user creation initiated
     * @throws ApiError
     */
    public static postServerShellUsers(
        serverSlug: string,
        requestBody: CreateShellUserModelDTO,
    ): CancelablePromise<ShellUserDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/shellUsers',
            path: {
                'serverSlug': serverSlug,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                404: `Server not found`,
            },
        });
    }

    /**
     * Deletes a shell user
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param serverSlug Slug of the server
     * @param shellUserId Shell user ID to delete
     * @returns string Shell user deletion initiated
     * @throws ApiError
     */
    public static deleteShellUser(
        serverSlug: string,
        shellUserId: number,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/servers/{serverSlug}/shellUsers/{shellUserId}',
            path: {
                'serverSlug': serverSlug,
                'shellUserId': shellUserId,
            },
            responseHeader: 'X-Callback-ID',
            errors: {
                404: `Server or shell user not found`,
            },
        });
    }

    /**
     * Update shell user Public Keys in a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * Updates Public Keys for a shell user in a server. The list of publicKeys you pass  will replace the keys currently set for the user.
     * @param serverSlug Slug of the server
     * @param shellUserId Shell user ID to delete
     * @param requestBody Updates to be made to the shell user
     * @returns ShellUserDTO Update of shell user with new publicKey list initiated
     * @throws ApiError
     */
    public static patchServerShellUsers(
        serverSlug: string,
        shellUserId: number,
        requestBody: PatchShellUserModelDTO,
    ): CancelablePromise<ShellUserDTO> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/servers/{serverSlug}/shellUsers/{shellUserId}',
            path: {
                'serverSlug': serverSlug,
                'shellUserId': shellUserId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                404: `Server or shell user not found`,
            },
        });
    }

}
