const { Router } = require("express")
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


router.route("/getFile/:filename")
    .get(adminController.getFile)

router.route("/getHouseholdInfo")
    .get(adminController.getHouseholdInfo)
router.route("/showDocuments")
    .get(adminController.showDocuments)
router.route("/getDocuments")
    .get(adminController.getDocuments)

    router.route("/getAdminDetails")
    .get(adminController.getAdminDetails)

    
module.exports = router