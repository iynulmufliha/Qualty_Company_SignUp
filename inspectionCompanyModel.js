const mongoose = require("mongoose");

// ✅ Define the schema cleanly
const inspectionCompanySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["inspection_company"],
      default: "inspection_company",
      required: true,
    },

    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },

    companyEmail: {
      type: String,
      required: [true, "Company email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
      set: (v) => v.trim().toLowerCase(),
    },

    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },

    publishRequirements: {
      type: Boolean,
      default: false,
    },

    licenseNumber: {
      type: String,
      trim: true,
    },

    websiteUrl: {
      type: String,
      trim: true,
    },

    incorporationCertificateFileUrl: {
      type: String,
      trim: true,
    },

    certificates: {
      type: [String],
      validate: {
        validator: (v) => Array.isArray(v) && v.length >= 1 && v.length <= 5,
        message: "Select between 1 and 5 certificates",
      },
    },
  },
  { timestamps: true }
);


inspectionCompanySchema.index({ companyEmail: 1 }, { unique: true });


inspectionCompanySchema.pre("save", function (next) {
  if (this.companyEmail) {
    this.companyEmail = this.companyEmail.trim().toLowerCase();
  }
  next();
});


const InspectionCompany =
  mongoose.models.InspectionCompany ||
  mongoose.model("InspectionCompany", inspectionCompanySchema);

module.exports = InspectionCompany;
