const express = require("express");
const router = express.Router();
const createUploader = require("../middleware/upload"); 
const { registerInspectionCompany } = require("../controllers/inspectionCompanyController");

const uploader = createUploader("incorporationCertificates");


router.post("/register", uploader.single("certificatesOfCompanyFile"), registerInspectionCompany);

module.exports = router;
