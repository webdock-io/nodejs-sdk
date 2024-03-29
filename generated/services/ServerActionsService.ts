/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateServerSnapshotModelDTO } from '../models/CreateServerSnapshotModelDTO';
import type { ReinstallServerModelDTO } from '../models/ReinstallServerModelDTO';
import type { ResizeServerModelDTO } from '../models/ResizeServerModelDTO';
import type { RestoreSnapshotModelDTO } from '../models/RestoreSnapshotModelDTO';
import type { ServerResizeDTO } from '../models/ServerResizeDTO';
import type { SnapshotDTO } from '../models/SnapshotDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServerActionsService {

    /**
     * Start a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param serverSlug Slug of the server
     * @returns string Server start initiated.
     * @throws ApiError
     */
    public static startServer(
        serverSlug: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/actions/start',
            path: {
                'serverSlug': serverSlug,
            },
            responseHeader: 'X-Callback-ID',
            errors: {
                400: `Bad request`,
                404: `Server not found`,
            },
        });
    }

    /**
     * Stop a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param serverSlug Slug of the server
     * @returns string Server shutdown initiated.
     * @throws ApiError
     */
    public static stopServer(
        serverSlug: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/actions/stop',
            path: {
                'serverSlug': serverSlug,
            },
            responseHeader: 'X-Callback-ID',
            errors: {
                400: `Bad request`,
                404: `Server not found`,
            },
        });
    }

    /**
     * Reboot a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param serverSlug Slug of the server
     * @returns string Server reboot initiated.
     * @throws ApiError
     */
    public static rebootServer(
        serverSlug: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/actions/reboot',
            path: {
                'serverSlug': serverSlug,
            },
            responseHeader: 'X-Callback-ID',
            errors: {
                400: `Bad request`,
                404: `Server not found`,
            },
        });
    }

    /**
     * Suspend a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * Please note that you typically have a cap of 3 suspended servers at any one time. If you need more suspended server slots you can get these against a small monthly fee. Be in touch with Webdock support for more information.
     * @param serverSlug Slug of the server
     * @returns string Server suspend initiated.
     * @throws ApiError
     */
    public static suspendServer(
        serverSlug: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/actions/suspend',
            path: {
                'serverSlug': serverSlug,
            },
            responseHeader: 'X-Callback-ID',
            errors: {
                400: `Bad request`,
                404: `Server not found`,
            },
        });
    }

    /**
     * Reinstall a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * \
     * **Please note:** Reinstall means you will be deleting your server and replacing it with a fresh image of your choice. You will keep your server name and metadata, server shortname (slug), monitoring rules and IP addresses. Otherwise it will behave as a freshly provisioned server. Any existing snapshots for this server will be deleted. If you install a LAMP/LEMP stack Webdock will generate new credentials for your server (Database, FTP and admin Shell/SSH user).
     * @param serverSlug Slug of the server
     * @param requestBody Reinstall server model
     * @returns string Server reinstall initiated.
     * @throws ApiError
     */
    public static reinstallServer(
        serverSlug: string,
        requestBody: ReinstallServerModelDTO,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/actions/reinstall',
            path: {
                'serverSlug': serverSlug,
            },
            body: requestBody,
            mediaType: 'application/json',
            responseHeader: 'X-Callback-ID',
            errors: {
                400: `Bad request`,
                404: `Server not found`,
            },
        });
    }

    /**
     * Create a snapshot for a server
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param serverSlug Slug of the server
     * @param requestBody Server snapshot to be created
     * @returns SnapshotDTO Snapshot initiated
     * @throws ApiError
     */
    public static createServerSnapshot(
        serverSlug: string,
        requestBody: CreateServerSnapshotModelDTO,
    ): CancelablePromise<SnapshotDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/actions/snapshot',
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
     * Restore the server to a snapshot
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)
     * @param serverSlug Slug of the server
     * @param requestBody Restore snapshot model
     * @returns string Snapshot restore initiated
     * @throws ApiError
     */
    public static restoreServerToSnapshot(
        serverSlug: string,
        requestBody: RestoreSnapshotModelDTO,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/actions/restore',
            path: {
                'serverSlug': serverSlug,
            },
            body: requestBody,
            mediaType: 'application/json',
            responseHeader: 'X-Callback-ID',
            errors: {
                400: `Bad request`,
                404: `Server or snapshot not found`,
            },
        });
    }

    /**
     * Dry Run for Server Profile Change
     * You should call this method before trying to resize a server in order to discover what implications changing the Server hardware profile will have with regards to Billing. You will also be notified of any validation errors such as whether the requested profile has enough storage to accommodate your server.
     * @param serverSlug Slug of the server
     * @param requestBody Resize server model
     * @returns ServerResizeDTO Dry run result
     * @throws ApiError
     */
    public static resizeDryRun(
        serverSlug: string,
        requestBody: ResizeServerModelDTO,
    ): CancelablePromise<ServerResizeDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/actions/resize/dryrun',
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
     * Change a Server Profile
     *  ![Asynchronous Request](https://api.webdock.io/application/themes/webdock/img/api-docs/async.png)\
     * Changing your hardware profile is near-instant and you keep your IP addresses and all data as-is. In some cases, a quick restart (less than 1min. downtime) is required for your new CPU allocation to come up correctly. This cannot be determined beforehand, so expect a restart of your server. We hope to have this solved in future updates of our hypervisor.\
     * \
     * _**You should always call the Change Profile Dry Run method first in order to make sure the requested profile can acccommodate your server!**_
     * @param serverSlug Slug of the server
     * @param requestBody Resize server model
     * @returns string Server Profile Change initiated
     * @throws ApiError
     */
    public static resizeServer(
        serverSlug: string,
        requestBody: ResizeServerModelDTO,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/servers/{serverSlug}/actions/resize',
            path: {
                'serverSlug': serverSlug,
            },
            body: requestBody,
            mediaType: 'application/json',
            responseHeader: 'X-Callback-ID',
            errors: {
                400: `Bad request`,
                404: `Server not found`,
            },
        });
    }

}
