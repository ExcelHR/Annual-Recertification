
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
            required: true
        },
        Relation: {
            type: String,
            required: true
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
        required: true
    },
    RecertificationDate: {
        type: String,
        required: true
    },

    
  
})

module.exports = model("HouseholdData", HouseholdDataSchema)