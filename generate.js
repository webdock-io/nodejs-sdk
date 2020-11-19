const OpenAPI = require("openapi-typescript-codegen");
const fetch = require("node-fetch");

const packageJson = require("./package.json");
const { preprocessSchema } = require("./preprocess");

const schemaUrl = `https://api.webdock.io/api-docs/v1/webdock-api-v1.yaml`;

fetch(schemaUrl)
    .then(async (response) => {
        return OpenAPI.generate({
            input: preprocessSchema(await response.text()),
            output: "./generated",
            // globalHeaders: {
            //     "X-Client": `webdock-nodejs-sdk/${packageJson.version}`
            // },
            httpClient: "node",
        });
    })
    .then(() => {
        console.log("Client generated successfully");
    });
