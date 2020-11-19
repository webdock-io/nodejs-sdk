/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class PollForEventsService {

    /**
     * Get a list of events
     * @param callbackId Callback ID
     * @param eventType Event Type
     * @param page Page
     * @param perPage Events per page
     * @result string List of events
     * @throws ApiError
     */
    public static async getEvents(
        callbackId?: any,
        eventType?: 'provision' | 'restore-server' | 'change-profile' | 'set-state' | 'delete' | 'backup' | 'set-hostnames' | 'update-webroot' | 'setup-ssl' | 'install-wordpress' | 'manage-wordpress' | 'manage-shelluser' | 'manage-keys' | 'toggle-passwordauth' | 'manage-mysql' | 'manage-dbuser' | 'manage-ftpuser' | 'set-php-settings' | 'cronjob' | 'pull-file' | 'push-file' | 'delete-file' | 'execute-file',
        page: number = 1,
        perPage: number = 10,
    ): Promise<string> {
        const result = await __request({
            method: 'GET',
            path: `/events`,
            query: {
                'callbackId': callbackId,
                'eventType': eventType,
                'page': page,
                'per_page': perPage,
            },
            responseHeader: 'X-Total-Count',
            errors: {
                400: `Bad request`,
            },
        });
        return result.body;
    }

}