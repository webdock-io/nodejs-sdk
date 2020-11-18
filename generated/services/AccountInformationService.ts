/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { AccountInformationDTO } from '../models/AccountInformationDTO';
import { catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';

export class AccountInformationService {

    /**
     * Get Account Information
     * @result AccountInformationDTO Account Information
     * @throws ApiError
     */
    public static async getAccountInformation(): Promise<Array<AccountInformationDTO>> {

        const result = await __request({
            method: 'get',
            path: `/account/accountInformation`,
        });

        catchGenericError(result);

        return result.body;
    }

}