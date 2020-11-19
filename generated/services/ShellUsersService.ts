/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateShellUserModelDTO } from '../models/CreateShellUserModelDTO';
import type { PatchShellUserModelDTO } from '../models/PatchShellUserModelDTO';
import type { ShellUserDTO } from '../models/ShellUserDTO';
import { request as __request } from '../core/request';

export class ShellUsersService {

    /**
     * Get a list of shell users for a server
     * This method does not actually reach out and query the server for which shell users are present on the system but merely reports the list of shell users as it is known to Webdock.
     * @param serverSlug Slug of the server
     * @result ShellUserDTO List of shell users
     * @throws ApiError
     */
    public static async getServerShellUsers(
        serverSlug: string,
    ): Promise<Array<ShellUserDTO>> {
        const result = await __request({
            method: 'GET',
            path: `/servers/${serverSlug}/shellUsers`,
            errors: {
                404: `Server not found`,
            },
        });
        return result.body;
    }

    /**
     * Create a shell user in a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param serverSlug Slug of the server
     * @param requestBody Shell user that will be added to the server
     * @result string Shell user creation initiated
     * @throws ApiError
     */
    public static async postServerShellUsers(
        serverSlug: string,
        requestBody: CreateShellUserModelDTO,
    ): Promise<string> {
        const result = await __request({
            method: 'POST',
            path: `/servers/${serverSlug}/shellUsers`,
            body: requestBody,
            responseHeader: 'X-Callback-ID',
            errors: {
                400: `Bad request`,
                404: `Server not found`,
            },
        });
        return result.body;
    }

    /**
     * Deletes a shell user
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param serverSlug Slug of the server
     * @param shellUserId Shell user ID to delete
     * @result string Shell user deletion initiated
     * @throws ApiError
     */
    public static async deleteShellUser(
        serverSlug: string,
        shellUserId: number,
    ): Promise<string> {
        const result = await __request({
            method: 'DELETE',
            path: `/servers/${serverSlug}/shellUsers/${shellUserId}`,
            responseHeader: 'X-Callback-ID',
            errors: {
                404: `Server or shell user not found`,
            },
        });
        return result.body;
    }

    /**
     * Update shell user Public Keys in a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * Updates Public Keys for a shell user in a server. The list of publicKeys you pass  will replace the keys currently set for the user.
     * @param serverSlug Slug of the server
     * @param shellUserId Shell user ID to delete
     * @param requestBody Updates to be made to the shell user
     * @result string Update of shell user with new publicKey list initiated
     * @throws ApiError
     */
    public static async patchServerShellUsers(
        serverSlug: string,
        shellUserId: number,
        requestBody: PatchShellUserModelDTO,
    ): Promise<string> {
        const result = await __request({
            method: 'PATCH',
            path: `/servers/${serverSlug}/shellUsers/${shellUserId}`,
            body: requestBody,
            responseHeader: 'X-Callback-ID',
            errors: {
                400: `Bad request`,
                404: `Server or shell user not found`,
            },
        });
        return result.body;
    }

}