import { Webdock } from "./index.js";
import {
	expectRequest,
	mockNextResponse,
	mockNextServerError,
	mockedAxios,
	resetAxiosMock,
} from "./requestTestUtils.js";

jest.mock("axios");

describe("Operation API requests", () => {
	const client = new Webdock("test-token");
	let setTimeoutSpy: jest.SpyInstance;

	beforeEach(() => {
		resetAxiosMock();
		// Run the poll delay immediately so the tests don't wait.
		setTimeoutSpy = jest.spyOn(global, "setTimeout").mockImplementation(((fn: () => void) => {
			fn();
			return 0;
		}) as unknown as typeof setTimeout);
	});

	afterEach(() => {
		setTimeoutSpy.mockRestore();
	});

	it("fetch() looks up events by callback ID", async () => {
		await client.operation.fetch("callback-abc");
		expectRequest("GET", "/events?callbackId=callback-abc");
	});

	it("waitForEventToEnd() polls until the event finishes and returns its message", async () => {
		mockNextResponse([{ status: "waiting", message: "" }]);
		mockNextResponse([{ status: "working", message: "" }]);
		mockNextResponse([{ status: "finished", message: "done" }]);

		const result = await client.operation.waitForEventToEnd("callback-abc");

		expect(result).toEqual({ success: true, data: "done" });
		expect(mockedAxios).toHaveBeenCalledTimes(3);
		expect(setTimeoutSpy).toHaveBeenCalledTimes(2);
		expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
	});

	it("waitForEventToEnd() keeps polling while the event is not listed yet", async () => {
		mockNextResponse([]);
		mockNextResponse([{ status: "finished", message: "done" }]);

		const result = await client.operation.waitForEventToEnd("callback-abc");

		expect(result).toEqual({ success: true, data: "done" });
		expect(mockedAxios).toHaveBeenCalledTimes(2);
	});

	it("waitForEventToEnd() returns the event message when the event fails", async () => {
		mockNextResponse([{ status: "error", message: "Disk full" }]);

		const result = await client.operation.waitForEventToEnd("callback-abc");

		expect(result).toEqual({ success: false, error: "Disk full" });
	});

	it("waitForEventToEnd() returns the request error when polling fails", async () => {
		mockNextServerError(401, "Unauthorized");

		const result = await client.operation.waitForEventToEnd("callback-abc");

		expect(result).toEqual({ success: false, error: "Unauthorized" });
	});

	it("waitForEventToEnd() fails when the response has no body", async () => {
		mockNextResponse(null);

		const result = await client.operation.waitForEventToEnd("callback-abc");

		expect(result).toEqual({
			success: false,
			error: "Event response body is missing for callback ID: callback-abc",
		});
	});
});
