
// Database model design for an application(customer).


const { model, Schema } = require("mongoose")

const HouseholdDataSchema = new Schema({
  

    UnitNo: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
    },
        firstName: {
            type: String,
            required: true
        },
        
        lastName: {
            type: String,
            required: true
        },
        AdultOrMinor: {
            type: String,
        },
        Relation: {
            type: String,
        },
        Student: {
            type: String,
            required: true
        },
    Age: {
        type: Number,
        required: true
    },
    documents: [
        {
            fileName: String,
            originalName: String,
            comment: String,
            verificationStatus: String,
            uploaded:Boolean
        }],
    Sr_No: {
        type: Number,
        required: true,
        unique:true

    },
    FamilySize: {
        type: Number,
        required: true
    },
    CertificationDate: {
        type: String,
        required: true
    },
    Property: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    RecertificationDate: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
    },
    Code: {
        type: Number,
    }
    
  
})

module.exports = model("HouseholdData", HouseholdDataSchema)