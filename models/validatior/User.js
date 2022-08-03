const joi = require('joi');
exports.create = joi.object({
    cust_name: joi.string().required(),
    cust_phone: joi.string().required(),
    location: joi.string().required(),
    gender: joi.string().optional(),
});

