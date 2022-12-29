/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountInformationDTO } from '../models/AccountInformationDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountInformationService {

    /**
     * Get Account Information
     * @returns AccountInformationDTO Account Information
     * @throws ApiError
     */
    public static getAccountInformation(): CancelablePromise<Array<AccountInformationDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/accountInformation',
        });
    }

}
