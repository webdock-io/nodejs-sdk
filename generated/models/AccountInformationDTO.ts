/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * AccountInformation model
 */
export type AccountInformationDTO = {
    /**
     * User ID
     */
    userId?: number;
    /**
     * Company name
     */
    companyName?: string;
    /**
     * User name
     */
    userName?: string;
    /**
     * User Avatar URL
     */
    userAvatar?: string;
    /**
     * User email
     */
    userEmail?: string;
    /**
     * User is part of a team
     */
    isTeamMember?: boolean;
    /**
     * Team leader email
     */
    teamLeader?: string;
    /**
     * Account credit balance display text
     */
    accountBalance?: string;
    /**
     * Account credit balance in cents
     */
    accountBalanceRaw?: string;
    /**
     * Account credit balance currency
     */
    accountBalanceRawCurrency?: string;
};

