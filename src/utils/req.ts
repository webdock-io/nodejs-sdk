import axios, { AxiosError } from "axios";
import type { WebdockApiRequestOptions, WebdockApiRequestReturn } from "..";

const WEBDOCK_API_VERSION = "1.1.1";
const secretDevClients = new Map<string, string>();

/** @internal */
export function registerSecretDevClient(token: string, client: string): void {
    if (!token || !client) return;
    secretDevClients.set(token, client);
}

function getClientHeader(token?: string): string {
    if (token) {
        const secretDevClient = secretDevClients.get(token);
        if (secretDevClient) return secretDevClient;
    }

    return typeof document !== "undefined" ? "browser-sdk" : "node-sdk";
}

async function getApplicationName(): Promise<string> {
    // Browser
    if (typeof document !== "undefined") {
        return "browser";
    }

    // Node
    try {
        const os = await import("os");
        return os.hostname();
    } catch {
        return "unknown";
    }
}

export async function req<T = unknown>(
    opts: WebdockApiRequestOptions<T>
): Promise<WebdockApiRequestReturn<T>> {
    try {
        let formattedEndpoint = opts.endpoint;
        if (!formattedEndpoint.startsWith("/")) {
            formattedEndpoint = "/" + formattedEndpoint;
        }

        const applicationName = await getApplicationName();

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "X-Client": getClientHeader(opts.token),
            "X-Application": applicationName,
            "X-Version": WEBDOCK_API_VERSION,
        };

        if (opts.token) {
            headers.Authorization = `Bearer ${opts.token}`;
        }

        const response = await axios({
            url: `https://api.webdock.io/v1${formattedEndpoint}`,
            method: opts.method,
            headers,
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
