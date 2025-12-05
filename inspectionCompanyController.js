const InspectionCompany = require("../models/InspectionCompany/inspectionCompanyModel");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

exports.registerInspectionCompany = async (req, res) => {
  try {
    const {
      companyName,
      phoneNumber,
      firstName,
      lastName,
      mobileNumber,
      companyEmail,
      password,
      publishRequirements,
      licenseNumber,
      websiteUrl,
      certificates,
    } = req.body;

    if (
      !companyName ||
      !phoneNumber ||
      !firstName ||
      !lastName ||
      !mobileNumber ||
      !companyEmail ||
      !password
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    const parsedCertificates =
      typeof certificates === "string"
        ? JSON.parse(certificates)
        : certificates;

    if (
      !Array.isArray(parsedCertificates) ||
      parsedCertificates.length < 1 ||
      parsedCertificates.length > 5
    ) {
      return res
        .status(400)
        .json({ error: "Please select between 1 and 5 certificates." });
    }

    const existingCompany = await InspectionCompany.findOne({
      companyEmail: companyEmail.toLowerCase(),
    });
    if (existingCompany) {
      return res
        .status(400)
        .json({ error: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let fileUrl;
    if (req.files && req.files.incorporationCertificateFile) {
      const file = req.files.incorporationCertificateFile;
      const uploadDir = path.join(__dirname, "../../public/uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      await file.mv(filePath);

      fileUrl = `/uploads/${fileName}`;
    }

    const newCompany = await InspectionCompany.create({
      role: "inspection_company",
      companyName,
      phoneNumber,
      firstName,
      lastName,
      mobileNumber,
      companyEmail: companyEmail.toLowerCase(),
      passwordHash: hashedPassword,
      publishRequirements:
        publishRequirements === "true" || publishRequirements === true,
      licenseNumber: licenseNumber || undefined,
      websiteUrl: websiteUrl || undefined,
      incorporationCertificateFileUrl: fileUrl,
      certificates: parsedCertificates,
    });

    // ✅ 7. Send success response
    res.status(201).json({
      message: "Inspection company registered successfully!",
      company: newCompany,
    });
  } catch (error) {
    console.error("Error in registerInspectionCompany:", error);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ error: messages.join(", ") });
    }

    // Handle Mongo duplicate key
    if (error.code === 11000) {
      const key = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .json({ error: `Duplicate ${key}: ${error.keyValue[key]}` });
    }

    // General server error
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
