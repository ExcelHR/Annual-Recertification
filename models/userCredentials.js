
// Database model design for an application(customer).


const { model, Schema } = require("mongoose")

const userCredentialsSchema = new Schema({
  

    UnitNo: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
        unique:true
    },
        firstName: {
            type: String,
            required: true
        },
        
        lastName: {
            type: String,
            required: true
        },
    
    Age: {
        type: Number,
        required: true
    },
    FamilySize: {
        type: Number,
        required: true
    },
    CertificationDate: {
        type: String,
        required: true
    },
    RecertificationDate: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    changePwd: {
        type: Boolean,
    },
    contactDetails: {
        type: Boolean,
    },
    Code: {
        type: Number,
        required: true
    }
  
})

module.exports = model("userCredentials", userCredentialsSchema)