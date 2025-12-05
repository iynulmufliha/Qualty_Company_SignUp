const Joi = require('joi');
const { body } = require('express-validator');

// Joi schema
const joiSchema = Joi.object({
  companyName: Joi.string().min(2).max(100).required(),
  phoneNumber: Joi.string().pattern(/^[0-9]{6,15}$/).required(),
  firstName: Joi.string().pattern(/^[A-Za-z]+$/).required(),
  lastName: Joi.string().pattern(/^[A-Za-z]+$/).required(),
  mobileNumber: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  publishRequirements: Joi.boolean(),
  licenseNumber: Joi.when('publishRequirements', {
    is: true,
    then: Joi.string().min(16).pattern(/^[A-Za-z0-9-\s]+$/).required(),
    otherwise: Joi.optional(),
  }),
  websiteUrl: Joi.string()
    .uri()
    .allow('', null),
  certificates: Joi.array().items(Joi.string()).min(1).max(5).required(),
}).options({ abortEarly: false });

// express-validator rules
const expressValidatorRules = [
  body('companyName').isString().isLength({ min: 2, max: 100 }),
  body('phoneNumber').matches(/^[0-9]{6,15}$/),
  body('firstName').matches(/^[A-Za-z]+$/),
  body('lastName').matches(/^[A-Za-z]+$/),
  body('mobileNumber').matches(/^[0-9]{10,15}$/),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('publishRequirements').optional().isBoolean(),
  body('licenseNumber').if(body('publishRequirements').equals('true')).isLength({ min: 16 }).matches(/^[A-Za-z0-9-\s]+$/),
  body('websiteUrl').optional({ nullable: true, checkFalsy: true }).isURL(),
  body('certificates').custom((val) => {
    if (!Array.isArray(val)) throw new Error('Certificates must be an array');
    if (val.length < 1) throw new Error('Select at least 1 certificate');
    if (val.length > 5) throw new Error('Max 5 certificates allowed');
    return true;
  }),
];

module.exports = {
  joiSchema,
  expressValidatorRules,
};