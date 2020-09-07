/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { CreateEventHookModelDTO } from '../models/CreateEventHookModelDTO';
import { HookDTO } from '../models/HookDTO';
import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class EventCallbacksHooksService {

    /**
     * Get a list of event hooks
     * @result HookDTO List of hooks
     * @throws ApiError
     */
    public static async eventCallbacksHooks(): Promise<Array<HookDTO>> {

        const result = await __request({
            method: 'get',
            path: `/hooks`,
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * Creates an event hook
     * Creates an event hook
     * @param requestBody Create an event hook
     * @result HookDTO Hook Created
     * @throws ApiError
     */
    public static async creteHook(
        requestBody: CreateEventHookModelDTO,
    ): Promise<HookDTO> {

        const result = await __request({
            method: 'post',
            path: `/hooks`,
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
     * Get an event hook by ID
     * Get an event hooks by ID
     * @param hookId ID of the hook
     * @result HookDTO Hook
     * @throws ApiError
     */
    public static async getHookById(
        hookId: number,
    ): Promise<HookDTO> {

        const result = await __request({
            method: 'get',
            path: `/hooks/${hookId}`,
        });

        if (!result.ok) {
            switch (result.status) {
                case 400: throw new ApiError(result, `Bad request`);
                case 404: throw new ApiError(result, `Hook not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

    /**
     * Deletes an event hook
     * Deletes an event hook
     * @param hookId ID of the hook
     * @result any Hook deleted
     * @throws ApiError
     */
    public static async deleteHookById(
        hookId: number,
    ): Promise<any> {

        const result = await __request({
            method: 'delete',
            path: `/hooks/${hookId}`,
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `Hook not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

}