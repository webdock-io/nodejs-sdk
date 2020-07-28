const yaml = require('js-yaml')
const fs = require('fs')
const { mapValues } = require('lodash')

const openApiSchema = yaml.safeLoad(fs.readFileSync('./webdock.yaml'));

const requestBodies = openApiSchema.components.requestBodies;

const replaceRefs = (input) => {
    const iterator = (value) => {
        if (Array.isArray(value)) {
            return value.map(value => iterator(value))
        }

        if (typeof value === 'object' && /requestBodies/.test(value['$ref'])) {
            const modelName = value['$ref'].split('/').pop()
            return requestBodies[modelName]
        }

        if (typeof value === 'object') {
            return mapValues(value, iterator)
        }

        return value
    };

    return mapValues(input, iterator)
}

const output = replaceRefs(openApiSchema)

fs.writeFileSync('webdock.json', JSON.stringify(output))