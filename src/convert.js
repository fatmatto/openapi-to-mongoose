const SwaggerParser = require('swagger-parser')
const nestedProperty = require('nested-property')

function openapiSchemaToMongooseSchema (schema) {
  const output = {}
  for (const prop in schema.properties) {
    const propertySchema = schema.properties[prop]
    output[prop] = {}
    output[prop].type = convertType(propertySchema.type)
    if (schema.required && schema.required.includes(prop)) {
      output[prop].required = true
    }
    if (propertySchema.default) {
      output[prop].default = propertySchema.default
    }
  }
  return output
}
function convertType (type) {
  const types = {
    string: String,
    number: Number,
    integer: Number,
    boolean: Boolean,
    object: Object,
    array: Array
  }

  if (!types[type]) {
    throw new Error('Unknown type ' + type)
  }

  return types[type]
}
/**
 *
 * @param {String} openapiSpecFilePath Path to the yaml spec file
 */
async function Convert (openapiSpecFilePath) {
  let api = await SwaggerParser.parse(openapiSpecFilePath)
  api = await SwaggerParser.dereference(api)

  const output = {}
  for (const schema in api.components.schemas) {
    output[schema] = openapiSchemaToMongooseSchema(api.components.schemas[schema])
  }
  return output
}

async function ConvertSingleSchema (openapiSpecFilePath, schemaPath) {
  let api = await SwaggerParser.parse(openapiSpecFilePath)
  api = await SwaggerParser.dereference(api)
  const schema = nestedProperty.get(api, schemaPath)

  return openapiSchemaToMongooseSchema(schema)
}

module.exports = { Convert, ConvertSingleSchema }
