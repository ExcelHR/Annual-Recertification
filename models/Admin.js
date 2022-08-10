
// Database model design for the admin


const {model, Schema} = require("mongoose")

const AdminSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"Admin",
        enum:["MasterAdmin","Admin"]
    },
    units:[
        {type:String}
    ]
})

module.exports=model("Admin",AdminSchema)