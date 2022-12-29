/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventLogDTO } from '../models/EventLogDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PollForEventsService {

    /**
     * Get a list of events
     * @param callbackId Callback ID
     * @param eventType Event Type
     * @param page Page
     * @param perPage Events per page
     * @returns EventLogDTO List of events
     * @throws ApiError
     */
    public static getEvents(
        callbackId?: any,
        eventType?: 'provision' | 'restore-server' | 'change-profile' | 'set-state' | 'delete' | 'backup' | 'set-hostnames' | 'update-webroot' | 'setup-ssl' | 'install-wordpress' | 'manage-wordpress' | 'manage-shelluser' | 'manage-keys' | 'toggle-passwordauth' | 'manage-mysql' | 'manage-dbuser' | 'manage-ftpuser' | 'set-php-settings' | 'cronjob' | 'pull-file' | 'push-file' | 'delete-file' | 'execute-file',
        page: number = 1,
        perPage: number = 10,
    ): CancelablePromise<Array<EventLogDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events',
            query: {
                'callbackId': callbackId,
                'eventType': eventType,
                'page': page,
                'per_page': perPage,
            },
            errors: {
                400: `Bad request`,
            },
        });
    }

}
