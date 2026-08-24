import {mongoose} from 'mongoose'

const salesSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required: true,
    },
    customerName:{
        type: mongoose.Schema.Types.String,
        ref:"Customer",
        required:true,
    },
    quantity:{
        type:Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
    },
    tax_value:{
        type: Number,
        required: true
    },
    subtotal:{
        type: Number,

    },
    totalAmount:{
        type: Number,
        required: true,
    },
},
{
    timeStamps:true
}
)

const Sales = mongoose.model("Sales", salesSchema)
export default Sales;