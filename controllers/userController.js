const mongoose = require("mongoose")
const User = require("../models/User")
const Admin=require("../models/Admin")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const AppError = require("../utils/appError")
const userCredentials=require('../models/userCredentials')
const HouseholdData=require('../models/HouseholdData')
const Property=require('../models/Property')

var nodeoutlook = require('nodejs-nodemailer-outlook')// const router=Router();

const DocsName={doc_0:"Most recent Tax Papers",doc_1:"Weekly paystub 1",doc_2:"Weekly paystub 2",doc_3:"Weekly paystub 3",doc_4:"Weekly paystub 4",doc_5:"Weekly paystub 5",doc_6:"Weekly paystub 6",doc_7:"Weekly paystub 7",doc_8:"Weekly paystub 8",doc_9:"Weekly paystub 9",doc_10:"Weekly paystub 10",doc_11:"Weekly paystub 11",doc_12:"Weekly paystub 12",doc_13:"Weekly paystub 13",doc_14:"Weekly paystub 14",doc_15:"Bi-Weekly paystub 1",doc_16:"Bi-Weekly paystub 2",doc_17:"Bi-Weekly paystub 3",doc_18:"Bi-Weekly paystub 4",doc_19:"Bi-Weekly paystub 5",doc_20:"Bi-Weekly paystub 6",doc_21:"Bi-Weekly paystub 7",doc_22:"Semi Monthly paystub 1",doc_23:"Semi Monthly paystub 2",doc_24:"Semi Monthly paystub 3",doc_25:"Semi Monthly paystub 4",doc_26:"Semi Monthly paystub 5",doc_27:"Semi Monthly paystub 6",doc_28:"Monthly paystub 1",doc_29:"Monthly paystub 2",doc_30:"Monthly paystub 3",doc_31:"TR 113 - Notorized Copy",doc_32:"Most current Award Letter",doc_33:"Most current Award Letter",doc_35:"Most current Award Letter",doc_36:"Most current Award Letter",doc_37:"Most current Award Letter",doc_38:"Most current Award Letter",doc_39:"Court Order for Child Support payments",doc_40:"Parental Agreement for Child Support",doc_41:"Court Order for Alimony or Spousal Support",doc_42:"Court Order for Alimony or Spousal Support",doc_43:"Annual Statement",doc_44:"3 months of rent receipts & Property Tax papers",doc_45:"Financial Aid Award Letter",doc_46:"ATM Balance Slip",doc_47:"Last six months of Bank statements",doc_48:"Most current Savings Account  Statement (1 month only)",doc_49:"Printout of Current Balance",doc_50:"Revocable trust statements  from bank (6 months)",doc_51:"Property Tax Papers  (most current year) ",doc_52:"Crypto statements (6 months)",doc_53:"Stock, Bond, Treasury bills  statements (6 months)",doc_54:"Copy of Insurance & Surrender Value statement",doc_55:"Most current CD Statement (1 month)  ",doc_56:"Most current Money Mkt statement (1 month)",doc_57:"Most current statement of IRA, 401K",doc_58:"Lumpsum pension, or Keogh A/c",doc_59:"Document showing sale of asset",}



// Renders login page and validates the tenant
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




// Forgot Password 
exports.forgotPassword=async(req,res,next)=>{
    res.render("forgot_password")
}
// Renders Forced change password page
exports.changePassword=async(req,res,next)=>{
    res.render("change_password")
}

// Validate Email
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

//Updates the password
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

//Validate old password, if true and only then updates the password
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

//Saves contact details
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



// Renders user Dashboard
exports.user_dashboard = async(req,res,next)=>{
    res.render('user_dashboard')
}


// Renders Contact Details
exports.contact_details = async(req,res,next)=>{
    res.render('contact_details')
}

// Renders Upload Document Page
exports.upload_documents = async(req,res,next)=>{
    res.render('documents_upload')
}
//Fetches Property Based on Code
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
//Stores Document in the Database
exports.storeDocuments =async(req,res,next)=>{
    console.log("storeDocuments")
    console.log(req.files)
    res.send({file:req.files})
}

//Saves documents in tenant Database
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
//Reuploads user Documents
exports.reuploadDocuments =async(req,res,next)=>{
    console.log("reuploadDocuments")
    let files=Object.keys(req.files)
    const householdId=req.query.id
    console.log(householdId)
    res.send({file:req.files})


}

//Fetch Tenant Details
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

//Add Property to Tenant Database
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
// Saves Tenant Details to Tenant Database

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
       
            res.send(resp)
        }
        else{
            res.send({error:"Unsuccessful"})
        }
    
}

//Sends Email to tenant and CS
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

// Updates document status after validation by CS
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

    }
    if(docInfo.verificationStatus=="Approved"){
        documents[ind]["verificationStatus"]="Approved"
        documents[ind]["comment"]="This document is good to go !!"
    this.sendEmail(resp[0].email,`The  document  ${DocsName[documents[ind].originalName]} of ${resp[0].firstName} ${resp[0].lastName} has been ${docInfo.verificationStatus}. Please login to check the status of your document. using the following link http://localhost:8000`,"Document status updated")


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

    //Fetch Verified Docs
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
