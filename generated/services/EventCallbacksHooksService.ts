/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEventHookModelDTO } from '../models/CreateEventHookModelDTO';
import type { HookDTO } from '../models/HookDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EventCallbacksHooksService {

    /**
     * Get a list of event hooks
     * @returns HookDTO List of hooks
     * @throws ApiError
     */
    public static eventCallbacksHooks(): CancelablePromise<Array<HookDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hooks',
        });
    }

    /**
     * Creates an event hook
     * Creates an event hook
     * @param requestBody Create an event hook
     * @returns HookDTO Hook Created
     * @throws ApiError
     */
    public static creteHook(
        requestBody: CreateEventHookModelDTO,
    ): CancelablePromise<HookDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hooks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }

    /**
     * Get an event hook by ID
     * Get an event hooks by ID
     * @param hookId ID of the hook
     * @returns HookDTO Hook
     * @throws ApiError
     */
    public static getHookById(
        hookId: number,
    ): CancelablePromise<HookDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hooks/{hookId}',
            path: {
                'hookId': hookId,
            },
            errors: {
                400: `Bad request`,
                404: `Hook not found`,
            },
        });
    }

    /**
     * Deletes an event hook
     * Deletes an event hook
     * @param hookId ID of the hook
     * @returns any Hook deleted
     * @throws ApiError
     */
    public static deleteHookById(
        hookId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/hooks/{hookId}',
            path: {
                'hookId': hookId,
            },
            errors: {
                404: `Hook not found`,
            },
        });
    }

}
