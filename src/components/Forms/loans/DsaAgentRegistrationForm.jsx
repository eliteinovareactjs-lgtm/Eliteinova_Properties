// src/components/Forms/loans/DsaAgentRegistrationForm.jsx
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const steps = [
  "Agent Details",
  "Company",
  "Verification",
  "Products",
  "Segment",
  "Service Area",
];

const subtitles = [
  "Your basic information",
  "Where you operate from",
  "Upload documents and verify contact",
  "Select all products you offer",
  "The customers you serve",
  "Where you can process loans",
];

const genderOptions = ["Male", "Female", "Other"];
const yesNoOptions = ["Yes", "No"];
const dsaTypeOptions = [
  "Individual DSA Agent", "DSA Agency", "Loan Consultant",
  "Financial Consultant", "Corporate DSA Representative",
];
const bankOptions = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank", "Bank of Baroda", "Canara Bank", "Kotak Mahindra Bank", "IndusInd Bank", "Other"];

const loanPurposesList = [
  "Home Purchase", "Land / Plot Purchase", "House Construction",
  "Commercial Property Purchase", "Loan Against Property",
  "Home Loan Balance Transfer", "Home Renovation",
  "Plot + Construction Loan", "Builder / Project Home Loan",
  "Commercial Property Loan", "Mortgage Loan",
  "Property Purchase Loan", "Top-Up Loan",
];

const loanAmountRanges = [
  "₹10–25 Lakhs", "₹25–50 Lakhs", "₹50 Lakhs–₹1 Crore",
  "₹1–2 Crores", "Above ₹2 Crores",
];

const customerSegmentList = [
  "Salaried", "Self-Employed", "Business Owners", "Professionals",
  "Corporate Employees", "NRIs", "Property Investors",
  "Builders / Developers", "Commercial Property Owners",
  "Land / Plot Buyers",
];

const customerProfileList = [
  "First-Time Home Buyer", "Existing Property Owner",
  "Property Investor", "Home Loan Transfer Customer",
  "Construction Customer", "Commercial Property Buyer",
  "Loan Against Property Customer",
];

const serviceCoverageOptions = ["Local", "District", "State", "Multiple States", "Pan India"];

// Validation helpers
const isOnlyLettersAndSpaces = (value) => /^[A-Za-z\s]*$/.test(value);
const isOnlyDigits = (value) => /^\d*$/.test(value);
const isAlphanumericWithSpaces = (value) => /^[A-Za-z0-9\s]*$/.test(value);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPincode = (code) => /^[0-9]{6}$/.test(code);

const handleAlphaFieldChange = (value) => value.replace(/[^A-Za-z\s]/g, "");
const handleNumericFieldChange = (value) => value.replace(/\D/g, "");
const handleAlphanumericFieldChange = (value) => value.replace(/[^A-Za-z0-9\s]/g, "");

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

export default function DsaAgentRegistrationForm({ isOpen, onClose }) {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    // Agent Details (Step 0)
    fullName: "", dsaId: "", gender: "", dob: "", profilePhoto: null,
    mobileNumber: "", emailId: "", alternateMobile: "", designation: "",
    dsaType: "", yearsExperience: "",
    username: "", password: "", confirmPassword: "",
    twoFA: false, securityQuestion: "", accepted: false,

    // Company (Step 1)
    companyName: "", companyCode: "", associatedBank: "",
    branchName: "", officeAddress: "", city: "", district: "",
    state: "", pinCode: "", officePhone: "", website: "", gstNumber: "", panNumber: "",

    // Verification (Step 2)
    dsaIdProof: null, authorizationLetter: null,
    panUpload: null, aadhaarUpload: null,
    companyCert: null, bankAuthDoc: null, gstCert: null,
    emailVerified: false, mobileVerified: false, dsaCodeVerified: false,
    joiningDate: "", managerName: "", managerId: "",

    // Products (Step 3)
    loanPurposes: [], amountRange: "",

    // Segment (Step 4)
    customerSegments: [], customerProfiles: [],

    // Service Area (Step 5)
    loanLocation: "", serviceCity: "", serviceState: "",
    servicePincodes: "", preferredLocations: "",
    maxServiceDistance: "", onlineRemote: false, serviceCoverage: "",
  });

  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleArrayItem = (field, value) => {
    const current = formData[field] || [];
    if (current.includes(value)) {
      updateForm(field, current.filter(v => v !== value));
    } else {
      updateForm(field, [...current, value]);
    }
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Profile photo must be less than 2MB");
        return;
      }
      updateForm("profilePhoto", file);
      if (profilePhotoPreview) URL.revokeObjectURL(profilePhotoPreview);
      setProfilePhotoPreview(URL.createObjectURL(file));
    }
  };

  const removeProfilePhoto = () => {
    if (profilePhotoPreview) URL.revokeObjectURL(profilePhotoPreview);
    updateForm("profilePhoto", null);
    setProfilePhotoPreview(null);
  };

  const handleDocumentUpload = (docType, e, maxSize = 2) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File must be less than ${maxSize}MB`);
        return;
      }
      updateForm(docType, file);
    }
  };

  const validateStep = (s) => {
    const e = {};
    if (s === 0) {
      if (!formData.fullName.trim()) e.fullName = "Full name is required";
      else if (!isOnlyLettersAndSpaces(formData.fullName)) e.fullName = "Only letters and spaces allowed";
      if (!formData.dsaId.trim()) e.dsaId = "DSA Agent ID is required";
      if (!formData.mobileNumber || formData.mobileNumber.length !== 10) e.mobileNumber = "Enter a valid 10-digit mobile number";
      if (!formData.emailId || !isValidEmail(formData.emailId)) e.emailId = "Enter a valid email address";
      if (!formData.designation.trim()) e.designation = "Designation is required";
      if (!formData.dsaType) e.dsaType = "Please select a DSA type";
      if (!formData.username.trim()) e.username = "Username is required";
      if (!formData.password) e.password = "Password is required";
      if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords do not match";
      if (!formData.accepted) e.accepted = "You must accept the Terms & Conditions";
    }
    if (s === 1) {
      if (!formData.companyName.trim()) e.companyName = "Company / Agency name is required";
      if (!formData.companyCode.trim()) e.companyCode = "DSA / Agency code is required";
      if (!formData.associatedBank.trim()) e.associatedBank = "Associated bank / NBFC is required";
      if (!formData.officeAddress.trim()) e.officeAddress = "Office address is required";
      if (!formData.city.trim()) e.city = "City is required";
      else if (!isOnlyLettersAndSpaces(formData.city)) e.city = "Only letters and spaces allowed";
      if (!formData.state.trim()) e.state = "State is required";
      else if (!isOnlyLettersAndSpaces(formData.state)) e.state = "Only letters and spaces allowed";
      if (formData.pinCode && !isValidPincode(formData.pinCode)) e.pinCode = "Enter a valid 6-digit PIN code";
    }
    if (s === 2) {
      if (!formData.dsaIdProof) e.dsaIdProof = "DSA ID proof is required";
      if (!formData.panUpload) e.panUpload = "PAN card is required";
      if (!formData.aadhaarUpload) e.aadhaarUpload = "Aadhaar card is required";
      if (!formData.emailVerified) e.emailVerified = "Please verify your official email";
      if (!formData.mobileVerified) e.mobileVerified = "Please verify your mobile number";
    }
    if (s === 3) {
      if (formData.loanPurposes.length === 0) e.loanPurposes = "Select at least one loan product";
    }
    if (s === 4) {
      if (formData.customerSegments.length === 0) e.customerSegments = "Select at least one customer segment";
    }
    if (s === 5) {
      if (!formData.loanLocation.trim()) e.loanLocation = "Loan processing location is required";
      if (!formData.serviceCity.trim()) e.serviceCity = "City is required";
      if (!formData.serviceState.trim()) e.serviceState = "State is required";
      if (!formData.serviceCoverage) e.serviceCoverage = "Please select a service coverage";
    }
    return e;
  };

  const handleSubmit = () => {
    try {
      console.log("DSA Agent Registration submitted:", formData);
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
          <div className="relative flex flex-col items-center justify-center px-4 pt-3 pb-3 overflow-hidden shrink-0 rounded-t-3xl"
            style={{ background: "linear-gradient(160deg,#00695C 0%,#00897B 45%,#26A69A 75%,#80CBC4 100%)", minHeight: 75 }}>
            <button onClick={onClose} className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10">
              <ArrowLeft className="w-3.5 h-3.5 text-white" />
            </button>
            <button onClick={onClose} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10 text-white font-bold text-[11px]">✕</button>
            <div className="text-xl mb-0.5 relative z-10">🧑‍💼</div>
            <h1 className="text-[13px] font-extrabold text-white tracking-wide relative z-10 text-center">DSA Agent Registration</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5 text-center">Register as a DSA agent or agency</p>
          </div>

          <div className="text-center px-3 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-100 border-b border-teal-200 shrink-0">
            <h2 className="text-[12px] font-bold text-[#00695C]">{steps[step]}</h2>
            <p className="text-[9px] text-green-500 mt-0.5">Step {step + 1} of {steps.length} — {subtitles[step]}</p>
          </div>

          <div className="flex items-start justify-between px-1 py-1.5 shrink-0 border-b border-gray-100 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center min-w-[38px]">
                <div className={`w-5 h-5 rounded-full text-[9px] flex items-center justify-center font-bold ${i < step ? "bg-green-500 text-white" : i === step ? "bg-[#00695C] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <p className={`text-[7px] mt-0.5 text-center px-0.5 leading-tight ${i === step ? "text-[#00695C] font-bold" : "text-gray-400"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="px-3 py-2.5 overflow-y-auto flex-1">
            <MobContentDsaAgent
              step={step}
              inp={inMob}
              formData={formData}
              updateForm={updateForm}
              toggleArrayItem={toggleArrayItem}
              profilePhotoPreview={profilePhotoPreview}
              handleProfilePhotoUpload={handleProfilePhotoUpload}
              removeProfilePhoto={removeProfilePhoto}
              handleDocumentUpload={handleDocumentUpload}
              errors={errors}
              genderOptions={genderOptions}
              bankOptions={bankOptions}
              dsaTypeOptions={dsaTypeOptions}
              loanPurposesList={loanPurposesList}
              loanAmountRanges={loanAmountRanges}
              customerSegmentList={customerSegmentList}
              customerProfileList={customerProfileList}
              serviceCoverageOptions={serviceCoverageOptions}
              handleAlphaFieldChange={handleAlphaFieldChange}
              handleNumericFieldChange={handleNumericFieldChange}
              handleAlphanumericFieldChange={handleAlphanumericFieldChange}
              yesNoOptions={yesNoOptions}
            />
          </div>

          <div className="flex flex-col shrink-0 bg-white border-t border-teal-100">
            <div className="h-[2px] w-full bg-gradient-to-r from-[#00695C] via-[#26A69A] to-[#80CBC4]" />
            {step < steps.length - 1 && (
              <div className="px-3 pt-1.5 pb-0.5">
                <div className="flex justify-between mb-0.5">
                  <span className="text-[8px] text-gray-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#26A69A] inline-block" />Form completion</span>
                  <span className="text-[8px] text-[#00695C] font-bold">{Math.round(((step + 1) / steps.length) * 100)}%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00695C] to-[#26A69A] rounded-full transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                </div>
              </div>
            )}
            <div className="flex justify-center gap-1 pt-1">
              {steps.map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${i < step ? 'w-2.5 h-1 bg-green-400' : i === step ? 'w-4 h-1 bg-[#00695C]' : 'w-1 h-1 bg-gray-200'}`} />
              ))}
            </div>
            <div className="flex gap-2 px-3 py-2">
              {step > 0 && (
                <button className="px-3 py-1.5 text-[12px] font-semibold text-[#00695C] bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 flex items-center gap-1" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}
              <button
                className={`flex-1 py-2 text-[12px] font-semibold text-white rounded-xl flex items-center justify-center gap-1 shadow ${step === steps.length - 1 ? 'bg-gradient-to-r from-green-600 to-teal-600' : 'bg-gradient-to-r from-[#00695C] to-[#00897B]'}`}
                onClick={() => {
                  const stepErrors = validateStep(step);
                  if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
                  setErrors({});
                  step === steps.length - 1 ? handleSubmit() : setStep(step + 1);
                }}
              >
                {step === steps.length - 1 ? <><span>✓</span> Submit Form</> : <>Continue →</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="fixed inset-0 bg-black/60 z-50 hidden sm:flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
          <div className="relative flex flex-col items-center justify-center min-h-[65px] px-4 pt-2.5 pb-2.5 overflow-hidden shrink-0 rounded-3xl"
            style={{ background: "linear-gradient(160deg,#00695C 0%,#00897B 45%,#26A69A 75%,#80CBC4 100%)" }}>
            <button onClick={onClose} className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10">
              <ArrowLeft className="w-3.5 h-3.5 text-white" />
            </button>
            <button onClick={onClose} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10 text-white font-bold text-[11px]">✕</button>
            <div className="text-xl mb-0.5 relative z-10">🧑‍💼</div>
            <h1 className="text-[14px] font-extrabold text-white tracking-wide relative z-10">DSA Agent Registration</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5">Register as a DSA agent or agency</p>
          </div>

          <div className="text-center px-4 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-100 border-b border-teal-200 shrink-0">
            <h2 className="text-[12px] font-bold text-[#00695C]">{steps[step]}</h2>
            <p className="text-[9px] text-green-500 mt-0.5">Step {step + 1} of {steps.length} — {subtitles[step]}</p>
          </div>

          <div className="flex items-start justify-between px-1.5 py-1.5 shrink-0 border-b border-gray-100 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center min-w-[42px]">
                <div className={`w-5.5 h-5.5 rounded-full text-[10px] flex items-center justify-center font-bold ${i < step ? "bg-green-500 text-white" : i === step ? "bg-[#00695C] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <p className={`text-[7px] mt-0.5 text-center px-0.5 leading-tight ${i === step ? "text-[#00695C] font-bold" : "text-gray-400"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="px-3 sm:px-4 py-3 overflow-y-auto flex-1">
            <DtContentDsaAgent
              step={step}
              inp={inDt}
              formData={formData}
              updateForm={updateForm}
              toggleArrayItem={toggleArrayItem}
              profilePhotoPreview={profilePhotoPreview}
              handleProfilePhotoUpload={handleProfilePhotoUpload}
              removeProfilePhoto={removeProfilePhoto}
              handleDocumentUpload={handleDocumentUpload}
              errors={errors}
              genderOptions={genderOptions}
              bankOptions={bankOptions}
              dsaTypeOptions={dsaTypeOptions}
              loanPurposesList={loanPurposesList}
              loanAmountRanges={loanAmountRanges}
              customerSegmentList={customerSegmentList}
              customerProfileList={customerProfileList}
              serviceCoverageOptions={serviceCoverageOptions}
              handleAlphaFieldChange={handleAlphaFieldChange}
              handleNumericFieldChange={handleNumericFieldChange}
              handleAlphanumericFieldChange={handleAlphanumericFieldChange}
              yesNoOptions={yesNoOptions}
            />
          </div>

          <div className="flex flex-col shrink-0 bg-white rounded-b-2xl border-t border-teal-100 overflow-hidden">
            <div className="h-[2px] w-full bg-gradient-to-r from-[#00695C] via-[#26A69A] to-[#80CBC4]" />
            {step < steps.length - 1 && (
              <div className="px-4 pt-1.5 pb-0.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[8px] text-gray-400 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#26A69A] inline-block" />Form completion</span>
                  <span className="text-[8px] text-[#00695C] font-bold">{Math.round(((step + 1) / steps.length) * 100)}%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00695C] to-[#26A69A] rounded-full transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                </div>
              </div>
            )}
            <div className="flex justify-center gap-1.5 pt-1">
              {steps.map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${i < step ? 'w-3 h-1.5 bg-green-400' : i === step ? 'w-5 h-1.5 bg-[#00695C]' : 'w-1.5 h-1.5 bg-gray-200'}`} />
              ))}
            </div>
            <div className="flex gap-2 px-4 py-2">
              {step > 0 && (
                <button className="px-4 py-1.5 text-[12px] font-semibold text-[#00695C] bg-teal-50 hover:bg-teal-100 rounded-lg flex items-center gap-1 border border-teal-200" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}
              <button className={`px-5 py-1.5 text-[12px] font-semibold text-white rounded-lg flex items-center gap-1.5 ml-auto shadow-md hover:-translate-y-0.5 ${step === steps.length - 1 ? 'bg-gradient-to-r from-green-600 to-teal-600' : 'bg-gradient-to-r from-[#00695C] to-[#00897B]'}`}
                onClick={() => {
                  const stepErrors = validateStep(step);
                  if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
                  setErrors({});
                  step === steps.length - 1 ? handleSubmit() : setStep(step + 1);
                }}>
                {step === steps.length - 1 ? <><span>✓</span> Submit Form</> : <>Continue <span className="text-sm">→</span></>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// MOBILE CONTENT - DSA Agent
function MobContentDsaAgent({
  step, inp, formData, updateForm, toggleArrayItem,
  profilePhotoPreview, handleProfilePhotoUpload, removeProfilePhoto,
  handleDocumentUpload, errors, genderOptions, bankOptions,
  dsaTypeOptions, loanPurposesList, loanAmountRanges,
  customerSegmentList, customerProfileList, serviceCoverageOptions,
  handleAlphaFieldChange, handleNumericFieldChange, handleAlphanumericFieldChange,
}) {
  // STEP 0: Agent Details
  if (step === 0) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">DSA Agent Details</h3>
      </div>
      <Field label="Full Name" required>
        <input className={inp} placeholder="Enter full name" value={formData.fullName} onChange={(e) => updateForm("fullName", handleAlphaFieldChange(e.target.value))} />
        {errors.fullName && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.fullName}</p>}
      </Field>
      <Field label="DSA Agent ID / Code" required>
        <input className={inp} placeholder="Enter DSA code" value={formData.dsaId} onChange={(e) => updateForm("dsaId", handleAlphanumericFieldChange(e.target.value))} />
        {errors.dsaId && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.dsaId}</p>}
      </Field>
      <Field label="Gender">
        <div className="flex gap-4">
          {genderOptions.map(g => (
            <label key={g} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-dsa-gender" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.gender === g} onChange={() => updateForm("gender", g)} />
              {g}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Date of Birth">
        <input className={inp} type="date" value={formData.dob} onChange={(e) => updateForm("dob", e.target.value)} />
      </Field>
      <Field label="Mobile Number" required>
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} placeholder="10-digit mobile" value={formData.mobileNumber} onChange={(e) => updateForm("mobileNumber", handleNumericFieldChange(e.target.value).slice(0, 10))} />
        {errors.mobileNumber && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.mobileNumber}</p>}
      </Field>
      <Field label="Professional Email" required>
        <input className={inp} type="email" placeholder="Enter email" value={formData.emailId} onChange={(e) => updateForm("emailId", e.target.value)} />
        {errors.emailId && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.emailId}</p>}
      </Field>
      <Field label="Alternate Mobile">
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} placeholder="Optional" value={formData.alternateMobile} onChange={(e) => updateForm("alternateMobile", handleNumericFieldChange(e.target.value).slice(0, 10))} />
      </Field>
      <Field label="Designation" required>
        <input className={inp} placeholder="e.g. Loan Consultant" value={formData.designation} onChange={(e) => updateForm("designation", e.target.value)} />
        {errors.designation && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.designation}</p>}
      </Field>
      <Field label="DSA Type" required>
        <select className={inp} value={formData.dsaType} onChange={(e) => updateForm("dsaType", e.target.value)}>
          <option value="">Select DSA type</option>
          {dsaTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.dsaType && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.dsaType}</p>}
      </Field>
      <Field label="Years of Experience">
        <input className={inp} type="number" min="0" placeholder="e.g. 5" value={formData.yearsExperience} onChange={(e) => updateForm("yearsExperience", handleNumericFieldChange(e.target.value))} />
      </Field>
      <Field label="Profile Photo" hint="Max 2MB">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="image/*" className="hidden" id="m-dsa-photo" onChange={handleProfilePhotoUpload} />
          <label htmlFor="m-dsa-photo" className="cursor-pointer flex flex-col items-center">
            <span className="mb-1 text-lg">📷</span>
            <span className="text-[11px] font-semibold text-[#00695C]">Upload Profile Photo</span>
            <span className="text-[10px] text-gray-400">JPG, PNG (Max 2MB)</span>
          </label>
        </div>
        {profilePhotoPreview && (
          <div className="mt-2 relative inline-block">
            <img src={profilePhotoPreview} alt="Profile" className="w-20 h-20 object-cover rounded-full border-2 border-[#00695C]" />
            <button onClick={removeProfilePhoto} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center">✕</button>
          </div>
        )}
      </Field>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Login & Security</h3>
      </div>
      <Field label="Username / Email" required>
        <input className={inp} value={formData.username} onChange={(e) => updateForm("username", e.target.value)} />
        {errors.username && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.username}</p>}
      </Field>
      <Field label="Password" required>
        <input className={inp} type="password" value={formData.password} onChange={(e) => updateForm("password", e.target.value)} />
        {errors.password && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.password}</p>}
      </Field>
      <Field label="Confirm Password" required>
        <input className={inp} type="password" value={formData.confirmPassword} onChange={(e) => updateForm("confirmPassword", e.target.value)} />
        {errors.confirmPassword && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.confirmPassword}</p>}
      </Field>
      <Field label="Security Question / Recovery">
        <input className={inp} value={formData.securityQuestion} onChange={(e) => updateForm("securityQuestion", e.target.value)} />
      </Field>
      <label className="flex items-center gap-2 text-[11px] cursor-pointer mb-1">
        <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.twoFA} onChange={() => updateForm("twoFA", !formData.twoFA)} />
        Enable Two-Factor Authentication
      </label>
      <label className="flex items-center gap-2 text-[11px] cursor-pointer">
        <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.accepted} onChange={() => updateForm("accepted", !formData.accepted)} />
        I accept the Terms & Conditions <span className="text-red-500">*</span>
      </label>
      {errors.accepted && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.accepted}</p>}
    </>
  );

  // STEP 1: Company
  if (step === 1) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">DSA Company / Agency</h3>
      </div>
      <Field label="Company / Agency Name" required>
        <input className={inp} placeholder="Enter company name" value={formData.companyName} onChange={(e) => updateForm("companyName", e.target.value)} />
        {errors.companyName && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.companyName}</p>}
      </Field>
      <Field label="DSA / Agency Code" required>
        <input className={inp} placeholder="Enter code" value={formData.companyCode} onChange={(e) => updateForm("companyCode", e.target.value)} />
        {errors.companyCode && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.companyCode}</p>}
      </Field>
      <Field label="Associated Bank / NBFC" required>
        <input className={inp} placeholder="e.g. HDFC Bank" value={formData.associatedBank} onChange={(e) => updateForm("associatedBank", e.target.value)} />
        {errors.associatedBank && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.associatedBank}</p>}
      </Field>
      <Field label="Branch / Office Name">
        <input className={inp} value={formData.branchName} onChange={(e) => updateForm("branchName", e.target.value)} />
      </Field>
      <Field label="Office Address" required>
        <input className={inp} placeholder="Enter office address" value={formData.officeAddress} onChange={(e) => updateForm("officeAddress", e.target.value)} />
        {errors.officeAddress && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.officeAddress}</p>}
      </Field>
      <Field label="City" required>
        <input className={inp} placeholder="Enter city" value={formData.city} onChange={(e) => updateForm("city", handleAlphaFieldChange(e.target.value))} />
        {errors.city && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.city}</p>}
      </Field>
      <Field label="District">
        <input className={inp} placeholder="Enter district" value={formData.district} onChange={(e) => updateForm("district", handleAlphaFieldChange(e.target.value))} />
      </Field>
      <Field label="State" required>
        <input className={inp} placeholder="Enter state" value={formData.state} onChange={(e) => updateForm("state", handleAlphaFieldChange(e.target.value))} />
        {errors.state && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.state}</p>}
      </Field>
      <Field label="PIN Code" hint="6 digits">
        <input className={inp} type="tel" inputMode="numeric" maxLength={6} placeholder="Enter PIN code" value={formData.pinCode} onChange={(e) => updateForm("pinCode", handleNumericFieldChange(e.target.value).slice(0, 6))} />
        {errors.pinCode && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.pinCode}</p>}
      </Field>
      <Field label="Office Phone">
        <input className={inp} type="tel" inputMode="numeric" value={formData.officePhone} onChange={(e) => updateForm("officePhone", handleNumericFieldChange(e.target.value))} />
      </Field>
      <Field label="Company Website">
        <input className={inp} placeholder="https://" value={formData.website} onChange={(e) => updateForm("website", e.target.value)} />
      </Field>
      <Field label="GST Number">
        <input className={inp} value={formData.gstNumber} onChange={(e) => updateForm("gstNumber", e.target.value.toUpperCase())} />
      </Field>
      <Field label="PAN Number">
        <input className={inp} value={formData.panNumber} onChange={(e) => updateForm("panNumber", e.target.value.toUpperCase())} />
      </Field>
    </>
  );

  // STEP 2: Verification
  if (step === 2) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">DSA Agent Verification</h3>
      </div>
      <p className="text-[9px] text-gray-400 mb-2">PDF only (Max 2MB per document)</p>

      {[
        { key: "dsaIdProof", label: "DSA ID / Agent ID Proof", required: true },
        { key: "authorizationLetter", label: "DSA Authorization Letter", required: false },
        { key: "panUpload", label: "PAN Card", required: true },
        { key: "aadhaarUpload", label: "Aadhaar / ID Proof", required: true },
        { key: "companyCert", label: "Company Registration Certificate", required: false },
        { key: "bankAuthDoc", label: "Bank / NBFC Authorization", required: false },
        { key: "gstCert", label: "GST Certificate", required: false },
      ].map(({ key, label, required }) => (
        <Field key={key} label={label} required={required} hint="PDF only (Max 2MB)">
          <div className="border-2 border-dashed border-teal-300 rounded-xl p-2.5 text-center hover:bg-green-50">
            <input type="file" accept=".pdf" className="hidden" id={`m-${key}`} onChange={(e) => handleDocumentUpload(key, e)} />
            <label htmlFor={`m-${key}`} className="cursor-pointer flex flex-col items-center">
              <span className="text-lg mb-0.5">📄</span>
              <span className="text-[10px] font-semibold text-[#00695C]">Upload {label}</span>
            </label>
          </div>
          {formData[key] && <p className="text-[10px] text-green-600 mt-1">✓ {formData[key].name}</p>}
          {errors[key] && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors[key]}</p>}
        </Field>
      ))}

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Verifications</h3>
      </div>
      <label className="flex items-center gap-2 text-[11px] cursor-pointer mb-1">
        <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.emailVerified} onChange={() => updateForm("emailVerified", !formData.emailVerified)} />
        Official Email Verification <span className="text-red-500">*</span>
      </label>
      {errors.emailVerified && <p className="text-[10px] text-red-500 font-medium ml-5 mb-1">{errors.emailVerified}</p>}
      <label className="flex items-center gap-2 text-[11px] cursor-pointer mb-1">
        <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.mobileVerified} onChange={() => updateForm("mobileVerified", !formData.mobileVerified)} />
        Mobile Number Verification <span className="text-red-500">*</span>
      </label>
      {errors.mobileVerified && <p className="text-[10px] text-red-500 font-medium ml-5 mb-1">{errors.mobileVerified}</p>}
      <label className="flex items-center gap-2 text-[11px] cursor-pointer mb-2">
        <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.dsaCodeVerified} onChange={() => updateForm("dsaCodeVerified", !formData.dsaCodeVerified)} />
        DSA Code Verification
      </label>

      <Field label="Joining / Registration Date">
        <input className={inp} type="date" value={formData.joiningDate} onChange={(e) => updateForm("joiningDate", e.target.value)} />
      </Field>
      <Field label="Reporting Manager Name">
        <input className={inp} value={formData.managerName} onChange={(e) => updateForm("managerName", e.target.value)} />
      </Field>
      <Field label="Manager ID / Code">
        <input className={inp} value={formData.managerId} onChange={(e) => updateForm("managerId", e.target.value)} />
      </Field>
    </>
  );

  // STEP 3: Products
  if (step === 3) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Loan Products Handled</h3>
      </div>
      <p className="text-[10px] text-gray-400 mb-2">Select all loan products you can offer</p>
      <div className="grid grid-cols-2 gap-1 mb-3">
        {loanPurposesList.map(p => (
          <label key={p} className="flex items-center gap-1 text-[10px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.loanPurposes.includes(p)} onChange={() => toggleArrayItem("loanPurposes", p)} />
            {p}
          </label>
        ))}
      </div>
      {errors.loanPurposes && <p className="text-[10px] text-red-500 font-medium mb-2">{errors.loanPurposes}</p>}

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Preferred Loan Amount Range</h3>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {loanAmountRanges.map(r => (
          <label key={r} className="flex items-center gap-1 text-[10px] cursor-pointer">
            <input type="radio" name="mob-amount-range" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.amountRange === r} onChange={() => updateForm("amountRange", r)} />
            {r}
          </label>
        ))}
      </div>
    </>
  );

  // STEP 4: Customer Segment
  if (step === 4) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Preferred Customer Segment</h3>
      </div>
      <div className="grid grid-cols-2 gap-1 mb-3">
        {customerSegmentList.map(s => (
          <label key={s} className="flex items-center gap-1 text-[10px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.customerSegments.includes(s)} onChange={() => toggleArrayItem("customerSegments", s)} />
            {s}
          </label>
        ))}
      </div>
      {errors.customerSegments && <p className="text-[10px] text-red-500 font-medium mb-2">{errors.customerSegments}</p>}

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Customer Profile Handled</h3>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {customerProfileList.map(s => (
          <label key={s} className="flex items-center gap-1 text-[10px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.customerProfiles.includes(s)} onChange={() => toggleArrayItem("customerProfiles", s)} />
            {s}
          </label>
        ))}
      </div>
    </>
  );

  // STEP 5: Service Area
  if (step === 5) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Service Area</h3>
      </div>
      <Field label="Loan Processing Location" required>
        <input className={inp} value={formData.loanLocation} onChange={(e) => updateForm("loanLocation", e.target.value)} />
        {errors.loanLocation && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.loanLocation}</p>}
      </Field>
      <Field label="City / District" required>
        <input className={inp} value={formData.serviceCity} onChange={(e) => updateForm("serviceCity", e.target.value)} />
        {errors.serviceCity && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.serviceCity}</p>}
      </Field>
      <Field label="State" required>
        <input className={inp} value={formData.serviceState} onChange={(e) => updateForm("serviceState", e.target.value)} />
        {errors.serviceState && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.serviceState}</p>}
      </Field>
      <Field label="Serviceable PIN Codes">
        <input className={inp} placeholder="Comma separated" value={formData.servicePincodes} onChange={(e) => updateForm("servicePincodes", e.target.value)} />
      </Field>
      <Field label="Preferred Service Locations">
        <input className={inp} value={formData.preferredLocations} onChange={(e) => updateForm("preferredLocations", e.target.value)} />
      </Field>
      <Field label="Maximum Service Distance">
        <input className={inp} placeholder="e.g. 50 km" value={formData.maxServiceDistance} onChange={(e) => updateForm("maxServiceDistance", e.target.value)} />
      </Field>
      <label className="flex items-center gap-2 text-[11px] cursor-pointer mb-2">
        <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.onlineRemote} onChange={() => updateForm("onlineRemote", !formData.onlineRemote)} />
        Online / Remote Service Available
      </label>

      <Field label="Service Coverage" required>
        <div className="grid grid-cols-2 gap-1">
          {serviceCoverageOptions.map(s => (
            <label key={s} className="flex items-center gap-1 text-[10px] cursor-pointer">
              <input type="radio" name="mob-coverage" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.serviceCoverage === s} onChange={() => updateForm("serviceCoverage", s)} />
              {s}
            </label>
          ))}
        </div>
        {errors.serviceCoverage && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.serviceCoverage}</p>}
      </Field>
    </>
  );

  return null;
}

// DESKTOP CONTENT - DSA Agent
function DtContentDsaAgent({
  step, inp, formData, updateForm, toggleArrayItem,
  profilePhotoPreview, handleProfilePhotoUpload, removeProfilePhoto,
  handleDocumentUpload, errors, genderOptions, bankOptions,
  dsaTypeOptions, loanPurposesList, loanAmountRanges,
  customerSegmentList, customerProfileList, serviceCoverageOptions,
  handleAlphaFieldChange, handleNumericFieldChange, handleAlphanumericFieldChange,
}) {
  // STEP 0: Agent Details
  if (step === 0) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">DSA Agent Details</h3>
      </div>
      <FieldDt label="Full Name" required>
        <input className={inp} placeholder="Enter full name" value={formData.fullName} onChange={(e) => updateForm("fullName", handleAlphaFieldChange(e.target.value))} />
        {errors.fullName && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.fullName}</p>}
      </FieldDt>
      <FieldDt label="DSA Agent ID / Code" required>
        <input className={inp} placeholder="Enter DSA code" value={formData.dsaId} onChange={(e) => updateForm("dsaId", handleAlphanumericFieldChange(e.target.value))} />
        {errors.dsaId && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.dsaId}</p>}
      </FieldDt>
      <FieldDt label="Gender">
        <div className="flex gap-5">
          {genderOptions.map(g => (
            <label key={g} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-dsa-gender" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.gender === g} onChange={() => updateForm("gender", g)} />
              {g}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Date of Birth">
        <input className={inp} type="date" value={formData.dob} onChange={(e) => updateForm("dob", e.target.value)} />
      </FieldDt>
      <FieldDt label="Mobile Number" required>
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} placeholder="10-digit mobile" value={formData.mobileNumber} onChange={(e) => updateForm("mobileNumber", handleNumericFieldChange(e.target.value).slice(0, 10))} />
        {errors.mobileNumber && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.mobileNumber}</p>}
      </FieldDt>
      <FieldDt label="Professional Email" required>
        <input className={inp} type="email" placeholder="Enter email" value={formData.emailId} onChange={(e) => updateForm("emailId", e.target.value)} />
        {errors.emailId && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.emailId}</p>}
      </FieldDt>
      <FieldDt label="Alternate Mobile">
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} placeholder="Optional" value={formData.alternateMobile} onChange={(e) => updateForm("alternateMobile", handleNumericFieldChange(e.target.value).slice(0, 10))} />
      </FieldDt>
      <FieldDt label="Designation" required>
        <input className={inp} placeholder="e.g. Loan Consultant" value={formData.designation} onChange={(e) => updateForm("designation", e.target.value)} />
        {errors.designation && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.designation}</p>}
      </FieldDt>
      <FieldDt label="DSA Type" required>
        <select className={inp} value={formData.dsaType} onChange={(e) => updateForm("dsaType", e.target.value)}>
          <option value="">Select DSA type</option>
          {dsaTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.dsaType && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.dsaType}</p>}
      </FieldDt>
      <FieldDt label="Years of Experience">
        <input className={inp} type="number" min="0" placeholder="e.g. 5" value={formData.yearsExperience} onChange={(e) => updateForm("yearsExperience", handleNumericFieldChange(e.target.value))} />
      </FieldDt>
      <FieldDt label="Profile Photo" hint="Max 2MB">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="image/*" className="hidden" id="dt-dsa-photo" onChange={handleProfilePhotoUpload} />
          <label htmlFor="dt-dsa-photo" className="cursor-pointer flex flex-col items-center">
            <span className="mb-1 text-xl">📷</span>
            <span className="text-[12px] font-semibold text-[#00695C]">Upload Profile Photo</span>
            <span className="text-[11px] text-gray-400">JPG, PNG (Max 2MB)</span>
          </label>
        </div>
        {profilePhotoPreview && (
          <div className="mt-2 relative inline-block">
            <img src={profilePhotoPreview} alt="Profile" className="w-24 h-24 object-cover rounded-full border-2 border-[#00695C]" />
            <button onClick={removeProfilePhoto} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] flex items-center justify-center">✕</button>
          </div>
        )}
      </FieldDt>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Login & Security</h3>
      </div>
      <FieldDt label="Username / Email" required>
        <input className={inp} value={formData.username} onChange={(e) => updateForm("username", e.target.value)} />
        {errors.username && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.username}</p>}
      </FieldDt>
      <FieldDt label="Password" required>
        <input className={inp} type="password" value={formData.password} onChange={(e) => updateForm("password", e.target.value)} />
        {errors.password && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.password}</p>}
      </FieldDt>
      <FieldDt label="Confirm Password" required>
        <input className={inp} type="password" value={formData.confirmPassword} onChange={(e) => updateForm("confirmPassword", e.target.value)} />
        {errors.confirmPassword && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.confirmPassword}</p>}
      </FieldDt>
      <FieldDt label="Security Question / Recovery">
        <input className={inp} value={formData.securityQuestion} onChange={(e) => updateForm("securityQuestion", e.target.value)} />
      </FieldDt>
      <label className="flex items-center gap-2 text-[13px] cursor-pointer mb-2">
        <input type="checkbox" className="accent-[#00695C] w-4 h-4" checked={formData.twoFA} onChange={() => updateForm("twoFA", !formData.twoFA)} />
        Enable Two-Factor Authentication
      </label>
      <label className="flex items-center gap-2 text-[13px] cursor-pointer">
        <input type="checkbox" className="accent-[#00695C] w-4 h-4" checked={formData.accepted} onChange={() => updateForm("accepted", !formData.accepted)} />
        I accept the Terms & Conditions <span className="text-red-500">*</span>
      </label>
      {errors.accepted && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.accepted}</p>}
    </>
  );

  // STEP 1: Company
  if (step === 1) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">DSA Company / Agency</h3>
      </div>
      <FieldDt label="Company / Agency Name" required>
        <input className={inp} placeholder="Enter company name" value={formData.companyName} onChange={(e) => updateForm("companyName", e.target.value)} />
        {errors.companyName && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.companyName}</p>}
      </FieldDt>
      <FieldDt label="DSA / Agency Code" required>
        <input className={inp} placeholder="Enter code" value={formData.companyCode} onChange={(e) => updateForm("companyCode", e.target.value)} />
        {errors.companyCode && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.companyCode}</p>}
      </FieldDt>
      <FieldDt label="Associated Bank / NBFC" required>
        <input className={inp} placeholder="e.g. HDFC Bank" value={formData.associatedBank} onChange={(e) => updateForm("associatedBank", e.target.value)} />
        {errors.associatedBank && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.associatedBank}</p>}
      </FieldDt>
      <FieldDt label="Branch / Office Name">
        <input className={inp} value={formData.branchName} onChange={(e) => updateForm("branchName", e.target.value)} />
      </FieldDt>
      <FieldDt label="Office Address" required>
        <input className={inp} placeholder="Enter office address" value={formData.officeAddress} onChange={(e) => updateForm("officeAddress", e.target.value)} />
        {errors.officeAddress && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.officeAddress}</p>}
      </FieldDt>
      <FieldDt label="City" required>
        <input className={inp} placeholder="Enter city" value={formData.city} onChange={(e) => updateForm("city", handleAlphaFieldChange(e.target.value))} />
        {errors.city && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.city}</p>}
      </FieldDt>
      <FieldDt label="District">
        <input className={inp} placeholder="Enter district" value={formData.district} onChange={(e) => updateForm("district", handleAlphaFieldChange(e.target.value))} />
      </FieldDt>
      <FieldDt label="State" required>
        <input className={inp} placeholder="Enter state" value={formData.state} onChange={(e) => updateForm("state", handleAlphaFieldChange(e.target.value))} />
        {errors.state && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.state}</p>}
      </FieldDt>
      <FieldDt label="PIN Code" hint="6 digits">
        <input className={inp} type="tel" inputMode="numeric" maxLength={6} placeholder="Enter PIN code" value={formData.pinCode} onChange={(e) => updateForm("pinCode", handleNumericFieldChange(e.target.value).slice(0, 6))} />
        {errors.pinCode && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.pinCode}</p>}
      </FieldDt>
      <FieldDt label="Office Phone">
        <input className={inp} type="tel" inputMode="numeric" value={formData.officePhone} onChange={(e) => updateForm("officePhone", handleNumericFieldChange(e.target.value))} />
      </FieldDt>
      <FieldDt label="Company Website">
        <input className={inp} placeholder="https://" value={formData.website} onChange={(e) => updateForm("website", e.target.value)} />
      </FieldDt>
      <FieldDt label="GST Number">
        <input className={inp} value={formData.gstNumber} onChange={(e) => updateForm("gstNumber", e.target.value.toUpperCase())} />
      </FieldDt>
      <FieldDt label="PAN Number">
        <input className={inp} value={formData.panNumber} onChange={(e) => updateForm("panNumber", e.target.value.toUpperCase())} />
      </FieldDt>
    </>
  );

  // STEP 2: Verification
  if (step === 2) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">DSA Agent Verification</h3>
      </div>
      <p className="text-[11px] text-gray-400 mb-3">PDF only (Max 2MB per document)</p>

      {[
        { key: "dsaIdProof", label: "DSA ID / Agent ID Proof", required: true },
        { key: "authorizationLetter", label: "DSA Authorization Letter", required: false },
        { key: "panUpload", label: "PAN Card", required: true },
        { key: "aadhaarUpload", label: "Aadhaar / ID Proof", required: true },
        { key: "companyCert", label: "Company Registration Certificate", required: false },
        { key: "bankAuthDoc", label: "Bank / NBFC Authorization", required: false },
        { key: "gstCert", label: "GST Certificate", required: false },
      ].map(({ key, label, required }) => (
        <FieldDt key={key} label={label} required={required} hint="PDF only (Max 2MB)">
          <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
            <input type="file" accept=".pdf" className="hidden" id={`dt-${key}`} onChange={(e) => handleDocumentUpload(key, e)} />
            <label htmlFor={`dt-${key}`} className="cursor-pointer flex flex-col items-center">
              <span className="text-xl mb-0.5">📄</span>
              <span className="text-[12px] font-semibold text-[#00695C]">Upload {label}</span>
            </label>
          </div>
          {formData[key] && <p className="text-[13px] text-green-600 mt-2">✓ {formData[key].name}</p>}
          {errors[key] && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors[key]}</p>}
        </FieldDt>
      ))}

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Verifications</h3>
      </div>
      <label className="flex items-center gap-2 text-[13px] cursor-pointer mb-2">
        <input type="checkbox" className="accent-[#00695C] w-4 h-4" checked={formData.emailVerified} onChange={() => updateForm("emailVerified", !formData.emailVerified)} />
        Official Email Verification <span className="text-red-500">*</span>
      </label>
      {errors.emailVerified && <p className="text-[10px] text-red-500 font-medium ml-6 mb-1">{errors.emailVerified}</p>}
      <label className="flex items-center gap-2 text-[13px] cursor-pointer mb-2">
        <input type="checkbox" className="accent-[#00695C] w-4 h-4" checked={formData.mobileVerified} onChange={() => updateForm("mobileVerified", !formData.mobileVerified)} />
        Mobile Number Verification <span className="text-red-500">*</span>
      </label>
      {errors.mobileVerified && <p className="text-[10px] text-red-500 font-medium ml-6 mb-1">{errors.mobileVerified}</p>}
      <label className="flex items-center gap-2 text-[13px] cursor-pointer mb-3">
        <input type="checkbox" className="accent-[#00695C] w-4 h-4" checked={formData.dsaCodeVerified} onChange={() => updateForm("dsaCodeVerified", !formData.dsaCodeVerified)} />
        DSA Code Verification
      </label>

      <FieldDt label="Joining / Registration Date">
        <input className={inp} type="date" value={formData.joiningDate} onChange={(e) => updateForm("joiningDate", e.target.value)} />
      </FieldDt>
      <FieldDt label="Reporting Manager Name">
        <input className={inp} value={formData.managerName} onChange={(e) => updateForm("managerName", e.target.value)} />
      </FieldDt>
      <FieldDt label="Manager ID / Code">
        <input className={inp} value={formData.managerId} onChange={(e) => updateForm("managerId", e.target.value)} />
      </FieldDt>
    </>
  );

  // STEP 3: Products
  if (step === 3) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Loan Products Handled</h3>
      </div>
      <p className="text-[12px] text-gray-400 mb-3">Select all loan products you can offer</p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {loanPurposesList.map(p => (
          <label key={p} className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.loanPurposes.includes(p)} onChange={() => toggleArrayItem("loanPurposes", p)} />
            {p}
          </label>
        ))}
      </div>
      {errors.loanPurposes && <p className="text-[10px] text-red-500 font-medium mb-3">{errors.loanPurposes}</p>}

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Preferred Loan Amount Range</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {loanAmountRanges.map(r => (
          <label key={r} className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="radio" name="dt-amount-range" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.amountRange === r} onChange={() => updateForm("amountRange", r)} />
            {r}
          </label>
        ))}
      </div>
    </>
  );

  // STEP 4: Customer Segment
  if (step === 4) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Preferred Customer Segment</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {customerSegmentList.map(s => (
          <label key={s} className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.customerSegments.includes(s)} onChange={() => toggleArrayItem("customerSegments", s)} />
            {s}
          </label>
        ))}
      </div>
      {errors.customerSegments && <p className="text-[10px] text-red-500 font-medium mb-3">{errors.customerSegments}</p>}

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Customer Profile Handled</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {customerProfileList.map(s => (
          <label key={s} className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.customerProfiles.includes(s)} onChange={() => toggleArrayItem("customerProfiles", s)} />
            {s}
          </label>
        ))}
      </div>
    </>
  );

  // STEP 5: Service Area
  if (step === 5) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Service Area</h3>
      </div>
      <FieldDt label="Loan Processing Location" required>
        <input className={inp} value={formData.loanLocation} onChange={(e) => updateForm("loanLocation", e.target.value)} />
        {errors.loanLocation && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.loanLocation}</p>}
      </FieldDt>
      <FieldDt label="City / District" required>
        <input className={inp} value={formData.serviceCity} onChange={(e) => updateForm("serviceCity", e.target.value)} />
        {errors.serviceCity && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.serviceCity}</p>}
      </FieldDt>
      <FieldDt label="State" required>
        <input className={inp} value={formData.serviceState} onChange={(e) => updateForm("serviceState", e.target.value)} />
        {errors.serviceState && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.serviceState}</p>}
      </FieldDt>
      <FieldDt label="Serviceable PIN Codes">
        <input className={inp} placeholder="Comma separated" value={formData.servicePincodes} onChange={(e) => updateForm("servicePincodes", e.target.value)} />
      </FieldDt>
      <FieldDt label="Preferred Service Locations">
        <input className={inp} value={formData.preferredLocations} onChange={(e) => updateForm("preferredLocations", e.target.value)} />
      </FieldDt>
      <FieldDt label="Maximum Service Distance">
        <input className={inp} placeholder="e.g. 50 km" value={formData.maxServiceDistance} onChange={(e) => updateForm("maxServiceDistance", e.target.value)} />
      </FieldDt>
      <label className="flex items-center gap-2 text-[13px] cursor-pointer mb-3">
        <input type="checkbox" className="accent-[#00695C] w-4 h-4" checked={formData.onlineRemote} onChange={() => updateForm("onlineRemote", !formData.onlineRemote)} />
        Online / Remote Service Available
      </label>

      <FieldDt label="Service Coverage" required>
        <div className="grid grid-cols-2 gap-2">
          {serviceCoverageOptions.map(s => (
            <label key={s} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-coverage" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.serviceCoverage === s} onChange={() => updateForm("serviceCoverage", s)} />
              {s}
            </label>
          ))}
        </div>
        {errors.serviceCoverage && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.serviceCoverage}</p>}
      </FieldDt>
    </>
  );

  return null;
}