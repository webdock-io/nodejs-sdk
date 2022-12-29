const yaml = require('js-yaml')
const { mapValues } = require('lodash')

exports.preprocessSchema = (yamlSchema) => {
    const openApiSchema = yaml.load(yamlSchema);

    /** Temp hack */
    openApiSchema.components.schemas.WarningDTO.properties.data = {
        description: 'Warning message',
        type: 'object',
        additionalProperties: [{ type: 'string' }]
    }

    const requestBodies = openApiSchema.components.requestBodies;

    const replaceRefs = (input) => {
        const iterator = (value) => {
            if (Array.isArray(value)) {
                return value.map(value => iterator(value))
            }

            if (typeof value === 'object' && value && /requestBodies/.test(value['$ref'])) {
                const modelName = value['$ref'].split('/').pop()
                return requestBodies[modelName]
            }

            if (typeof value === 'object' && value !== null) {
                return mapValues(value, iterator)
            }

            return value
        };

        return mapValues(input, iterator)
    }

    const output = replaceRefs(openApiSchema)

    return output;
}

