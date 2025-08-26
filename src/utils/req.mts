import axios, { AxiosError } from "axios";
import { WebdockApiRequestOptions, WebdockApiRequestReturn } from "../index.mts";
import { type Type, ArkError } from "arktype";

export async function req<T extends unknown | undefined, E extends Type>(
    opts: WebdockApiRequestOptions<T>,
    ARK: E
): Promise<WebdockApiRequestReturn<E["infer"]>> {
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
            data: opts.body as T,
            // Note: 'family' property may not be valid for axios config
            // Consider using a custom http agent if you need to force IPv4
        });

        // We don't want the entire response headers to be returned to the caller functions,
        // that's why this function takes the headers array and uses its entries to extract from response headers
        const returnHeaders = {} as Record<string, string>;
        (opts.headers ?? []).forEach((headerName: string) => {
            if (headerName) {
                returnHeaders[headerName] = response.headers?.[headerName] ?? "";
            }
        });

        const data = ARK.assert(response.data);

        return {
            success: true,
            response: data,
        };
    } catch (error) {
        if (error instanceof ArkError) {
            return {
                success: false,
                error: "Webdock API returned the wrong data: " + error.message,
                errorType: "client",
                code: 0,
            };
        }

        const err = error as AxiosError<{ message: string }>;

        return {
            success: false,
            error: err.response?.data?.message ?? "Unknown error",
            errorType: err.response ? "server" : "network",
            code: err.response?.status ?? 0,
        };
    }
}