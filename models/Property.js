
// Database model design for the Property


const {model, Schema} = require("mongoose")

const PropertySchema = new Schema({
    Code:{
        type:Number,
        required:true,
        unique:true
    },
    Property:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    Zip:{
        type:Number,
        required:true
    },
    State:{
        type:String,
        required:true
    }
})

module.exports=model("Properties",PropertySchema)