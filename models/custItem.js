const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userItemSchema = new Schema(
    {
        cno: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'customer'
        },
        itemno: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'items'

        },
        quantity_purchased: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }

);

const custItem = mongoose.model("custItem", userItemSchema);

module.exports = custItem;