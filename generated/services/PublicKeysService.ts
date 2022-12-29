/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePublicKeyModelDTO } from '../models/CreatePublicKeyModelDTO';
import type { PublicKeyDTO } from '../models/PublicKeyDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PublicKeysService {

    /**
     * Get a list of public keys
     * Get a list of public keys in your Webdock account
     * @returns PublicKeyDTO List of public keys
     * @throws ApiError
     */
    public static getPublicKeys(): CancelablePromise<Array<PublicKeyDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/publicKeys',
        });
    }

    /**
     * Add a new public key
     * Add a new public key to your Webdock account
     * @param requestBody PublicKey that will be added
     * @returns PublicKeyDTO PublicKey Created
     * @throws ApiError
     */
    public static postPublicKeys(
        requestBody: CreatePublicKeyModelDTO,
    ): CancelablePromise<PublicKeyDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/publicKeys',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }

    /**
     * Delete a PublicKey
     * Delete a PublicKey from your Webdock account
     * @param id PublicKey ID to delete
     * @returns any PublicKey deleted succesfully
     * @throws ApiError
     */
    public static deletePublicKey(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/account/publicKeys/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `PublicKey not found`,
            },
        });
    }

}
