const Joi = require("joi");

const schemaValidation = async (schema, body) => {
  try {
    await schema.validate(body);
    return body;
  } catch (err) {
    Joi.isError(new Error());
  }
};

module.exports = schemaValidation;
