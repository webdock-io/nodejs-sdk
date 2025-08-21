import axios, { AxiosError } from "axios";
import { WebdockApiRequestOptions, WebdockApiRequestReturn } from "..";

export async function req<T extends unknown | undefined>(
    opts: WebdockApiRequestOptions<T>
): Promise<WebdockApiRequestReturn<T>> {
    try {
        // Add leading slash to endpoint if not present
        let formattedEndpoint = opts.endpoint;
        if (!formattedEndpoint.startsWith("/")) {
            formattedEndpoint = "/" + formattedEndpoint;
        }


        const response = await axios({
            url: `https://api.webdock.io/v1${formattedEndpoint}`,
            method: opts.method,
            headers: {
                Authorization: `Bearer ${opts.token}`,
                "Content-Type": "application/json",
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
            data: opts.body as unknown as T,
            family: 4,
        });


        // We don't want the entire response headers to be returned to the caller functions,
        // that's why this function takes the headers array pass,
        // and uses it's entries to extract from response headers
        const returnHeaders = {} as Record<string, string>;
        (opts.headers ?? []).forEach((e: string) => {
            if (e) {
                returnHeaders[e] = response.headers?.[e ?? ""];
            }
        });

        return {
            success: true,
            response: {
                body: response.data,
                headers: returnHeaders,
            } as unknown as T,
        };
    } catch (error) {

        const err = error as unknown as AxiosError<{ message: string }>;

        return {
            success: false,
            error: err.response?.data?.message ?? "Unknown error",
            errorType: err.response ? "server" : "network",
            code: err.response?.status || 0,
        };


    }



}