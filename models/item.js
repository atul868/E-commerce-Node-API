const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = new Schema(
    {
    
        itemname: {
            type: String,
        },
        color: {
            type: String,
        },
        weight: {
            type: String,
        },
        expire_date: {
            type: Date,
        },
        price: {
            type: Number,
        },
        shop_name: {
            type: String,
        },
    },
    {
        timestamps: true,
    }

);

const items = mongoose.model("item", itemSchema);

module.exports = items;