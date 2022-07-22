const Customer = require("../models/Customer")
const Property = require("../models/Property")
const User = require("../models/User")
const AppError = require("../utils/appError")
const moment = require("moment-timezone")
const bcrypt = require("bcryptjs")


// Function: Render the application page with portal properties
exports.showRegistrationPage = async (req, res, next) => {
    // const addresses = await Address.find({propertyOf:"admin"}).select({"buildingNumber":1,"direction":1,"streetNumber":1,"streetName":1,"apartmentNumbers":1})
    // let properties =[]
    // for(var i=0; i<addresses.length; i++){
    //     let optStr = addresses[i].buildingNumber +" "+ addresses[i].direction +" "+ addresses[i].streetNumber +" "+ addresses[i].streetName
    //     let property={
    //         optStr,
    //         propertyId: addresses[i].id,
    //         apartments: addresses[i].apartmentNumbers
    //     }
    //     properties.push(property)
    // }
    // res.render("apply",{
    //     data:{
    //         properties
    //     }
    // })

    console.log("Register")
    // res.send(zipCodes)
    res.render("register")
};


// Fetch all properties from Database and send array if Zip codes as response
exports.getProperty = async (req, res, next) => {
    let property
    try{  property = await Property.find()}
   catch(e){
    console.log(e)
   }
    console.log(property)
    let states = []
    property.forEach(x => states.push(x.State))
    let state = new Set(states)
    res.send([...state].sort())
}

// Fetch Propery Names based on ZIP Code Selected
exports.fetchCity = async (req, res, next) => {
    state = req.query.state
    const city = await Property.find({ "State": state })
    console.log(city)
    let cities = []
    city.forEach(x => cities.push(x.City))
    //    console.log(properties)
    res.send([...new Set(cities)].sort())
}

exports.fetchZip = async (req, res, next) => {
    //     city=req.query.city
    //     console.log(city)
    //     const zip = await Property.find({"City":city})
    //     console.log(zip)
    //     let zipCodes=[]
    //     zip.forEach(x=>zipCodes.push(x.Zip))
    // //    console.log(properties)
    // res.send([...new Set(zipCodes)].sort())
    // }
    //Fetches Address of Selected Property
}
exports.fetchProperty = async (req, res, next) => {
    city = req.query.city
    console.log(city)
    const property = await Property.find({ "City": city })
    console.log(property)
    // let properties=[]
    // property.forEach(x=>properties.push(x.Property))
    //    console.log(properties)
    // res.send([...new Set(properties)].sort())
    res.send(property)
}
exports.getAddresss = async (req, res, next) => {
    const property = req.query.property
    const address = await Property.find({ "Property": property })

    res.send(address[0])
}
// Render First Page of Regsitration
exports.userDetails = async (req, res, next) => {
    res.render('userDetails')
}
exports.applicantInfo = async (req, res, next) => {
    console.log('Applicant Info')
    res.render('applicant-info')
}
exports.copplicantInfo = async (req, res, next) => {
    console.log('Co-Applicant1 Info')
    res.render('co-applicant-info')
}
exports.copplicant_2_Info = async (req, res, next) => {
    console.log('Co-Applicant1 Info')
    res.render('co-applicant2-info')
}
// Create a new application i.e. customer
exports.createUser = async (req, res, next) => {
    const {
        apartmentNumber,
        applicantType,
        building,
        coApplicantOne,
        coApplicantTwo,
        currentAddress,
        currentLandLordName,
        currentLandLordPhoneNumber,
        currentPeriod,
        currentRent,
        email,
        firstName,
        lastName,
        leaseTerm,
        middlename,
        password,
        phoneNumber,
        previousAddress,
        previousLandLordName,
        previousLandLordPhoneNumber,
        previousPeriod,
        previousRent,
        ssn,
        ssnExists,
        visitInformation,
        dob,
        requiredLeaseDate,
        additionalSourceInfo,
        additionalIncomeAmt
    } = req.body
    const middleName = req.body.middleName ? req.body.middleName : ""
    let user = await User.findOne({ email })
    // Check if the user with the entered email Id already exists, if yes throw error
    if (user) {
        return next(new AppError("User with this Email-id already exists. Please go to the login page to access your account.", 484))
    }
    // Check if the user with the entered SSN ID already exists, if yes throw error
    let customer = await Customer.findOne({ ssn })
    if (customer) {
        return next(new AppError("User with this SSN already exists.", 484))
    }
    // Validate user's entered DOB, if invalid throw error
    let mDOB = null
    if (dob) {
        mDOB = moment(dob, moment.ISO_8601)
        if (!mDOB.isValid()) {
            return next(new AppError("Invalid date of birth.", 400))
        }
    }
    // Validate user's required lease date DOB, if invalid throw error
    let mRequiredLeaseDate = null
    if (requiredLeaseDate) {
        mRequiredLeaseDate = moment(requiredLeaseDate, moment.ISO_8601)
        if (!mRequiredLeaseDate.isValid()) {
            return next(new AppError("Invalid required lease date.", 400))
        }
    }

    // Hash the user entered password
    let hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT))
    // Create the new user
    let newUser = await User.create({ email, password: hashedPassword })
    await Customer.create({
        userId: newUser.id,
        apartmentNumber,
        applicantType,
        building,
        coapplicantName: [
            coApplicantOne,
            coApplicantTwo
        ],
        currentAddress,
        currentLandLordName,
        currentLandLordPhoneNumber,
        currentPeriod,
        currentRent,
        email,
        name: { firstName, middleName, lastName },
        leaseTerm,
        middlename,
        password,
        phoneNumber,
        previousAddress,
        previousLandLordName,
        previousLandLordPhoneNumber,
        previousPeriod,
        previousRent,
        ssn,
        ssnExists,
        visitInformation,
        verificationStatus: "pending",
        dob: mDOB,
        requiredLeaseDate: mRequiredLeaseDate,
        additionalSourceInfo,
        additionalIncomeAmt,
        uploaded: false,
        newComment: {
            comment1: false,
            comment2: false,
            comment1: false,
            comment1: false,
            comment1: false,
            comment1: false,
            comment1: false,
            comment1: false,
            comment1: false,
            comment1: false,
        }
    })
    return res.json({
        status: "success"
    })
};