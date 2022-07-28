const mongoose = require("mongoose")
const User = require("../models/User")
const Admin=require("../models/Admin")
const Customer = require("../models/Customer")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const AppError = require("../utils/appError")
const Household=require('../models/Household')


// const router=Router();



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
    const {email,password} =req.body
    console.log(req.body)
    let hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT))

    let user = await User.findOne({email})
    
    if (!user ){
            console.log("No user found")
            return next(new AppError("No user with this username exists.",400))
    }
    let match = await bcrypt.compare(password,user.password)
    if(!match){
        return next(new AppError("Password incorrect. Please enter the correct password",400))
    }
    res.send({userId:user._id})
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
exports.forgotPassword = async (req,res,next)=>{
    res.render("forgot_password")
}
// Render the change password page on the frontend
exports.changePassword=async(req,res,next)=>{
    res.render("change_password")
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

exports.upload_documents = async(req,res,next)=>{
    res.render('documents_upload')
}

exports.storeDocuments =async(req,res,next)=>{
    console.log(req.body)
    console.log(req.files)
    res.send({file:req.files})
}

exports.updateDocumentsData =async(req,res,next)=>{
    console.log(req.body)
    _id=req.query.id
    document=req.body
    console.log(_id)
    const household=await Household.find({_id})
        console.log(household)
        const docInd=document.originalName.slice(-1)-1
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
        resp=await Household.updateOne(
            {_id}, 
            {$set: {'documents':updatedDoc}})
            console.log(resp)
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
exports.saveDetails =async(req,res,next)=>{
    
    console.log("Save Details")
    userData=req.body
    console.log(JSON.stringify(userData))
    let household=new Household(userData)
    resp=await household.save()
    console.log(resp)
        if (resp){
            console.log("Data Saved")
            res.send(resp)
        }
        else{
            res.send({error:"Unsuccessful"})
        }
    
    res.send()
}

exports.updateVerificationStatus =async(req,res,next)=>{
    
    console.log("updateVerificationStatus ")
    docInfo=req.body
    console.log(JSON.stringify(docInfo))
    try{
    resp=await Household.find({_id:docInfo.userId})
    const documents=resp[0].documents
    docInd=docInfo.originalName.slice(-1)
    if(docInfo.verificationStatus=="Rejected"){
        documents[docInd-1]["verificationStatus"]="Rejected"
        documents[docInd-1]["comment"]=docInfo.comment
    }
    if(docInfo.verificationStatus=="Approved"){
        documents[docInd-1]["verificationStatus"]="Approved"
        documents[docInd-1]["comment"]="This document is good to go !!"
    }
    console.log(documents)
    resp=await Household.updateOne(
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
       docs=await Household.find({userId})
       console.log(docs)
       res.send(docs)
       }
       catch(e){
        res.send(e)
       }
    }
