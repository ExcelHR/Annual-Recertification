
// Database model design for every property on the application portal.

const{model, Schema} = require("mongoose")

const AddressSchema = new Schema({
    buildingNumber:{
        type:Number,
        required: true
    },
    streetNumber:{
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
    },
    streetType:{
        type:String,
        enum:  [
                "alley","avenue","boulevard","building","center","circle","court","crescent","dale","drive",
                "expressway","freeway","garden","grove","heights","highway","hill","knoll","lane",
                "loop","mall","oval","park","parkway","path","pike","place","plaza","point","road",
                "route","row","run","rural route","square","street","terrace","thruway","trail","turnpike",
                "vaindict","view","walk","way"
                ]
    },
    apartmentNumbers:[{type:Number}],
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipcode:{
        type:Number,
        required:true
    },
    propertyOf:{
        type:String,
        required:true,
        enum: ["customer","admin"]
    }
})

module.exports=model("Address",AddressSchema)