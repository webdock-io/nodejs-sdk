import axios, { type AxiosRequestConfig } from "axios";

/**
 * Helpers for request tests that mock axios.
 * Each test file must still call `jest.mock("axios")` itself.
 */
export const mockedAxios = axios as jest.MockedFunction<typeof axios>;
export const API_BASE = "https://api.webdock.io/v1";
export const CALLBACK_ID = "callback-123";

/** Reset the mock and make every call resolve with an empty body and a callback ID header. */
export function resetAxiosMock() {
	mockedAxios.mockReset();
	mockedAxios.mockResolvedValue({ data: {}, headers: { "x-callback-id": CALLBACK_ID } });
}

/** Make the next call resolve with the given body and headers. */
export function mockNextResponse(data: unknown, headers: Record<string, string> = {}) {
	mockedAxios.mockResolvedValueOnce({ data, headers });
}

/** Make the next call fail the way axios does for an HTTP error response. */
export function mockNextServerError(status: number, message: string) {
	mockedAxios.mockRejectedValueOnce({ response: { status, data: { message } } });
}

export function lastRequest(): AxiosRequestConfig {
	const calls = mockedAxios.mock.calls;
	if (calls.length === 0) throw new Error("axios was not called");
	return calls[calls.length - 1][0] as AxiosRequestConfig;
}

/** Assert the most recent request's method, endpoint (relative to /v1) and JSON body. */
export function expectRequest(method: string, endpoint: string, body?: unknown) {
	expect(mockedAxios).toHaveBeenLastCalledWith(
		expect.objectContaining({
			method,
			url: `${API_BASE}${endpoint}`,
			data: body,
		}),
	);
}

/** Assert a successful result that exposes the callback ID header. */
export function expectCallback(result: unknown) {
	expect(result).toMatchObject({
		success: true,
		response: { headers: { "x-callback-id": CALLBACK_ID } },
	});
}
