
// Database model design for the user


const {model, Schema} = require("mongoose")

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"customer",
        enum:["customer","admin"]
    }
})

module.exports=model("User",UserSchema)