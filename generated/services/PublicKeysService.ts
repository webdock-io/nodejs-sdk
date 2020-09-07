/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { CreatePublicKeyModelDTO } from '../models/CreatePublicKeyModelDTO';
import { PublicKeyDTO } from '../models/PublicKeyDTO';
import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class PublicKeysService {

    /**
     * Get a list of public keys
     * Get a list of public keys in your Webdock account
     * @result PublicKeyDTO List of public keys
     * @throws ApiError
     */
    public static async getPublicKeys(): Promise<Array<PublicKeyDTO>> {

        const result = await __request({
            method: 'get',
            path: `/account/publicKeys`,
        });

        catchGenericError(result);

        return result.body;
    }

    /**
     * Add a new public key
     * Add a new public key to your Webdock account
     * @param requestBody PublicKey that will be added
     * @result PublicKeyDTO PublicKey Created
     * @throws ApiError
     */
    public static async postPublicKeys(
        requestBody: CreatePublicKeyModelDTO,
    ): Promise<PublicKeyDTO> {

        const result = await __request({
            method: 'post',
            path: `/account/publicKeys`,
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
     * Delete a PublicKey
     * Delete a PublicKey from your Webdock account
     * @param id PublicKey ID to delete
     * @result any PublicKey deleted succesfully
     * @throws ApiError
     */
    public static async deletePublicKey(
        id: number,
    ): Promise<any> {

        const result = await __request({
            method: 'delete',
            path: `/account/publicKeys/${id}`,
        });

        if (!result.ok) {
            switch (result.status) {
                case 404: throw new ApiError(result, `PublicKey not found`);
            }
        }

        catchGenericError(result);

        return result.body;
    }

}