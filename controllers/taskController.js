
const users = require("../models/Users");
const items = require("../models/item");
const custitems = require("../models/custItem");
const response = require('../modules/service/response');
class TaskController{
async itemDelete (req, res) {
    try {
        items.deleteMany({ price: { $gt: 5000 } }, function (err, itemDeletedResponse) {
            if (itemDeletedResponse) {
                return res.status(200).json({code: 200, message:"ACTION COMPLETED", itemDeletedResponse: itemDeletedResponse});
               } else 
                return res.status(204).json({code: 204, message:"ACTION INCOMPLETED"});
                 });
    } catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
       }
}


async sameAddress (req, res) {
    try {
        const Resp = await users.find({ location: req.body.address })
        if (Resp) 
          return res.status(200).json({code: 200, message:"ACTION COMPLETED", Resp: Resp});
        else 
          return res.status(204).json({code: 204, message:"ACTION INCOMPLETED"});
        } catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
    }
}
async sameColor (req, res) {
    try {
        const Resp = await items.find({ color: { $in: ['brown', 'white', 'black'] } })
        if (Resp) 
        return res.status(200).json({code: 200, message:"ACTION COMPLETED", Resp: Resp});
        else
        return res.status(204).json({code: 204, message:"ACTION INCOMPLETED"});
      } catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
    }
}

async nameLies (req, res) {
    try {
        const Resp = await items.find({ itemname: /^p.*s$/ })
        if (Resp) 
        return res.status(200).json({code: 200, message:"ACTION COMPLETED", Resp: Resp});
        else 
        return res.status(204).json({code: 204, message:"ACTION INCOMPLETED"});
    } catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
    }
}

async lessWeight (req, res) {
    try {
        const Resp = await items.aggregate(
            [
                {
                    $group:
                    {
        
                        _id: {},
                        minWeight: {
                            $min: "$weight"
                        }
                    }
                }
            ]
        )
        if (Resp) {

            const item = await items.find({ weight: Resp[0].minWeight })
            return res.status(200).json({code: 200, message:"ACTION COMPLETED", item: item});
        }
        else 
        return res.status(204).json({code: 204, message:"ACTION INCOMPLETED"});
} catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
    }
}


async nextMonth (req, res) {
    try {
        const d = new Date();
        let monthNumber = (d.getMonth() + 2);
        const Resp = await items.aggregate(
            [
                {
                    '$project': {
                        'month': {
                            '$month': '$expire_date'
                        }
                    }
                }, {
                    '$match': {
                        'month': monthNumber
                    }
                }, {
                    '$count': 'month'
                }
            ]
        )
        if (Resp) {
            return res.status(200).json({code: 200, message:"ACTION COMPLETED", Resp: Resp[0]});
        }
        else 
             return res.status(204).json({code: 204, message:"ACTION INCOMPLETED"});

    } catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
    }
}


 async phoneStart (req, res) {
    try {
        const Resp = await users.find({ cust_phone: { $in: [/^99/i] } })
        if (Resp)
        return res.status(200).json({code: 200, message:"ACTION COMPLETED", Resp: Resp});
        else
        return res.status(204).json({code: 204, message:"ACTION INCOMPLETED"});

    } catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
    }
}

 async totalPrice (req, res) {
    try {
        const Resp = await custitems.aggregate(
            [
                {
                    '$lookup': {
                        'from': 'items',
                        'localField': 'itemno',
                        'foreignField': '_id',
                        'as': 'item_data'
                    }
                }, {
                    '$unwind': {
                        'path': '$item_data',
                        'preserveNullAndEmptyArrays': false
                    }
                }, {
                    '$project': {
                        'item_data.itemname': 1,
                        'total': {
                            '$multiply': [
                                '$item_data.price', '$quantity_purchased'
                            ]
                        },
                        'itemno': 1
                    }                                                                      
                }, {
                    '$group': {
                        '_id': {
                            '_id': '$itemno',
                            'item_name': '$item_data.itemname'
                        },
                        'total_amount': {
                            '$sum': '$total'
                        }
                    }
                }
            ])
        if (Resp) 
        return res.status(200).json({code: 200, message:"ACTION COMPLETED", Resp: Resp[0]});
        else 
        return res.status(204).json({code: 204, message:"ACTION INCOMPLETED"});

    } catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
    }
}



 async maximumPurchased (req, res) {
    try {
        const Resp = await custitems.aggregate(
            [
                {
                    '$group': {
                        '_id': '$cno',
                        'maxQuantity': {
                            '$max': '$quantity_purchased'
                        }
                    }
                }
            ]
        )
        let val = Resp[0]._id.valueOf();
        const userResp = await users.find({ _id: val });
        if (userResp)
        return res.status(200).json({code: 200, message:"ACTION COMPLETED", userResp: userResp});
        else 
        return res.status(204).json({code: 204, message:"ACTION INCOMPLETED"});

    } catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
    }
}

async totalPriceItemWise(req, res) {
    try {
        const Resp = await item.aggregate([
            {
              '$group': {
                '_id': '$itemname', 
                'totalSum': {
                  '$sum': '$price'
                }
              }
            }
          ])
        if (Resp) 
          return res.status(200).json({code: 200, message:"ACTION COMPLETED", Resp: Resp});
        else 
          return res.status(204).json({code: 204, message:"ACTION INCOMPLETED"});
        } catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
    }
}

async customerDetailQty(req, res) {
    try {
        const Resp = await items.aggregate([
            {
              '$lookup': {
                'from': 'custitems', 
                'localField': '_id', 
                'foreignField': 'itemno', 
                'as': 'data'
              }
            }, {
              '$unwind': {
                'path': '$data', 
                'preserveNullAndEmptyArrays': false
              }
            }, {
              '$project': {
                'data.quantity_purchased': 1, 
                'itemname': 1
              }
            }, {
              '$group': {
                '_id': '$_id', 
                'totalqty': {
                  '$sum': '$data.quantity_purchased'
                }, 
                'name': {
                  '$first': '$itemname'
                }
              }
            }
          ])
        if (Resp) 
          return res.status(200).json({code: 200, message:"ACTION COMPLETED", Resp: Resp});
        else 
          return res.status(204).json({code: 204, message:"ACTION INCOMPLETED"});
        } catch (error) {
        return res.status(204).json({code: 204, message:"Please Recitify the Error"});
    }
}

}
module.exports = new TaskController;