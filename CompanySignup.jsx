import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../utils/constants";

const certificateOptions = ["NABL", "NABCB", "COC", "ISO", "FOSFA", "ECTN"];

export default function CompanySignup() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, touchedFields },
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

 
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [certificateSelections, setCertificateSelections] = useState([]);
  const [fileUploads, setFileUploads] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const publishRequirements = watch("publishRequirements", false);

  const filteredCertificates = certificateOptions.filter(
    (cert) =>
      cert.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !certificateSelections.includes(cert)
  );
const onSubmit = async (data) => {
  if (certificateSelections.length < 1) {
    setError("certificatesOfCompany", {
      type: "manual",
      message: "Please select at least one certificate before submitting.",
    });
    return;
  }
  if (certificateSelections.length > 5) {
    setError("certificatesOfCompany", {
      type: "manual",
      message: "You can only select up to 5 certificates.",
    });
    return;
  }

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key !== "certificatesOfCompanyFile") {
      if (typeof value === "boolean") {
        formData.append(key, value.toString());
      } else {
        formData.append(key, value);
      }
    }
  });

  formData.append("role", "inspection_company");
  formData.append("certificates", JSON.stringify(certificateSelections));

  if (fileUploads.certificatesOfCompany) {
    formData.append("certificatesOfCompanyFile", fileUploads.certificatesOfCompany);
  }

  try {
    const fullURL = `${BASE_URL}/inspection-company/register`;

    const response = await fetch(fullURL, {
      method: "POST",
      body: formData, // send FormData directly
      // do NOT set Content-Type header here; browser will set multipart/form-data with boundary
    });

    if (!response.ok) {
      let errorMsg = "Unknown error";
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMsg = errorData.error || JSON.stringify(errorData);
      } else {
        errorMsg = await response.text();
      }
      alert(`Error: ${errorMsg}`);
      return;
    }

    const responseData = await response.json();
    alert("🎉 Your company has been successfully registered!");
  } catch (error) {
    alert("⚠️ Failed to submit form. Please try again later.");
    console.error(error);
  }
};

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowed.includes(file.type)) {
      alert("⚠️ Only PDF, JPG, or PNG files are allowed.");
      e.target.value = null;
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("⚠️ File is too large. Please upload a file under 5MB.");
      e.target.value = null;
      return;
    }
    setFileUploads((prev) => ({ ...prev, [key]: file }));
  };

  const addCertificate = (cert) => {
    if (certificateSelections.includes(cert)) return;
    const updated = [...certificateSelections, cert];
    if (updated.length > 5) {
      setError("certificatesOfCompany", {
        type: "manual",
        message: "You can only select up to 5 certificates.",
      });
      return;
    }
    setCertificateSelections(updated);
    clearErrors("certificatesOfCompany");
    setSearchTerm("");
  };

  const removeCertificate = (cert) => {
    const updated = certificateSelections.filter((c) => c !== cert);
    setCertificateSelections(updated);
    if (updated.length === 0) {
      setError("certificatesOfCompany", {
        type: "manual",
        message: "Please select at least one certificate.",
      });
    } else {
      clearErrors("certificatesOfCompany");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    const strengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (val.length < 8) setPasswordStrength("Weak");
    else if (!strengthRegex.test(val)) setPasswordStrength("Medium");
    else setPasswordStrength("Strong");
  };

  const handleFormKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") {
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      const next = form.elements[index + 1];
      if (next && next.tagName === "INPUT") {
        e.preventDefault();
        next.focus();
      } else if (!next) {
        return;
      } else {
        e.preventDefault();
      }
    }
  };

  const inputClass =
    "w-full border-b-1 border-gray-600 p-2.5 text-sm bg-white focus:outline-none";
  const inputClass1 = "w-full border-b-1 border-gray-600 p-2.5 text-sm focus:outline-none";

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4 py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleFormKeyDown}
        className="w-full max-w-2xl border border-gray-300 bg-white rounded-2xl p-8 shadow-md space-y-4"
        noValidate
      >
        <h2 className="text-2xl font-bold text-center text-black">Company Signup</h2>

        {/* Role */}
        <input
          type="text"
          value="inspection_company"
          readOnly
          className={`${inputClass} bg-gray-100 cursor-not-allowed`}
          aria-label="Role"
        />

        {/* Company Name & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              placeholder="Company Name"
              {...register("companyName", {
                required: "Company name is required.",
                minLength: { value: 2, message: "Enter at least 2 characters." },
                maxLength: { value: 100, message: "Too long (max 100 characters)." },
              })}
              className={inputClass}
              aria-invalid={errors.companyName ? "true" : "false"}
            />
            {touchedFields.companyName && errors.companyName && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <input
              placeholder="Phone Number"
              {...register("phoneNumber", {
                required: "Phone number is required.",
                pattern: {
                  value: /^[0-9]{6,15}$/,
                  message: "Enter only digits (6–15 characters).",
                },
              })}
              className={inputClass}
              aria-invalid={errors.phoneNumber ? "true" : "false"}
            />
            {touchedFields.phoneNumber && errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              placeholder="First Name"
              {...register("firstName", {
                required: "First name is required.",
                pattern: { value: /^[A-Za-z]+$/, message: "Only alphabets are allowed." },
              })}
              className={inputClass}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            {touchedFields.firstName && errors.firstName && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last name is required.",
                pattern: { value: /^[A-Za-z]+$/, message: "Only alphabets are allowed." },
              })}
              className={inputClass}
              aria-invalid={errors.lastName ? "true" : "false"}
            />
            {touchedFields.lastName && errors.lastName && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Mobile, Email, Password */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <input
              placeholder="Mobile Number"
              {...register("mobileNumber", {
                required: "Mobile number is required.",
                pattern: { value: /^[0-9]{10,15}$/, message: "Enter a valid number." },
              })}
              className={inputClass}
              aria-invalid={errors.mobileNumber ? "true" : "false"}
            />
            {touchedFields.mobileNumber && errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("companyEmail", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format.",
                },
              })}
              className={inputClass}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {touchedFields.email && errors.email && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required.",
                minLength: { value: 8, message: "At least 8 characters required." },
              })}
              onChange={handlePasswordChange}
              className={inputClass}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-black select-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setShowPassword(!showPassword);
                }
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
            {passwordStrength && (
              <p
                className={`text-xs mt-1 ${
                  passwordStrength === "Weak"
                    ? "text-red-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                Password Strength: {passwordStrength}
              </p>
            )}
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            id="publishRequirements"
            {...register("publishRequirements")}
          />
          <label htmlFor="publishRequirements" className="text-sm text-black cursor-pointer">
            I want to upload my proof documents to proceed with bidding.
          </label>
        </div>

        {/* Conditional Section */}
        {publishRequirements && (
          <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 space-y-4 shadow-sm mt-4">
            {/* License + Website */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  placeholder="License Number"
                  {...register("licenseNumber", {
                    required: "Please enter your license number",
                    minLength: {
                      value: 16,
                      message: "License number must be at least 16 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z0-9-\s]+$/,
                      message: "Use only letters, numbers, spaces, or hyphens",
                    },
                  })}
                  className={inputClass1}
                  aria-invalid={errors.licenseNumber ? "true" : "false"}
                />
                {touchedFields.licenseNumber && errors.licenseNumber && (
                  <p className="text-red-500 text-xs mt-1" role="alert">
                    {errors.licenseNumber.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  placeholder="Website URL (optional)"
                  {...register("websiteUrl", {
                    pattern: {
                      value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/\w .-]*)*\/?$/,
                      message: "Enter a valid URL (e.g., https://example.com)",
                    },
                  })}
                  className={inputClass1}
                  aria-invalid={errors.websiteUrl ? "true" : "false"}
                />
                {errors.websiteUrl && (
                  <p className="text-red-500 text-xs mt-1" role="alert">
                    {errors.websiteUrl.message}
                  </p>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-black font-medium mb-1" htmlFor="certificatesOfCompany">
                Incorporation Certificate
              </label>
              <label
                htmlFor="certificatesOfCompany"
                className="flex items-center justify-between border-b border-black p-2.5 cursor-pointer text-black text-sm"
              >
                <input
                  id="certificatesOfCompany"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("certificatesOfCompanyFile", {
                    required: "Please upload your incorporation certificate.",
                  })}
                  onChange={(e) => handleFileChange(e, "certificatesOfCompany")}
                  className="hidden"
                />
                <span className="truncate" aria-live="polite">
                  {fileUploads.certificatesOfCompany
                    ? fileUploads.certificatesOfCompany.name
                    : "No file selected"}
                </span>
                <span className="bg-black text-white px-2.5 py-1 rounded-md text-xs select-none">
                  Choose File
                </span>
              </label>
              {errors.certificatesOfCompanyFile && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.certificatesOfCompanyFile.message}
                </p>
              )}
            </div>

            {/* Certificates Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-black font-medium mb-1" htmlFor="certificateInput">
                Certificates of Company
              </label>

              <div
                className="w-full border-b border-black p-2 flex flex-wrap items-center gap-2 min-h-[42px] cursor-pointer"
                onClick={() => setDropdownOpen(true)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setDropdownOpen((open) => !open);
                    e.preventDefault();
                  }
                }}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                {certificateSelections.map((cert) => (
                  <span
                    key={cert}
                    className="bg-black text-white px-3 py-1 rounded-md flex items-center gap-2 text-xs group"
                  >
                    {cert}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCertificate(cert);
                      }}
                      className="text-white text-xs opacity-70 group-hover:opacity-100"
                      aria-label={`Remove certificate ${cert}`}
                    >
                      ×
                    </button>
                  </span>
                ))}

                <input
                  id="certificateInput"
                  type="text"
                  placeholder={
                    certificateSelections.length === 0
                      ? "Type or select a certificate"
                      : ""
                  }
                  value={searchTerm}
                  onFocus={() => setDropdownOpen(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setDropdownOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim() !== "") {
                      e.preventDefault();
                      const value = e.target.value.trim();
                      if (!certificateSelections.includes(value)) {
                        addCertificate(value);
                        setDropdownOpen(false);
                      }
                      setSearchTerm("");
                    }
                  }}
                  className="flex-grow outline-none bg-transparent text-black p-1 text-xs cursor-pointer"
                  aria-autocomplete="list"
                  aria-controls="certificate-listbox"
                  aria-activedescendant=""
                  role="combobox"
                />
              </div>

              {dropdownOpen && filteredCertificates.length > 0 && (
                <ul
                  id="certificate-listbox"
                  role="listbox"
                  className="absolute z-10 w-full border border-black bg-white rounded-md mt-1 shadow-sm max-h-36 overflow-y-auto text-xs"
                >
                  {filteredCertificates.map((cert) => (
                    <li
                      key={cert}
                      onClick={() => {
                        addCertificate(cert);
                        setDropdownOpen(false);
                      }}
                      className="px-3 py-2 text-black cursor-pointer hover:bg-black hover:text-white"
                      role="option"
                      tabIndex={-1}
                    >
                      {cert}
                    </li>
                  ))}
                </ul>
              )}

              {errors.certificatesOfCompany && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.certificatesOfCompany.message}
                </p>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2.5 rounded-md font-semibold text-sm hover:opacity-90 transition cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}