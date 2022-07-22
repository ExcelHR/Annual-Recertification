// Global modules
const path=require("path")
var cors = require('cors')
const methodOverride=require('method-override')

// Custom modules
const express=require("express")
const mongoose=require("mongoose")
// Using env file to setup working environment variable
const env = require("dotenv")
const session = require("express-session")
const {configDB} = require("./utils/start")

env.config({path: `./config.env`})

// Authentication routes(logic)
const userRoutes = require("./routes/userRoutes")
// Admin user routes(logic)
const adminRoutes = require("./routes/adminRoutes")
// Customer routes(logic)
const customerRoutes = require("./routes/customerRoutes")
// Application routes(logic)
const registrationRoutes = require("./routes/registrationRoutes")
// Global error routes(logic)
const globalErrorController = require("./controllers/errorController")
const  Grid  = require("gridfs-stream")



const mongodb_uri=process.env.DATABASE_LOCAL
const port=process.env.PORT

const app=express();
(async()=>{
    try{
        // Make a database connection
        await mongoose.connect(mongodb_uri)
        console.log(" Database connection successfull!")
        // Create an admin user if not present
        await configDB()
        const conn=mongoose.createConnection(mongodb_uri)
        let gfs
        conn.once('open',()=>{
            console.log("DB is opened")
            gfs=Grid(conn.db,mongoose.mongo)
            gfs.collection('Documents')
        })
    }catch(error){
        console.log(error)
    }
})()
// app.use(cors())
// Use json for parsing
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
// Use protected folder to store static file
app.use('/protected', express.static('protected'))


app.use(methodOverride('_method'))

// Use ejs for frontend views
app.set("view engine","ejs")
// Set frontend views path
app.set("views",path.join(__dirname,"views"))

//Create Storage Engine

// session
app.use(session(
    {
        secret:'secret key',
        resave: true,
        saveUninitialized: true,

    }
))

// Render the portal landing page
app.get("/",function(req,res,next){
    res.render('index')
});

// Routing to appropriate routers(logic)
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)
app.use("/customer",customerRoutes)
app.use("/register",registrationRoutes)
app.use(globalErrorController.error)
app.use(globalErrorController.pageNotFound)
// App listens on a given port
app.listen(port)