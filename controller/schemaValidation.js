const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(10).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const schemaValidation = async (schema, body) => {
  try {
    await schema.validate(body);
    return body;
  } catch (err) {
    Joi.isError(new Error());
  }
};

module.exports = { schemaValidation, addSchema };
