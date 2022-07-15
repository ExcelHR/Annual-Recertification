const{model, Schema} = require("mongoose")

const BuildingSchema = new Schema({
    street:{
        type:Number,
        required:true
    },
    direction:{
        type:String,
        enum:["N","S","E","W","NE","NW","SE","SW"],
        requrired:true
    },
    streetName:{
        type:String
    }
})

module.exports=model("Building",BuildingSchema)