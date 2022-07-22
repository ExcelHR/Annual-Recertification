const {Router} = require("express")
const router = Router()

const userController = require("../controllers/userController")
const adminController = require("../controllers/adminController")

/*** EJS Router ***/
router.route("/login")
    .get(adminController.login)

    router.route("/loginValidation")
    .post(adminController.loginValidation)
    router.route("/dashboard")
    .get(adminController.admin_dashboard)
    
// Renders all customers page
router.get("/showAllCustomers", (req,res)=>{
    res.render('customers.ejs')
})

// Renders specific customer's page
router.get("/showCustomer/:customerId",(req,res)=>{
    res.render("customer",{customerId:req.params.customerId})
})

// router.get("/editCustomer/:customerId",(req,res)=>{
//     res.render("edit-customer",{customerId:req.params.customerId})
// })

// Handler for - "/editcustomer/{specific customer ID(number)}"
router.get("/editCustomer/:customerId",adminController.getShowEditCustomerPage)

// Handler for - "/dashboard"
router.route("/dashboard")
    .get( adminController.getDashboard)

// Handler for - "/addProperty"
router.route("/addProperty")
    .get(adminController.getAddProperty)
    .post(userController.protect, adminController.postAddProperty)

// Handler for - "/allCustomers"
router.route("/allCustomers")
    .get(adminController.getAllCustomers)
    // .post(userController.protect, adminController.postAddProperty)

// Handler for - "/customer/{specific customer ID(number)}"
router.route("/customer/:customerId")
    .get(adminController.getCustomer)
    .patch(adminController.updateCustomer)
    .delete(adminController.deleteCustomer)

// Handler for - "/customer/{specific customer ID(number)}/setState - Sets verification staus"
router.route("/customer/:customerId/setState")
    .post(adminController.postSetState)

// Handler for - "/customer/{specific customer ID(number)}/comments - Inserts comments on a user specific rental documents"
router.route("/customer/:customerId/comments")
    .post(adminController.postComments)

// Handler for - "/customer/{specific customer ID(number)}/viewed - Sets status on admin viewed documents"
router.route("/customer/:customerId/viewed")
    .post(adminController.postViewed)
    
module.exports = router