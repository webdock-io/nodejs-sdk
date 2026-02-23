import { config } from "dotenv";

if (process.env.MODE != "PROD") {
    config()
}
jest.setTimeout(900000000);

