// src/components/Forms/insurance/BankInsurancePartnerRegistrationForm.jsx
import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const steps = [
  "Employee Details",
  "Bank Details",
  "Products",
  "Service Area",
  "Experience",
  "Verification",
  "Documents",
  "Login Details",
  "Declaration",
];

const subtitles = [
  "Your personal information",
  "Your bank & branch information",
  "Insurance products you offer",
  "Where you can serve",
  "Your insurance experience",
  "Verify your employment",
  "Upload supporting documents",
  "Secure login credentials",
  "Confirm and submit",
];

const designationOptions = [
  "Branch Manager",
  "Relationship Manager",
  "Insurance Officer",
  "Loan Officer",
  "Sales Officer",
  "Customer Relationship Executive",
  "Other",
];

const bankOptions = [
  "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank",
  "Punjab National Bank", "Bank of Baroda", "Canara Bank",
  "Kotak Mahindra Bank", "IndusInd Bank", "Other",
];

const insuranceProductsList = [
  "Home Insurance",
  "Property Insurance",
  "Building Insurance",
];

const serviceAreaOptions = [
  "Local Branch",
  "District",
  "State",
  "Pan India",
];

const yesNoOptions = ["Yes", "No"];

const Field = ({ label, required, hint, children }) => (
  <div className="mb-2">
    <label className="block text-[12px] font-semibold text-[#00695C] mb-0.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint ? <p className="text-[10px] text-gray-400 mt-0.5">{hint}</p> : null}
  </div>
);

const FieldDt = ({ label, required, hint, children }) => (
  <div className="mb-2.5">
    <label className="block text-[13px] font-semibold text-[#00695C] mb-0.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint ? <p className="text-[10px] text-gray-400 mt-0.5">{hint}</p> : null}
  </div>
);

const inMob = "w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] text-gray-700 placeholder:text-gray-300 placeholder:text-[11px] focus:outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C]/20 bg-white transition-all";
const inDt = "w-full border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-700 placeholder:text-gray-300 placeholder:text-xs focus:outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C]/20 bg-white transition-all";

export default function BankInsurancePartnerRegistrationForm({ isOpen, onClose }) {
  const [step, setStep] = useState(0);

  // ✅ Refs for auto-scroll-to-top on step change
  const contentRef = useRef(null);    // mobile content scroll container
  const contentRefDt = useRef(null);  // desktop content scroll container

  const [formData, setFormData] = useState({
    // Step 0: Employee Details
    fullName: "", employeeId: "", designation: "", customDesignation: "",
    officialMobile: "", officialEmail: "", alternateMobile: "",
    yearsOfExperience: "", profilePhoto: null,

    // Step 1: Bank Details
    bankName: "", branchName: "", branchCode: "", ifscCode: "",
    branchAddress: "", city: "", district: "", state: "", pinCode: "",
    bankContactNumber: "",

    // Step 2: Products
    insuranceProducts: [],

    // Step 3: Service Area
    serviceableState: "", serviceableDistrict: "", serviceableCity: "",
    serviceablePincodes: "", serviceArea: [],

    // Step 4: Experience
    insuranceExperience: "", propertyInsuranceExp: "", homeInsuranceExp: "",
    fireInsuranceExp: "", policiesHandled: "", claimAssistance: "",

    // Step 5: Verification
    employeeIdCardVerify: null, bankAuthLetter: null,
    officialEmailVerify: false, joiningDate: "",
    managerName: "", managerEmployeeId: "", branchManagerApproval: false,

    // Step 6: Documents
    employeeIdCard: null, bankAuthDoc: null,
    insuranceAuthDoc: null, otherDocs: null,

    // Step 7: Login
    loginEmail: "", username: "", password: "", confirmPassword: "",
    otpVerification: false, twoFA: false,

    // Step 8: Declaration
    accepted: false,
    agreeLeads: false,
  });

  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

  // ✅ Auto-scroll to top of content area on every step change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    if (contentRefDt.current) {
      contentRefDt.current.scrollTop = 0;
    }
  }, [step]);

  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, value) => {
    const current = formData[field] || [];
    if (current.includes(value)) {
      updateForm(field, current.filter((v) => v !== value));
    } else {
      updateForm(field, [...current, value]);
    }
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Profile photo must be less than 2MB");
      return;
    }
    updateForm("profilePhoto", file);
    if (profilePhotoPreview) URL.revokeObjectURL(profilePhotoPreview);
    setProfilePhotoPreview(URL.createObjectURL(file));
  };

  const removeProfilePhoto = () => {
    if (profilePhotoPreview) URL.revokeObjectURL(profilePhotoPreview);
    updateForm("profilePhoto", null);
    setProfilePhotoPreview(null);
  };

  const handleDocumentUpload = (docType, e, maxSize = 5) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File must be less than ${maxSize}MB`);
      return;
    }
    updateForm(docType, file);
  };

  const handleSubmit = () => {
    try {
      console.log("Bank Insurance Partner Registration submitted:", formData);
      onClose();
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* MOBILE */}
      <div className="fixed inset-0 z-50 flex flex-col sm:hidden">
        <div className="bg-black/50" style={{ height: "10vh" }} onClick={onClose} />
        <div className="flex-1 bg-white rounded-3xl flex flex-col overflow-hidden shadow-2xl mx-5 mb-5">
          <div
            className="relative flex flex-col items-center justify-center px-4 pt-3 pb-3 overflow-hidden shrink-0 rounded-t-3xl"
            style={{
              background:
                "linear-gradient(160deg,#00695C 0%,#00897B 45%,#26A69A 75%,#80CBC4 100%)",
              minHeight: 75,
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-white" />
            </button>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10 text-white font-bold text-[11px]"
            >
              ✕
            </button>
            <div className="text-xl mb-0.5 relative z-10">🏦</div>
            <h1 className="text-[13px] font-extrabold text-white tracking-wide relative z-10 text-center">
              Bank Insurance Partner Registration
            </h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5 text-center">
              Register to offer insurance products
            </p>
          </div>

          <div className="text-center px-3 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-100 border-b border-teal-200 shrink-0">
            <h2 className="text-[12px] font-bold text-[#00695C]">{steps[step]}</h2>
            <p className="text-[9px] text-green-500 mt-0.5">
              Step {step + 1} of {steps.length} — {subtitles[step]}
            </p>
          </div>

          <div className="flex items-start justify-between px-1.5 py-1.5 shrink-0 border-b border-gray-100 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center min-w-[36px]">
                <div
                  className={`w-5 h-5 rounded-full text-[9px] flex items-center justify-center font-bold ${
                    i < step
                      ? "bg-green-500 text-white"
                      : i === step
                      ? "bg-[#00695C] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <p
                  className={`text-[6.5px] mt-0.5 text-center px-0.5 leading-tight ${
                    i === step ? "text-[#00695C] font-bold" : "text-gray-400"
                  }`}
                >
                  {s}
                </p>
              </div>
            ))}
          </div>

          {/* ✅ ref attached for scroll-to-top */}
          <div ref={contentRef} className="px-3 py-2.5 overflow-y-auto flex-1">
            <BankPartnerContent
              step={step}
              inp={inMob}
              formData={formData}
              updateForm={updateForm}
              toggleArrayItem={toggleArrayItem}
              profilePhotoPreview={profilePhotoPreview}
              handleProfilePhotoUpload={handleProfilePhotoUpload}
              removeProfilePhoto={removeProfilePhoto}
              handleDocumentUpload={handleDocumentUpload}
              designationOptions={designationOptions}
              bankOptions={bankOptions}
              insuranceProductsList={insuranceProductsList}
              serviceAreaOptions={serviceAreaOptions}
              yesNoOptions={yesNoOptions}
              isMobile
            />
          </div>

          <div className="flex flex-col shrink-0 bg-white border-t border-teal-100">
            <div className="h-[2px] w-full bg-gradient-to-r from-[#00695C] via-[#26A69A] to-[#80CBC4]" />
            {step < steps.length - 1 && (
              <div className="px-3 pt-1.5 pb-0.5">
                <div className="flex justify-between mb-0.5">
                  <span className="text-[8px] text-gray-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#26A69A] inline-block" />
                    Form completion
                  </span>
                  <span className="text-[8px] text-[#00695C] font-bold">
                    {Math.round(((step + 1) / steps.length) * 100)}%
                  </span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00695C] to-[#26A69A] rounded-full transition-all duration-500"
                    style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-center gap-1 pt-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i < step
                      ? "w-2 h-1 bg-green-400"
                      : i === step
                      ? "w-3.5 h-1 bg-[#00695C]"
                      : "w-1 h-1 bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2 px-3 py-2">
              {step > 0 && (
                <button
                  className="px-3 py-1.5 text-[12px] font-semibold text-[#00695C] bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 flex items-center gap-1"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}
              <button
                className={`flex-1 py-2 text-[12px] font-semibold text-white rounded-xl flex items-center justify-center gap-1 shadow ${
                  step === steps.length - 1
                    ? "bg-gradient-to-r from-green-600 to-teal-600"
                    : "bg-gradient-to-r from-[#00695C] to-[#00897B]"
                }`}
                onClick={() => {
                  step === steps.length - 1 ? handleSubmit() : setStep(step + 1);
                }}
              >
                {step === steps.length - 1 ? (
                  <>
                    <span>✓</span> Submit Form
                  </>
                ) : (
                  <>Continue →</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="fixed inset-0 bg-black/60 z-50 hidden sm:flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
          <div
            className="relative flex flex-col items-center justify-center min-h-[65px] px-4 pt-2.5 pb-2.5 overflow-hidden shrink-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(160deg,#00695C 0%,#00897B 45%,#26A69A 75%,#80CBC4 100%)",
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-white" />
            </button>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10 text-white font-bold text-[11px]"
            >
              ✕
            </button>
            <div className="text-xl mb-0.5 relative z-10">🏦</div>
            <h1 className="text-[14px] font-extrabold text-white tracking-wide relative z-10">
              Bank Insurance Partner Registration
            </h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5">
              Register to offer insurance products
            </p>
          </div>

          <div className="text-center px-4 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-100 border-b border-teal-200 shrink-0">
            <h2 className="text-[12px] font-bold text-[#00695C]">{steps[step]}</h2>
            <p className="text-[9px] text-green-500 mt-0.5">
              Step {step + 1} of {steps.length} — {subtitles[step]}
            </p>
          </div>

          <div className="flex items-start justify-between px-2 sm:px-3 py-1.5 shrink-0 border-b border-gray-100 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center min-w-[36px]">
                <div
                  className={`w-5.5 h-5.5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    i < step
                      ? "bg-green-500 text-white"
                      : i === step
                      ? "bg-[#00695C] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <p
                  className={`text-[7px] mt-0.5 text-center px-0.5 leading-tight ${
                    i === step ? "text-[#00695C] font-bold" : "text-gray-400"
                  }`}
                >
                  {s}
                </p>
              </div>
            ))}
          </div>

          {/* ✅ ref attached for scroll-to-top */}
          <div ref={contentRefDt} className="px-3 sm:px-4 py-3 overflow-y-auto flex-1">
            <BankPartnerContent
              step={step}
              inp={inDt}
              formData={formData}
              updateForm={updateForm}
              toggleArrayItem={toggleArrayItem}
              profilePhotoPreview={profilePhotoPreview}
              handleProfilePhotoUpload={handleProfilePhotoUpload}
              removeProfilePhoto={removeProfilePhoto}
              handleDocumentUpload={handleDocumentUpload}
              designationOptions={designationOptions}
              bankOptions={bankOptions}
              insuranceProductsList={insuranceProductsList}
              serviceAreaOptions={serviceAreaOptions}
              yesNoOptions={yesNoOptions}
              isMobile={false}
            />
          </div>

          <div className="flex flex-col shrink-0 bg-white rounded-b-2xl border-t border-teal-100 overflow-hidden">
            <div className="h-[2px] w-full bg-gradient-to-r from-[#00695C] via-[#26A69A] to-[#80CBC4]" />
            {step < steps.length - 1 && (
              <div className="px-4 pt-1.5 pb-0.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[8px] text-gray-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#26A69A] inline-block" />
                    Form completion
                  </span>
                  <span className="text-[8px] text-[#00695C] font-bold">
                    {Math.round(((step + 1) / steps.length) * 100)}%
                  </span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00695C] to-[#26A69A] rounded-full transition-all duration-500"
                    style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-center gap-1.5 pt-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i < step
                      ? "w-2.5 h-1.5 bg-green-400"
                      : i === step
                      ? "w-4 h-1.5 bg-[#00695C]"
                      : "w-1.5 h-1.5 bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2 px-4 py-2">
              {step > 0 && (
                <button
                  className="px-4 py-1.5 text-[12px] font-semibold text-[#00695C] bg-teal-50 hover:bg-teal-100 rounded-lg flex items-center gap-1 border border-teal-200"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}
              <button
                className={`px-5 py-1.5 text-[12px] font-semibold text-white rounded-lg flex items-center gap-1.5 ml-auto shadow-md hover:-translate-y-0.5 ${
                  step === steps.length - 1
                    ? "bg-gradient-to-r from-green-600 to-teal-600"
                    : "bg-gradient-to-r from-[#00695C] to-[#00897B]"
                }`}
                onClick={() => {
                  step === steps.length - 1 ? handleSubmit() : setStep(step + 1);
                }}
              >
                {step === steps.length - 1 ? (
                  <>
                    <span>✓</span> Submit Form
                  </>
                ) : (
                  <>
                    Continue <span className="text-sm">→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   SHARED CONTENT (MOBILE + DESKTOP)
   ───────────────────────────────────────────── */
function BankPartnerContent({
  step, inp, formData, updateForm, toggleArrayItem,
  profilePhotoPreview, handleProfilePhotoUpload, removeProfilePhoto,
  handleDocumentUpload, designationOptions, bankOptions,
  insuranceProductsList, serviceAreaOptions, yesNoOptions,
  isMobile,
}) {
  const F = isMobile ? Field : FieldDt;
  const headerClass = isMobile
    ? "flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50"
    : "flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50";
  const h3Class = isMobile
    ? "text-[11px] font-bold text-[#00695C]"
    : "text-[14px] font-bold text-[#00695C]";
  const barClass = isMobile ? "w-1 h-3" : "w-1 h-4";

  // ── STEP 0: Employee Details ──
  if (step === 0) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Employee Details</h3>
      </div>
      <F label="Full Name" required>
        <input className={inp} placeholder="Enter full name" value={formData.fullName} onChange={(e) => updateForm("fullName", e.target.value)} />
      </F>
      <F label="Employee ID" required>
        <input className={inp} placeholder="Enter employee ID" value={formData.employeeId} onChange={(e) => updateForm("employeeId", e.target.value)} />
      </F>
      <F label="Designation" required>
        <select className={inp} value={formData.designation} onChange={(e) => updateForm("designation", e.target.value)}>
          <option value="">Select Designation</option>
          {designationOptions.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </F>
      {formData.designation === "Other" && (
        <F label="Please Specify Designation" required>
          <input className={inp} placeholder="Enter designation" value={formData.customDesignation} onChange={(e) => updateForm("customDesignation", e.target.value)} />
        </F>
      )}
      <F label="Official Mobile Number" required>
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} placeholder="10-digit mobile" value={formData.officialMobile} onChange={(e) => updateForm("officialMobile", e.target.value)} />
      </F>
      <F label="Official Email ID" required>
        <input className={inp} type="email" placeholder="name@bank.com" value={formData.officialEmail} onChange={(e) => updateForm("officialEmail", e.target.value)} />
      </F>
      <F label="Alternate Mobile Number">
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} placeholder="Optional" value={formData.alternateMobile} onChange={(e) => updateForm("alternateMobile", e.target.value)} />
      </F>
      <F label="Years of Experience">
        <input className={inp} type="number" min="0" placeholder="e.g. 5" value={formData.yearsOfExperience} onChange={(e) => updateForm("yearsOfExperience", e.target.value)} />
      </F>
      <F label="Profile Photo" hint="Max 2MB">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="image/*" className="hidden" id={`${isMobile ? "m" : "dt"}-bank-ins-photo`} onChange={handleProfilePhotoUpload} />
          <label htmlFor={`${isMobile ? "m" : "dt"}-bank-ins-photo`} className="cursor-pointer flex flex-col items-center">
            <span className={`mb-1 ${isMobile ? "text-lg" : "text-xl"}`}>📷</span>
            <span className={`${isMobile ? "text-[11px]" : "text-[12px]"} font-semibold text-[#00695C]`}>Upload Profile Photo</span>
            <span className={`${isMobile ? "text-[10px]" : "text-[11px]"} text-gray-400`}>JPG, PNG (Max 2MB)</span>
          </label>
        </div>
        {profilePhotoPreview && (
          <div className="mt-2 relative inline-block">
            <img src={profilePhotoPreview} alt="Profile" className={`object-cover rounded-full border-2 border-[#00695C] ${isMobile ? "w-20 h-20" : "w-24 h-24"}`} />
            <button onClick={removeProfilePhoto} className={`absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center ${isMobile ? "text-[10px]" : "text-[11px]"}`}>✕</button>
          </div>
        )}
      </F>
    </>
  );

  // ── STEP 1: Bank Details ──
  if (step === 1) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Bank Details</h3>
      </div>
      <F label="Bank Name" required>
        <select className={inp} value={formData.bankName} onChange={(e) => updateForm("bankName", e.target.value)}>
          <option value="">Select Bank</option>
          {bankOptions.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </F>
      <F label="Branch Name" required>
        <input className={inp} placeholder="Enter branch name" value={formData.branchName} onChange={(e) => updateForm("branchName", e.target.value)} />
      </F>
      <F label="Branch Code">
        <input className={inp} placeholder="Enter branch code" value={formData.branchCode} onChange={(e) => updateForm("branchCode", e.target.value)} />
      </F>
      <F label="IFSC Code" required hint="e.g., SBIN0001234">
        <input className={inp} placeholder="Enter IFSC code" value={formData.ifscCode} onChange={(e) => updateForm("ifscCode", e.target.value.toUpperCase())} />
      </F>
      <F label="Branch Address" required>
        <input className={inp} placeholder="Enter branch address" value={formData.branchAddress} onChange={(e) => updateForm("branchAddress", e.target.value)} />
      </F>
      <F label="City" required>
        <input className={inp} placeholder="Enter city" value={formData.city} onChange={(e) => updateForm("city", e.target.value)} />
      </F>
      <F label="District">
        <input className={inp} placeholder="Enter district" value={formData.district} onChange={(e) => updateForm("district", e.target.value)} />
      </F>
      <F label="State" required>
        <input className={inp} placeholder="Enter state" value={formData.state} onChange={(e) => updateForm("state", e.target.value)} />
      </F>
      <F label="PIN Code" hint="6 digits">
        <input className={inp} type="tel" inputMode="numeric" maxLength={6} placeholder="Enter PIN code" value={formData.pinCode} onChange={(e) => updateForm("pinCode", e.target.value)} />
      </F>
      <F label="Bank Contact Number">
        <input className={inp} type="tel" inputMode="numeric" value={formData.bankContactNumber} onChange={(e) => updateForm("bankContactNumber", e.target.value)} />
      </F>
    </>
  );

  // ── STEP 2: Products ──
  if (step === 2) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Insurance Products Offered</h3>
      </div>
      <p className={`${isMobile ? "text-[10px]" : "text-[12px]"} text-gray-400 mb-2`}>Select the products you handle</p>
      <div className="space-y-2">
        {insuranceProductsList.map((p) => (
          <label key={p} className={`flex items-center gap-2 ${isMobile ? "text-[11px]" : "text-[13px]"} cursor-pointer`}>
            <input type="checkbox" className={`accent-[#00695C] cursor-pointer ${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"}`} checked={formData.insuranceProducts.includes(p)} onChange={() => toggleArrayItem("insuranceProducts", p)} />
            {p}
          </label>
        ))}
      </div>
    </>
  );

  // ── STEP 3: Service Area ──
  if (step === 3) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Service Area</h3>
      </div>
      <F label="Serviceable State" required>
        <input className={inp} value={formData.serviceableState} onChange={(e) => updateForm("serviceableState", e.target.value)} />
      </F>
      <F label="Serviceable District" required>
        <input className={inp} value={formData.serviceableDistrict} onChange={(e) => updateForm("serviceableDistrict", e.target.value)} />
      </F>
      <F label="Serviceable City" required>
        <input className={inp} value={formData.serviceableCity} onChange={(e) => updateForm("serviceableCity", e.target.value)} />
      </F>
      <F label="Serviceable PIN Codes">
        <input className={inp} placeholder="Comma separated" value={formData.serviceablePincodes} onChange={(e) => updateForm("serviceablePincodes", e.target.value)} />
      </F>
      <F label="Service Area" required>
        <div className="space-y-2 mt-1">
          {serviceAreaOptions.map((opt) => (
            <label key={opt} className={`flex items-center gap-2 ${isMobile ? "text-[11px]" : "text-[13px]"} cursor-pointer`}>
              <input type="checkbox" className={`accent-[#00695C] cursor-pointer ${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"}`} checked={formData.serviceArea.includes(opt)} onChange={() => toggleArrayItem("serviceArea", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </F>
    </>
  );

  // ── STEP 4: Experience ──
  if (step === 4) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Insurance Experience</h3>
      </div>
      <F label="Insurance Experience" required hint="In years">
        <input className={inp} type="number" min="0" placeholder="e.g. 5" value={formData.insuranceExperience} onChange={(e) => updateForm("insuranceExperience", e.target.value)} />
      </F>
      <F label="Property Insurance Experience" hint="In years">
        <input className={inp} type="number" min="0" value={formData.propertyInsuranceExp} onChange={(e) => updateForm("propertyInsuranceExp", e.target.value)} />
      </F>
      <F label="Home Insurance Experience" hint="In years">
        <input className={inp} type="number" min="0" value={formData.homeInsuranceExp} onChange={(e) => updateForm("homeInsuranceExp", e.target.value)} />
      </F>
      <F label="Fire Insurance Experience" hint="In years">
        <input className={inp} type="number" min="0" value={formData.fireInsuranceExp} onChange={(e) => updateForm("fireInsuranceExp", e.target.value)} />
      </F>
      <F label="Number of Policies Handled">
        <input className={inp} type="number" min="0" value={formData.policiesHandled} onChange={(e) => updateForm("policiesHandled", e.target.value)} />
      </F>
      <F label="Claim Assistance Available">
        <div className="flex gap-5 mt-1">
          {yesNoOptions.map((opt) => (
            <label key={opt} className={`flex items-center gap-2 ${isMobile ? "text-[11px]" : "text-[13px]"} cursor-pointer`}>
              <input type="radio" name={`${isMobile ? "m" : "dt"}-claim`} className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.claimAssistance === opt} onChange={() => updateForm("claimAssistance", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </F>
    </>
  );

  // ── STEP 5: Verification ──
  if (step === 5) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Bank Employee Verification</h3>
      </div>
      <F label="Employee ID Card" required hint="PDF only (Max 5MB)">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept=".pdf" className="hidden" id={`${isMobile ? "m" : "dt"}-bank-ins-idverify`} onChange={(e) => handleDocumentUpload("employeeIdCardVerify", e)} />
          <label htmlFor={`${isMobile ? "m" : "dt"}-bank-ins-idverify`} className="cursor-pointer flex flex-col items-center">
            <span className={`${isMobile ? "text-xl" : "text-2xl"} mb-1`}>📄</span>
            <span className={`${isMobile ? "text-[10px]" : "text-[12px]"} font-semibold text-[#00695C]`}>Upload Employee ID Card</span>
            <span className={`${isMobile ? "text-[9px]" : "text-[11px]"} text-gray-400`}>PDF only (Max 5MB)</span>
          </label>
        </div>
        {formData.employeeIdCardVerify && <p className={`${isMobile ? "text-[10px]" : "text-[13px]"} text-green-600 mt-1`}>✓ {formData.employeeIdCardVerify.name}</p>}
      </F>
      <F label="Bank Authorization Letter" hint="PDF only (Max 5MB)">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept=".pdf" className="hidden" id={`${isMobile ? "m" : "dt"}-bank-ins-authletter`} onChange={(e) => handleDocumentUpload("bankAuthLetter", e)} />
          <label htmlFor={`${isMobile ? "m" : "dt"}-bank-ins-authletter`} className="cursor-pointer flex flex-col items-center">
            <span className={`${isMobile ? "text-xl" : "text-2xl"} mb-1`}>📄</span>
            <span className={`${isMobile ? "text-[10px]" : "text-[12px]"} font-semibold text-[#00695C]`}>Upload Authorization Letter</span>
          </label>
        </div>
        {formData.bankAuthLetter && <p className={`${isMobile ? "text-[10px]" : "text-[13px]"} text-green-600 mt-1`}>✓ {formData.bankAuthLetter.name}</p>}
      </F>
      <label className={`flex items-center gap-2 ${isMobile ? "text-[11px]" : "text-[13px]"} cursor-pointer mb-2 mt-2`}>
        <input type="checkbox" className={`accent-[#00695C] ${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"}`} checked={formData.officialEmailVerify} onChange={() => updateForm("officialEmailVerify", !formData.officialEmailVerify)} />
        Official Email Verification
      </label>
      <F label="Employee Joining Date">
        <input className={inp} type="date" value={formData.joiningDate} onChange={(e) => updateForm("joiningDate", e.target.value)} />
      </F>
      <F label="Reporting Manager Name">
        <input className={inp} value={formData.managerName} onChange={(e) => updateForm("managerName", e.target.value)} />
      </F>
      <F label="Reporting Manager Employee ID">
        <input className={inp} value={formData.managerEmployeeId} onChange={(e) => updateForm("managerEmployeeId", e.target.value)} />
      </F>
      <label className={`flex items-center gap-2 ${isMobile ? "text-[11px]" : "text-[13px]"} cursor-pointer mt-1`}>
        <input type="checkbox" className={`accent-[#00695C] ${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"}`} checked={formData.branchManagerApproval} onChange={() => updateForm("branchManagerApproval", !formData.branchManagerApproval)} />
        Branch Manager Approval
      </label>
    </>
  );

  // ── STEP 6: Documents ──
  if (step === 6) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Documents</h3>
      </div>
      <p className={`${isMobile ? "text-[10px]" : "text-[12px]"} text-gray-400 mb-2`}>PDF only (Max 5MB each)</p>
      {[
        { key: "employeeIdCard", label: "Employee ID Card", req: true },
        { key: "bankAuthDoc", label: "Bank Authorization / Appointment Proof", req: false },
        { key: "insuranceAuthDoc", label: "Insurance Authorization / Certification", req: false },
        { key: "otherDocs", label: "Other Supporting Documents", req: false },
      ].map(({ key, label, req }) => (
        <F key={key} label={label} required={req}>
          <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
            <input type="file" accept=".pdf" className="hidden" id={`${isMobile ? "m" : "dt"}-bank-ins-${key}`} onChange={(e) => handleDocumentUpload(key, e)} />
            <label htmlFor={`${isMobile ? "m" : "dt"}-bank-ins-${key}`} className="cursor-pointer flex flex-col items-center">
              <span className={`${isMobile ? "text-xl" : "text-2xl"} mb-1`}>📄</span>
              <span className={`${isMobile ? "text-[10px]" : "text-[12px]"} font-semibold text-[#00695C]`}>Upload {label}</span>
            </label>
          </div>
          {formData[key] && <p className={`${isMobile ? "text-[10px]" : "text-[13px]"} text-green-600 mt-1`}>✓ {formData[key].name}</p>}
        </F>
      ))}
    </>
  );

  // ── STEP 7: Login Details ──
  if (step === 7) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Login Details</h3>
      </div>
      <F label="Official Email ID" required>
        <input className={inp} type="email" value={formData.loginEmail} onChange={(e) => updateForm("loginEmail", e.target.value)} />
      </F>
      <F label="Username">
        <input className={inp} value={formData.username} onChange={(e) => updateForm("username", e.target.value)} />
      </F>
      <F label="Password" required>
        <input className={inp} type="password" value={formData.password} onChange={(e) => updateForm("password", e.target.value)} />
      </F>
      <F label="Confirm Password" required>
        <input className={inp} type="password" value={formData.confirmPassword} onChange={(e) => updateForm("confirmPassword", e.target.value)} />
      </F>
      <label className={`flex items-center gap-2 ${isMobile ? "text-[11px]" : "text-[13px]"} cursor-pointer mb-2`}>
        <input type="checkbox" className={`accent-[#00695C] ${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"}`} checked={formData.otpVerification} onChange={() => updateForm("otpVerification", !formData.otpVerification)} />
        OTP Verification
      </label>
      <label className={`flex items-center gap-2 ${isMobile ? "text-[11px]" : "text-[13px]"} cursor-pointer`}>
        <input type="checkbox" className={`accent-[#00695C] ${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"}`} checked={formData.twoFA} onChange={() => updateForm("twoFA", !formData.twoFA)} />
        Two-Factor Authentication
      </label>
    </>
  );

  // ── STEP 8: Declaration ──
  if (step === 8) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Declaration</h3>
      </div>
      <p className={`${isMobile ? "text-[11px]" : "text-[13px]"} text-gray-600 mb-3 leading-relaxed`}>
        Please read and confirm the following before submitting:
      </p>
      <label className={`flex items-start gap-2 ${isMobile ? "text-[11px]" : "text-[13px]"} cursor-pointer mb-2`}>
        <input type="checkbox" className={`accent-[#00695C] mt-0.5 ${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"}`} checked={formData.accepted} onChange={() => updateForm("accepted", !formData.accepted)} />
        <span>I confirm that I am an authorized employee/representative of the bank.</span>
      </label>
      <label className={`flex items-start gap-2 ${isMobile ? "text-[11px]" : "text-[13px]"} cursor-pointer mb-2`}>
        <input type="checkbox" className={`accent-[#00695C] mt-0.5 ${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"}`} checked={formData.agreeLeads} onChange={() => updateForm("agreeLeads", !formData.agreeLeads)} />
        <span>The information provided is accurate and complete. I agree to receive customer insurance requirements through the platform.</span>
      </label>
      <p className={`${isMobile ? "text-[10px]" : "text-[12px]"} text-gray-500 leading-relaxed mt-3`}>
        I agree to the platform Terms &amp; Conditions and Privacy Policy.
      </p>
    </>
  );

  return null;
}