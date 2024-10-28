
const mongoose =require("mongoose")
const orderSchema = mongoose.Schema ( {

    createAt : { type:Date , default:new Date() },
    products : Array ,
    owner : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'user'
           }
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order
