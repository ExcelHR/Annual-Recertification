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
    console.log(req.query.code)
    let property
    try {
        property = await Property.find({ Code: req.query.code })
        console.log(property[0].Property)
        res.send(property[0])
    }

    catch (e) {
        console.log(e)
    }
    
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
