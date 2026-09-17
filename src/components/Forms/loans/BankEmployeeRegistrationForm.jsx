// src/components/Forms/loans/BankEmployeeRegistrationForm.jsx
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const steps = [
  "Employee Details",
  "Bank Details",
  "Verification",
  "Products",
  "Service Area",
];

const subtitles = [
  "Enter your personal information",
  "Your branch and bank information",
  "Upload your ID and reporting details",
  "Pick the products you can offer",
  "Where you can process loans",
];

const genderOptions = ["Male", "Female", "Other"];
const yesNoOptions = ["Yes", "No"];
const bankOptions = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank", "Bank of Baroda", "Canara Bank", "Kotak Mahindra Bank", "IndusInd Bank", "Other"];

const loanProductsList = [
  "Home Purchase", "Land / Plot Purchase", "House Construction",
  "Commercial Property Purchase", "Loan Against Property",
  "Home Loan Balance Transfer", "Home Renovation",
  "Plot + Construction Loan", "Builder / Project Home Loan",
  "Commercial Property Loan", "Mortgage Loan",
  "Property Purchase Loan", "Top-Up Loan",
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

export default function BankEmployeeRegistrationForm({ isOpen, onClose }) {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    // Employee Details (Step 0)
    fullName: "", employeeId: "", gender: "", dob: "", profilePhoto: null,
    mobileNumber: "", emailId: "", alternateMobile: "", designation: "", department: "",
    username: "", password: "", confirmPassword: "",
    twoFA: false, securityQuestion: "", accepted: false,

    // Bank Details (Step 1)
    bankName: "", branchName: "", branchCode: "", ifscCode: "",
    bankAddress: "", city: "", district: "", state: "", pinCode: "",
    branchPhone: "",

    // Verification (Step 2)
    idCardDoc: null, joiningDate: "", yearsOfExperience: "",
    managerName: "", managerId: "",

    // Products (Step 3)
    loanProducts: [],

    // Service Area (Step 4)
    loanLocation: "", serviceCity: "", serviceState: "", servicePincodes: "",
    customerSegments: [], customerProfiles: [],
  });

  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const handleSubmit = () => {
    try {
      console.log("Bank Employee Registration submitted:", formData);
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
            <div className="text-xl mb-0.5 relative z-10">🏦</div>
            <h1 className="text-[13px] font-extrabold text-white tracking-wide relative z-10 text-center">Bank Employee Registration</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5 text-center">Register to offer loan products</p>
          </div>

          <div className="text-center px-3 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-100 border-b border-teal-200 shrink-0">
            <h2 className="text-[12px] font-bold text-[#00695C]">{steps[step]}</h2>
            <p className="text-[9px] text-green-500 mt-0.5">Step {step + 1} of {steps.length} — {subtitles[step]}</p>
          </div>

          <div className="flex items-start justify-between px-1.5 py-1.5 shrink-0 border-b border-gray-100 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center min-w-[40px]">
                <div className={`w-5 h-5 rounded-full text-[9px] flex items-center justify-center font-bold ${i < step ? "bg-green-500 text-white" : i === step ? "bg-[#00695C] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <p className={`text-[7px] mt-0.5 text-center px-0.5 leading-tight ${i === step ? "text-[#00695C] font-bold" : "text-gray-400"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="px-3 py-2.5 overflow-y-auto flex-1">
            <MobContentBankEmp
              step={step}
              inp={inMob}
              formData={formData}
              updateForm={updateForm}
              toggleArrayItem={toggleArrayItem}
              profilePhotoPreview={profilePhotoPreview}
              handleProfilePhotoUpload={handleProfilePhotoUpload}
              removeProfilePhoto={removeProfilePhoto}
              handleDocumentUpload={handleDocumentUpload}
              genderOptions={genderOptions}
              bankOptions={bankOptions}
              loanProductsList={loanProductsList}
              customerSegmentList={customerSegmentList}
              customerProfileList={customerProfileList}
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
            <div className="text-xl mb-0.5 relative z-10">🏦</div>
            <h1 className="text-[14px] font-extrabold text-white tracking-wide relative z-10">Bank Employee Registration</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5">Register to offer loan products</p>
          </div>

          <div className="text-center px-4 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-100 border-b border-teal-200 shrink-0">
            <h2 className="text-[12px] font-bold text-[#00695C]">{steps[step]}</h2>
            <p className="text-[9px] text-green-500 mt-0.5">Step {step + 1} of {steps.length} — {subtitles[step]}</p>
          </div>

          <div className="flex items-start justify-between px-2 sm:px-3 py-1.5 shrink-0 border-b border-gray-100 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center min-w-[44px]">
                <div className={`w-5.5 h-5.5 rounded-full text-[10px] flex items-center justify-center font-bold ${i < step ? "bg-green-500 text-white" : i === step ? "bg-[#00695C] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <p className={`text-[7px] mt-0.5 text-center px-0.5 leading-tight ${i === step ? "text-[#00695C] font-bold" : "text-gray-400"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="px-3 sm:px-4 py-3 overflow-y-auto flex-1">
            <DtContentBankEmp
              step={step}
              inp={inDt}
              formData={formData}
              updateForm={updateForm}
              toggleArrayItem={toggleArrayItem}
              profilePhotoPreview={profilePhotoPreview}
              handleProfilePhotoUpload={handleProfilePhotoUpload}
              removeProfilePhoto={removeProfilePhoto}
              handleDocumentUpload={handleDocumentUpload}
              genderOptions={genderOptions}
              bankOptions={bankOptions}
              loanProductsList={loanProductsList}
              customerSegmentList={customerSegmentList}
              customerProfileList={customerProfileList}
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

// MOBILE CONTENT - Bank Employee
function MobContentBankEmp({
  step, inp, formData, updateForm, toggleArrayItem,
  profilePhotoPreview, handleProfilePhotoUpload, removeProfilePhoto,
  handleDocumentUpload, genderOptions, bankOptions,
  loanProductsList, customerSegmentList, customerProfileList,
}) {
  // STEP 0: Employee Details
  if (step === 0) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Employee Details</h3>
      </div>
      <Field label="Full Name" required>
        <input className={inp} placeholder="Enter full name" value={formData.fullName} onChange={(e) => updateForm("fullName", e.target.value)} />
      </Field>
      <Field label="Employee ID" required>
        <input className={inp} placeholder="Enter employee ID" value={formData.employeeId} onChange={(e) => updateForm("employeeId", e.target.value)} />
      </Field>
      <Field label="Gender">
        <div className="flex gap-4">
          {genderOptions.map(g => (
            <label key={g} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-bank-gender" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.gender === g} onChange={() => updateForm("gender", g)} />
              {g}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Date of Birth">
        <input className={inp} type="date" value={formData.dob} onChange={(e) => updateForm("dob", e.target.value)} />
      </Field>
      <Field label="Mobile Number" required>
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} placeholder="10-digit mobile" value={formData.mobileNumber} onChange={(e) => updateForm("mobileNumber", e.target.value)} />
      </Field>
      <Field label="Official Email" required>
        <input className={inp} type="email" placeholder="name@bank.com" value={formData.emailId} onChange={(e) => updateForm("emailId", e.target.value)} />
      </Field>
      <Field label="Alternate Mobile">
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} placeholder="Optional" value={formData.alternateMobile} onChange={(e) => updateForm("alternateMobile", e.target.value)} />
      </Field>
      <Field label="Designation" required>
        <input className={inp} placeholder="e.g. Loan Officer" value={formData.designation} onChange={(e) => updateForm("designation", e.target.value)} />
      </Field>
      <Field label="Department" required>
        <input className={inp} placeholder="e.g. Retail Banking" value={formData.department} onChange={(e) => updateForm("department", e.target.value)} />
      </Field>
      <Field label="Profile Photo" hint="Max 2MB">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="image/*" className="hidden" id="m-bank-photo" onChange={handleProfilePhotoUpload} />
          <label htmlFor="m-bank-photo" className="cursor-pointer flex flex-col items-center">
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
      </Field>
      <Field label="Password" required>
        <input className={inp} type="password" value={formData.password} onChange={(e) => updateForm("password", e.target.value)} />
      </Field>
      <Field label="Confirm Password" required>
        <input className={inp} type="password" value={formData.confirmPassword} onChange={(e) => updateForm("confirmPassword", e.target.value)} />
      </Field>
      <Field label="Security Question / Recovery">
        <input className={inp} placeholder="e.g. Mother's maiden name" value={formData.securityQuestion} onChange={(e) => updateForm("securityQuestion", e.target.value)} />
      </Field>
      <label className="flex items-center gap-2 text-[11px] cursor-pointer mb-1">
        <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.twoFA} onChange={() => updateForm("twoFA", !formData.twoFA)} />
        Enable Two-Factor Authentication
      </label>
      <label className="flex items-center gap-2 text-[11px] cursor-pointer">
        <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.accepted} onChange={() => updateForm("accepted", !formData.accepted)} />
        I accept the Terms & Conditions <span className="text-red-500">*</span>
      </label>
    </>
  );

  // STEP 1: Bank Details
  if (step === 1) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Bank Details</h3>
      </div>
      <Field label="Bank Name" required>
        <select className={inp} value={formData.bankName} onChange={(e) => updateForm("bankName", e.target.value)}>
          <option value="">Select Bank</option>
          {bankOptions.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </Field>
      <Field label="Branch Name" required>
        <input className={inp} placeholder="Enter branch name" value={formData.branchName} onChange={(e) => updateForm("branchName", e.target.value)} />
      </Field>
      <Field label="Branch Code">
        <input className={inp} value={formData.branchCode} onChange={(e) => updateForm("branchCode", e.target.value)} />
      </Field>
      <Field label="IFSC Code" required hint="e.g., SBIN0001234">
        <input className={inp} placeholder="Enter IFSC code" value={formData.ifscCode} onChange={(e) => updateForm("ifscCode", e.target.value.toUpperCase())} />
      </Field>
      <Field label="Bank Address">
        <input className={inp} placeholder="Enter bank address" value={formData.bankAddress} onChange={(e) => updateForm("bankAddress", e.target.value)} />
      </Field>
      <Field label="City" required>
        <input className={inp} placeholder="Enter city" value={formData.city} onChange={(e) => updateForm("city", e.target.value)} />
      </Field>
      <Field label="District">
        <input className={inp} placeholder="Enter district" value={formData.district} onChange={(e) => updateForm("district", e.target.value)} />
      </Field>
      <Field label="State" required>
        <input className={inp} placeholder="Enter state" value={formData.state} onChange={(e) => updateForm("state", e.target.value)} />
      </Field>
      <Field label="PIN Code" hint="6 digits">
        <input className={inp} type="tel" inputMode="numeric" maxLength={6} placeholder="Enter PIN code" value={formData.pinCode} onChange={(e) => updateForm("pinCode", e.target.value)} />
      </Field>
      <Field label="Branch Phone">
        <input className={inp} type="tel" inputMode="numeric" value={formData.branchPhone} onChange={(e) => updateForm("branchPhone", e.target.value)} />
      </Field>
    </>
  );

  // STEP 2: Verification
  if (step === 2) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Employee Verification</h3>
      </div>
      <Field label="Employee ID Card Upload" required hint="PDF only (Max 2MB)">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-2.5 text-center hover:bg-green-50">
          <input type="file" accept=".pdf" className="hidden" id="m-bank-idcard" onChange={(e) => handleDocumentUpload("idCardDoc", e)} />
          <label htmlFor="m-bank-idcard" className="cursor-pointer flex flex-col items-center">
            <span className="text-xl mb-1">📄</span>
            <span className="text-[10px] font-semibold text-[#00695C]">Upload ID Card</span>
            <span className="text-[9px] text-gray-400">PDF only (Max 2MB)</span>
          </label>
        </div>
        {formData.idCardDoc && <p className="text-[10px] text-green-600 mt-1">✓ {formData.idCardDoc.name}</p>}
      </Field>
      <Field label="Joining Date">
        <input className={inp} type="date" value={formData.joiningDate} onChange={(e) => updateForm("joiningDate", e.target.value)} />
      </Field>
      <Field label="Years of Experience">
        <input className={inp} type="number" min="0" placeholder="e.g. 5" value={formData.yearsOfExperience} onChange={(e) => updateForm("yearsOfExperience", e.target.value)} />
      </Field>
      <Field label="Reporting Manager Name">
        <input className={inp} value={formData.managerName} onChange={(e) => updateForm("managerName", e.target.value)} />
      </Field>
      <Field label="Manager Employee ID">
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
      <div className="grid grid-cols-2 gap-1">
        {loanProductsList.map(p => (
          <label key={p} className="flex items-center gap-1 text-[10px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.loanProducts.includes(p)} onChange={() => toggleArrayItem("loanProducts", p)} />
            {p}
          </label>
        ))}
      </div>
    </>
  );

  // STEP 4: Service Area
  if (step === 4) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Service Area</h3>
      </div>
      <Field label="Loan Processing Location" required>
        <input className={inp} value={formData.loanLocation} onChange={(e) => updateForm("loanLocation", e.target.value)} />
      </Field>
      <Field label="City / District" required>
        <input className={inp} value={formData.serviceCity} onChange={(e) => updateForm("serviceCity", e.target.value)} />
      </Field>
      <Field label="State" required>
        <input className={inp} value={formData.serviceState} onChange={(e) => updateForm("serviceState", e.target.value)} />
      </Field>
      <Field label="Serviceable PIN Codes">
        <input className={inp} placeholder="Comma separated" value={formData.servicePincodes} onChange={(e) => updateForm("servicePincodes", e.target.value)} />
      </Field>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Customer Segment</h3>
      </div>
      <Field label="Preferred Customer Segment">
        <div className="grid grid-cols-2 gap-1">
          {customerSegmentList.map(s => (
            <label key={s} className="flex items-center gap-1 text-[9px] cursor-pointer">
              <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.customerSegments.includes(s)} onChange={() => toggleArrayItem("customerSegments", s)} />
              {s}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Customer Profile Handled">
        <div className="grid grid-cols-2 gap-1">
          {customerProfileList.map(s => (
            <label key={s} className="flex items-center gap-1 text-[9px] cursor-pointer">
              <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.customerProfiles.includes(s)} onChange={() => toggleArrayItem("customerProfiles", s)} />
              {s}
            </label>
          ))}
        </div>
      </Field>
    </>
  );

  return null;
}

// DESKTOP CONTENT - Bank Employee
function DtContentBankEmp({
  step, inp, formData, updateForm, toggleArrayItem,
  profilePhotoPreview, handleProfilePhotoUpload, removeProfilePhoto,
  handleDocumentUpload, genderOptions, bankOptions,
  loanProductsList, customerSegmentList, customerProfileList,
}) {
  // STEP 0: Employee Details
  if (step === 0) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Employee Details</h3>
      </div>
      <FieldDt label="Full Name" required>
        <input className={inp} placeholder="Enter full name" value={formData.fullName} onChange={(e) => updateForm("fullName", e.target.value)} />
      </FieldDt>
      <FieldDt label="Employee ID" required>
        <input className={inp} placeholder="Enter employee ID" value={formData.employeeId} onChange={(e) => updateForm("employeeId", e.target.value)} />
      </FieldDt>
      <FieldDt label="Gender">
        <div className="flex gap-5">
          {genderOptions.map(g => (
            <label key={g} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-bank-gender" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.gender === g} onChange={() => updateForm("gender", g)} />
              {g}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Date of Birth">
        <input className={inp} type="date" value={formData.dob} onChange={(e) => updateForm("dob", e.target.value)} />
      </FieldDt>
      <FieldDt label="Mobile Number" required>
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} placeholder="10-digit mobile" value={formData.mobileNumber} onChange={(e) => updateForm("mobileNumber", e.target.value)} />
      </FieldDt>
      <FieldDt label="Official Email" required>
        <input className={inp} type="email" placeholder="name@bank.com" value={formData.emailId} onChange={(e) => updateForm("emailId", e.target.value)} />
      </FieldDt>
      <FieldDt label="Alternate Mobile">
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} placeholder="Optional" value={formData.alternateMobile} onChange={(e) => updateForm("alternateMobile", e.target.value)} />
      </FieldDt>
      <FieldDt label="Designation" required>
        <input className={inp} placeholder="e.g. Loan Officer" value={formData.designation} onChange={(e) => updateForm("designation", e.target.value)} />
      </FieldDt>
      <FieldDt label="Department" required>
        <input className={inp} placeholder="e.g. Retail Banking" value={formData.department} onChange={(e) => updateForm("department", e.target.value)} />
      </FieldDt>
      <FieldDt label="Profile Photo" hint="Max 2MB">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="image/*" className="hidden" id="dt-bank-photo" onChange={handleProfilePhotoUpload} />
          <label htmlFor="dt-bank-photo" className="cursor-pointer flex flex-col items-center">
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
      </FieldDt>
      <FieldDt label="Password" required>
        <input className={inp} type="password" value={formData.password} onChange={(e) => updateForm("password", e.target.value)} />
      </FieldDt>
      <FieldDt label="Confirm Password" required>
        <input className={inp} type="password" value={formData.confirmPassword} onChange={(e) => updateForm("confirmPassword", e.target.value)} />
      </FieldDt>
      <FieldDt label="Security Question / Recovery">
        <input className={inp} placeholder="e.g. Mother's maiden name" value={formData.securityQuestion} onChange={(e) => updateForm("securityQuestion", e.target.value)} />
      </FieldDt>
      <label className="flex items-center gap-2 text-[13px] cursor-pointer mb-2">
        <input type="checkbox" className="accent-[#00695C] w-4 h-4" checked={formData.twoFA} onChange={() => updateForm("twoFA", !formData.twoFA)} />
        Enable Two-Factor Authentication
      </label>
      <label className="flex items-center gap-2 text-[13px] cursor-pointer">
        <input type="checkbox" className="accent-[#00695C] w-4 h-4" checked={formData.accepted} onChange={() => updateForm("accepted", !formData.accepted)} />
        I accept the Terms & Conditions <span className="text-red-500">*</span>
      </label>
    </>
  );

  // STEP 1: Bank Details
  if (step === 1) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Bank Details</h3>
      </div>
      <FieldDt label="Bank Name" required>
        <select className={inp} value={formData.bankName} onChange={(e) => updateForm("bankName", e.target.value)}>
          <option value="">Select Bank</option>
          {bankOptions.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </FieldDt>
      <FieldDt label="Branch Name" required>
        <input className={inp} placeholder="Enter branch name" value={formData.branchName} onChange={(e) => updateForm("branchName", e.target.value)} />
      </FieldDt>
      <FieldDt label="Branch Code">
        <input className={inp} value={formData.branchCode} onChange={(e) => updateForm("branchCode", e.target.value)} />
      </FieldDt>
      <FieldDt label="IFSC Code" required hint="e.g., SBIN0001234">
        <input className={inp} placeholder="Enter IFSC code" value={formData.ifscCode} onChange={(e) => updateForm("ifscCode", e.target.value.toUpperCase())} />
      </FieldDt>
      <FieldDt label="Bank Address">
        <input className={inp} placeholder="Enter bank address" value={formData.bankAddress} onChange={(e) => updateForm("bankAddress", e.target.value)} />
      </FieldDt>
      <FieldDt label="City" required>
        <input className={inp} placeholder="Enter city" value={formData.city} onChange={(e) => updateForm("city", e.target.value)} />
      </FieldDt>
      <FieldDt label="District">
        <input className={inp} placeholder="Enter district" value={formData.district} onChange={(e) => updateForm("district", e.target.value)} />
      </FieldDt>
      <FieldDt label="State" required>
        <input className={inp} placeholder="Enter state" value={formData.state} onChange={(e) => updateForm("state", e.target.value)} />
      </FieldDt>
      <FieldDt label="PIN Code" hint="6 digits">
        <input className={inp} type="tel" inputMode="numeric" maxLength={6} placeholder="Enter PIN code" value={formData.pinCode} onChange={(e) => updateForm("pinCode", e.target.value)} />
      </FieldDt>
      <FieldDt label="Branch Phone">
        <input className={inp} type="tel" inputMode="numeric" value={formData.branchPhone} onChange={(e) => updateForm("branchPhone", e.target.value)} />
      </FieldDt>
    </>
  );

  // STEP 2: Verification
  if (step === 2) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Employee Verification</h3>
      </div>
      <FieldDt label="Employee ID Card Upload" required hint="PDF only (Max 2MB)">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept=".pdf" className="hidden" id="dt-bank-idcard" onChange={(e) => handleDocumentUpload("idCardDoc", e)} />
          <label htmlFor="dt-bank-idcard" className="cursor-pointer flex flex-col items-center">
            <span className="text-2xl mb-1">📄</span>
            <span className="text-[12px] font-semibold text-[#00695C]">Upload ID Card</span>
            <span className="text-[11px] text-gray-400">PDF only (Max 2MB)</span>
          </label>
        </div>
        {formData.idCardDoc && <p className="text-[13px] text-green-600 mt-2">✓ {formData.idCardDoc.name}</p>}
      </FieldDt>
      <FieldDt label="Joining Date">
        <input className={inp} type="date" value={formData.joiningDate} onChange={(e) => updateForm("joiningDate", e.target.value)} />
      </FieldDt>
      <FieldDt label="Years of Experience">
        <input className={inp} type="number" min="0" placeholder="e.g. 5" value={formData.yearsOfExperience} onChange={(e) => updateForm("yearsOfExperience", e.target.value)} />
      </FieldDt>
      <FieldDt label="Reporting Manager Name">
        <input className={inp} value={formData.managerName} onChange={(e) => updateForm("managerName", e.target.value)} />
      </FieldDt>
      <FieldDt label="Manager Employee ID">
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
      <div className="grid grid-cols-2 gap-2">
        {loanProductsList.map(p => (
          <label key={p} className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.loanProducts.includes(p)} onChange={() => toggleArrayItem("loanProducts", p)} />
            {p}
          </label>
        ))}
      </div>
    </>
  );

  // STEP 4: Service Area
  if (step === 4) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Service Area</h3>
      </div>
      <FieldDt label="Loan Processing Location" required>
        <input className={inp} value={formData.loanLocation} onChange={(e) => updateForm("loanLocation", e.target.value)} />
      </FieldDt>
      <FieldDt label="City / District" required>
        <input className={inp} value={formData.serviceCity} onChange={(e) => updateForm("serviceCity", e.target.value)} />
      </FieldDt>
      <FieldDt label="State" required>
        <input className={inp} value={formData.serviceState} onChange={(e) => updateForm("serviceState", e.target.value)} />
      </FieldDt>
      <FieldDt label="Serviceable PIN Codes">
        <input className={inp} placeholder="Comma separated" value={formData.servicePincodes} onChange={(e) => updateForm("servicePincodes", e.target.value)} />
      </FieldDt>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Customer Segment</h3>
      </div>
      <FieldDt label="Preferred Customer Segment">
        <div className="grid grid-cols-2 gap-2">
          {customerSegmentList.map(s => (
            <label key={s} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.customerSegments.includes(s)} onChange={() => toggleArrayItem("customerSegments", s)} />
              {s}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Customer Profile Handled">
        <div className="grid grid-cols-2 gap-2">
          {customerProfileList.map(s => (
            <label key={s} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.customerProfiles.includes(s)} onChange={() => toggleArrayItem("customerProfiles", s)} />
              {s}
            </label>
          ))}
        </div>
      </FieldDt>
    </>
  );

  return null;
}