/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

interface Config {
    BASE: string;
    VERSION: string;
    CLIENT: 'fetch' | 'xhr' | 'node-fetch';
    WITH_CREDENTIALS: boolean;
    TOKEN: string;
    WITH_HEADERS: { [key: string]: any };
}

export const OpenAPI: Config = {
    BASE: 'https://api.webdock.io/v1',
    VERSION: '1.0.0',
    CLIENT: 'node-fetch',
    WITH_CREDENTIALS: false,
    TOKEN: '',
    WITH_HEADERS: {
        'X-Client': 'webdock-nodejs-sdk/0.1.7'
    }
};