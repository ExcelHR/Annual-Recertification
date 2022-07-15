const express=require("express");
// const router=Router();
app=express()
const authController=require("../controllers/authController")

// Handler for - "/login"
app.route("/login")
    .post(authController.login)

// Handler for - "/createAdmin"
app.route("/createAdmin")
    .post(authController.postCreateAdmin)

// Handler for - "/forgot-password"
app.route("/forgot-password")
.get(authController.forgotPassword)

app.route("/change-password")
.get(authController.changePassword)

module.exports=app;