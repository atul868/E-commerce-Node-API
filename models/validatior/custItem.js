const joi = require('joi');
exports.create = joi.object({
  cno: joi.string().required(),
  itemno: joi.string().required(),
  quantity_purchased: joi.number().required()
});
