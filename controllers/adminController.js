const bcrypt = require("bcryptjs")
const Household = require("../models/Household")
const Customer = require("../models/Customer")
const AppError = require("../utils/appError")
const { deleteFiles } = require("../utils/fileUtil")
const  Grid  = require("gridfs-stream")
const Admin = require("../models/Admin")
const moment = require("moment-timezone")
const mongoose = require("mongoose")
const HouseholdData = require("../models/HouseholdData")

exports.login = async (req, res, next) => {
    res.render('admin_login')
}
exports.admin_dashboard = async (req, res, next) => {
    res.render('admin_dashboard')
}
exports.loginValidation = async (req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    console.log("backend")
    const { email, password } = req.body
    console.log(req.body)
    let hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT))
    let admin = await Admin.findOne({ email })
    if (!admin) {
        console.log("No admin found")
        return next(new AppError("No admin with this adminname exists.", 400))
    }
    let match = await bcrypt.compare(password, admin.password)
    if (!match) {
        return next(new AppError("Password incorrect. Please enter the correct password", 400))
    }
    res.send(admin._id)
};
// utitlity function for deleting documents.
async function unlinkUploadedFiles({ files = {} }) {
    const paths = Object.values(files).flat().map(({ path }) => path)
    await deleteFiles({ paths })
}

// Render admin dashboard
exports.getDashboard = async (req, res, next) => {
    res.render("dashboard")
};

// Render add property page
exports.getAddProperty = async (req, res, next) => {
    console.log("getAddProperty")
    res.render("newProperty")
}

exports.showDocuments = async (req, res, next) => {
    console.log("Show Documents")
    console.log(req.query.id)
    res.render('show_Documents')
}

exports.getHouseholdInfo = async (req, res, next) => {
    console.log("getHouseholdInfo")
    adminId=req.query.id
    console.log(adminId)
    const admin=await Admin.find({_id:adminId})
    console.log(admin)
    const units=admin[0].units
    const household_details=[]
    try{
          for(let i=0;i<units.length;i++) { 
          const household=await HouseholdData.find({UnitNo:units[i]})
          console.log(household)
          for(let j=0;j<household.length;j++) { 
            console.log(household[j])
            let property=household[j].Property
          household_details.push({houshold_id:household[j]._id,name:`${household[j].firstName} ${household[j].lastName} `,property,unit:units[i],documents:household[j].documents})
          }
        }
          console.log(household_details)
          res.send(household_details)
    }
    catch(e){
        console.log("Error")
        console.log(e)
        res.status(400).send({message:"Something went wrong" ,status:404,error:true})
    }
}

exports.getDocuments = async (req, res, next) => {
    console.log("getDocuments")
    userId=req.query.id
    console.log(userId)
    const household=await HouseholdData.find({_id:userId})
    console.log(household)
    docs=household[0].documents
    console.log(JSON.stringify(docs))
    const name=household[0].firstName+" "+household[0].lastName

   documents=[]
    try{
          
          for(let j=0;j<docs.length;j++) { 
            documents.push({fileName:docs[j].fileName,originalName:docs[j].originalName,status:docs[j].verificationStatus})
          }
    response={documents,name,id:userId}
    console.log(response)
          res.send(response)
        }
    
    catch(e){
        console.log("Error")
        console.log(e)
        res.status(400).send({message:"Something went wrong" ,status:404,error:true})
    }
}
// Function: Create a property on the portal that the user can select.
exports.postAddProperty = async (req, res, next) => {
    // Take the user-entered input from the request body
    const {
        buildingNumber,
        streetNumber,
        direction,
        streetName,
        streetType,
        city,
        state,
        zipcode,
        apartmentNumbers
    } = req.body
    // Insert the property into the database.
    const property = await Address.create({
        buildingNumber,
        streetNumber,
        direction,
        streetName,
        streetType,
        city,
        state,
        zipcode,
        apartmentNumbers,
        propertyOf: "admin"
    })
    return res.json({
        status: "success"
    })
};

// Function: Fetches all customers on the portal
exports.getAllCustomers = async (req, res, next) => {
    // Find all customers from the database
    let customers = await Customer.find({}).populate('userId').lean().exec()
    res.status(200).json({
        data: { customers }
    })
};

// Function: Fetches a specific customer on the portal based on customer Id
exports.getCustomer = async (req, res, next) => {
    // Get the customer Id
    let customerId = req.params.customerId
    // Fetch the customer based on customer Id
    let customer = await Customer.find({ _id: customerId }).populate('userId').lean().exec()
    res.status(200).json({
        status: "success",
        data: customer
    })
};
exports.getFile = async (req, res, next) => {
    // Get the customer Id
    console.log('Get File')
    const mongodb_uri = process.env.DATABASE_LOCAL
    const conn = mongoose.createConnection(mongodb_uri)
    let gfs
    await conn.once('open', () => {
        console.log("DB is opened")
        gfs = Grid(conn.db, mongoose.mongo)
        gfs.collection('Documents')
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (err) {
            return res.status(404).send({ err: "No files found" })
        }
        else {
            const readstream=gfs.createReadStream(file.filename)
            readstream.pipe(res)
            // res.send(file)
        }
    })
    })
    
    // Fetch the customer based on customer Id
   
};

// Function: Sets the document verification state
exports.postSetState = async (req, res, next) => {
    // Get the customer Id
    const { customerId } = req.params
    //  Get the admin-entered verification status
    const { verificationStatus } = req.body
    let customer = await Customer.updateOne({ _id: customerId }, { verificationStatus }).lean().exec()
    return res.status(200).json({
        status: "success"
    })
}

// Function: Inserts the admin comments on a particular user's rental documents.
exports.postComments = async (req, res, next) => {
    // Get the customer Id
    const { customerId } = req.params
    // Get the admin-entered comments
    const { comments } = req.body
    // Update the specific entered comments
    if (comments.comment1) {
        await Customer.updateOne({ _id: customerId }, { $set: { "comments.comment1": comments.comment1, "newComment.comment1": true } }).lean().exec()
    }
    if (comments.comment2) {
        await Customer.updateOne({ _id: customerId }, { $set: { "comments.comment2": comments.comment2, "newComment.comment2": true } }).lean().exec()
    }
    if (comments.comment3) {
        await Customer.updateOne({ _id: customerId }, { $set: { "comments.comment3": comments.comment3, "newComment.comment3": true } }).lean().exec()
    }
    if (comments.comment4) {
        await Customer.updateOne({ _id: customerId }, { $set: { "comments.comment4": comments.comment4, "newComment.comment4": true } }).lean().exec()
    }
    if (comments.comment5) {
        await Customer.updateOne({ _id: customerId }, { $set: { "comments.comment5": comments.comment5, "newComment.comment5": true } }).lean().exec()
    }
    if (comments.comment6) {
        await Customer.updateOne({ _id: customerId }, { $set: { "comments.comment6": comments.comment6, "newComment.comment6": true } }).lean().exec()
    }
    if (comments.comment7) {
        await Customer.updateOne({ _id: customerId }, { $set: { "comments.comment7": comments.comment7, "newComment.comment7": true } }).lean().exec()
    }
    if (comments.comment8) {
        await Customer.updateOne({ _id: customerId }, { $set: { "comments.comment8": comments.comment8, "newComment.comment8": true } }).lean().exec()
    }
    if (comments.comment9) {
        await Customer.updateOne({ _id: customerId }, { $set: { "comments.comment9": comments.comment9, "newComment.comment9": true } }).lean().exec()
    }
    if (comments.comment10) {
        await Customer.updateOne({ _id: customerId }, { $set: { "comments.comment10": comments.comment10, "newComment.comment10": true } }).lean().exec()
    }

    return res.status(200).json({
        status: "success"
    })
};

// Function: Sets the viewed flag(toggler) for the admin to identify the "new" documents
exports.postViewed = async (req, res, next) => {
    // Get the customer Id
    let { customerId } = req.params
    // Get the filenames of the admin viewed documents
    let { file } = req.body
    if (file == "rentalDocument1") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument1": false } })
    }
    if (file == "rentalDocument2") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument2": false } })
    }
    if (file == "rentalDocument3") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument3": false } })
    }
    if (file == "rentalDocument4") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument4": false } })
    }
    if (file == "rentalDocument5") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument5": false } })
    }
    if (file == "rentalDocument6") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument6": false } })
    }
    if (file == "rentalDocument7") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument7": false } })
    }
    if (file == "rentalDocument8") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument8": false } })
    }
    if (file == "rentalDocument9") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument9": false } })
    }
    if (file == "rentalDocument10") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument10": false } })
    }
    return res.status(200).json({
        status: "success"
    })

};

// Function: Sets the viewed flag(toggler) for the customer to identify the "new" comments
exports.postViewComment = async (req, res, next) => {
    // Get the customer Id
    let { customerId } = req.params
    // Get the filenames of the customer viewed documents
    let { file } = req.body
    if (file == "rentalDocument1") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument1": false } })
    }
    if (file == "rentalDocument2") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument2": false } })
    }
    if (file == "rentalDocument3") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument3": false } })
    }
    if (file == "rentalDocument4") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument4": false } })
    }
    if (file == "rentalDocument5") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument5": false } })
    }
    if (file == "rentalDocument6") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument6": false } })
    }
    if (file == "rentalDocument7") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument7": false } })
    }
    if (file == "rentalDocument8") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument8": false } })
    }
    if (file == "rentalDocument9") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument9": false } })
    }
    if (file == "rentalDocument10") {
        await Customer.updateOne({ _id: customerId }, { $set: { "newFile.rentalDocument10": false } })
    }
    return res.status(200).json({
        status: "success"
    })

};

// Function: Render edit customer page with the user specific property data
exports.getShowEditCustomerPage = async (req, res, next) => {
    // Find the user's interested property
    const addresses = await Address.find({ propertyOf: "admin" }).select({ "buildingNumber": 1, "direction": 1, "streetNumber": 1, "streetName": 1, "apartmentNumbers": 1 })
    // Restructure the received property data
    let properties = []
    const customerId = req.params.customerId
    for (var i = 0; i < addresses.length; i++) {
        let optStr = addresses[i].buildingNumber + " " + addresses[i].direction + " " + addresses[i].streetNumber + " " + addresses[i].streetName
        let property = {
            optStr,
            propertyId: addresses[i].id,
            apartments: addresses[i].apartmentNumbers
        }
        properties.push(property)
    }
    // Render page with properties and customer Id
    res.render("edit-customer", {
        data: {
            properties,
            customerId
        }
    })
};

// Function: Update the details of a specific customer
exports.updateCustomer = async (req, res, next) => {
    // Get the admin-entered fields that are to be updated from the request body 
    const {
        body: {
            firstName,
            middleName,
            lastName,
            email,
            dob,
            requiredLeaseDate,
            coApplicantOne,
            coApplicantTwo,
            additionalSourceInfo,
            additionalIncomeAmt,
            ...other
        },
        // Get the customer Id
        params: {
            customerId
        }
    } = req

    let mDOB, mRequiredLeaseDate
    // See if DOB is to be updated, if yes check if it is valid according to ISO format
    if (dob) {
        mDOB = moment(dob, moment.ISO_8601)
        if (!mDOB.isValid()) {
            // Invalid date format
            return next(new AppError("Date of birth is invalid", 400))
        }
    }

    // See if requiredLeaseDate is to be updated, if yes check if it is valid according to ISO format
    if (requiredLeaseDate) {
        mRequiredLeaseDate = moment(requiredLeaseDate, moment.ISO_8601)
        if (!mRequiredLeaseDate.isValid()) {
            // Invalid date format
            return next(new AppError("Required lease date is invalid", 400))
        }
    }

    // Find the specific customer
    let customer = await Customer.findOne({
        _id: customerId
    })

    // Throw error that customer does not exist
    if (!customer) {
        return next(new AppError("Customer does not exist", 484))
    }

    // Find the customer's user collection data, required to update email
    let user = await User.findOne({
        _id: customer.UserId
    })

    // Throw error that the customer (user) does not exist
    if (!user) {
        return next(new AppError("Customer does not exist", 484))
    }

    // Update customer in the database
    await Customer.updateOne({
        _id: customerId
    }, {
        name: {
            firstName,
            middleName,
            lastName
        },
        coapplicantName: [
            coApplicantOne,
            coApplicantTwo
        ],
        dob: mDOB,
        requiredLeaseDate: mRequiredLeaseDate,
        additionalSourceInfo,
        additionalIncomeAmt,
        ...other
    })

    // Update user in the database
    await User.updateOne({
        _id: mongoose.Types.ObjectId(customer.userId)
    }, {
        email
    })

    return res.status(200).json({
        status: "success"
    })
};

exports.deleteCustomer = async (req, res, next) => {
    // Get the customer Id
    let customerId = req.params.customerId
    // Find the customer in the database
    const customer = await Customer.findOne({ customerId }).lean().exec()
    // No such customer throw error
    if (!customer) {
        return next(new AppError("Customer does not exist.", 484))
    }
    // Get the customer's user Id
    let userId = customer.userId
    // Find the user based on user Id
    const user = await User.findOne({ _id: customer.userId }).lean().exec();
    // No such user
    if (!user) {
        return next(new AppError("Customer does not exist.", 484))
    }
    // Create a paths array consisting of all paths of previous(old) documents
    // Unlink(Delete) the previous rental documents of customer
    let paths = []
    if (customer.files?.rentalDocument1) {
        paths.push(customer.files.rentalDocument1)
    }
    if (customer.files?.rentalDocument2) {
        paths.push(customer.files.rentalDocument2)
    }
    if (customer.files?.rentalDocument3) {
        paths.push(customer.files.rentalDocument3)
    }
    if (customer.files?.rentalDocument4) {
        paths.push(customer.files.rentalDocument4)
    }
    if (customer.files?.rentalDocuments5) {
        paths.push(customer.files.rentalDocument5)
    }
    if (customer.files?.rentalDocument6) {
        paths.push(customer.files.rentalDocument6)
    }
    if (customer.files?.rentalDocument7) {
        paths.push(customer.files.rentalDocument7)
    }
    if (customer.files?.rentalDocument8) {
        paths.push(customer.files.rentalDocument8)
    }
    if (customer.files?.rentalDocument9) {
        paths.push(customer.files.rentalDocument9)
    }
    if (customer.files?.rentalDocuments10) {
        paths.push(customer.files.rentalDocument10)
    }

    // Utility that delete documents given a file path.
    await deleteFiles(paths)
    // Delete User
    await User.deleteOne({ _id: userId })
    // Delete Customer
    await Customer.deleteOne({ customerId })

    return res.status(200).json({
        status: "success"
    })
};


