const joi = require('joi');
exports.delete = joi.object({
    item_id: joi.string().required(),
});

exports.address = joi.object({
    address: joi.string().required(),
});

