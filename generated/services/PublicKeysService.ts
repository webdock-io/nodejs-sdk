/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePublicKeyModelDTO } from '../models/CreatePublicKeyModelDTO';
import type { PublicKeyDTO } from '../models/PublicKeyDTO';
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
            method: 'GET',
            path: `/account/publicKeys`,
        });
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
            method: 'POST',
            path: `/account/publicKeys`,
            body: requestBody,
            errors: {
                400: `Bad request`,
            },
        });
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
            method: 'DELETE',
            path: `/account/publicKeys/${id}`,
            errors: {
                404: `PublicKey not found`,
            },
        });
        return result.body;
    }

}