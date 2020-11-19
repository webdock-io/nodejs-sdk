/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEventHookModelDTO } from '../models/CreateEventHookModelDTO';
import type { HookDTO } from '../models/HookDTO';
import { request as __request } from '../core/request';

export class EventCallbacksHooksService {

    /**
     * Get a list of event hooks
     * @result HookDTO List of hooks
     * @throws ApiError
     */
    public static async eventCallbacksHooks(): Promise<Array<HookDTO>> {
        const result = await __request({
            method: 'GET',
            path: `/hooks`,
        });
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
            method: 'POST',
            path: `/hooks`,
            body: requestBody,
            errors: {
                400: `Bad request`,
            },
        });
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
            method: 'GET',
            path: `/hooks/${hookId}`,
            errors: {
                400: `Bad request`,
                404: `Hook not found`,
            },
        });
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
            method: 'DELETE',
            path: `/hooks/${hookId}`,
            errors: {
                404: `Hook not found`,
            },
        });
        return result.body;
    }

}