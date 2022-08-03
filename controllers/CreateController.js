
const users = require("../models/Users");
const items = require("../models/item");
const custItems = require("../models/custItem");
const response = require("../modules/service/response");
class CreateController{
async userCreate (req, res) {
try {
        const userChecking = await users.find({ cust_phone: req.body.cust_phone });
        if (userChecking.length < 1) {
                const userCreateResponse=await users.create(req.body);
                if (userCreateResponse)
                 return res.status(200).json({code: 200, message:"User Succesfully Registered", userCreateResponse: userCreateResponse});
                else 
                return res.status(204).json({code: 204, message:"Unable to Create User"});

        }
    } catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
    }
};

async itemCreate (req, res) {
    try {
        const itemCreateResponse=await items.create(req.body); 
            if (itemCreateResponse) 
              return res.status(200).json({code: 200, message:"Item Create Succesfully", itemCreateResponse: itemCreateResponse});
            else
              return res.status(204).json({code: 204, message:"Unable to Create item"});

    } catch (error) {
              return res.status(204).json({code: 204, message:"Please Recitify the Error"});
    }
};


async custItemCreate (req, res) {
    try {
        console.log(req.body);
            const custItemCreateResponse = await custItems.create(req.body); 
            console.log(custItemCreateResponse);
            if (custItemCreateResponse)
            return res.status(200).json({code: 200, message:"Customer Item Create Succesfully", custItemCreateResponse: custItemCreateResponse});
            else
            return res.status(204).json({code: 204, message:"Unable to Create custitem"});

    } catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
}
}
}
module.exports = new CreateController;