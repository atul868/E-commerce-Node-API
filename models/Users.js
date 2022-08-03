const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
    
        cust_name: {
            type: String,
        },
        cust_phone: {
            type: String,
            unique : true
        },
        location: {
            type: String,
        },
        gender: {
            type: String,
        },
    },
    {
        timestamps: true,
    }

);

const customer = mongoose.model("customer", userSchema);

module.exports = customer;