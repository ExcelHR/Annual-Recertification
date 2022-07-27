
// Database model design for an application(customer).


const { model, Schema } = require("mongoose")

const HouseholdSchema = new Schema({
  
    // visitInformation:{
    //     type: String,
    //     required: true
    // },
    // building:{
    //     type: String,
    //     required: true
    // },
    // apartmentNumber:{
    //     type:Number,
    //     required: true
    // },
    // requiredLeaseDate:{
    //     type: Date,
    //     // required: true
    // },
    // leaseTerm: {
    //     type: Number,
    //     required: true,
    //     enum: [1, 2]
    // },
    name: {
        firstName: {
            type: String,
            required: true
        },
        middleName: {
            type: String,
            default: ""
        },
        lastName: {
            type: String,
            required: true
        }
    },
    dob: {
        type: Date,
        required: true
    },
    // ssn:{
    //     type:String,
    //     unique:true
    // },
    // ssnExists:{
    //     type: Boolean,
    //     // required: true
    // },
    phoneNumber: {
        type: Number,
        required: true,
    },
    // applicantType: {
    //     type: String,
    //     // required:true,
    //     enum: ["tenant", "occupant", "gurantor"]
    // },
    documents: [
        {
            fileName: String,
            originalName: String,
            comment: String,
            verificationStatus: String,
            uploaded:Boolean
        }],
    property: {
        type: String
    },
    unit: {
        type: Number
    }

    // currentAddress:{
    //     buildingName:{
    //         type:String
    //     },
    //     Street:{
    //         type:String
    //     },
    //     Zip:{
    //         type:Number
    //     },
    //     city:{
    //         type:String
    //     },
    //     state:{
    //         type:String
    //     }
    // },
    // verificationStatus:{
    //     type:String,
    //     enum:["pending","approved","rejected"]
    // },


    // currentinternationaladdress:{
    //     type:Boolean,
    //     required:true,
    //     default: false
    // },
    // currentRent:{
    //     type:Number,
    //     required:true
    // },
    // currentPeriod:{
    //     type:Number
    // },
    // currentLandLordName:{
    //     type:String,
    //     required:true
    // },
    // currentLandLordPhoneNumber:{
    //     type:Number,
    //     required:true
    // },
    // previousAddress:{
    //     type:String
    // },
    // previousinternationaladdress:{
    //     type:Boolean,
    //     required:true,
    //     default: false
    // },
    // previousRent:{
    //     type:Number,
    //     required:true
    // },
    // previousPeriod:{
    //     type:Number
    // },
    // previousLandLordName:{
    //     type:String,
    //     required:true
    // },
    // previousLandLordPhoneNumber:{
    //     type:Number,
    //     required:true
    // },
    // employed:{
    //     type:Boolean,
    //     // required:true
    // },
    // additionalSourceInfo:{
    //     type:String
    // },
    // additionalIncomeAmt:{
    //     type:Number
    // },
    // files:{
    //     rentalDocument1:{
    //         type:String
    //     },
    //     rentalDocument2:{
    //         type:String
    //     },
    //     rentalDocument3:{
    //         type:String
    //     },
    //     rentalDocument4:{
    //         type:String
    //     },
    //     rentalDocument5:{
    //         type:String
    //     },
    //     rentalDocument6:{
    //         type:String
    //     },
    //     rentalDocument7:{
    //         type:String
    //     },
    //     rentalDocument8:{
    //         type:String
    //     },
    //     rentalDocument9:{
    //     type:String
    //     },
    //     rentalDocument10:{
    //         type:String
    //     }
    // },

    // newFile:{
    //     rentalDocument1:{
    //         type:Boolean,
    //         default: false
    //     },
    //     rentalDocument2:{
    //         type:Boolean,
    //         default: false
    //     },
    //     rentalDocument3:{
    //         type:Boolean,
    //         default: false
    //     },
    //     rentalDocument4:{
    //         type:Boolean,
    //         default: false
    //     },
    //     rentalDocument5:{
    //         type:Boolean,
    //         default: false
    //     },
    //     rentalDocument6:{
    //         type:Boolean,
    //         default: false
    //     },
    //     rentalDocument7:{
    //         type:Boolean,
    //         default: false
    //     },
    //     rentalDocument8:{
    //         type:Boolean,
    //         default: false
    //     },
    //     rentalDocument9:{
    //         type:Boolean,
    //         default: false
    //     },
    //     rentalDocument10:{
    //         type:Boolean,
    //         default: false
    //     }
    // },
    // newComment:{
    //     comment1:{
    //         type:Boolean,
    //         default: false
    //     },
    //     comment2:{
    //         type:Boolean,
    //         default: false
    //     },
    //     comment3:{
    //         type:Boolean,
    //         default: false
    //     },
    //     comment4:{
    //         type:Boolean,
    //         default: false
    //     },
    //     comment5:{
    //         type:Boolean,
    //         default: false
    //     },
    //     comment6:{
    //         type:Boolean,
    //         default: false
    //     },
    //     comment7:{
    //         type:Boolean,
    //         default: false
    //     },
    //     comment8:{
    //         type:Boolean,
    //         default: false
    //     },
    //     comment9:{
    //         type:Boolean,
    //         default: false
    //     },
    //     comment10:{
    //         type:Boolean,
    //         default: false
    //     }
    // },
    // uploaded:{
    //     type: Boolean,
    //     required: true,
    //     default: false
    // }
})

module.exports = model("Household", HouseholdSchema)