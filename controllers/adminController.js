const bcrypt = require("bcryptjs")
const AppError = require("../utils/appError")
const { deleteFiles } = require("../utils/fileUtil")
const  Grid  = require("gridfs-stream")
const Admin = require("../models/Admin")
const moment = require("moment-timezone")
const mongoose = require("mongoose")
const HouseholdData = require("../models/HouseholdData")
const code_prop={445: "THE CREST APARTMENTS",455: "PALM TERRACE",3950: "VERMONT CITY LIGHTS II",4000: "VERMONT CITY LIGHTS I",4050: "COURTLAND CITY LIGHTS",4150: "HUNTINGTON HACIENDA 1",4200: "ADAMS CITY LIGHTS",4250: "ANGELS CITY LIGHTS",4300: "BEVERLY CITY LIGHTS",4350: "BROADWAY VISTA",4400: "COCHRAN CITY LIGHTS",4450: "GARLAND CITY LIGHTS",4500: "GATEWAY CITY LIGHTS",4550: "GRANDVIEW CITY LIGHTS",4600: "HAPPY VALLEY CITY LIGHTS",4650: "MELROSE APARTMENTS",4700: "WESTLAKE CITY LIGHTS",4750: "WILSHIRE CITY LIGHTS",4800: "WITMER CITY LIGHTS",4850: "MISSION CITY LIGHTS",4900: "RAINTREE",4950: "SAGEWOOD",5000: "ATRIUM COURT",5050: "SPRINGBROOK GROVE",5100: "GENEVA VILLAGE",5150: "TANAGER SPRINGS I",5200: "TANAGER SPRINGS II",5250: "ALAMEDA TERRACE",5300: "FIGUEROA PLACE",5350: "HARVARD CIRCLE",5400: "MAIN STREET VISTAS",5450: "MENLO PARK",5500: "THE MEDITERRANEAN",5550: "VALLEY VIEW",5600: "CORTEZ CITY LIGHTS",5650: "RUNNYMEDE SPRINGS",5700: "STUDIO POINTE (WILTON)",5750: "SONOMA APT",5800: "YALE TERRACE"}

//Renders Admin Login Page
exports.login = async (req, res, next) => {
    res.render('admin_login')
}
//Renders Admin Dashboard after Login
exports.admin_dashboard = async (req, res, next) => {
    res.render('admin_dashboard')
}

//Validates Admin Credentials
exports.loginValidation = async (req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    console.log("backend")
    const { email, password } = req.body
    console.log(password)
    console.log(req.body)
    let hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT))
    console.log(hashedPassword)
    let admin = await Admin.findOne({ email })
    console.log(admin)
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


// Fetch Admin Details
exports.getAdminDetails = async (req, res, next) => {
    adminId=req.query.id
    resp=await Admin.find({_id:adminId})
    console.log(resp)
    res.send(resp[0])
};


// Renders the show Documents page
exports.showDocuments = async (req, res, next) => {
    console.log("Show Documents")
    console.log(req.query.id)
    res.render('show_Documents')
}

//Fetch Tenant info from tenant Database
exports.getHouseholdInfo = async (req, res, next) => {
    console.log("getHouseholdInfo")
    unitNo=req.query.unitNo
    adminId=req.query.adminId
    admin=await Admin.find({_id:adminId})
   code=req.query.code
    console.log(unitNo,code)
    const household_details=[]
    try{
        const household=await HouseholdData.find({UnitNo:unitNo,Code:code})
        
        console.log('household')
        console.log(household)
          for(let j=0;j<household.length;j++) { 
            console.log(household[j])
          household_details.push({houshold_id:household[j]._id,property:code_prop[household[j].Code],name:`${household[j].firstName} ${household[j].lastName} `,unit:household[j],documents:household[j].documents})
          resp=await HouseholdData.updateOne(
            {_id:household[j]._id}, 
            {$set: {'adminEmail':admin[0].email}})
          }
          console.log(resp)
        
          res.send(household_details)
    }
    catch(e){
        console.log("Error")
        console.log(e)
        res.status(400).send({message:"Something went wrong" ,status:404,error:true})
    }
}
// Fetch documents from household Database for Review
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

exports.getFile = async (req, res, next) => {
    // Get the customer Id
    console.log('Get File')
    const mongodb_uri = process.env.DATABASE_CLUSTER
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
    
 
   
};


