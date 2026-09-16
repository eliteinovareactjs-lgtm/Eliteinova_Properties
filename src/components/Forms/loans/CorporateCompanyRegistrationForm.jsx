// src/components/Forms/loans/CorporateCompanyRegistrationForm.jsx
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const steps = [
  "Company Details",
  "Representative",
  "Login & Security",
  "Company Verification",
  "Loan Requirements",
  "Requirement Details",
  "Service Area",
  "Applicant Segment",
  "Applicant Profile",
  "Document Management",
];

const subtitles = [
  "Your company information",
  "Authorized representative details",
  "Secure login credentials",
  "Upload company documents",
  "Select the loans your company needs",
  "Details about the required loan",
  "Where you process loans",
  "Applicant categories you handle",
  "Applicant profiles you serve",
  "Documents you can upload",
];

const companyTypeOptions = [
  "Private Limited", "Public Limited", "LLP", "Partnership",
  "Proprietorship", "MNC", "Startup", "Other",
];

const representativeDepartmentOptions = [
  "Finance", "HR", "Administration", "Accounts", "Management",
  "Operations", "Sales", "Other",
];

const businessLoanRequirements = [
  "Business Loan", "Working Capital Loan", "Term Loan", "Corporate Loan",
  "SME Loan", "MSME Loan", "Machinery / Equipment Loan",
  "Commercial Vehicle Loan", "Project Finance", "Business Expansion Loan",
  "Startup Business Loan",
];

const workingCapitalRequirements = [
  "Working Capital Limit", "Cash Credit", "Overdraft Facility",
];

const propertyLoanRequirements = [
  "Commercial Property Purchase", "Office / Corporate Building Purchase",
  "Commercial Property Construction", "Land / Plot Purchase",
  "Industrial Property Purchase", "Warehouse Purchase",
  "Factory / Industrial Building", "Loan Against Property",
  "Property Mortgage Loan", "Commercial Property Balance Transfer",
  "Property Renovation / Expansion", "Top-Up Loan",
];

const otherRequirements = [
  "Loan Refinancing", "Existing Loan Balance Transfer",
  "Debt Consolidation", "Corporate Emergency Funding",
  "Expansion / New Branch Funding", "Project Development Finance",
];

const loanPriorityOptions = ["Urgent", "High", "Normal"];

const applicantSegmentOptions = [
  "Private Limited Companies", "Public Limited Companies", "LLP Companies",
  "Partnership Firms", "Proprietorship Businesses", "MSMEs", "Startups",
  "MNCs", "Manufacturers", "Traders", "Service Companies",
  "IT Companies", "Export / Import Companies", "Builders / Developers",
  "Property Investors", "Commercial Property Owners", "Professionals",
];

const applicantProfileOptions = [
  "New Business Applicant", "Existing Business Owner",
  "Business Expansion Customer", "Working Capital Customer",
  "Property Purchase Customer", "Commercial Property Buyer",
  "Loan Against Property Customer", "Existing Loan Transfer Customer",
  "Debt Consolidation Customer", "Project Finance Customer",
  "Machinery Purchase Customer", "Construction Customer",
  "Startup Funding Customer", "Corporate Expansion Customer",
];

// ── Validation helpers ──
const isOnlyLettersAndSpaces = (value) => /^[A-Za-z\s]*$/.test(value);
const isOnlyDigits = (value) => /^\d*$/.test(value);
const isAlphanumericWithSpaces = (value) => /^[A-Za-z0-9\s]*$/.test(value);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPincode = (code) => /^[0-9]{6}$/.test(code);

const handleAlphaFieldChange = (value) => value.replace(/[^A-Za-z\s]/g, "");
const handleNumericFieldChange = (value) => value.replace(/\D/g, "");
const handleAlphanumericFieldChange = (value) => value.replace(/[^A-Za-z0-9\s]/g, "");

// ── Field wrappers ──
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

export default function CorporateCompanyRegistrationForm({ isOpen, onClose }) {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    // Step 0: Company Details
    companyName: "", registrationNumber: "", companyType: "",
    industry: "", yearOfEstablishment: "", companyLogo: null,
    website: "", officialEmail: "", officialMobile: "", alternateContact: "",
    registeredAddress: "", city: "", district: "", state: "", pinCode: "",
    numberOfEmployees: "", annualTurnover: "", gstNumber: "", panNumber: "", cinLlpin: "",

    // Step 1: Authorized Representative
    repFullName: "", repEmployeeId: "", repDesignation: "", repDepartment: "",
    repEmail: "", repMobile: "", repAlternateMobile: "", repDob: "", repPhoto: null,
    repManagerName: "", repManagerEmail: "", repManagerMobile: "",

    // Step 2: Login & Security
    username: "", password: "", confirmPassword: "",
    twoFA: false, securityQuestion: "", accepted: false,

    // Step 3: Company Verification
    companyRegCert: null, panCard: null, gstCert: null,
    cinLlpinDoc: null, addressProof: null, repIdProof: null,
    repEmployeeIdCard: null, authorizationLetter: null,
    bankStatement: null, auditedFinancials: null, itrDocs: null,
    registrationDate: "", businessVintage: "", employeesCount: "",
    annualTurnoverVerify: "", existingLoans: "", existingBanking: "",
    creditFacilities: "", reportingPerson: "",

    // Step 4: Loan Requirements
    businessLoans: [],
    workingCapitalLoans: [],
    propertyLoans: [],
    otherLoanRequirements: [],

    // Step 5: Requirement Details
    loanPurpose: "", requiredLoanAmount: "", preferredTenure: "",
    expectedInterestRate: "", existingLoanAmount: "", existingEmi: "",
    preferredEmi: "", propertyValue: "", propertyType: "",
    propertyLocation: "", purchaseCost: "", downPayment: "",
    requiredFundingDate: "", loanPriority: "",
    annualTurnover: "", monthlyRevenue: "", monthlyExpenses: "",
    netProfit: "", existingLiabilities: "", existingEmiObligations: "",
    bankAccountDetails: "", cibilScore: "", last3YearsTurnover: "", last3YearsProfit: "",

    // Step 6: Service Area
    loanProcessingLocation: "", serviceCity: "", serviceState: "",
    servicePincodes: "", preferredBranch: "", preferredInstitution: "",
    preferredRm: "", registeredOffice: "", corporateOffice: "",
    branchLocations: "", factoryLocation: "", warehouseLocation: "",
    projectLocation: "", otherLocations: "",

    // Step 7: Applicant Segment
    applicantSegments: [],

    // Step 8: Applicant Profile
    applicantProfiles: [],

    // Step 9: Document Management
    docCompanyRegCert: null, docPan: null, docGst: null,
    docMoaAoa: null, docPartnershipDeed: null, docLlpAgreement: null,
    docCinLlpin: null, docCompanyAddressProof: null,
    docItr: null, docBalanceSheet: null, docProfitLoss: null,
    docBankStatements: null, docGstReturns: null, docProjections: null,
    docExistingLoanStatements: null,
    docSaleDeed: null, docTitleDocuments: null, docEc: null,
    docPattaChitta: null, docPropertyTax: null, docBuildingPlan: null,
    docConstructionEstimate: null, docValuationReport: null,
    docRepPan: null, docRepAadhaar: null, docRepEmployeeId: null,
    docAuthorization: null, docBoardResolution: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [repPhotoPreview, setRepPhotoPreview] = useState(null);
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

  const handleImageUpload = (field, e, setPreview, maxSize = 2) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File must be less than ${maxSize}MB`);
        return;
      }
      updateForm(field, file);
      if (setPreview) {
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const removeImage = (field, preview, setPreview) => {
    if (preview) URL.revokeObjectURL(preview);
    updateForm(field, null);
    if (setPreview) setPreview(null);
  };

  const handleDocumentUpload = (docType, e, maxSize = 5) => {
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
      if (!formData.companyName.trim()) e.companyName = "Company name is required";
      if (!formData.registrationNumber.trim()) e.registrationNumber = "Registration number is required";
      if (!formData.companyType) e.companyType = "Company type is required";
      if (!formData.industry.trim()) e.industry = "Industry / sector is required";
      if (!formData.officialEmail || !isValidEmail(formData.officialEmail)) e.officialEmail = "Enter a valid email";
      if (!formData.officialMobile || formData.officialMobile.length !== 10) e.officialMobile = "Enter a valid 10-digit mobile number";
      if (!formData.registeredAddress.trim()) e.registeredAddress = "Registered office address is required";
      if (!formData.city.trim()) e.city = "City is required";
      else if (!isOnlyLettersAndSpaces(formData.city)) e.city = "Only letters and spaces allowed";
      if (!formData.state.trim()) e.state = "State is required";
      else if (!isOnlyLettersAndSpaces(formData.state)) e.state = "Only letters and spaces allowed";
      if (!formData.pinCode || !isValidPincode(formData.pinCode)) e.pinCode = "Enter a valid 6-digit PIN code";
    }
    if (s === 1) {
      if (!formData.repFullName.trim()) e.repFullName = "Representative name is required";
      else if (!isOnlyLettersAndSpaces(formData.repFullName)) e.repFullName = "Only letters and spaces allowed";
      if (!formData.repDesignation.trim()) e.repDesignation = "Designation is required";
      if (!formData.repDepartment) e.repDepartment = "Department is required";
      if (!formData.repEmail || !isValidEmail(formData.repEmail)) e.repEmail = "Enter a valid email";
      if (!formData.repMobile || formData.repMobile.length !== 10) e.repMobile = "Enter a valid 10-digit mobile number";
    }
    if (s === 2) {
      if (!formData.username.trim()) e.username = "Username is required";
      if (!formData.password) e.password = "Password is required";
      if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords do not match";
      if (!formData.accepted) e.accepted = "You must accept the Terms & Conditions";
    }
    if (s === 3) {
      if (!formData.companyRegCert) e.companyRegCert = "Company Registration Certificate is required";
      if (!formData.panCard) e.panCard = "PAN Card is required";
      if (!formData.addressProof) e.addressProof = "Company Address Proof is required";
      if (!formData.repIdProof) e.repIdProof = "Representative ID Proof is required";
      if (!formData.authorizationLetter) e.authorizationLetter = "Authorization Letter / Board Resolution is required";
    }
    if (s === 4) {
      const total = formData.businessLoans.length + formData.workingCapitalLoans.length +
        formData.propertyLoans.length + formData.otherLoanRequirements.length;
      if (total === 0) e.loanRequirements = "Select at least one loan requirement";
    }
    if (s === 5) {
      if (!formData.loanPurpose.trim()) e.loanPurpose = "Loan purpose is required";
      if (!formData.requiredLoanAmount.trim()) e.requiredLoanAmount = "Required loan amount is required";
      if (!formData.annualTurnover.trim()) e.annualTurnover = "Annual company turnover is required";
    }
    if (s === 6) {
      if (!formData.loanProcessingLocation.trim()) e.loanProcessingLocation = "Loan processing location is required";
      if (!formData.serviceCity.trim()) e.serviceCity = "City is required";
      if (!formData.serviceState.trim()) e.serviceState = "State is required";
    }
    if (s === 7) {
      if (formData.applicantSegments.length === 0) e.applicantSegments = "Select at least one applicant segment";
    }
    if (s === 8) {
      if (formData.applicantProfiles.length === 0) e.applicantProfiles = "Select at least one applicant profile";
    }
    if (s === 9) {
      // Documents optional at this stage
    }
    return e;
  };

  const handleSubmit = () => {
    try {
      console.log("Corporate Company Registration submitted:", formData);
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
            <div className="text-xl mb-0.5 relative z-10">🏢</div>
            <h1 className="text-[13px] font-extrabold text-white tracking-wide relative z-10 text-center">Corporate Company Registration</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5 text-center">Register your company for loan products</p>
          </div>

          <div className="text-center px-3 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-100 border-b border-teal-200 shrink-0">
            <h2 className="text-[12px] font-bold text-[#00695C]">{steps[step]}</h2>
            <p className="text-[9px] text-green-500 mt-0.5">Step {step + 1} of {steps.length} — {subtitles[step]}</p>
          </div>

          <div className="flex items-start justify-between px-0.5 py-1.5 shrink-0 border-b border-gray-100 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center min-w-[32px]">
                <div className={`w-4.5 h-4.5 rounded-full text-[8px] flex items-center justify-center font-bold ${i < step ? "bg-green-500 text-white" : i === step ? "bg-[#00695C] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <p className={`text-[6px] mt-0.5 text-center px-0.5 leading-tight ${i === step ? "text-[#00695C] font-bold" : "text-gray-400"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="px-3 py-2.5 overflow-y-auto flex-1">
            <MobContentCorporate
              step={step}
              inp={inMob}
              formData={formData}
              updateForm={updateForm}
              toggleArrayItem={toggleArrayItem}
              logoPreview={logoPreview}
              repPhotoPreview={repPhotoPreview}
              handleImageUpload={handleImageUpload}
              removeImage={removeImage}
              handleDocumentUpload={handleDocumentUpload}
              setLogoPreview={setLogoPreview}
              setRepPhotoPreview={setRepPhotoPreview}
              errors={errors}
              companyTypeOptions={companyTypeOptions}
              representativeDepartmentOptions={representativeDepartmentOptions}
              businessLoanRequirements={businessLoanRequirements}
              workingCapitalRequirements={workingCapitalRequirements}
              propertyLoanRequirements={propertyLoanRequirements}
              otherRequirements={otherRequirements}
              loanPriorityOptions={loanPriorityOptions}
              applicantSegmentOptions={applicantSegmentOptions}
              applicantProfileOptions={applicantProfileOptions}
              handleAlphaFieldChange={handleAlphaFieldChange}
              handleNumericFieldChange={handleNumericFieldChange}
              handleAlphanumericFieldChange={handleAlphanumericFieldChange}
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
            <div className="flex justify-center gap-0.5 pt-1">
              {steps.map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${i < step ? 'w-1.5 h-1 bg-green-400' : i === step ? 'w-3 h-1 bg-[#00695C]' : 'w-1 h-1 bg-gray-200'}`} />
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
            <div className="text-xl mb-0.5 relative z-10">🏢</div>
            <h1 className="text-[14px] font-extrabold text-white tracking-wide relative z-10">Corporate Company Registration</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5">Register your company for loan products</p>
          </div>

          <div className="text-center px-4 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-100 border-b border-teal-200 shrink-0">
            <h2 className="text-[12px] font-bold text-[#00695C]">{steps[step]}</h2>
            <p className="text-[9px] text-green-500 mt-0.5">Step {step + 1} of {steps.length} — {subtitles[step]}</p>
          </div>

          <div className="flex items-start justify-between px-0.5 py-1.5 shrink-0 border-b border-gray-100 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center min-w-[36px]">
                <div className={`w-5 h-5 rounded-full text-[9px] flex items-center justify-center font-bold ${i < step ? "bg-green-500 text-white" : i === step ? "bg-[#00695C] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <p className={`text-[6px] mt-0.5 text-center px-0.5 leading-tight ${i === step ? "text-[#00695C] font-bold" : "text-gray-400"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="px-3 sm:px-4 py-3 overflow-y-auto flex-1">
            <DtContentCorporate
              step={step}
              inp={inDt}
              formData={formData}
              updateForm={updateForm}
              toggleArrayItem={toggleArrayItem}
              logoPreview={logoPreview}
              repPhotoPreview={repPhotoPreview}
              handleImageUpload={handleImageUpload}
              removeImage={removeImage}
              handleDocumentUpload={handleDocumentUpload}
              setLogoPreview={setLogoPreview}
              setRepPhotoPreview={setRepPhotoPreview}
              errors={errors}
              companyTypeOptions={companyTypeOptions}
              representativeDepartmentOptions={representativeDepartmentOptions}
              businessLoanRequirements={businessLoanRequirements}
              workingCapitalRequirements={workingCapitalRequirements}
              propertyLoanRequirements={propertyLoanRequirements}
              otherRequirements={otherRequirements}
              loanPriorityOptions={loanPriorityOptions}
              applicantSegmentOptions={applicantSegmentOptions}
              applicantProfileOptions={applicantProfileOptions}
              handleAlphaFieldChange={handleAlphaFieldChange}
              handleNumericFieldChange={handleNumericFieldChange}
              handleAlphanumericFieldChange={handleAlphanumericFieldChange}
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
            <div className="flex justify-center gap-1 pt-1">
              {steps.map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${i < step ? 'w-2 h-1.5 bg-green-400' : i === step ? 'w-3.5 h-1.5 bg-[#00695C]' : 'w-1.5 h-1.5 bg-gray-200'}`} />
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

// ═══════════════════════════════════════════════════════════════
// MOBILE CONTENT — Corporate Company
// ═══════════════════════════════════════════════════════════════
function MobContentCorporate({
  step, inp, formData, updateForm, toggleArrayItem,
  logoPreview, repPhotoPreview, handleImageUpload, removeImage,
  handleDocumentUpload, setLogoPreview, setRepPhotoPreview, errors,
  companyTypeOptions, representativeDepartmentOptions,
  businessLoanRequirements, workingCapitalRequirements,
  propertyLoanRequirements, otherRequirements, loanPriorityOptions,
  applicantSegmentOptions, applicantProfileOptions,
  handleAlphaFieldChange, handleNumericFieldChange, handleAlphanumericFieldChange,
}) {
  // STEP 0: Company Details
  if (step === 0) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Company Details</h3>
      </div>
      <Field label="Company Name" required>
        <input className={inp} value={formData.companyName} onChange={(e) => updateForm("companyName", e.target.value)} />
        {errors.companyName && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.companyName}</p>}
      </Field>
      <Field label="Company Registration Number" required>
        <input className={inp} value={formData.registrationNumber} onChange={(e) => updateForm("registrationNumber", handleAlphanumericFieldChange(e.target.value))} />
        {errors.registrationNumber && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.registrationNumber}</p>}
      </Field>
      <Field label="Company Type" required>
        <select className={inp} value={formData.companyType} onChange={(e) => updateForm("companyType", e.target.value)}>
          <option value="">Select Company Type</option>
          {companyTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.companyType && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.companyType}</p>}
      </Field>
      <Field label="Industry / Business Sector" required>
        <input className={inp} value={formData.industry} onChange={(e) => updateForm("industry", e.target.value)} />
        {errors.industry && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.industry}</p>}
      </Field>
      <Field label="Year of Establishment">
        <input className={inp} type="number" min="1900" max="2099" value={formData.yearOfEstablishment} onChange={(e) => updateForm("yearOfEstablishment", handleNumericFieldChange(e.target.value))} />
      </Field>
      <Field label="Company Logo" hint="Max 2MB">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="image/*" className="hidden" id="m-corp-logo" onChange={(e) => handleImageUpload("companyLogo", e, setLogoPreview)} />
          <label htmlFor="m-corp-logo" className="cursor-pointer flex flex-col items-center">
            <span className="text-lg mb-1">🏢</span>
            <span className="text-[11px] font-semibold text-[#00695C]">Upload Company Logo</span>
          </label>
        </div>
        {logoPreview && (
          <div className="mt-2 relative inline-block">
            <img src={logoPreview} alt="Logo" className="w-20 h-20 object-contain rounded-lg border border-gray-200 bg-white p-1" />
            <button onClick={() => removeImage("companyLogo", logoPreview, setLogoPreview)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center">✕</button>
          </div>
        )}
      </Field>
      <Field label="Company Website">
        <input className={inp} placeholder="https://" value={formData.website} onChange={(e) => updateForm("website", e.target.value)} />
      </Field>
      <Field label="Official Email" required>
        <input className={inp} type="email" value={formData.officialEmail} onChange={(e) => updateForm("officialEmail", e.target.value)} />
        {errors.officialEmail && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.officialEmail}</p>}
      </Field>
      <Field label="Official Mobile Number" required>
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} value={formData.officialMobile} onChange={(e) => updateForm("officialMobile", handleNumericFieldChange(e.target.value).slice(0, 10))} />
        {errors.officialMobile && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.officialMobile}</p>}
      </Field>
      <Field label="Alternate Contact Number">
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} value={formData.alternateContact} onChange={(e) => updateForm("alternateContact", handleNumericFieldChange(e.target.value).slice(0, 10))} />
      </Field>
      <Field label="Registered Office Address" required>
        <input className={inp} value={formData.registeredAddress} onChange={(e) => updateForm("registeredAddress", e.target.value)} />
        {errors.registeredAddress && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.registeredAddress}</p>}
      </Field>
      <Field label="City" required>
        <input className={inp} value={formData.city} onChange={(e) => updateForm("city", handleAlphaFieldChange(e.target.value))} />
        {errors.city && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.city}</p>}
      </Field>
      <Field label="District">
        <input className={inp} value={formData.district} onChange={(e) => updateForm("district", handleAlphaFieldChange(e.target.value))} />
      </Field>
      <Field label="State" required>
        <input className={inp} value={formData.state} onChange={(e) => updateForm("state", handleAlphaFieldChange(e.target.value))} />
        {errors.state && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.state}</p>}
      </Field>
      <Field label="PIN Code" required hint="6 digits">
        <input className={inp} type="tel" inputMode="numeric" maxLength={6} value={formData.pinCode} onChange={(e) => updateForm("pinCode", handleNumericFieldChange(e.target.value).slice(0, 6))} />
        {errors.pinCode && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.pinCode}</p>}
      </Field>
      <Field label="Number of Employees">
        <input className={inp} type="number" min="0" value={formData.numberOfEmployees} onChange={(e) => updateForm("numberOfEmployees", handleNumericFieldChange(e.target.value))} />
      </Field>
      <Field label="Annual Turnover">
        <input className={inp} value={formData.annualTurnover} onChange={(e) => updateForm("annualTurnover", e.target.value)} placeholder="e.g. ₹5 Cr" />
      </Field>
      <Field label="GST Number">
        <input className={inp} value={formData.gstNumber} onChange={(e) => updateForm("gstNumber", e.target.value.toUpperCase())} />
      </Field>
      <Field label="PAN Number">
        <input className={inp} value={formData.panNumber} onChange={(e) => updateForm("panNumber", e.target.value.toUpperCase())} />
      </Field>
      <Field label="CIN / LLPIN">
        <input className={inp} value={formData.cinLlpin} onChange={(e) => updateForm("cinLlpin", e.target.value.toUpperCase())} />
      </Field>
    </>
  );

  // STEP 1: Authorized Representative
  if (step === 1) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Authorized Representative</h3>
      </div>
      <Field label="Representative Full Name" required>
        <input className={inp} value={formData.repFullName} onChange={(e) => updateForm("repFullName", handleAlphaFieldChange(e.target.value))} />
        {errors.repFullName && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.repFullName}</p>}
      </Field>
      <Field label="Employee ID">
        <input className={inp} value={formData.repEmployeeId} onChange={(e) => updateForm("repEmployeeId", handleAlphanumericFieldChange(e.target.value))} />
      </Field>
      <Field label="Designation" required>
        <input className={inp} value={formData.repDesignation} onChange={(e) => updateForm("repDesignation", e.target.value)} />
        {errors.repDesignation && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.repDesignation}</p>}
      </Field>
      <Field label="Department" required>
        <select className={inp} value={formData.repDepartment} onChange={(e) => updateForm("repDepartment", e.target.value)}>
          <option value="">Select Department</option>
          {representativeDepartmentOptions.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        {errors.repDepartment && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.repDepartment}</p>}
      </Field>
      <Field label="Official Email" required>
        <input className={inp} type="email" value={formData.repEmail} onChange={(e) => updateForm("repEmail", e.target.value)} />
        {errors.repEmail && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.repEmail}</p>}
      </Field>
      <Field label="Mobile Number" required>
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} value={formData.repMobile} onChange={(e) => updateForm("repMobile", handleNumericFieldChange(e.target.value).slice(0, 10))} />
        {errors.repMobile && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.repMobile}</p>}
      </Field>
      <Field label="Alternate Mobile Number">
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} value={formData.repAlternateMobile} onChange={(e) => updateForm("repAlternateMobile", handleNumericFieldChange(e.target.value).slice(0, 10))} />
      </Field>
      <Field label="Date of Birth">
        <input className={inp} type="date" value={formData.repDob} onChange={(e) => updateForm("repDob", e.target.value)} />
      </Field>
      <Field label="Profile Photo" hint="Max 2MB">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="image/*" className="hidden" id="m-corp-rep-photo" onChange={(e) => handleImageUpload("repPhoto", e, setRepPhotoPreview)} />
          <label htmlFor="m-corp-rep-photo" className="cursor-pointer flex flex-col items-center">
            <span className="text-lg mb-1">📷</span>
            <span className="text-[11px] font-semibold text-[#00695C]">Upload Photo</span>
          </label>
        </div>
        {repPhotoPreview && (
          <div className="mt-2 relative inline-block">
            <img src={repPhotoPreview} alt="Rep" className="w-20 h-20 object-cover rounded-full border-2 border-[#00695C]" />
            <button onClick={() => removeImage("repPhoto", repPhotoPreview, setRepPhotoPreview)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center">✕</button>
          </div>
        )}
      </Field>
      <Field label="Reporting Manager Name">
        <input className={inp} value={formData.repManagerName} onChange={(e) => updateForm("repManagerName", e.target.value)} />
      </Field>
      <Field label="Reporting Manager Email">
        <input className={inp} type="email" value={formData.repManagerEmail} onChange={(e) => updateForm("repManagerEmail", e.target.value)} />
      </Field>
      <Field label="Reporting Manager Mobile">
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} value={formData.repManagerMobile} onChange={(e) => updateForm("repManagerMobile", handleNumericFieldChange(e.target.value).slice(0, 10))} />
      </Field>
    </>
  );

  // STEP 2: Login & Security
  if (step === 2) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Login & Security</h3>
      </div>
      <Field label="Username / Official Email" required>
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
      <label className="flex items-center gap-2 text-[11px] cursor-pointer mb-2">
        <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.twoFA} onChange={() => updateForm("twoFA", !formData.twoFA)} />
        Two-Factor Authentication
      </label>
      <Field label="Security Question / Recovery Option">
        <input className={inp} value={formData.securityQuestion} onChange={(e) => updateForm("securityQuestion", e.target.value)} />
      </Field>
      <label className="flex items-center gap-2 text-[11px] cursor-pointer">
        <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.accepted} onChange={() => updateForm("accepted", !formData.accepted)} />
        I accept the Terms & Conditions <span className="text-red-500">*</span>
      </label>
      {errors.accepted && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.accepted}</p>}
    </>
  );

  // STEP 3: Company Verification
  if (step === 3) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Company Verification</h3>
      </div>
      <p className="text-[9px] text-gray-400 mb-2">PDF only (Max 5MB each)</p>

      {[
        { key: "companyRegCert", label: "Company Registration Certificate", req: true },
        { key: "panCard", label: "PAN Card", req: true },
        { key: "gstCert", label: "GST Certificate", req: false },
        { key: "cinLlpinDoc", label: "CIN / LLP Registration Document", req: false },
        { key: "addressProof", label: "Company Address Proof", req: true },
        { key: "repIdProof", label: "Authorized Representative ID Proof", req: true },
        { key: "repEmployeeIdCard", label: "Employee ID Card", req: false },
        { key: "authorizationLetter", label: "Authorization Letter / Board Resolution", req: true },
        { key: "bankStatement", label: "Bank Statement", req: false },
        { key: "auditedFinancials", label: "Audited Financial Statements", req: false },
        { key: "itrDocs", label: "ITR / Financial Documents", req: false },
      ].map(({ key, label, req }) => (
        <Field key={key} label={label} required={req}>
          <div className="border-2 border-dashed border-teal-300 rounded-xl p-2.5 text-center hover:bg-green-50">
            <input type="file" accept=".pdf" className="hidden" id={`m-corp-${key}`} onChange={(e) => handleDocumentUpload(key, e)} />
            <label htmlFor={`m-corp-${key}`} className="cursor-pointer flex flex-col items-center">
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
        <h3 className="text-[11px] font-bold text-[#00695C]">Company Information</h3>
      </div>
      <Field label="Registration Date">
        <input className={inp} type="date" value={formData.registrationDate} onChange={(e) => updateForm("registrationDate", e.target.value)} />
      </Field>
      <Field label="Business Vintage (Years)">
        <input className={inp} type="number" min="0" value={formData.businessVintage} onChange={(e) => updateForm("businessVintage", handleNumericFieldChange(e.target.value))} />
      </Field>
      <Field label="Number of Employees">
        <input className={inp} type="number" min="0" value={formData.employeesCount} onChange={(e) => updateForm("employeesCount", handleNumericFieldChange(e.target.value))} />
      </Field>
      <Field label="Annual Turnover">
        <input className={inp} value={formData.annualTurnoverVerify} onChange={(e) => updateForm("annualTurnoverVerify", e.target.value)} />
      </Field>
      <Field label="Existing Loans">
        <input className={inp} value={formData.existingLoans} onChange={(e) => updateForm("existingLoans", e.target.value)} />
      </Field>
      <Field label="Existing Banking Relationship">
        <input className={inp} value={formData.existingBanking} onChange={(e) => updateForm("existingBanking", e.target.value)} />
      </Field>
      <Field label="Credit Facilities Available">
        <input className={inp} value={formData.creditFacilities} onChange={(e) => updateForm("creditFacilities", e.target.value)} />
      </Field>
      <Field label="Reporting / Authorized Person">
        <input className={inp} value={formData.reportingPerson} onChange={(e) => updateForm("reportingPerson", e.target.value)} />
      </Field>
    </>
  );

  // STEP 4: Loan Requirements
  if (step === 4) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Business & Corporate Loans</h3>
      </div>
      <div className="grid grid-cols-2 gap-1 mb-3">
        {businessLoanRequirements.map(p => (
          <label key={p} className="flex items-center gap-1 text-[10px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.businessLoans.includes(p)} onChange={() => toggleArrayItem("businessLoans", p)} />
            {p}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Working Capital</h3>
      </div>
      <div className="grid grid-cols-2 gap-1 mb-3">
        {workingCapitalRequirements.map(p => (
          <label key={p} className="flex items-center gap-1 text-[10px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.workingCapitalLoans.includes(p)} onChange={() => toggleArrayItem("workingCapitalLoans", p)} />
            {p}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Property-Related Loans</h3>
      </div>
      <div className="grid grid-cols-2 gap-1 mb-3">
        {propertyLoanRequirements.map(p => (
          <label key={p} className="flex items-center gap-1 text-[10px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.propertyLoans.includes(p)} onChange={() => toggleArrayItem("propertyLoans", p)} />
            {p}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Other Requirements</h3>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {otherRequirements.map(p => (
          <label key={p} className="flex items-center gap-1 text-[10px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.otherLoanRequirements.includes(p)} onChange={() => toggleArrayItem("otherLoanRequirements", p)} />
            {p}
          </label>
        ))}
      </div>
      {errors.loanRequirements && <p className="text-[10px] text-red-500 font-medium mt-2">{errors.loanRequirements}</p>}
    </>
  );

  // STEP 5: Requirement Details
  if (step === 5) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Loan Requirement Details</h3>
      </div>
      <Field label="Loan Purpose" required>
        <input className={inp} value={formData.loanPurpose} onChange={(e) => updateForm("loanPurpose", e.target.value)} />
        {errors.loanPurpose && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.loanPurpose}</p>}
      </Field>
      <Field label="Required Loan Amount" required>
        <input className={inp} value={formData.requiredLoanAmount} onChange={(e) => updateForm("requiredLoanAmount", e.target.value)} />
        {errors.requiredLoanAmount && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.requiredLoanAmount}</p>}
      </Field>
      <Field label="Preferred Loan Tenure">
        <input className={inp} value={formData.preferredTenure} onChange={(e) => updateForm("preferredTenure", e.target.value)} />
      </Field>
      <Field label="Expected Interest Rate">
        <input className={inp} value={formData.expectedInterestRate} onChange={(e) => updateForm("expectedInterestRate", e.target.value)} />
      </Field>
      <Field label="Existing Loan Amount">
        <input className={inp} value={formData.existingLoanAmount} onChange={(e) => updateForm("existingLoanAmount", e.target.value)} />
      </Field>
      <Field label="Existing EMI">
        <input className={inp} value={formData.existingEmi} onChange={(e) => updateForm("existingEmi", e.target.value)} />
      </Field>
      <Field label="Preferred EMI">
        <input className={inp} value={formData.preferredEmi} onChange={(e) => updateForm("preferredEmi", e.target.value)} />
      </Field>
      <Field label="Property Value">
        <input className={inp} value={formData.propertyValue} onChange={(e) => updateForm("propertyValue", e.target.value)} />
      </Field>
      <Field label="Property Type">
        <input className={inp} value={formData.propertyType} onChange={(e) => updateForm("propertyType", e.target.value)} />
      </Field>
      <Field label="Property Location">
        <input className={inp} value={formData.propertyLocation} onChange={(e) => updateForm("propertyLocation", e.target.value)} />
      </Field>
      <Field label="Purchase / Construction Cost">
        <input className={inp} value={formData.purchaseCost} onChange={(e) => updateForm("purchaseCost", e.target.value)} />
      </Field>
      <Field label="Down Payment Amount">
        <input className={inp} value={formData.downPayment} onChange={(e) => updateForm("downPayment", e.target.value)} />
      </Field>
      <Field label="Required Funding Date">
        <input className={inp} type="date" value={formData.requiredFundingDate} onChange={(e) => updateForm("requiredFundingDate", e.target.value)} />
      </Field>
      <Field label="Loan Priority">
        <div className="flex gap-3 flex-wrap">
          {loanPriorityOptions.map(p => (
            <label key={p} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-corp-priority" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.loanPriority === p} onChange={() => updateForm("loanPriority", p)} />
              {p}
            </label>
          ))}
        </div>
      </Field>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Financial Details</h3>
      </div>
      <Field label="Annual Company Turnover" required>
        <input className={inp} value={formData.annualTurnover} onChange={(e) => updateForm("annualTurnover", e.target.value)} />
        {errors.annualTurnover && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.annualTurnover}</p>}
      </Field>
      <Field label="Monthly Revenue">
        <input className={inp} value={formData.monthlyRevenue} onChange={(e) => updateForm("monthlyRevenue", e.target.value)} />
      </Field>
      <Field label="Monthly Expenses">
        <input className={inp} value={formData.monthlyExpenses} onChange={(e) => updateForm("monthlyExpenses", e.target.value)} />
      </Field>
      <Field label="Net Profit">
        <input className={inp} value={formData.netProfit} onChange={(e) => updateForm("netProfit", e.target.value)} />
      </Field>
      <Field label="Existing Liabilities">
        <input className={inp} value={formData.existingLiabilities} onChange={(e) => updateForm("existingLiabilities", e.target.value)} />
      </Field>
      <Field label="Existing EMI Obligations">
        <input className={inp} value={formData.existingEmiObligations} onChange={(e) => updateForm("existingEmiObligations", e.target.value)} />
      </Field>
      <Field label="Bank Account Details">
        <input className={inp} value={formData.bankAccountDetails} onChange={(e) => updateForm("bankAccountDetails", e.target.value)} />
      </Field>
      <Field label="Credit Score / CIBIL Score">
        <input className={inp} value={formData.cibilScore} onChange={(e) => updateForm("cibilScore", e.target.value)} />
      </Field>
      <Field label="Last 3 Years Turnover">
        <input className={inp} value={formData.last3YearsTurnover} onChange={(e) => updateForm("last3YearsTurnover", e.target.value)} />
      </Field>
      <Field label="Last 3 Years Profit">
        <input className={inp} value={formData.last3YearsProfit} onChange={(e) => updateForm("last3YearsProfit", e.target.value)} />
      </Field>
    </>
  );

  // STEP 6: Service Area
  if (step === 6) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Service Area</h3>
      </div>
      <Field label="Loan Processing Location" required>
        <input className={inp} value={formData.loanProcessingLocation} onChange={(e) => updateForm("loanProcessingLocation", e.target.value)} />
        {errors.loanProcessingLocation && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.loanProcessingLocation}</p>}
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
        <input className={inp} value={formData.servicePincodes} onChange={(e) => updateForm("servicePincodes", e.target.value)} placeholder="Comma separated" />
      </Field>
      <Field label="Preferred Loan Processing Branch">
        <input className={inp} value={formData.preferredBranch} onChange={(e) => updateForm("preferredBranch", e.target.value)} />
      </Field>
      <Field label="Preferred Financial Institution">
        <input className={inp} value={formData.preferredInstitution} onChange={(e) => updateForm("preferredInstitution", e.target.value)} />
      </Field>
      <Field label="Preferred Relationship Manager">
        <input className={inp} value={formData.preferredRm} onChange={(e) => updateForm("preferredRm", e.target.value)} />
      </Field>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Business Operating Locations</h3>
      </div>
      <Field label="Registered Office">
        <input className={inp} value={formData.registeredOffice} onChange={(e) => updateForm("registeredOffice", e.target.value)} />
      </Field>
      <Field label="Corporate Office">
        <input className={inp} value={formData.corporateOffice} onChange={(e) => updateForm("corporateOffice", e.target.value)} />
      </Field>
      <Field label="Branch Locations">
        <input className={inp} value={formData.branchLocations} onChange={(e) => updateForm("branchLocations", e.target.value)} />
      </Field>
      <Field label="Factory Location">
        <input className={inp} value={formData.factoryLocation} onChange={(e) => updateForm("factoryLocation", e.target.value)} />
      </Field>
      <Field label="Warehouse Location">
        <input className={inp} value={formData.warehouseLocation} onChange={(e) => updateForm("warehouseLocation", e.target.value)} />
      </Field>
      <Field label="Project Location">
        <input className={inp} value={formData.projectLocation} onChange={(e) => updateForm("projectLocation", e.target.value)} />
      </Field>
      <Field label="Other Business Locations">
        <input className={inp} value={formData.otherLocations} onChange={(e) => updateForm("otherLocations", e.target.value)} />
      </Field>
    </>
  );

  // STEP 7: Applicant Segment
  if (step === 7) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Preferred Applicant Segment</h3>
      </div>
      <p className="text-[10px] text-gray-400 mb-2">Select all categories your company handles</p>
      <div className="grid grid-cols-2 gap-1">
        {applicantSegmentOptions.map(s => (
          <label key={s} className="flex items-center gap-1 text-[10px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.applicantSegments.includes(s)} onChange={() => toggleArrayItem("applicantSegments", s)} />
            {s}
          </label>
        ))}
      </div>
      {errors.applicantSegments && <p className="text-[10px] text-red-500 font-medium mt-2">{errors.applicantSegments}</p>}
    </>
  );

  // STEP 8: Applicant Profile
  if (step === 8) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Applicant Profile Handled</h3>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {applicantProfileOptions.map(s => (
          <label key={s} className="flex items-center gap-1 text-[10px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.applicantProfiles.includes(s)} onChange={() => toggleArrayItem("applicantProfiles", s)} />
            {s}
          </label>
        ))}
      </div>
      {errors.applicantProfiles && <p className="text-[10px] text-red-500 font-medium mt-2">{errors.applicantProfiles}</p>}
    </>
  );

  // STEP 9: Document Management
  if (step === 9) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Company Documents</h3>
      </div>
      {[
        { key: "docCompanyRegCert", label: "Company Registration Certificate" },
        { key: "docPan", label: "PAN" },
        { key: "docGst", label: "GST Certificate" },
        { key: "docMoaAoa", label: "MOA / AOA" },
        { key: "docPartnershipDeed", label: "Partnership Deed" },
        { key: "docLlpAgreement", label: "LLP Agreement" },
        { key: "docCinLlpin", label: "CIN / LLPIN" },
        { key: "docCompanyAddressProof", label: "Company Address Proof" },
      ].map(({ key, label }) => (
        <Field key={key} label={label}>
          <input type="file" accept=".pdf" className={`${inp} p-1.5`} onChange={(e) => handleDocumentUpload(key, e)} />
          {formData[key] && <p className="text-[10px] text-green-600 mt-1">✓ {formData[key].name}</p>}
        </Field>
      ))}

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Financial Documents</h3>
      </div>
      {[
        { key: "docItr", label: "ITR – 2/3 Years" },
        { key: "docBalanceSheet", label: "Balance Sheet" },
        { key: "docProfitLoss", label: "Profit & Loss Statement" },
        { key: "docBankStatements", label: "Bank Statements" },
        { key: "docGstReturns", label: "GST Returns" },
        { key: "docProjections", label: "Financial Projections" },
        { key: "docExistingLoanStatements", label: "Existing Loan Statements" },
      ].map(({ key, label }) => (
        <Field key={key} label={label}>
          <input type="file" accept=".pdf" className={`${inp} p-1.5`} onChange={(e) => handleDocumentUpload(key, e)} />
          {formData[key] && <p className="text-[10px] text-green-600 mt-1">✓ {formData[key].name}</p>}
        </Field>
      ))}

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Property Documents</h3>
      </div>
      {[
        { key: "docSaleDeed", label: "Sale Deed" },
        { key: "docTitleDocuments", label: "Title Documents" },
        { key: "docEc", label: "EC – Encumbrance Certificate" },
        { key: "docPattaChitta", label: "Patta / Chitta" },
        { key: "docPropertyTax", label: "Property Tax Receipt" },
        { key: "docBuildingPlan", label: "Approved Building Plan" },
        { key: "docConstructionEstimate", label: "Construction Estimate" },
        { key: "docValuationReport", label: "Property Valuation Report" },
      ].map(({ key, label }) => (
        <Field key={key} label={label}>
          <input type="file" accept=".pdf" className={`${inp} p-1.5`} onChange={(e) => handleDocumentUpload(key, e)} />
          {formData[key] && <p className="text-[10px] text-green-600 mt-1">✓ {formData[key].name}</p>}
        </Field>
      ))}

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Authorized Person Documents</h3>
      </div>
      {[
        { key: "docRepPan", label: "PAN Card" },
        { key: "docRepAadhaar", label: "Aadhaar / ID Proof" },
        { key: "docRepEmployeeId", label: "Employee ID" },
        { key: "docAuthorization", label: "Authorization Letter" },
        { key: "docBoardResolution", label: "Board Resolution" },
      ].map(({ key, label }) => (
        <Field key={key} label={label}>
          <input type="file" accept=".pdf" className={`${inp} p-1.5`} onChange={(e) => handleDocumentUpload(key, e)} />
          {formData[key] && <p className="text-[10px] text-green-600 mt-1">✓ {formData[key].name}</p>}
        </Field>
      ))}
    </>
  );

  return null;
}

// ═══════════════════════════════════════════════════════════════
// DESKTOP CONTENT — Corporate Company
// ═══════════════════════════════════════════════════════════════
function DtContentCorporate({
  step, inp, formData, updateForm, toggleArrayItem,
  logoPreview, repPhotoPreview, handleImageUpload, removeImage,
  handleDocumentUpload, setLogoPreview, setRepPhotoPreview, errors,
  companyTypeOptions, representativeDepartmentOptions,
  businessLoanRequirements, workingCapitalRequirements,
  propertyLoanRequirements, otherRequirements, loanPriorityOptions,
  applicantSegmentOptions, applicantProfileOptions,
  handleAlphaFieldChange, handleNumericFieldChange, handleAlphanumericFieldChange,
}) {
  // STEP 0: Company Details
  if (step === 0) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Company Details</h3>
      </div>
      <FieldDt label="Company Name" required>
        <input className={inp} value={formData.companyName} onChange={(e) => updateForm("companyName", e.target.value)} />
        {errors.companyName && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.companyName}</p>}
      </FieldDt>
      <FieldDt label="Company Registration Number" required>
        <input className={inp} value={formData.registrationNumber} onChange={(e) => updateForm("registrationNumber", handleAlphanumericFieldChange(e.target.value))} />
        {errors.registrationNumber && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.registrationNumber}</p>}
      </FieldDt>
      <FieldDt label="Company Type" required>
        <select className={inp} value={formData.companyType} onChange={(e) => updateForm("companyType", e.target.value)}>
          <option value="">Select Company Type</option>
          {companyTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.companyType && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.companyType}</p>}
      </FieldDt>
      <FieldDt label="Industry / Business Sector" required>
        <input className={inp} value={formData.industry} onChange={(e) => updateForm("industry", e.target.value)} />
        {errors.industry && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.industry}</p>}
      </FieldDt>
      <FieldDt label="Year of Establishment">
        <input className={inp} type="number" min="1900" max="2099" value={formData.yearOfEstablishment} onChange={(e) => updateForm("yearOfEstablishment", handleNumericFieldChange(e.target.value))} />
      </FieldDt>
      <FieldDt label="Company Logo" hint="Max 2MB">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="image/*" className="hidden" id="dt-corp-logo" onChange={(e) => handleImageUpload("companyLogo", e, setLogoPreview)} />
          <label htmlFor="dt-corp-logo" className="cursor-pointer flex flex-col items-center">
            <span className="text-xl mb-1">🏢</span>
            <span className="text-[12px] font-semibold text-[#00695C]">Upload Company Logo</span>
          </label>
        </div>
        {logoPreview && (
          <div className="mt-2 relative inline-block">
            <img src={logoPreview} alt="Logo" className="w-24 h-24 object-contain rounded-lg border border-gray-200 bg-white p-1" />
            <button onClick={() => removeImage("companyLogo", logoPreview, setLogoPreview)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] flex items-center justify-center">✕</button>
          </div>
        )}
      </FieldDt>
      <FieldDt label="Company Website">
        <input className={inp} placeholder="https://" value={formData.website} onChange={(e) => updateForm("website", e.target.value)} />
      </FieldDt>
      <FieldDt label="Official Email" required>
        <input className={inp} type="email" value={formData.officialEmail} onChange={(e) => updateForm("officialEmail", e.target.value)} />
        {errors.officialEmail && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.officialEmail}</p>}
      </FieldDt>
      <FieldDt label="Official Mobile Number" required>
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} value={formData.officialMobile} onChange={(e) => updateForm("officialMobile", handleNumericFieldChange(e.target.value).slice(0, 10))} />
        {errors.officialMobile && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.officialMobile}</p>}
      </FieldDt>
      <FieldDt label="Alternate Contact Number">
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} value={formData.alternateContact} onChange={(e) => updateForm("alternateContact", handleNumericFieldChange(e.target.value).slice(0, 10))} />
      </FieldDt>
      <FieldDt label="Registered Office Address" required>
        <input className={inp} value={formData.registeredAddress} onChange={(e) => updateForm("registeredAddress", e.target.value)} />
        {errors.registeredAddress && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.registeredAddress}</p>}
      </FieldDt>
      <FieldDt label="City" required>
        <input className={inp} value={formData.city} onChange={(e) => updateForm("city", handleAlphaFieldChange(e.target.value))} />
        {errors.city && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.city}</p>}
      </FieldDt>
      <FieldDt label="District">
        <input className={inp} value={formData.district} onChange={(e) => updateForm("district", handleAlphaFieldChange(e.target.value))} />
      </FieldDt>
      <FieldDt label="State" required>
        <input className={inp} value={formData.state} onChange={(e) => updateForm("state", handleAlphaFieldChange(e.target.value))} />
        {errors.state && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.state}</p>}
      </FieldDt>
      <FieldDt label="PIN Code" required hint="6 digits">
        <input className={inp} type="tel" inputMode="numeric" maxLength={6} value={formData.pinCode} onChange={(e) => updateForm("pinCode", handleNumericFieldChange(e.target.value).slice(0, 6))} />
        {errors.pinCode && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.pinCode}</p>}
      </FieldDt>
      <FieldDt label="Number of Employees">
        <input className={inp} type="number" min="0" value={formData.numberOfEmployees} onChange={(e) => updateForm("numberOfEmployees", handleNumericFieldChange(e.target.value))} />
      </FieldDt>
      <FieldDt label="Annual Turnover">
        <input className={inp} value={formData.annualTurnover} onChange={(e) => updateForm("annualTurnover", e.target.value)} placeholder="e.g. ₹5 Cr" />
      </FieldDt>
      <FieldDt label="GST Number">
        <input className={inp} value={formData.gstNumber} onChange={(e) => updateForm("gstNumber", e.target.value.toUpperCase())} />
      </FieldDt>
      <FieldDt label="PAN Number">
        <input className={inp} value={formData.panNumber} onChange={(e) => updateForm("panNumber", e.target.value.toUpperCase())} />
      </FieldDt>
      <FieldDt label="CIN / LLPIN">
        <input className={inp} value={formData.cinLlpin} onChange={(e) => updateForm("cinLlpin", e.target.value.toUpperCase())} />
      </FieldDt>
    </>
  );

  // STEP 1: Representative
  if (step === 1) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Authorized Representative</h3>
      </div>
      <FieldDt label="Representative Full Name" required>
        <input className={inp} value={formData.repFullName} onChange={(e) => updateForm("repFullName", handleAlphaFieldChange(e.target.value))} />
        {errors.repFullName && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.repFullName}</p>}
      </FieldDt>
      <FieldDt label="Employee ID">
        <input className={inp} value={formData.repEmployeeId} onChange={(e) => updateForm("repEmployeeId", handleAlphanumericFieldChange(e.target.value))} />
      </FieldDt>
      <FieldDt label="Designation" required>
        <input className={inp} value={formData.repDesignation} onChange={(e) => updateForm("repDesignation", e.target.value)} />
        {errors.repDesignation && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.repDesignation}</p>}
      </FieldDt>
      <FieldDt label="Department" required>
        <select className={inp} value={formData.repDepartment} onChange={(e) => updateForm("repDepartment", e.target.value)}>
          <option value="">Select Department</option>
          {representativeDepartmentOptions.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        {errors.repDepartment && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.repDepartment}</p>}
      </FieldDt>
      <FieldDt label="Official Email" required>
        <input className={inp} type="email" value={formData.repEmail} onChange={(e) => updateForm("repEmail", e.target.value)} />
        {errors.repEmail && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.repEmail}</p>}
      </FieldDt>
      <FieldDt label="Mobile Number" required>
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} value={formData.repMobile} onChange={(e) => updateForm("repMobile", handleNumericFieldChange(e.target.value).slice(0, 10))} />
        {errors.repMobile && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.repMobile}</p>}
      </FieldDt>
      <FieldDt label="Alternate Mobile Number">
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} value={formData.repAlternateMobile} onChange={(e) => updateForm("repAlternateMobile", handleNumericFieldChange(e.target.value).slice(0, 10))} />
      </FieldDt>
      <FieldDt label="Date of Birth">
        <input className={inp} type="date" value={formData.repDob} onChange={(e) => updateForm("repDob", e.target.value)} />
      </FieldDt>
      <FieldDt label="Profile Photo" hint="Max 2MB">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="image/*" className="hidden" id="dt-corp-rep-photo" onChange={(e) => handleImageUpload("repPhoto", e, setRepPhotoPreview)} />
          <label htmlFor="dt-corp-rep-photo" className="cursor-pointer flex flex-col items-center">
            <span className="text-xl mb-1">📷</span>
            <span className="text-[12px] font-semibold text-[#00695C]">Upload Photo</span>
          </label>
        </div>
        {repPhotoPreview && (
          <div className="mt-2 relative inline-block">
            <img src={repPhotoPreview} alt="Rep" className="w-24 h-24 object-cover rounded-full border-2 border-[#00695C]" />
            <button onClick={() => removeImage("repPhoto", repPhotoPreview, setRepPhotoPreview)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] flex items-center justify-center">✕</button>
          </div>
        )}
      </FieldDt>
      <FieldDt label="Reporting Manager Name">
        <input className={inp} value={formData.repManagerName} onChange={(e) => updateForm("repManagerName", e.target.value)} />
      </FieldDt>
      <FieldDt label="Reporting Manager Email">
        <input className={inp} type="email" value={formData.repManagerEmail} onChange={(e) => updateForm("repManagerEmail", e.target.value)} />
      </FieldDt>
      <FieldDt label="Reporting Manager Mobile">
        <input className={inp} type="tel" inputMode="numeric" maxLength={10} value={formData.repManagerMobile} onChange={(e) => updateForm("repManagerMobile", handleNumericFieldChange(e.target.value).slice(0, 10))} />
      </FieldDt>
    </>
  );

  // STEP 2: Login & Security
  if (step === 2) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Login & Security</h3>
      </div>
      <FieldDt label="Username / Official Email" required>
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
      <label className="flex items-center gap-2 text-[13px] cursor-pointer mb-2">
        <input type="checkbox" className="accent-[#00695C] w-4 h-4" checked={formData.twoFA} onChange={() => updateForm("twoFA", !formData.twoFA)} />
        Two-Factor Authentication
      </label>
      <FieldDt label="Security Question / Recovery Option">
        <input className={inp} value={formData.securityQuestion} onChange={(e) => updateForm("securityQuestion", e.target.value)} />
      </FieldDt>
      <label className="flex items-center gap-2 text-[13px] cursor-pointer">
        <input type="checkbox" className="accent-[#00695C] w-4 h-4" checked={formData.accepted} onChange={() => updateForm("accepted", !formData.accepted)} />
        I accept the Terms & Conditions <span className="text-red-500">*</span>
      </label>
      {errors.accepted && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.accepted}</p>}
    </>
  );

  // STEP 3: Company Verification
  if (step === 3) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Company Verification</h3>
      </div>
      <p className="text-[11px] text-gray-400 mb-3">PDF only (Max 5MB each)</p>

      {[
        { key: "companyRegCert", label: "Company Registration Certificate", req: true },
        { key: "panCard", label: "PAN Card", req: true },
        { key: "gstCert", label: "GST Certificate", req: false },
        { key: "cinLlpinDoc", label: "CIN / LLP Registration Document", req: false },
        { key: "addressProof", label: "Company Address Proof", req: true },
        { key: "repIdProof", label: "Authorized Representative ID Proof", req: true },
        { key: "repEmployeeIdCard", label: "Employee ID Card", req: false },
        { key: "authorizationLetter", label: "Authorization Letter / Board Resolution", req: true },
        { key: "bankStatement", label: "Bank Statement", req: false },
        { key: "auditedFinancials", label: "Audited Financial Statements", req: false },
        { key: "itrDocs", label: "ITR / Financial Documents", req: false },
      ].map(({ key, label, req }) => (
        <FieldDt key={key} label={label} required={req}>
          <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
            <input type="file" accept=".pdf" className="hidden" id={`dt-corp-${key}`} onChange={(e) => handleDocumentUpload(key, e)} />
            <label htmlFor={`dt-corp-${key}`} className="cursor-pointer flex flex-col items-center">
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
        <h3 className="text-[14px] font-bold text-[#00695C]">Company Information</h3>
      </div>
      <FieldDt label="Registration Date">
        <input className={inp} type="date" value={formData.registrationDate} onChange={(e) => updateForm("registrationDate", e.target.value)} />
      </FieldDt>
      <FieldDt label="Business Vintage (Years)">
        <input className={inp} type="number" min="0" value={formData.businessVintage} onChange={(e) => updateForm("businessVintage", handleNumericFieldChange(e.target.value))} />
      </FieldDt>
      <FieldDt label="Number of Employees">
        <input className={inp} type="number" min="0" value={formData.employeesCount} onChange={(e) => updateForm("employeesCount", handleNumericFieldChange(e.target.value))} />
      </FieldDt>
      <FieldDt label="Annual Turnover">
        <input className={inp} value={formData.annualTurnoverVerify} onChange={(e) => updateForm("annualTurnoverVerify", e.target.value)} />
      </FieldDt>
      <FieldDt label="Existing Loans">
        <input className={inp} value={formData.existingLoans} onChange={(e) => updateForm("existingLoans", e.target.value)} />
      </FieldDt>
      <FieldDt label="Existing Banking Relationship">
        <input className={inp} value={formData.existingBanking} onChange={(e) => updateForm("existingBanking", e.target.value)} />
      </FieldDt>
      <FieldDt label="Credit Facilities Available">
        <input className={inp} value={formData.creditFacilities} onChange={(e) => updateForm("creditFacilities", e.target.value)} />
      </FieldDt>
      <FieldDt label="Reporting / Authorized Person">
        <input className={inp} value={formData.reportingPerson} onChange={(e) => updateForm("reportingPerson", e.target.value)} />
      </FieldDt>
    </>
  );

  // STEP 4: Loan Requirements
  if (step === 4) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Business & Corporate Loans</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {businessLoanRequirements.map(p => (
          <label key={p} className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.businessLoans.includes(p)} onChange={() => toggleArrayItem("businessLoans", p)} />
            {p}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Working Capital</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {workingCapitalRequirements.map(p => (
          <label key={p} className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.workingCapitalLoans.includes(p)} onChange={() => toggleArrayItem("workingCapitalLoans", p)} />
            {p}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Property-Related Loans</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {propertyLoanRequirements.map(p => (
          <label key={p} className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.propertyLoans.includes(p)} onChange={() => toggleArrayItem("propertyLoans", p)} />
            {p}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Other Requirements</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {otherRequirements.map(p => (
          <label key={p} className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.otherLoanRequirements.includes(p)} onChange={() => toggleArrayItem("otherLoanRequirements", p)} />
            {p}
          </label>
        ))}
      </div>
      {errors.loanRequirements && <p className="text-[10px] text-red-500 font-medium mt-3">{errors.loanRequirements}</p>}
    </>
  );

  // STEP 5: Requirement Details
  if (step === 5) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Loan Requirement Details</h3>
      </div>
      <FieldDt label="Loan Purpose" required>
        <input className={inp} value={formData.loanPurpose} onChange={(e) => updateForm("loanPurpose", e.target.value)} />
        {errors.loanPurpose && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.loanPurpose}</p>}
      </FieldDt>
      <FieldDt label="Required Loan Amount" required>
        <input className={inp} value={formData.requiredLoanAmount} onChange={(e) => updateForm("requiredLoanAmount", e.target.value)} />
        {errors.requiredLoanAmount && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.requiredLoanAmount}</p>}
      </FieldDt>
      <FieldDt label="Preferred Loan Tenure">
        <input className={inp} value={formData.preferredTenure} onChange={(e) => updateForm("preferredTenure", e.target.value)} />
      </FieldDt>
      <FieldDt label="Expected Interest Rate">
        <input className={inp} value={formData.expectedInterestRate} onChange={(e) => updateForm("expectedInterestRate", e.target.value)} />
      </FieldDt>
      <FieldDt label="Existing Loan Amount">
        <input className={inp} value={formData.existingLoanAmount} onChange={(e) => updateForm("existingLoanAmount", e.target.value)} />
      </FieldDt>
      <FieldDt label="Existing EMI">
        <input className={inp} value={formData.existingEmi} onChange={(e) => updateForm("existingEmi", e.target.value)} />
      </FieldDt>
      <FieldDt label="Preferred EMI">
        <input className={inp} value={formData.preferredEmi} onChange={(e) => updateForm("preferredEmi", e.target.value)} />
      </FieldDt>
      <FieldDt label="Property Value">
        <input className={inp} value={formData.propertyValue} onChange={(e) => updateForm("propertyValue", e.target.value)} />
      </FieldDt>
      <FieldDt label="Property Type">
        <input className={inp} value={formData.propertyType} onChange={(e) => updateForm("propertyType", e.target.value)} />
      </FieldDt>
      <FieldDt label="Property Location">
        <input className={inp} value={formData.propertyLocation} onChange={(e) => updateForm("propertyLocation", e.target.value)} />
      </FieldDt>
      <FieldDt label="Purchase / Construction Cost">
        <input className={inp} value={formData.purchaseCost} onChange={(e) => updateForm("purchaseCost", e.target.value)} />
      </FieldDt>
      <FieldDt label="Down Payment Amount">
        <input className={inp} value={formData.downPayment} onChange={(e) => updateForm("downPayment", e.target.value)} />
      </FieldDt>
      <FieldDt label="Required Funding Date">
        <input className={inp} type="date" value={formData.requiredFundingDate} onChange={(e) => updateForm("requiredFundingDate", e.target.value)} />
      </FieldDt>
      <FieldDt label="Loan Priority">
        <div className="flex gap-5">
          {loanPriorityOptions.map(p => (
            <label key={p} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-corp-priority" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.loanPriority === p} onChange={() => updateForm("loanPriority", p)} />
              {p}
            </label>
          ))}
        </div>
      </FieldDt>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Financial Details</h3>
      </div>
      <FieldDt label="Annual Company Turnover" required>
        <input className={inp} value={formData.annualTurnover} onChange={(e) => updateForm("annualTurnover", e.target.value)} />
        {errors.annualTurnover && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.annualTurnover}</p>}
      </FieldDt>
      <FieldDt label="Monthly Revenue">
        <input className={inp} value={formData.monthlyRevenue} onChange={(e) => updateForm("monthlyRevenue", e.target.value)} />
      </FieldDt>
      <FieldDt label="Monthly Expenses">
        <input className={inp} value={formData.monthlyExpenses} onChange={(e) => updateForm("monthlyExpenses", e.target.value)} />
      </FieldDt>
      <FieldDt label="Net Profit">
        <input className={inp} value={formData.netProfit} onChange={(e) => updateForm("netProfit", e.target.value)} />
      </FieldDt>
      <FieldDt label="Existing Liabilities">
        <input className={inp} value={formData.existingLiabilities} onChange={(e) => updateForm("existingLiabilities", e.target.value)} />
      </FieldDt>
      <FieldDt label="Existing EMI Obligations">
        <input className={inp} value={formData.existingEmiObligations} onChange={(e) => updateForm("existingEmiObligations", e.target.value)} />
      </FieldDt>
      <FieldDt label="Bank Account Details">
        <input className={inp} value={formData.bankAccountDetails} onChange={(e) => updateForm("bankAccountDetails", e.target.value)} />
      </FieldDt>
      <FieldDt label="Credit Score / CIBIL Score">
        <input className={inp} value={formData.cibilScore} onChange={(e) => updateForm("cibilScore", e.target.value)} />
      </FieldDt>
      <FieldDt label="Last 3 Years Turnover">
        <input className={inp} value={formData.last3YearsTurnover} onChange={(e) => updateForm("last3YearsTurnover", e.target.value)} />
      </FieldDt>
      <FieldDt label="Last 3 Years Profit">
        <input className={inp} value={formData.last3YearsProfit} onChange={(e) => updateForm("last3YearsProfit", e.target.value)} />
      </FieldDt>
    </>
  );

  // STEP 6: Service Area
  if (step === 6) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Service Area</h3>
      </div>
      <FieldDt label="Loan Processing Location" required>
        <input className={inp} value={formData.loanProcessingLocation} onChange={(e) => updateForm("loanProcessingLocation", e.target.value)} />
        {errors.loanProcessingLocation && <p className="text-[10px] text-red-500 font-medium mt-0.5">{errors.loanProcessingLocation}</p>}
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
        <input className={inp} value={formData.servicePincodes} onChange={(e) => updateForm("servicePincodes", e.target.value)} placeholder="Comma separated" />
      </FieldDt>
      <FieldDt label="Preferred Loan Processing Branch">
        <input className={inp} value={formData.preferredBranch} onChange={(e) => updateForm("preferredBranch", e.target.value)} />
      </FieldDt>
      <FieldDt label="Preferred Financial Institution">
        <input className={inp} value={formData.preferredInstitution} onChange={(e) => updateForm("preferredInstitution", e.target.value)} />
      </FieldDt>
      <FieldDt label="Preferred Relationship Manager">
        <input className={inp} value={formData.preferredRm} onChange={(e) => updateForm("preferredRm", e.target.value)} />
      </FieldDt>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Business Operating Locations</h3>
      </div>
      <FieldDt label="Registered Office">
        <input className={inp} value={formData.registeredOffice} onChange={(e) => updateForm("registeredOffice", e.target.value)} />
      </FieldDt>
      <FieldDt label="Corporate Office">
        <input className={inp} value={formData.corporateOffice} onChange={(e) => updateForm("corporateOffice", e.target.value)} />
      </FieldDt>
      <FieldDt label="Branch Locations">
        <input className={inp} value={formData.branchLocations} onChange={(e) => updateForm("branchLocations", e.target.value)} />
      </FieldDt>
      <FieldDt label="Factory Location">
        <input className={inp} value={formData.factoryLocation} onChange={(e) => updateForm("factoryLocation", e.target.value)} />
      </FieldDt>
      <FieldDt label="Warehouse Location">
        <input className={inp} value={formData.warehouseLocation} onChange={(e) => updateForm("warehouseLocation", e.target.value)} />
      </FieldDt>
      <FieldDt label="Project Location">
        <input className={inp} value={formData.projectLocation} onChange={(e) => updateForm("projectLocation", e.target.value)} />
      </FieldDt>
      <FieldDt label="Other Business Locations">
        <input className={inp} value={formData.otherLocations} onChange={(e) => updateForm("otherLocations", e.target.value)} />
      </FieldDt>
    </>
  );

  // STEP 7: Applicant Segment
  if (step === 7) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Preferred Applicant Segment</h3>
      </div>
      <p className="text-[12px] text-gray-400 mb-3">Select all categories your company handles</p>
      <div className="grid grid-cols-2 gap-2">
        {applicantSegmentOptions.map(s => (
          <label key={s} className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.applicantSegments.includes(s)} onChange={() => toggleArrayItem("applicantSegments", s)} />
            {s}
          </label>
        ))}
      </div>
      {errors.applicantSegments && <p className="text-[10px] text-red-500 font-medium mt-3">{errors.applicantSegments}</p>}
    </>
  );

  // STEP 8: Applicant Profile
  if (step === 8) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Applicant Profile Handled</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {applicantProfileOptions.map(s => (
          <label key={s} className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5" checked={formData.applicantProfiles.includes(s)} onChange={() => toggleArrayItem("applicantProfiles", s)} />
            {s}
          </label>
        ))}
      </div>
      {errors.applicantProfiles && <p className="text-[10px] text-red-500 font-medium mt-3">{errors.applicantProfiles}</p>}
    </>
  );

  // STEP 9: Document Management
  if (step === 9) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Company Documents</h3>
      </div>
      {[
        { key: "docCompanyRegCert", label: "Company Registration Certificate" },
        { key: "docPan", label: "PAN" },
        { key: "docGst", label: "GST Certificate" },
        { key: "docMoaAoa", label: "MOA / AOA" },
        { key: "docPartnershipDeed", label: "Partnership Deed" },
        { key: "docLlpAgreement", label: "LLP Agreement" },
        { key: "docCinLlpin", label: "CIN / LLPIN" },
        { key: "docCompanyAddressProof", label: "Company Address Proof" },
      ].map(({ key, label }) => (
        <FieldDt key={key} label={label}>
          <input type="file" accept=".pdf" className={`${inp} p-1.5`} onChange={(e) => handleDocumentUpload(key, e)} />
          {formData[key] && <p className="text-[13px] text-green-600 mt-1">✓ {formData[key].name}</p>}
        </FieldDt>
      ))}

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Financial Documents</h3>
      </div>
      {[
        { key: "docItr", label: "ITR – 2/3 Years" },
        { key: "docBalanceSheet", label: "Balance Sheet" },
        { key: "docProfitLoss", label: "Profit & Loss Statement" },
        { key: "docBankStatements", label: "Bank Statements" },
        { key: "docGstReturns", label: "GST Returns" },
        { key: "docProjections", label: "Financial Projections" },
        { key: "docExistingLoanStatements", label: "Existing Loan Statements" },
      ].map(({ key, label }) => (
        <FieldDt key={key} label={label}>
          <input type="file" accept=".pdf" className={`${inp} p-1.5`} onChange={(e) => handleDocumentUpload(key, e)} />
          {formData[key] && <p className="text-[13px] text-green-600 mt-1">✓ {formData[key].name}</p>}
        </FieldDt>
      ))}

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Property Documents</h3>
      </div>
      {[
        { key: "docSaleDeed", label: "Sale Deed" },
        { key: "docTitleDocuments", label: "Title Documents" },
        { key: "docEc", label: "EC – Encumbrance Certificate" },
        { key: "docPattaChitta", label: "Patta / Chitta" },
        { key: "docPropertyTax", label: "Property Tax Receipt" },
        { key: "docBuildingPlan", label: "Approved Building Plan" },
        { key: "docConstructionEstimate", label: "Construction Estimate" },
        { key: "docValuationReport", label: "Property Valuation Report" },
      ].map(({ key, label }) => (
        <FieldDt key={key} label={label}>
          <input type="file" accept=".pdf" className={`${inp} p-1.5`} onChange={(e) => handleDocumentUpload(key, e)} />
          {formData[key] && <p className="text-[13px] text-green-600 mt-1">✓ {formData[key].name}</p>}
        </FieldDt>
      ))}

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Authorized Person Documents</h3>
      </div>
      {[
        { key: "docRepPan", label: "PAN Card" },
        { key: "docRepAadhaar", label: "Aadhaar / ID Proof" },
        { key: "docRepEmployeeId", label: "Employee ID" },
        { key: "docAuthorization", label: "Authorization Letter" },
        { key: "docBoardResolution", label: "Board Resolution" },
      ].map(({ key, label }) => (
        <FieldDt key={key} label={label}>
          <input type="file" accept=".pdf" className={`${inp} p-1.5`} onChange={(e) => handleDocumentUpload(key, e)} />
          {formData[key] && <p className="text-[13px] text-green-600 mt-1">✓ {formData[key].name}</p>}
        </FieldDt>
      ))}
    </>
  );

  return null;
}