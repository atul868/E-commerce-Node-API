const joi = require('joi');
exports.create = joi.object({
    itemname: joi.string().required(),
    color: joi.string().required(),
    weight: joi.string().required(),
    expire_date: joi.date().required(),
    price: joi.number().required(),
    shop_name: joi.string().required(),
});
