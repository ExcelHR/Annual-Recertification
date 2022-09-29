const mongoose = require("mongoose")
const User = require("../models/User")
const Admin=require("../models/Admin")
const Customer = require("../models/Customer")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const AppError = require("../utils/appError")
const Household=require('../models/Household')
const userCredentials=require('../models/userCredentials')
const HouseholdData=require('../models/HouseholdData')

var nodeoutlook = require('nodejs-nodemailer-outlook')// const router=Router();

const DocsName={doc_0:"Most recent Tax Papers",doc_1:"Weekly paystub 1",doc_2:"Weekly paystub 2",doc_3:"Weekly paystub 3",doc_4:"Weekly paystub 4",doc_5:"Weekly paystub 5",doc_6:"Weekly paystub 6",doc_7:"Weekly paystub 7",doc_8:"Weekly paystub 8",doc_9:"Weekly paystub 9",doc_10:"Weekly paystub 10",doc_11:"Weekly paystub 11",doc_12:"Weekly paystub 12",doc_13:"Weekly paystub 13",doc_14:"Weekly paystub 14",doc_15:"Bi-Weekly paystub 1",doc_16:"Bi-Weekly paystub 2",doc_17:"Bi-Weekly paystub 3",doc_18:"Bi-Weekly paystub 4",doc_19:"Bi-Weekly paystub 5",doc_20:"Bi-Weekly paystub 6",doc_21:"Bi-Weekly paystub 7",doc_22:"Semi Monthly paystub 1",doc_23:"Semi Monthly paystub 2",doc_24:"Semi Monthly paystub 3",doc_25:"Semi Monthly paystub 4",doc_26:"Semi Monthly paystub 5",doc_27:"Semi Monthly paystub 6",doc_28:"Monthly paystub 1",doc_29:"Monthly paystub 2",doc_30:"Monthly paystub 3",doc_31:"TR 113 - Notorized Copy",doc_32:"Most current Award Letter",doc_33:"Most current Award Letter",doc_35:"Most current Award Letter",doc_36:"Most current Award Letter",doc_37:"Most current Award Letter",doc_38:"Most current Award Letter",doc_39:"Court Order for Child Support payments",doc_40:"Parental Agreement for Child Support",doc_41:"Court Order for Alimony or Spousal Support",doc_42:"Court Order for Alimony or Spousal Support",doc_43:"Annual Statement",doc_44:"3 months of rent receipts & Property Tax papers",doc_45:"Financial Aid Award Letter",doc_46:"ATM Balance Slip",doc_47:"Last six months of Bank statements",doc_48:"Most current Savings Account  Statement (1 month only)",doc_49:"Printout of Current Balance",doc_50:"Revocable trust statements  from bank (6 months)",doc_51:"Property Tax Papers  (most current year) ",doc_52:"Crypto statements (6 months)",doc_53:"Stock, Bond, Treasury bills  statements (6 months)",doc_54:"Copy of Insurance & Surrender Value statement",doc_55:"Most current CD Statement (1 month)  ",doc_56:"Most current Money Mkt statement (1 month)",doc_57:"Most current statement of IRA, 401K",doc_58:"Lumpsum pension, or Keogh A/c",doc_59:"Document showing sale of asset",}


// Create a JWT token
const signToken = id =>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


// Utility function to validate a JWT token
const verifyToken = async token => {
    return (jwt.verify)(token,process.env.JWT_SECRET_KEY)
}

// Function: Protection controller: To restrict controller to specific routes and not allow
// administration logic. Allows authorized access to administrators of the system.
exports.restrictTo = ({role})=>{
    return (async(req,res,next)=>{
        if(role=="admin"){
            next()
        }
        return new AppError("Unauthorized access. Access restricted to administration only.",400)

    })
}


// Function: Checks if the request comes form a valid authenticated user.
exports.protect = async(req,res,next)=>{
    const {authorization} = req.headers
    // Get the JWT token
    let token;
    if(authorization && authorization.startsWith("Bearer")){
        token = authorization.split(' ')[1]
    }
    // If no JWT token, redirect the user to login again
    if(!token){
        return new AppError("Use not logged in. Please login and retry.",400)
    }
    
    const decoded = await verifyToken(token)
    // Find the user based on JWT token if no user found, throw error
    const user = await User.findById(decoded.id)
   

    if(!user){
        return new AppError("No user found. Please login and retry.",400)
    }
    next()
}

// Renders login page
exports.login= async(req,res,next)=>{
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    console.log("backend")
    const {userName,password} =req.body
    console.log(req.body)

    let user = await userCredentials.findOne({userId:userName})
    console.log(user)
    if (!user ){
            console.log("No user found")
            return next(new AppError("No user with this username exists.",400))
    }
    console.log(user.Password)
    let match = await bcrypt.compare(password,user.Password)
    if(user.Password!=password){
        return next(new AppError("Password incorrect. Please enter the correct password",400))
    }
    res.send(user)
};


// Validates login information, assigns a JWT token if successfull and redirects to customer homepage.
exports.postLogin= async (req,res,next)=>{
    // Take email and password from the request body (frontend)
    const {email,password} =req.body
    // Check if either email or password does not exist, if not throw an error
  
    // Check if the user exists, if not throw an error
    let user = await User.findOne({email})
    if (!user){
        return next(new AppError("No user with this username exists.",400))
    }
    // match the passwords using bcrypt if they do not match throw an error
    let match = await bcrypt.compare(password,user.password)
    if(!match){
        return next(new AppError("Password incorrect. Please enter the correct password",400))
    }
    // If they match, assign a JWT token to authenticate on future requests
    const token = signToken(user.id)
    req.session.email = user.email
    let role=user.role
    let matchingId = user.id
    // See if the user is of type customer, if yes assign it it's collection id
    if(role=="customer"){
        const customer = await Customer.findOne({userId:user.id},{id:1})
        matchingId = customer.id
    }
    return res.status(200).json({
        status:"success",
        role,
        token,
        matchingId
    })
};

// Render the forgot password page on the frontend

// Render the change password page on the frontend
exports.forgotPassword=async(req,res,next)=>{
    res.render("forgot_password")
}

exports.changePassword=async(req,res,next)=>{
    res.render("change_password")
}

exports.validateEmail=async(req,res,next)=>{
    console.log("validateEmail")
    const email=req.query.email
    console.log(email)
    resp=await HouseholdData.findOne({email})
    console.log(resp)
    if(resp){
        console.log(resp)
        res.send({status:"Success",userId:resp.userId})
    }
    else{
        res.send("Failure")
    }

    
}

exports.updatePassword=async(req,res,next)=>{
    console.log("updatePassword")
    console.log(req.body)
    const {userId,password}=req.body
    console.log(password)
    resp2=await userCredentials.updateOne(
        {userId}, 
        {$set: {'Password':password}})
        console.log(resp2)
        if(resp2.ok!=0){
            res.send("Success")
        }
}
exports.validateOldpassword=async(req,res,next)=>{
    console.log("validateOldpassword")
    const {userId,password,newPassword}=req.body
    console.log(userId,password,newPassword)
    
    const userDetails= await userCredentials.findOne({userId})
    console.log(userDetails.Password)
    if (password==userDetails.Password ){
        resp=await userCredentials.updateOne(
            {userId}, 
            {$set: {'Password':newPassword}})
            console.log(resp)
            const userDetails= await userCredentials.findOne({userId})
            resp2=await userCredentials.updateOne  (
                {userId}, 
                {$set: {'changePwd':true}})
                console.log("resp2")
                console.log(resp2)
    console.log(userDetails)
    
            if(resp.nModified){
                
                res.send({code:userDetails.Code,unitNo:userDetails.UnitNo,householdName:`${userDetails.firstName} ${userDetails.lastName }`})
            }
    }
    else{
        res.send("Error")
    }

}

exports.saveContactDetails=async(req,res,next)=>{
    console.log("saveContactDetails")
    const {userId,email,phoneNumber}=req.body
    console.log(userId,email,phoneNumber)
    
    resp=await HouseholdData.updateMany  (
        {userId}, 
        {$set: {'email':email,"phoneNumber":phoneNumber}})        
       console.log(resp)
            resp2=await userCredentials.updateMany  (
                {userId}, 
                {$set: {'contactDetails':true}})
                console.log("resp2")
                console.log(resp2)
    
            if(resp2.ok){
                
                res.send("Saved")
            }
    
 

}
// Function: Sets up a new password for a user
exports.postForgotPassword = async(req,res,next)=>{
    // Get the email ID and new password from request body
    const {email,newPassword} = req.body
    // Check if a user with such email ID exists if no, throw an error
    let user = await User.findOne({email})
    if(!user){
        return next(new AppError("No user found. Check your email.",400))
    }
    // Hash the new password
    let hashedPassword = await bcrypt.hash(newPassword,12)
    // Update the new password of the user in the database
    await User.findOneAndUpdate({email},{password:hashedPassword}).lean().exec()
    return res.status(200).json({
        status:"success"
    })
};


// Function: Creates an admin user explicitly
exports.postCreateAdmin = async(req,res,next)=>{
    // Take the user-entered email ID and password from the request body
    const {email,password} = req.body
    // Hash the password
    let hashedPassword = await bcrypt.hash(password,parseInt(process.env.BCRYPT_SALT))
    // Create an admin user
    await User.create({
        email,
        password:hashedPassword,
        role:"admin"
    })
    return res.status(200).json({
        status:"success"
    })
};
exports.user_dashboard = async(req,res,next)=>{
    res.render('user_dashboard')
}

exports.addNewTenant = async(req,res,next)=>{
    console.log("addNewTenant")
    res.render('add_Tenant')
}

exports.contact_details = async(req,res,next)=>{
    res.render('contact_details')
}

exports.upload_documents = async(req,res,next)=>{
    res.render('documents_upload')
}

exports.storeDocuments =async(req,res,next)=>{
    console.log("storeDocuments")
    console.log(req.files)
    res.send({file:req.files})
}

exports.updateDocumentsData =async(req,res,next)=>{
    console.log("updateDocumentsData")
    console.log(req.body)
    _id=req.query.id
    document=req.body
    console.log(_id)
    const household=await HouseholdData.find({_id})
    console.log(household)
    console.log(household[0].email)
        const docInd=document.originalName.slice(-1)-1
        console.log(docInd)
        const oldDoc=household[0].documents
        console.log(oldDoc)
        const updatedDoc=[]
        oldDoc.forEach(doc=>{
                if (doc.originalName==document.originalName){
                        updatedDoc.push(document)
                }
                else{
                    updatedDoc.push(doc)
                }
               
        })
        console.log(updatedDoc)
        resp=await HouseholdData.updateOne(
            {_id}, 
            {$set: {'documents':updatedDoc}})
            console.log(resp)
            
            this.sendEmail(household[0].email,`Thank you for uploading ${DocsName[document.originalName]} of ${household[0].firstName} ${household[0].lastName}. We will review it as soon as we can.`,"Document sucessfully reuploaded on the portal")
            this.sendEmail(household[0].adminEmail ,`${household[0].firstName} ${household[0].lastName} of property ${household[0].Property}, unit number ${household[0].UnitNo} has submitted the document ${DocsName[document.originalName]}. You can login to the admin portal and review this document by clicking on the following link http://localhost:8000/admin/login `,`Document reuploaded by tenant of unit no ${household[0].UnitNo} for review`)
            res.send("Document Reuploaded")
    }

exports.reuploadDocuments =async(req,res,next)=>{
    console.log("reuploadDocuments")
    let files=Object.keys(req.files)
    const householdId=req.query.id
    console.log(householdId)
    res.send({file:req.files})
//   const household=await Household.find({_id:householdId})
//     console.log(household)
//    console.log(documents)
//    const docInd=documents.originalName.splice(-1)
//    console.log(docInfo)
//    const oldDoc=household.

}
exports.getTenantsDetails =async(req,res,next)=>{
    console.log("getTenantsDetails")
    const tenantsDetails=await HouseholdData.find({userId:req.query.id})
    console.log(req.query.id)
    console.log(tenantsDetails)
    if (tenantsDetails){
        res.send(tenantsDetails)
    }
    else{
        res.send("Error")
    }
}
exports.addProperty =async(req,res,next)=>{
    console.log("addProperty")
    console.log(req.body)
    userId=req .body.id
    property=req.body.Property
    resp=await HouseholdData.updateMany  (
        {userId:userId}, 
        {$set: {'Property':property}})
    console.log(resp)
    res.send(resp)
}

exports.saveTenantDetails =async(req,res,next)=>{
    console.log("saveTenantDetails")
    console.log(req.body)
    userId=req .body.userId
    firstName=req.body.fname
    lastName=req.body.lname
    age=req.body.age
    student=req.body.student
    resp=await HouseholdData.find ({userId:userId})
    resp2=await HouseholdData.find()
    Sr_No=resp2.length+1
    console.log(resp)
    tenant=resp[0]
    if(age<=18){
        adultMinor="Minor"
    }
    else{
        adultMinor="Adult"
    }
    newTenant={}
    newTenant["firstName"]=firstName
    newTenant["lastName"]=lastName
    newTenant["Age"]=age
    newTenant["Student"]=student
    newTenant["Sr_No"]=Sr_No
    newTenant["AdultMinor"]=adultMinor
    newTenant["UnitNo"]=tenant.UnitNo
    newTenant["userId"]=tenant.userId
    newTenant["Relation"]="Dependent"
    newTenant["FamilySize"]=tenant.FamilySize+1
    newTenant["CertificationDate"]=tenant.CertificationDate
    newTenant["RecertificationDate"]=tenant.RecertificationDate
    newTenant["Code"]=tenant.Code
    console.log(newTenant)
    resp3=await HouseholdData.create(newTenant)
    console.log(resp3)
    res.send(resp3)
}
exports.saveDetails =async(req,res,next)=>{
    console.log("Save Details")
    console.log(req.body)
    tenantId=req.body.tenantId
    document=req.body.document
    updatedDoc=[]
    tenant=await HouseholdData.findOne({_id:tenantId})
    console.log(tenant)
    if(tenant.documents.length==0){
        updatedDoc.push(document)
        console.log(updatedDoc)
    }
    else{
    oldDoc=tenant.documents
    let dupDoc=false
    tenant.documents.forEach(doc=>{
        if (doc.originalName==document.originalName){
            dupDoc=true
        }
    })
    if(!dupDoc){
    oldDoc.push(document)
    updatedDoc=oldDoc
    }
    else{
        res.send("Document Already uploaded")
        return
    }
    }
    resp=await HouseholdData.updateOne(
        {_id:tenantId}, 
        {$set: {'documents':updatedDoc}})
        console.log(resp)
        if (resp){
            console.log("Data Saved")
           this.sendEmail(tenant.email,`Thank you for uploading ${DocsName[document.originalName]} of ${tenant.firstName} ${tenant.lastName}. We will review it as soon as we can.`,"Document Uploaded Sucessfully")
           this.sendEmail(tenant.adminEmail ,`${tenant.firstName} ${tenant.lastName} of property ${tenant.Property}, unit number ${tenant.UnitNo} has submitted the document ${DocsName[document.originalName]}. You can login to the admin portal and review this document using the following link using the following link http://localhost:8000/admin/login`,`Document uploaded by tenant of unit no ${tenant.UnitNo} for review`)

            res.send(resp)
        }
        else{
            res.send({error:"Unsuccessful"})
        }
    
}
exports.sendEmail=async(receiver,text,subject)=>{
    console.log("sendEmail")
    nodeoutlook.sendEmail({
        auth: {
            user: "intern@excelresidential.com",
            pass: "##Excel$$1234"
        },
        from: 'intern@excelresidential.com',
        to: receiver,
        subject:subject,
        replyTo: 'intern@excelresidential.com',
        text: text,
        onError: (e) => console.log(e),
onSuccess: (i) => console.log("Email Sent")
      });
}
exports.updateVerificationStatus =async(req,res,next)=>{
    
    console.log("updateVerificationStatus ")
    docInfo=req.body
    console.log(JSON.stringify(docInfo))
    try{
    resp=await HouseholdData.find({_id:docInfo.userId})
    console.log(resp)
    const documents=resp[0].documents
    let ind;
    documents.forEach(doc=>{
        if(doc.originalName==docInfo.originalName){
            ind=documents.indexOf(doc)
        }
    })
    console.log(ind)
    if(docInfo.verificationStatus=="Rejected"){
        documents[ind]["verificationStatus"]="Rejected"
        documents[ind]["comment"]=docInfo.comment
    this.sendEmail(resp[0].email,`The  document  ${DocsName[documents[ind].originalName]} of ${resp[0].firstName} ${resp[0].lastName} has been ${docInfo.verificationStatus}. Please login to the web portal and reuplod the document using the following link http://localhost:8000 .`,"Document status updated")
    this.sendEmail(resp[0].adminEmail,`You have ${docInfo.verificationStatus} the  document  ${DocsName[documents[ind].originalName]} of ${resp[0].firstName} ${resp[0].lastName}`, `Document  status  updated (unit no ${resp[0].UnitNo})`)

    }
    if(docInfo.verificationStatus=="Approved"){
        documents[ind]["verificationStatus"]="Approved"
        documents[ind]["comment"]="This document is good to go !!"
    this.sendEmail(resp[0].email,`The  document  ${DocsName[documents[ind].originalName]} of ${resp[0].firstName} ${resp[0].lastName} has been ${docInfo.verificationStatus}. Please login to check the status of your document. using the following link http://localhost:8000`,"Document status updated")
    this.sendEmail(resp[0].adminEmail,`You have ${docInfo.verificationStatus} the  document  ${DocsName[documents[ind].originalName]} of ${resp[0].firstName} ${resp[0].lastName}`, `Document  status  updated (unit no ${resp[0].UnitNo})`)


    }
    console.log(documents)
    resp=await HouseholdData.updateOne(
        {_id: docInfo.userId}, 
        {$set: {'documents':documents}})
        console.log(resp)
    res.send("Status Updated")
    


    
    }
    catch(e){
        console.log(e)
    res.send(e)

    }
    }
    exports.getVerifiedDocuments =async(req,res,next)=>{
       console.log("getVerifiedDocuments")
       const userId=req.query.id
       console.log(userId)
       try{
       docs=await HouseholdData.find({userId})
       console.log(docs)
       res.send(docs)
       }
       catch(e){
        res.send(e)
       }
    }
