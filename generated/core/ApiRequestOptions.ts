/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type BaseApiRequestOptions = {
    readonly url: string;
    readonly path?: Record<string, any>;
    readonly cookies?: Record<string, any>;
    readonly headers?: Record<string, any>;
    readonly query?: Record<string, any>;
    readonly mediaType?: string;
    readonly responseHeader?: string;
    readonly errors?: Record<number, string>;
};

type ApiRequestOptionsWithoutFormDataAndBody = BaseApiRequestOptions & {
    readonly method: 'GET' | 'HEAD' | 'OPTIONS';
};

type ApiRequestOptionsWithFormDataAndBody = BaseApiRequestOptions & {
    readonly method: 'PUT' | 'POST' | 'DELETE' | 'PATCH';
    readonly formData?: Record<string, any>;
    readonly body?: any;
};

export type ApiRequestOptions = ApiRequestOptionsWithoutFormDataAndBody | ApiRequestOptionsWithFormDataAndBody;
