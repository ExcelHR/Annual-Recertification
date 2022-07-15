// const {Schema} = require("mongoose")
// const path = require("path")
// const multer = require("multer")
// const Customer = require("../models/Customer")
// const AppError = require("../utils/appError")
// const {deleteFiles} = require("../utils/fileUtil")



// exports.getHomepage = async(req,res,next)=>{
//     res.render("datapdf")
// };
// // Function: Fetches the user uploaded rental documents
// exports.getRentalDocuments = async(req,res,next)=>{
//     const {customerId} = req.params
//     // Find the customer based on customer Id, if no customer found throw error
//     let customer = await Customer.findOne({_id: customerId})        
//     if(!customer){
//         return next(new AppError("Customer not found", 400))
//     }
// };
