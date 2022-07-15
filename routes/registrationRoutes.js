const { Router } = require("express")
const router = Router()

const registrationController = require("../controllers/registrationController")
// Handler for "/SelectProperty/"
router.route("/SelectProperty")
    .get(registrationController.showRegistrationPage)

// Handler for "/getProperty/" that fetches ZIP codes of properties
router.route("/getProperty")
    .get(registrationController.getProperty)

// Handler for "/fetchProperty/" that fetches the property names based on ZIP code selected
router.route("/fetchCity")
    .get(registrationController.fetchCity)

router.route("/fetchZip")
    .get(registrationController.fetchZip)
router.route("/fetchProperty")
    .get(registrationController.fetchProperty)

// Handler for "/visitInfo/" that renders the first page of registration
router.route("/userDetails")
    .get(registrationController.userDetails)

router.route("/applicantPersonalInfo")
    .get(registrationController.applicantInfo)
router.route("/coapplicant_1_personalInfo")
    .get(registrationController.copplicantInfo)
router.route("/coapplicant_2_personalInfo")
    .get(registrationController.copplicant_2_Info)
router.route("/getAddresss")
    .get(registrationController.getAddresss)

module.exports = router