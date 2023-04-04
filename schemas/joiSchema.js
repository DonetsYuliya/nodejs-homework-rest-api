const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(10).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = addSchema;
