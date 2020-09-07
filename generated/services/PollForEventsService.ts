/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { ApiError, catchGenericError } from '../core/ApiError';
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
        eventType?: ('provision'),
        page: number = 1,
        perPage: number = 10,
    ): Promise<string> {

        const result = await __request({
            method: 'get',
            path: `/events`,
            query: {
                'callbackId': callbackId,
                'eventType': eventType,
                'page': page,
                'per_page': perPage,
            },
            responseHeader: 'X-Total-Count',
        });

        if (!result.ok) {
            switch (result.status) {
                case 400: throw new ApiError(result, `Bad request`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

}