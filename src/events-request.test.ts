import axios from "axios";
import { Webdock } from "./index.js";

jest.mock("axios");

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe("Events list request", () => {
	const client = new Webdock("test-token");

	beforeEach(() => {
		mockedAxios.mockReset();
		mockedAxios.mockResolvedValue({ data: [], headers: { "x-total-count": "0" } });
	});

	it("sends the API's pagination and event type query names", async () => {
		await client.events.list({ page: 2, per_page: 25, eventType: "set-containerip" });

		expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining({
			method: "GET",
			url: "https://api.webdock.io/v1/events?page=2&per_page=25&eventType=set-containerip",
		}));
	});

	it("maps legacy limit and type inputs to the API query names", async () => {
		await client.events.list({ limit: 5, type: "backup" });

		expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining({
			method: "GET",
			url: "https://api.webdock.io/v1/events?per_page=5&eventType=backup",
		}));
	});
});
