import axios from "axios";
import { Webdock } from "./index.js";

jest.mock("axios");

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe("Platforms request URL", () => {
	const client = new Webdock("test-token");

	beforeEach(() => {
		mockedAxios.mockReset();
		mockedAxios.mockResolvedValue({ data: [], headers: {} });
	});

	it("uses a question mark before the currency query", async () => {
		await client.platforms.list({ currency: "EUR" });

		expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining({
			method: "GET",
			url: "https://api.webdock.io/v1/platforms?currency=EUR",
		}));
	});

	it("omits the query delimiter when no currency is supplied", async () => {
		await client.platforms.list({});

		expect(mockedAxios).toHaveBeenCalledWith(expect.objectContaining({
			method: "GET",
			url: "https://api.webdock.io/v1/platforms",
		}));
	});
});
