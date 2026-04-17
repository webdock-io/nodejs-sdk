import axios, { AxiosError } from "axios";
import { WebdockApiRequestOptions, WebdockApiRequestReturn } from "..";


export async function req<T = unknown>(
    opts: WebdockApiRequestOptions<T>
): Promise<WebdockApiRequestReturn<T>> {
    try {
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
                "X-Client": typeof document !== "undefined" ? "browser-sdk" : "node-sdk",


            },
            data: opts.body,
            ...(typeof document === "undefined" ? { family: 4 } : {}),
        });

        const returnHeaders: Record<string, string> = {};
        (opts.headers ?? []).forEach((e: string) => {
            if (e) {
                returnHeaders[e] = response.headers?.[e] as string;
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
        const err = error as AxiosError<{ message: string }>;

        return {
            success: false,
            error: err.response?.data?.message ?? "Unknown error",
            errorType: err.response ? "server" : "network",
            code: err.response?.status || 0,
        };
    }
}