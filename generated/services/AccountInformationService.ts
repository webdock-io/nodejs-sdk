/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountInformationDTO } from '../models/AccountInformationDTO';
import { request as __request } from '../core/request';

export class AccountInformationService {

    /**
     * Get Account Information
     * @result AccountInformationDTO Account Information
     * @throws ApiError
     */
    public static async getAccountInformation(): Promise<Array<AccountInformationDTO>> {
        const result = await __request({
            method: 'GET',
            path: `/account/accountInformation`,
        });
        return result.body;
    }

}