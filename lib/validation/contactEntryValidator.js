/* istanbul ignore next */
const Joi = require('joi');

const stringSchema = Joi.string();
const emailSchema = Joi.string().email();
const nameSchema = Joi.object().keys({
  first: stringSchema,
  middle: stringSchema,
  last: stringSchema,
});
const addressSchema = Joi.object().keys({
  street: stringSchema,
  city: stringSchema,
  state: stringSchema,
  zip: stringSchema,
});
const phoneSchema = Joi.array().items({
  number: stringSchema,
  type: stringSchema.valid('home', 'work', 'mobile').required()
});

module.exports = {
  body: Joi.object({
    name: nameSchema,
    address: addressSchema,
    phone: phoneSchema,
    email: emailSchema
  })
};
