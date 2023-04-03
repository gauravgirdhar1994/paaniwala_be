const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        firstname: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        lastname: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        role: Joi.string()
            .trim()
            .required(),
        phone: Joi.string()
            .trim()
            .required(),
        address: Joi.string()
            .trim(),
        zipCode: Joi.string()
            .trim(),
        email: Joi.string()
            .trim(),
            // .required()
    });
    validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
    const schema = Joi.object().keys({
        phoneNumber: Joi.string()
            .trim()
            .required(),
        verificationOtp: Joi.string()
            .trim()
            .required(),
        url: Joi.string()
            .trim()
            .required(),
        userRole: Joi.string()
            .trim()
            // .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required()
    });
    validatorHandler(req, res, next, schema);
};

module.exports = {
    signup,
    signin
};