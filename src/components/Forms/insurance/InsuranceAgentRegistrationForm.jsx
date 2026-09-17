// src/components/Forms/insurance/InsuranceAgentRegistrationForm.jsx
import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const steps = [
  "Personal Details",
  "Professional Details",
  "Company Details",
  "Products",
  "Services",
  "Service Area",
  "Experience",
  "Documents",
  "Bank Details",
  "Login Details",
  "Declaration",
];

const subtitles = [
  "Your personal information",
  "Your professional background",
  "Your insurance company",
  "Products you offer",
  "Services you provide",
  "Where you operate",
  "Your experience & business",
  "Upload verification documents",
  "Payment information",
  "Secure login credentials",
  "Confirm and submit",
];

const agentTypeOptions = [
  "Individual Insurance Agent",
  "Corporate Agent",
  "Insurance Broker",
  "POSP / Authorized Agent",
  "Agency Representative",
];

const insuranceProductsList = [
  "Home Insurance",
  "Property Insurance",
  "Accidental Insurance",
  "Building Insurance",
  "Contents Insurance",
  "Landlord Insurance",
  "Commercial Property Insurance",
  "Industrial Property Insurance",
  "Burglary Insurance",
  "Property Liability Insurance",
];

const servicesOfferedList = [
  "Insurance Consultation",
  "Insurance Quote",
  "Policy Issuance",
  "Policy Renewal",
  "Policy Modification",
  "Claim Assistance",
  "Property Risk Assessment",
  "Document Assistance",
  "Customer Support",
];

const serviceAreaOptions = [
  "Local",
  "District",
  "State",
  "Multiple States",
  "Pan India",
];

const contactMethodOptions = ["Phone", "Email", "WhatsApp", "In-Person"];
const accountTypeOptions = ["Savings", "Current", "Other"];
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

export default function InsuranceAgentRegistrationForm({ isOpen, onClose }) {
  const [step, setStep] = useState(0);

  // ✅ Refs for auto-scroll-to-top on step change
  const contentRef = useRef(null);    // mobile content scroll container
  const contentRefDt = useRef(null);  // desktop content scroll container

  const [formData, setFormData] = useState({
    // Step 0: Personal
    fullName: "", profilePhoto: null, mobileNumber: "", alternateMobile: "",
    emailId: "", dob: "", gender: "", residentialAddress: "",
    city: "", district: "", state: "", pinCode: "",

    // Step 1: Professional
    agentType: "", agentCode: "", agencyName: "", yearsOfExperience: "",
    previousExperience: "", languagesKnown: "", preferredContactMethod: "",

    // Step 2: Company
    insuranceCompanyName: "", companyCode: "",
    agentLicenseNumber: "", licenseIssueDate: "", licenseExpiryDate: "",
    irdaiDetails: "", agentIdCard: null,

    // Step 3: Products
    insuranceProducts: [],

    // Step 4: Services
    servicesOffered: [],

    // Step 5: Service Area
    stateSA: "", districtSA: "", citySA: "", serviceablePincodes: "",
    serviceRadius: "", serviceArea: [],

    // Step 6: Experience
    totalExperience: "", homeInsuranceExp: "", propertyInsuranceExp: "",
    fireInsuranceExp: "", policiesHandled: "", activeCustomers: "",
    claimsHandled: "", customerSupport: "",

    // Step 7: Documents
    agentIdCardDoc: null, agentLicenseDoc: null, panCard: null,
    aadhaarIdProof: null, addressProof: null,
    agencyAuthorization: null, companyAppointmentLetter: null, otherDocuments: null,

    // Step 8: Bank
    accountHolderName: "", bankName: "", accountNumber: "", ifscCode: "",
    accountType: "", cancelledCheque: null, upiId: "", gstNumber: "",

    // Step 9: Login
    loginEmail: "", password: "", confirmPassword: "",
    mobileOtpVerify: false, emailVerify: false, twoFA: false,

    // Step 10: Declaration
    confirmAccuracy: false, confirmLicense: false,
    authorizeLeads: false, agreeContact: false, agreeTerms: false,
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
    if (current.includes(value)) updateForm(field, current.filter((v) => v !== value));
    else updateForm(field, [...current, value]);
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
      console.log("Insurance Agent Registration submitted:", formData);
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
              background: "linear-gradient(160deg,#00695C 0%,#00897B 45%,#26A69A 75%,#80CBC4 100%)",
              minHeight: 75,
            }}
          >
            <button onClick={onClose} className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10">
              <ArrowLeft className="w-3.5 h-3.5 text-white" />
            </button>
            <button onClick={onClose} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10 text-white font-bold text-[11px]">✕</button>
            <div className="text-xl mb-0.5 relative z-10">🧑‍💼</div>
            <h1 className="text-[13px] font-extrabold text-white tracking-wide relative z-10 text-center">
              Insurance Agent Registration
            </h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5 text-center">
              Register as an insurance agent
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
              <div key={i} className="flex-1 flex flex-col items-center min-w-[32px]">
                <div className={`w-5 h-5 rounded-full text-[9px] flex items-center justify-center font-bold ${i < step ? "bg-green-500 text-white" : i === step ? "bg-[#00695C] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <p className={`text-[6px] mt-0.5 text-center px-0.5 leading-tight ${i === step ? "text-[#00695C] font-bold" : "text-gray-400"}`}>{s}</p>
              </div>
            ))}
          </div>

          {/* ✅ ref attached for scroll-to-top */}
          <div ref={contentRef} className="px-3 py-2.5 overflow-y-auto flex-1">
            <AgentContent
              step={step}
              inp={inMob}
              formData={formData}
              updateForm={updateForm}
              toggleArrayItem={toggleArrayItem}
              profilePhotoPreview={profilePhotoPreview}
              handleProfilePhotoUpload={handleProfilePhotoUpload}
              removeProfilePhoto={removeProfilePhoto}
              handleDocumentUpload={handleDocumentUpload}
              agentTypeOptions={agentTypeOptions}
              insuranceProductsList={insuranceProductsList}
              servicesOfferedList={servicesOfferedList}
              serviceAreaOptions={serviceAreaOptions}
              contactMethodOptions={contactMethodOptions}
              accountTypeOptions={accountTypeOptions}
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
                  <div className="h-full bg-gradient-to-r from-[#00695C] to-[#26A69A] rounded-full transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                </div>
              </div>
            )}
            <div className="flex justify-center gap-1 pt-1">
              {steps.map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${i < step ? "w-1.5 h-1 bg-green-400" : i === step ? "w-3 h-1 bg-[#00695C]" : "w-1 h-1 bg-gray-200"}`} />
              ))}
            </div>
            <div className="flex gap-2 px-3 py-2">
              {step > 0 && (
                <button className="px-3 py-1.5 text-[12px] font-semibold text-[#00695C] bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 flex items-center gap-1" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}
              <button
                className={`flex-1 py-2 text-[12px] font-semibold text-white rounded-xl flex items-center justify-center gap-1 shadow ${step === steps.length - 1 ? "bg-gradient-to-r from-green-600 to-teal-600" : "bg-gradient-to-r from-[#00695C] to-[#00897B]"}`}
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
          <div
            className="relative flex flex-col items-center justify-center min-h-[65px] px-4 pt-2.5 pb-2.5 overflow-hidden shrink-0 rounded-3xl"
            style={{ background: "linear-gradient(160deg,#00695C 0%,#00897B 45%,#26A69A 75%,#80CBC4 100%)" }}
          >
            <button onClick={onClose} className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10">
              <ArrowLeft className="w-3.5 h-3.5 text-white" />
            </button>
            <button onClick={onClose} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10 text-white font-bold text-[11px]">✕</button>
            <div className="text-xl mb-0.5 relative z-10">🧑‍💼</div>
            <h1 className="text-[14px] font-extrabold text-white tracking-wide relative z-10">Insurance Agent Registration</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5">Register as an insurance agent</p>
          </div>

          <div className="text-center px-4 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-100 border-b border-teal-200 shrink-0">
            <h2 className="text-[12px] font-bold text-[#00695C]">{steps[step]}</h2>
            <p className="text-[9px] text-green-500 mt-0.5">
              Step {step + 1} of {steps.length} — {subtitles[step]}
            </p>
          </div>

          <div className="flex items-start justify-between px-2 sm:px-3 py-1.5 shrink-0 border-b border-gray-100 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center min-w-[32px]">
                <div className={`w-5.5 h-5.5 rounded-full text-[10px] flex items-center justify-center font-bold ${i < step ? "bg-green-500 text-white" : i === step ? "bg-[#00695C] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <p className={`text-[6.5px] mt-0.5 text-center px-0.5 leading-tight ${i === step ? "text-[#00695C] font-bold" : "text-gray-400"}`}>{s}</p>
              </div>
            ))}
          </div>

          {/* ✅ ref attached for scroll-to-top */}
          <div ref={contentRefDt} className="px-3 sm:px-4 py-3 overflow-y-auto flex-1">
            <AgentContent
              step={step}
              inp={inDt}
              formData={formData}
              updateForm={updateForm}
              toggleArrayItem={toggleArrayItem}
              profilePhotoPreview={profilePhotoPreview}
              handleProfilePhotoUpload={handleProfilePhotoUpload}
              removeProfilePhoto={removeProfilePhoto}
              handleDocumentUpload={handleDocumentUpload}
              agentTypeOptions={agentTypeOptions}
              insuranceProductsList={insuranceProductsList}
              servicesOfferedList={servicesOfferedList}
              serviceAreaOptions={serviceAreaOptions}
              contactMethodOptions={contactMethodOptions}
              accountTypeOptions={accountTypeOptions}
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
                  <div className="h-full bg-gradient-to-r from-[#00695C] to-[#26A69A] rounded-full transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                </div>
              </div>
            )}
            <div className="flex justify-center gap-1.5 pt-1">
              {steps.map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${i < step ? "w-2 h-1.5 bg-green-400" : i === step ? "w-3.5 h-1.5 bg-[#00695C]" : "w-1.5 h-1.5 bg-gray-200"}`} />
              ))}
            </div>
            <div className="flex gap-2 px-4 py-2">
              {step > 0 && (
                <button className="px-4 py-1.5 text-[12px] font-semibold text-[#00695C] bg-teal-50 hover:bg-teal-100 rounded-lg flex items-center gap-1 border border-teal-200" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}
              <button
                className={`px-5 py-1.5 text-[12px] font-semibold text-white rounded-lg flex items-center gap-1.5 ml-auto shadow-md hover:-translate-y-0.5 ${step === steps.length - 1 ? "bg-gradient-to-r from-green-600 to-teal-600" : "bg-gradient-to-r from-[#00695C] to-[#00897B]"}`}
                onClick={() => {
                  step === steps.length - 1 ? handleSubmit() : setStep(step + 1);
                }}
              >
                {step === steps.length - 1 ? <><span>✓</span> Submit Form</> : <>Continue <span className="text-sm">→</span></>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   AGENT FORM CONTENT (SHARED mobile+desktop)
   ───────────────────────────────────────────── */
function AgentContent({
  step, inp, formData, updateForm, toggleArrayItem,
  profilePhotoPreview, handleProfilePhotoUpload, removeProfilePhoto,
  handleDocumentUpload, agentTypeOptions, insuranceProductsList,
  servicesOfferedList, serviceAreaOptions, contactMethodOptions,
  accountTypeOptions, yesNoOptions,
  isMobile,
}) {
  const F = isMobile ? Field : FieldDt;
  const headerClass = isMobile ? "flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50" : "flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50";
  const h3Class = isMobile ? "text-[11px] font-bold text-[#00695C]" : "text-[14px] font-bold text-[#00695C]";
  const barClass = isMobile ? "w-1 h-3" : "w-1 h-4";
  const textSm = isMobile ? "text-[11px]" : "text-[13px]";
  const checkClass = isMobile ? "w-3.5 h-3.5" : "w-4 h-4";

  // ── STEP 0: Personal ──
  if (step === 0) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Agent Personal Details</h3>
      </div>
      <F label="Full Name" required>
        <input className={inp} placeholder="Enter full name" value={formData.fullName} onChange={(e) => updateForm("fullName", e.target.value)} />
      </F>
      <F label="Profile Photo" hint="Max 2MB">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="image/*" className="hidden" id={`${isMobile ? "m" : "dt"}-agent-photo`} onChange={handleProfilePhotoUpload} />
          <label htmlFor={`${isMobile ? "m" : "dt"}-agent-photo`} className="cursor-pointer flex flex-col items-center">
            <span className={`mb-1 ${isMobile ? "text-lg" : "text-xl"}`}>📷</span>
            <span className={`${isMobile ? "text-[11px]" : "text-[12px]"} font-semibold text-[#00695C]`}>Upload Profile Photo</span>
            <span className={`${isMobile ? "text-[10px]" : "text-[11px]"} text-gray-400`}>JPG, PNG (Max 2MB)</span>
          </label>
        </div>
        {profilePhotoPreview && (
          <div className="mt-2 relative inline-block">
            <img src={profilePhotoPreview} alt="Profile" className={`object-cover rounded-full border-2 border-[#00695C] ${isMobile ? "w-20 h-20" : "w-24 h-24"}`} />
            <button onClick={removeProfilePhoto} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]">✕</button>
          </div>
        )}
      </F>
      <F label="Mobile Number" required>
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} placeholder="10-digit mobile" value={formData.mobileNumber} onChange={(e) => updateForm("mobileNumber", e.target.value.slice(0, 10))} />
      </F>
      <F label="Alternate Mobile Number">
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} placeholder="Optional" value={formData.alternateMobile} onChange={(e) => updateForm("alternateMobile", e.target.value.slice(0, 10))} />
      </F>
      <F label="Email ID" required>
        <input className={inp} type="email" placeholder="name@example.com" value={formData.emailId} onChange={(e) => updateForm("emailId", e.target.value)} />
      </F>
      <F label="Date of Birth">
        <input className={inp} type="date" value={formData.dob} onChange={(e) => updateForm("dob", e.target.value)} />
      </F>
      <F label="Gender">
        <div className={`flex gap-${isMobile ? "4" : "5"}`}>
          {["Male", "Female", "Other"].map((g) => (
            <label key={g} className={`flex items-center gap-2 ${textSm} cursor-pointer`}>
              <input type="radio" name={`${isMobile ? "m" : "dt"}-agent-gender`} className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.gender === g} onChange={() => updateForm("gender", g)} />
              {g}
            </label>
          ))}
        </div>
      </F>
      <F label="Residential Address" required>
        <input className={inp} placeholder="Enter full address" value={formData.residentialAddress} onChange={(e) => updateForm("residentialAddress", e.target.value)} />
      </F>
      <F label="City" required>
        <input className={inp} value={formData.city} onChange={(e) => updateForm("city", e.target.value)} />
      </F>
      <F label="District">
        <input className={inp} value={formData.district} onChange={(e) => updateForm("district", e.target.value)} />
      </F>
      <F label="State" required>
        <input className={inp} value={formData.state} onChange={(e) => updateForm("state", e.target.value)} />
      </F>
      <F label="PIN Code" required hint="6 digits">
        <input className={inp} type="tel" inputMode="numeric" maxLength={6} value={formData.pinCode} onChange={(e) => updateForm("pinCode", e.target.value.slice(0, 6))} />
      </F>
    </>
  );

  // ── STEP 1: Professional ──
  if (step === 1) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Agent Professional Details</h3>
      </div>
      <F label="Agent Type" required>
        <select className={inp} value={formData.agentType} onChange={(e) => updateForm("agentType", e.target.value)}>
          <option value="">Select Agent Type</option>
          {agentTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </F>
      <F label="Agent / Advisor Code" required>
        <input className={inp} value={formData.agentCode} onChange={(e) => updateForm("agentCode", e.target.value)} />
      </F>
      <F label="Agency Name">
        <input className={inp} value={formData.agencyName} onChange={(e) => updateForm("agencyName", e.target.value)} />
      </F>
      <F label="Years of Experience" required>
        <input className={inp} type="number" min="0" value={formData.yearsOfExperience} onChange={(e) => updateForm("yearsOfExperience", e.target.value)} />
      </F>
      <F label="Previous Experience">
        <input className={inp} placeholder="e.g. Worked at XYZ Insurance" value={formData.previousExperience} onChange={(e) => updateForm("previousExperience", e.target.value)} />
      </F>
      <F label="Languages Known">
        <input className={inp} placeholder="e.g. English, Hindi" value={formData.languagesKnown} onChange={(e) => updateForm("languagesKnown", e.target.value)} />
      </F>
      <F label="Preferred Contact Method">
        <select className={inp} value={formData.preferredContactMethod} onChange={(e) => updateForm("preferredContactMethod", e.target.value)}>
          <option value="">Select method</option>
          {contactMethodOptions.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </F>
    </>
  );

  // ── STEP 2: Company ──
  if (step === 2) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Insurance Company Details</h3>
      </div>
      <F label="Insurance Company Name" required>
        <input className={inp} value={formData.insuranceCompanyName} onChange={(e) => updateForm("insuranceCompanyName", e.target.value)} />
      </F>
      <F label="Insurance Company / Agency Code">
        <input className={inp} value={formData.companyCode} onChange={(e) => updateForm("companyCode", e.target.value)} />
      </F>
      <F label="Agent License / Registration Number" required>
        <input className={inp} value={formData.agentLicenseNumber} onChange={(e) => updateForm("agentLicenseNumber", e.target.value)} />
      </F>
      <F label="License Issue Date">
        <input className={inp} type="date" value={formData.licenseIssueDate} onChange={(e) => updateForm("licenseIssueDate", e.target.value)} />
      </F>
      <F label="License Expiry Date">
        <input className={inp} type="date" value={formData.licenseExpiryDate} onChange={(e) => updateForm("licenseExpiryDate", e.target.value)} />
      </F>
      <F label="IRDAI Registration / Authorization Details">
        <input className={inp} value={formData.irdaiDetails} onChange={(e) => updateForm("irdaiDetails", e.target.value)} />
      </F>
      <F label="Agent ID Card Upload" required hint="PDF only (Max 5MB)">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept=".pdf" className="hidden" id={`${isMobile ? "m" : "dt"}-agent-idcard-step2`} onChange={(e) => handleDocumentUpload("agentIdCard", e)} />
          <label htmlFor={`${isMobile ? "m" : "dt"}-agent-idcard-step2`} className="cursor-pointer flex flex-col items-center">
            <span className={`${isMobile ? "text-xl" : "text-2xl"} mb-1`}>📄</span>
            <span className={`${isMobile ? "text-[10px]" : "text-[12px]"} font-semibold text-[#00695C]`}>Upload Agent ID Card</span>
          </label>
        </div>
        {formData.agentIdCard && <p className={`${isMobile ? "text-[10px]" : "text-[13px]"} text-green-600 mt-1`}>✓ {formData.agentIdCard.name}</p>}
      </F>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 mt-3">
        <p className={`${isMobile ? "text-[10px]" : "text-[11px]"} text-amber-800 leading-snug`}>
          ⚠️ Admin verification will be required before the agent account becomes active.
        </p>
      </div>
    </>
  );

  // ── STEP 3: Products ──
  if (step === 3) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Insurance Products</h3>
      </div>
      <p className={`${isMobile ? "text-[10px]" : "text-[12px]"} text-gray-400 mb-2`}>Select the insurance products you offer</p>
      <div className="grid grid-cols-2 gap-1.5">
        {insuranceProductsList.map((p) => (
          <label key={p} className={`flex items-center gap-1.5 ${isMobile ? "text-[10px]" : "text-[12px]"} cursor-pointer`}>
            <input type="checkbox" className={`accent-[#00695C] cursor-pointer ${checkClass}`} checked={formData.insuranceProducts.includes(p)} onChange={() => toggleArrayItem("insuranceProducts", p)} />
            {p}
          </label>
        ))}
      </div>
    </>
  );

  // ── STEP 4: Services ──
  if (step === 4) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Services Offered</h3>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {servicesOfferedList.map((s) => (
          <label key={s} className={`flex items-center gap-1.5 ${isMobile ? "text-[10px]" : "text-[12px]"} cursor-pointer`}>
            <input type="checkbox" className={`accent-[#00695C] cursor-pointer ${checkClass}`} checked={formData.servicesOffered.includes(s)} onChange={() => toggleArrayItem("servicesOffered", s)} />
            {s}
          </label>
        ))}
      </div>
    </>
  );

  // ── STEP 5: Service Area ──
  if (step === 5) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Service Area</h3>
      </div>
      <F label="State" required>
        <input className={inp} value={formData.stateSA} onChange={(e) => updateForm("stateSA", e.target.value)} />
      </F>
      <F label="District" required>
        <input className={inp} value={formData.districtSA} onChange={(e) => updateForm("districtSA", e.target.value)} />
      </F>
      <F label="City" required>
        <input className={inp} value={formData.citySA} onChange={(e) => updateForm("citySA", e.target.value)} />
      </F>
      <F label="Serviceable PIN Codes">
        <input className={inp} placeholder="Comma separated" value={formData.serviceablePincodes} onChange={(e) => updateForm("serviceablePincodes", e.target.value)} />
      </F>
      <F label="Preferred Service Radius">
        <input className={inp} placeholder="e.g. 50 km" value={formData.serviceRadius} onChange={(e) => updateForm("serviceRadius", e.target.value)} />
      </F>
      <F label="Service Area" required>
        <div className="space-y-2 mt-1">
          {serviceAreaOptions.map((opt) => (
            <label key={opt} className={`flex items-center gap-2 ${textSm} cursor-pointer`}>
              <input type="checkbox" className={`accent-[#00695C] cursor-pointer ${checkClass}`} checked={formData.serviceArea.includes(opt)} onChange={() => toggleArrayItem("serviceArea", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </F>
    </>
  );

  // ── STEP 6: Experience ──
  if (step === 6) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Experience & Business Details</h3>
      </div>
      <F label="Total Insurance Experience" required hint="In years">
        <input className={inp} type="number" min="0" value={formData.totalExperience} onChange={(e) => updateForm("totalExperience", e.target.value)} />
      </F>
      <F label="Home Insurance Experience" hint="In years">
        <input className={inp} type="number" min="0" value={formData.homeInsuranceExp} onChange={(e) => updateForm("homeInsuranceExp", e.target.value)} />
      </F>
      <F label="Property Insurance Experience" hint="In years">
        <input className={inp} type="number" min="0" value={formData.propertyInsuranceExp} onChange={(e) => updateForm("propertyInsuranceExp", e.target.value)} />
      </F>
      <F label="Fire Insurance Experience" hint="In years">
        <input className={inp} type="number" min="0" value={formData.fireInsuranceExp} onChange={(e) => updateForm("fireInsuranceExp", e.target.value)} />
      </F>
      <F label="Number of Policies Handled">
        <input className={inp} type="number" min="0" value={formData.policiesHandled} onChange={(e) => updateForm("policiesHandled", e.target.value)} />
      </F>
      <F label="Number of Active Customers">
        <input className={inp} type="number" min="0" value={formData.activeCustomers} onChange={(e) => updateForm("activeCustomers", e.target.value)} />
      </F>
      <F label="Approximate Claims Handled">
        <input className={inp} type="number" min="0" value={formData.claimsHandled} onChange={(e) => updateForm("claimsHandled", e.target.value)} />
      </F>
      <F label="Customer Support Available">
        <div className="flex gap-5 mt-1">
          {yesNoOptions.map((opt) => (
            <label key={opt} className={`flex items-center gap-2 ${textSm} cursor-pointer`}>
              <input type="radio" name={`${isMobile ? "m" : "dt"}-agent-support`} className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.customerSupport === opt} onChange={() => updateForm("customerSupport", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </F>
    </>
  );

  // ── STEP 7: Documents ──
  if (step === 7) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Document Verification</h3>
      </div>
      <p className={`${isMobile ? "text-[10px]" : "text-[12px]"} text-gray-400 mb-2`}>PDF only (Max 5MB each)</p>
      {[
        { key: "agentIdCardDoc", label: "Agent ID Card", req: true },
        { key: "agentLicenseDoc", label: "Agent License / Certificate", req: true },
        { key: "panCard", label: "PAN Card", req: true },
        { key: "aadhaarIdProof", label: "Aadhaar / ID Proof", req: true },
        { key: "addressProof", label: "Address Proof", req: false },
        { key: "agencyAuthorization", label: "Agency Authorization Letter", req: false },
        { key: "companyAppointmentLetter", label: "Insurance Company Appointment Letter", req: false },
        { key: "otherDocuments", label: "Other Supporting Documents", req: false },
      ].map(({ key, label, req }) => (
        <F key={key} label={label} required={req}>
          <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
            <input type="file" accept=".pdf" className="hidden" id={`${isMobile ? "m" : "dt"}-agent-${key}`} onChange={(e) => handleDocumentUpload(key, e)} />
            <label htmlFor={`${isMobile ? "m" : "dt"}-agent-${key}`} className="cursor-pointer flex flex-col items-center">
              <span className={`${isMobile ? "text-xl" : "text-2xl"} mb-1`}>📄</span>
              <span className={`${isMobile ? "text-[10px]" : "text-[12px]"} font-semibold text-[#00695C]`}>Upload {label}</span>
            </label>
          </div>
          {formData[key] && <p className={`${isMobile ? "text-[10px]" : "text-[13px]"} text-green-600 mt-1`}>✓ {formData[key].name}</p>}
        </F>
      ))}
    </>
  );

  // ── STEP 8: Bank ──
  if (step === 8) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Bank / Payment Details</h3>
      </div>
      <F label="Account Holder Name" required>
        <input className={inp} value={formData.accountHolderName} onChange={(e) => updateForm("accountHolderName", e.target.value)} />
      </F>
      <F label="Bank Name" required>
        <input className={inp} value={formData.bankName} onChange={(e) => updateForm("bankName", e.target.value)} />
      </F>
      <F label="Account Number" required>
        <input className={inp} value={formData.accountNumber} onChange={(e) => updateForm("accountNumber", e.target.value)} />
      </F>
      <F label="IFSC Code" required>
        <input className={inp} value={formData.ifscCode} onChange={(e) => updateForm("ifscCode", e.target.value.toUpperCase())} />
      </F>
      <F label="Account Type">
        <select className={inp} value={formData.accountType} onChange={(e) => updateForm("accountType", e.target.value)}>
          <option value="">Select type</option>
          {accountTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </F>
      <F label="Cancelled Cheque / Bank Proof" hint="PDF or image (Max 5MB)">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept=".pdf,image/*" className="hidden" id={`${isMobile ? "m" : "dt"}-agent-cheque`} onChange={(e) => handleDocumentUpload("cancelledCheque", e)} />
          <label htmlFor={`${isMobile ? "m" : "dt"}-agent-cheque`} className="cursor-pointer flex flex-col items-center">
            <span className={`${isMobile ? "text-xl" : "text-2xl"} mb-1`}>🏦</span>
            <span className={`${isMobile ? "text-[10px]" : "text-[12px]"} font-semibold text-[#00695C]`}>Upload Cancelled Cheque</span>
          </label>
        </div>
        {formData.cancelledCheque && <p className={`${isMobile ? "text-[10px]" : "text-[13px]"} text-green-600 mt-1`}>✓ {formData.cancelledCheque.name}</p>}
      </F>
      <F label="UPI ID">
        <input className={inp} placeholder="e.g. name@upi" value={formData.upiId} onChange={(e) => updateForm("upiId", e.target.value)} />
      </F>
      <F label="GST Number (if applicable)">
        <input className={inp} value={formData.gstNumber} onChange={(e) => updateForm("gstNumber", e.target.value.toUpperCase())} />
      </F>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 mt-3">
        <p className={`${isMobile ? "text-[10px]" : "text-[11px]"} text-blue-800 leading-snug`}>
          🔒 These details are kept private and visible only to authorized payment users.
        </p>
      </div>
    </>
  );

  // ── STEP 9: Login ──
  if (step === 9) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Login Details</h3>
      </div>
      <F label="Email / Username" required>
        <input className={inp} type="email" value={formData.loginEmail} onChange={(e) => updateForm("loginEmail", e.target.value)} />
      </F>
      <F label="Password" required>
        <input className={inp} type="password" value={formData.password} onChange={(e) => updateForm("password", e.target.value)} />
      </F>
      <F label="Confirm Password" required>
        <input className={inp} type="password" value={formData.confirmPassword} onChange={(e) => updateForm("confirmPassword", e.target.value)} />
      </F>
      <label className={`flex items-center gap-2 ${textSm} cursor-pointer mb-2 mt-2`}>
        <input type="checkbox" className={`accent-[#00695C] ${checkClass}`} checked={formData.mobileOtpVerify} onChange={() => updateForm("mobileOtpVerify", !formData.mobileOtpVerify)} />
        Mobile OTP Verification
      </label>
      <label className={`flex items-center gap-2 ${textSm} cursor-pointer mb-2`}>
        <input type="checkbox" className={`accent-[#00695C] ${checkClass}`} checked={formData.emailVerify} onChange={() => updateForm("emailVerify", !formData.emailVerify)} />
        Email Verification
      </label>
      <label className={`flex items-center gap-2 ${textSm} cursor-pointer`}>
        <input type="checkbox" className={`accent-[#00695C] ${checkClass}`} checked={formData.twoFA} onChange={() => updateForm("twoFA", !formData.twoFA)} />
        Two-Factor Authentication
      </label>
    </>
  );

  // ── STEP 10: Declaration ──
  if (step === 10) return (
    <>
      <div className={headerClass}>
        <div className={`${barClass} bg-[#00695C] rounded`} />
        <h3 className={h3Class}>Declaration</h3>
      </div>
      <p className={`${isMobile ? "text-[11px]" : "text-[13px]"} text-gray-600 mb-3 leading-relaxed`}>
        Please read and confirm each point:
      </p>
      {[
        { key: "confirmAccuracy", label: "I confirm that the information provided is accurate." },
        { key: "confirmLicense", label: "I confirm that my insurance license/authorization is valid." },
        { key: "authorizeLeads", label: "I authorize the platform to send relevant customer insurance leads to me." },
        { key: "agreeContact", label: "I agree to contact customers regarding their insurance requirements." },
        { key: "agreeTerms", label: "I agree to the Terms & Conditions and Privacy Policy." },
      ].map(({ key, label }) => (
        <label key={key} className={`flex items-start gap-2 ${textSm} cursor-pointer mb-2`}>
          <input type="checkbox" className={`accent-[#00695C] mt-0.5 ${checkClass}`} checked={formData[key]} onChange={() => updateForm(key, !formData[key])} />
          <span>{label}</span>
        </label>
      ))}
    </>
  );

  return null;
}