const {Schema} = require("mongoose")
const path = require("path")
const multer = require("multer")
const Customer = require("../models/Customer")
const AppError = require("../utils/appError")
const {deleteFiles} = require("../utils/fileUtil")


//pdf
var pdf = require("pdf-creator-node");
var fs = require("fs");

// Render the customer homepage
exports.getHomepage = async(req,res,next)=>{
    res.render("homepage")
};

// Function: Fetches the user uploaded rental documents
exports.getRentalDocuments = async(req,res,next)=>{
    const {customerId} = req.params
    // Find the customer based on customer Id, if no customer found throw error
    let customer = await Customer.findOne({_id: customerId})        
    if(!customer){
        return next(new AppError("Customer not found", 400))
    }
    // Customer is found. Reurn the customer uploaded rental documents.
    if(customer.files){
        return res.status(200).json({
            status:"success",
            data: customer.files
        })
    }
    return res.status(200).json({
        status: "success",
        data:{}
    })    
};

// Function: Utility function for uploading rental documents for the system.
const uploadRentalDocuments = ({destination}) =>{
    const multerStorage = multer.diskStorage({
        // Set document storage location
        destination,
        // Insert the file with a randomized file name to avoid clashes
        filename: function(req, file,cb){
            let fileExtension = path.extname(file.originalname)
            cb(null, Date.now()+fileExtension)
        }
    });
    // Verify if the uploaded documents are Pdfs
    const multerFilter = (req,file,cb) => {
        if(file.mimetype.startsWith("application/pdf")){
            cb(null,true)
        }else{
            return next(new AppError("Invalid file format. Please upload PDFs only.",400))
        }
    }
    const upload = multer({
        storage:  multerStorage,
        fileFilter: multerFilter
    })


    return upload.fields([
        {name:"rentalDocument1",maxCount:1},
        {name:"rentalDocument2",maxCount:1},
        {name:"rentalDocument3",maxCount:1},
        {name:"rentalDocument4",maxCount:1},
        {name:"rentalDocument5",maxCount:1},
        {name:"rentalDocument6",maxCount:1},
        {name:"rentalDocument7",maxCount:1},
        {name:"rentalDocument8",maxCount:1},
        {name:"rentalDocument9",maxCount:1},
        {name:"rentalDocument10",maxCount:1},
    ])
};

// Function: Utility controller for uploading rental documents for the system.
exports.documentHandler = uploadRentalDocuments({destination:"protected"})

// Function: Inserts file paths of the uploaded rental documents in the database.
exports.postRentalDocuments = async(req,res,next)=>{
    const {files} = req
    console.log(req)
    // Get the customer Id
    let {customerId}=req.params
    const rentalDocument1 = files?.["rentalDocument1"]?.[0]?.path
    const rentalDocument2 = files?.["rentalDocument2"]?.[0]?.path
    const rentalDocument3 = files?.["rentalDocument3"]?.[0]?.path
    const rentalDocument4 = files?.["rentalDocument4"]?.[0]?.path
    const rentalDocument5 = files?.["rentalDocument5"]?.[0]?.path
    const rentalDocument6 = files?.["rentalDocument6"]?.[0]?.path
    const rentalDocument7 = files?.["rentalDocument7"]?.[0]?.path
    const rentalDocument8 = files?.["rentalDocument8"]?.[0]?.path
    const rentalDocument9 = files?.["rentalDocument9"]?.[0]?.path
    const rentalDocument10 = files?.["rentalDocument10"]?.[0]?.path

    // Insert the customer based on customer Id
    await Customer.updateOne({_id:customerId},
        {
            files:
            {
                rentalDocument1,
                rentalDocument2,
                rentalDocument3,
                rentalDocument4,
                rentalDocument5,
                rentalDocument6,
                rentalDocument7,
                rentalDocument8,
                rentalDocument9,
                rentalDocument10
            },
            newFile:{
                rentalDocument1:true,
                rentalDocument2:true,
                rentalDocument3:true,
                rentalDocument4:true,
                rentalDocument5:true,
                rentalDocument6:true,
                rentalDocument7:true,
                rentalDocument8:true,
                rentalDocument9:true,
                rentalDocument10:true
            },
            uploaded:true
        })

    return res.json({
        status: "success"
    })
};

// Function: Updates the user entered rental documents with new documents
exports.patchRentalDocuments = async(req,res,next)=>{
    const {files} = req
    console.log(files)
    let {customerId}=req.params
    const rentalDocument1 = files?.["rentalDocument1"]?.[0]?.path
    const rentalDocument2 = files?.["rentalDocument2"]?.[0]?.path
    const rentalDocument3 = files?.["rentalDocument3"]?.[0]?.path
    const rentalDocument4 = files?.["rentalDocument4"]?.[0]?.path
    const rentalDocument5 = files?.["rentalDocument5"]?.[0]?.path
    const rentalDocument6 = files?.["rentalDocument6"]?.[0]?.path
    const rentalDocument7 = files?.["rentalDocument7"]?.[0]?.path
    const rentalDocument8 = files?.["rentalDocument8"]?.[0]?.path
    const rentalDocument9 = files?.["rentalDocument9"]?.[0]?.path
    const rentalDocument10 = files?.["rentalDocument10"]?.[0]?.path

    paths=[]

    let customer = await Customer.findOne({_id:customerId})

    // Update the customer uploaded specific rental documents

    if(rentalDocument1){
        paths.push(customer.files.rentalDocument1)
        await Customer.updateOne({_id:customerId},{$set:{"files.rentalDocument1":rentalDocument1,"newFile.rentalDocument1":true}})
    }

    if(rentalDocument2){
        paths.push(customer.files.rentalDocument2)
        await Customer.updateOne({_id:customerId},{$set:{"files.rentalDocument2":rentalDocument2,"newFile.rentalDocument2":true}})
    }   

    if(rentalDocument3){
        paths.push(customer.files.rentalDocument3)
        await Customer.updateOne({_id:customerId},{$set:{"files.rentalDocument3":rentalDocument3,"newFile.rentalDocument3":true}})
    }

    if(rentalDocument4){
        paths.push(customer.files.rentalDocument4)
        await Customer.updateOne({_id:customerId},{$set:{"files.rentalDocument4":rentalDocument4,"newFile.rentalDocument4":true}})
    }

    if(rentalDocument5){
        paths.push(customer.files.rentalDocument5)
        await Customer.updateOne({_id:customerId},{$set:{"files.rentalDocument5":rentalDocument5,"newFile.rentalDocument5":true}})
    }

    if(rentalDocument6){
        paths.push(customer.files.rentalDocument6)
        await Customer.updateOne({_id:customerId},{$set:{"files.rentalDocument6":rentalDocument6,"newFile.rentalDocument6":true}})
    }

    if(rentalDocument7){
        paths.push(customer.files.rentalDocument7)
        await Customer.updateOne({_id:customerId},{$set:{"files.rentalDocument7":rentalDocument7,"newFile.rentalDocument7":true}})
    }

    if(rentalDocument8){
        paths.push(customer.files.rentalDocument8)
        await Customer.updateOne({_id:customerId},{$set:{"files.rentalDocument8":rentalDocument8,"newFile.rentalDocument8":true}})
    }

    if(rentalDocument9){
        paths.push(customer.files.rentalDocument9)
        await Customer.updateOne({_id:customerId},{$set:{"files.rentalDocument9":rentalDocument9,"newFile.rentalDocument9":true}})
    }

    if(rentalDocument10){
        paths.push(customer.files.rentalDocument10)
        await Customer.updateOne({_id:customerId},{$set:{"files.rentalDocument10":rentalDocument10,"newFile.rentalDocument10":true}})
    }

    await deleteFiles(paths)

    return res.json({
        status: "success"
    })
};

// Function: Fetch details of a specific customer based on customer Id
exports.getDetails = async(req,res,next) =>{
    let {customerId} = req.params
    let customer = await Customer.find({_id:customerId}).populate('userId').lean().exec()
    res.status(200).json({
        status:"success",
        data:customer
    })
};