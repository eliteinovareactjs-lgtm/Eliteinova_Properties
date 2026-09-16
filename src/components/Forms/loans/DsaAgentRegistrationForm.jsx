// src/components/Forms/loans/DsaAgentRegistrationForm.jsx
import React, { useState } from "react";
import { ArrowLeft, X, Check } from "lucide-react";

const DSA_TYPES = [
  "Individual DSA Agent", "DSA Agency", "Loan Consultant",
  "Financial Consultant", "Corporate DSA Representative",
];

const LOAN_PURPOSES = [
  "Home Purchase", "Land / Plot Purchase", "House Construction",
  "Commercial Property Purchase", "Loan Against Property",
  "Home Loan Balance Transfer", "Home Renovation",
  "Plot + Construction Loan", "Builder / Project Home Loan",
  "Commercial Property Loan", "Mortgage Loan",
  "Property Purchase Loan", "Top-Up Loan",
];

const LOAN_AMOUNT_RANGES = [
  "₹10–25 Lakhs", "₹25–50 Lakhs", "₹50 Lakhs–₹1 Crore",
  "₹1–2 Crores", "Above ₹2 Crores",
];

const CUSTOMER_SEGMENTS = [
  "Salaried", "Self-Employed", "Business Owners", "Professionals",
  "Corporate Employees", "NRIs", "Property Investors",
  "Builders / Developers", "Commercial Property Owners",
  "Land / Plot Buyers",
];

const CUSTOMER_PROFILES = [
  "First-Time Home Buyer", "Existing Property Owner",
  "Property Investor", "Home Loan Transfer Customer",
  "Construction Customer", "Commercial Property Buyer",
  "Loan Against Property Customer",
];

const SERVICE_COVERAGE = ["Local", "District", "State", "Multiple States", "Pan India"];

const STEPS = [
  { n: 1, label: "Agent Details", title: "DSA Agent Details",        sub: "Your basic information" },
  { n: 2, label: "Company",       title: "DSA Company / Agency",     sub: "Where you operate from" },
  { n: 3, label: "Verification",  title: "DSA Agent Verification",   sub: "Upload documents and verify contact" },
  { n: 4, label: "Products",      title: "Loan Products Handled",    sub: "Select all products you offer" },
  { n: 5, label: "Segment",       title: "Customer Segment",         sub: "The customers you serve" },
  { n: 6, label: "Service Area",  title: "Service Area",             sub: "Where you can process loans" },
];

const DsaAgentRegistrationForm = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "", dsaId: "", gender: "", dob: "", mobile: "",
    email: "", altMobile: "", designation: "", dsaType: "",
    yearsOfExperience: "",
    companyName: "", companyCode: "", associatedBank: "",
    branchName: "", officeAddress: "", city: "", district: "",
    state: "", pincode: "", officePhone: "", website: "",
    gst: "", pan: "",
    username: "", password: "", confirmPassword: "",
    twoFA: false, securityQuestion: "", accepted: false,
    dsaIdProof: null, authorizationLetter: null,
    panUpload: null, aadhaarUpload: null,
    companyCert: null, bankAuthDoc: null, gstCert: null,
    emailVerified: false, mobileVerified: false, dsaCodeVerified: false,
    joiningDate: "", managerName: "", managerId: "",
    loanPurposes: [], amountRange: "",
    customerSegments: [], customerProfiles: [],
    loanLocation: "", serviceCity: "", serviceState: "",
    servicePincodes: "", preferredLocations: "",
    maxServiceDistance: "", onlineRemote: false,
    serviceCoverage: "",
  });

  if (!isOpen) return null;

  const ACCENT = "#00695C";
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const toggleArray = (k, val) =>
    setForm((p) => ({
      ...p,
      [k]: p[k].includes(val) ? p[k].filter((x) => x !== val) : [...p[k], val],
    }));

  const totalSteps = STEPS.length;
  const currentStep = STEPS[step - 1];
  const completion = Math.round((step / totalSteps) * 100);

  const inputCls =
    "w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-[#E3E9E4] bg-white text-[12.5px] md:text-[14px] text-[#10241F] placeholder-[#B4BDB7] focus:outline-none focus:border-[#00695C] focus:ring-2 focus:ring-[#00695C]/15 transition-all";
  const labelCls =
    "block text-[11.5px] md:text-[13px] font-semibold text-[#10241F] mb-1 md:mb-2";
  const fileCls =
    "w-full text-[11.5px] md:text-[13px] text-[#6B7B70] file:mr-2 md:file:mr-3 file:py-1.5 md:file:py-2 file:px-3 md:file:px-4 file:rounded-full file:border-0 file:bg-[#00695C]/10 file:text-[#00695C] file:text-[11px] md:file:text-[12px] file:font-semibold hover:file:bg-[#00695C]/15";

  const goBack = () => (step === 1 ? onClose() : setStep((s) => s - 1));
  const goNext = () => (step === totalSteps ? onClose() : setStep((s) => s + 1));

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-2 md:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#F6F8F7] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[95vh] md:h-auto md:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="relative px-3 md:px-6 pt-3 md:pt-5 pb-2.5 md:pb-4 flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #26A69A 100%)` }}
        >
          <div className="flex items-start gap-2.5 md:gap-3">
            <button
              onClick={goBack}
              className="p-1 md:p-1.5 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
              aria-label="Back"
            >
              <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
            </button>
            <div className="flex-1 text-center min-w-0">
              <div className="text-[18px] md:text-[22px] leading-none mb-0.5 md:mb-1">🧑‍💼</div>
              <h2 className="text-white font-bold text-[13.5px] md:text-[17px] leading-tight">
                DSA Agent Registration
              </h2>
              <p className="text-white/80 text-[10px] md:text-[12px] mt-0.5">
                Register as a DSA agent or agency
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 md:p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
            </button>
          </div>
        </div>

        {/* ── Stepper ── */}
        <div className="bg-white border-b border-[#E3E9E4] flex-shrink-0">
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex items-start gap-0 px-2 md:px-6 pt-2 md:pt-3 min-w-max">
              {STEPS.map((s, i) => {
                const active = step === s.n;
                const done = step > s.n;
                return (
                  <React.Fragment key={s.n}>
                    <button
                      onClick={() => setStep(s.n)}
                      className="flex flex-col items-center px-1.5 md:px-3 min-w-[56px] md:min-w-[76px] focus:outline-none"
                    >
                      <div
                        className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-[12px] font-bold transition-all"
                        style={{
                          background: active
                            ? "#00695C"
                            : done
                            ? "#26A69A"
                            : "#F0F3F1",
                          color: active || done ? "#ffffff" : "#8A968F",
                          boxShadow: active
                            ? "0 4px 12px -4px rgba(0,105,92,0.5)"
                            : "none",
                        }}
                      >
                        {done ? <Check className="w-3 h-3 md:w-3.5 md:h-3.5" /> : s.n}
                      </div>
                      <span
                        className={`mt-1 md:mt-1.5 text-[8.5px] md:text-[10px] font-semibold text-center leading-tight pb-1.5 md:pb-2 transition-colors ${
                          active ? "text-[#00695C]" : "text-[#8A968F]"
                        }`}
                        style={{
                          borderBottom: active
                            ? "2px solid #00695C"
                            : "2px solid transparent",
                        }}
                      >
                        {s.label}
                      </span>
                    </button>
                    {i < STEPS.length - 1 && (
                      <div className="w-3.5 md:w-8 h-[2px] mt-[11px] md:mt-[15px] bg-[#E3E9E4] flex-shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Step intro ── */}
        <div className="px-3 md:px-6 py-2 md:py-4 bg-[#F0F7F4] border-b border-[#E3E9E4] flex-shrink-0">
          <h3
            className="text-[13.5px] md:text-[16px] font-bold text-[#10241F] text-center leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {currentStep.title}
          </h3>
          <p className="text-[10px] md:text-[12px] text-[#6B7B70] text-center mt-0.5">
            <span className="font-semibold text-[#00695C]">
              Step {step} of {totalSteps}
            </span>{" "}
            — {currentStep.sub}
          </p>
        </div>

        {/* ── Body (scrollable) ── */}
        <div className="p-3 md:p-6 overflow-y-auto flex-1">
          {/* Step 1 */}
          {step === 1 && (
            <div className="flex flex-col gap-2.5 md:gap-4">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input className={inputCls} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter full name" />
              </div>
              <div>
                <label className={labelCls}>DSA Agent ID / Code *</label>
                <input className={inputCls} value={form.dsaId} onChange={(e) => update("dsaId", e.target.value)} placeholder="Enter DSA code" />
              </div>
              <div className="grid grid-cols-2 gap-2.5 md:gap-3">
                <div>
                  <label className={labelCls}>Gender</label>
                  <div className="flex items-center gap-2 md:gap-3 pt-1.5 md:pt-2">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="dsaGender"
                          checked={form.gender === g}
                          onChange={() => update("gender", g)}
                          className="w-3.5 h-3.5 md:w-4 md:h-4 accent-[#00695C]"
                        />
                        <span className="text-[11px] md:text-[12px] text-[#3B4A41]">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Date of Birth</label>
                  <input type="date" className={inputCls} value={form.dob} onChange={(e) => update("dob", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Mobile Number *</label>
                <input className={inputCls} value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="Enter your 10-digit mobile number" />
              </div>
              <div>
                <label className={labelCls}>Professional Email ID *</label>
                <input type="email" className={inputCls} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Enter your email address" />
                <p className="text-[10px] md:text-[11px] text-[#8A968F] mt-1">
                  We'll send listing updates to this email
                </p>
              </div>
              <div>
                <label className={labelCls}>Alternate Mobile Number</label>
                <input className={inputCls} value={form.altMobile} onChange={(e) => update("altMobile", e.target.value)} placeholder="Optional" />
              </div>
              <div>
                <label className={labelCls}>Designation *</label>
                <input className={inputCls} value={form.designation} onChange={(e) => update("designation", e.target.value)} placeholder="e.g. Loan Consultant" />
              </div>
              <div>
                <label className={labelCls}>DSA Type *</label>
                <select className={inputCls} value={form.dsaType} onChange={(e) => update("dsaType", e.target.value)}>
                  <option value="">Select DSA type</option>
                  {DSA_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Years of Experience</label>
                <input className={inputCls} value={form.yearsOfExperience} onChange={(e) => update("yearsOfExperience", e.target.value)} placeholder="e.g. 5" />
              </div>
              <div>
                <label className={labelCls}>Profile Photo</label>
                <input type="file" accept="image/*" className={fileCls} />
              </div>

              <div className="pt-2 md:pt-3 border-t border-[#E3E9E4] mt-0.5 md:mt-1">
                <h4 className="text-[12px] md:text-[13px] font-bold text-[#10241F] mb-2 md:mb-3">Login &amp; Security</h4>
                <div className="flex flex-col gap-2.5 md:gap-4">
                  <div>
                    <label className={labelCls}>Username / Professional Email *</label>
                    <input className={inputCls} value={form.username} onChange={(e) => update("username", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                    <div>
                      <label className={labelCls}>Password *</label>
                      <input type="password" className={inputCls} value={form.password} onChange={(e) => update("password", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Confirm Password *</label>
                      <input type="password" className={inputCls} value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Security Question / Recovery Option</label>
                    <input className={inputCls} value={form.securityQuestion} onChange={(e) => update("securityQuestion", e.target.value)} />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.twoFA} onChange={(e) => update("twoFA", e.target.checked)} className="w-3.5 h-3.5 md:w-4 md:h-4 accent-[#00695C]" />
                    <span className="text-[11.5px] md:text-[13px] text-[#3B4A41]">Enable Two-Factor Authentication</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.accepted} onChange={(e) => update("accepted", e.target.checked)} className="w-3.5 h-3.5 md:w-4 md:h-4 accent-[#00695C]" />
                    <span className="text-[11.5px] md:text-[13px] text-[#3B4A41]">I accept the Terms &amp; Conditions *</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="flex flex-col gap-2.5 md:gap-4">
              <div>
                <label className={labelCls}>DSA Company / Agency Name *</label>
                <input className={inputCls} value={form.companyName} onChange={(e) => update("companyName", e.target.value)} placeholder="Enter company or agency name" />
              </div>
              <div>
                <label className={labelCls}>DSA Code / Agency Code *</label>
                <input className={inputCls} value={form.companyCode} onChange={(e) => update("companyCode", e.target.value)} placeholder="Enter code" />
              </div>
              <div>
                <label className={labelCls}>Associated Bank / NBFC *</label>
                <input className={inputCls} value={form.associatedBank} onChange={(e) => update("associatedBank", e.target.value)} placeholder="e.g. HDFC Bank" />
              </div>
              <div>
                <label className={labelCls}>Branch / Office Name</label>
                <input className={inputCls} value={form.branchName} onChange={(e) => update("branchName", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Office Address *</label>
                <textarea rows="2" className={inputCls} value={form.officeAddress} onChange={(e) => update("officeAddress", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2.5 md:gap-3">
                <div>
                  <label className={labelCls}>City *</label>
                  <input className={inputCls} value={form.city} onChange={(e) => update("city", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>District</label>
                  <input className={inputCls} value={form.district} onChange={(e) => update("district", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 md:gap-3">
                <div>
                  <label className={labelCls}>State *</label>
                  <input className={inputCls} value={form.state} onChange={(e) => update("state", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>PIN Code *</label>
                  <input className={inputCls} value={form.pincode} onChange={(e) => update("pincode", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                <div>
                  <label className={labelCls}>Office Phone Number</label>
                  <input className={inputCls} value={form.officePhone} onChange={(e) => update("officePhone", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Company Website</label>
                  <input className={inputCls} value={form.website} onChange={(e) => update("website", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                <div>
                  <label className={labelCls}>GST Number</label>
                  <input className={inputCls} value={form.gst} onChange={(e) => update("gst", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>PAN Number</label>
                  <input className={inputCls} value={form.pan} onChange={(e) => update("pan", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="flex flex-col gap-2.5 md:gap-4">
              {[
                { label: "DSA ID / Agent ID Proof Upload *" },
                { label: "DSA Authorization Letter *" },
                { label: "PAN Card Upload *" },
                { label: "Aadhaar / ID Proof Upload *" },
                { label: "Company / Agency Registration Certificate" },
                { label: "Bank / NBFC Authorization Document" },
                { label: "GST Certificate" },
              ].map((f, i) => (
                <div key={i}>
                  <label className={labelCls}>{f.label}</label>
                  <input type="file" className={fileCls} />
                </div>
              ))}

              <div className="pt-2 md:pt-3 border-t border-[#E3E9E4] mt-0.5 md:mt-1">
                <h4 className="text-[12px] md:text-[13px] font-bold text-[#10241F] mb-2 md:mb-3">Verifications</h4>
                <div className="flex flex-col gap-2.5 md:gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.emailVerified} onChange={(e) => update("emailVerified", e.target.checked)} className="w-3.5 h-3.5 md:w-4 md:h-4 accent-[#00695C]" />
                    <span className="text-[11.5px] md:text-[13px] text-[#3B4A41]">Official Email Verification *</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.mobileVerified} onChange={(e) => update("mobileVerified", e.target.checked)} className="w-3.5 h-3.5 md:w-4 md:h-4 accent-[#00695C]" />
                    <span className="text-[11.5px] md:text-[13px] text-[#3B4A41]">Mobile Number Verification *</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.dsaCodeVerified} onChange={(e) => update("dsaCodeVerified", e.target.checked)} className="w-3.5 h-3.5 md:w-4 md:h-4 accent-[#00695C]" />
                    <span className="text-[11.5px] md:text-[13px] text-[#3B4A41]">DSA Code Verification</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                <div>
                  <label className={labelCls}>Joining / Registration Date</label>
                  <input type="date" className={inputCls} value={form.joiningDate} onChange={(e) => update("joiningDate", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Reporting Manager Name</label>
                  <input className={inputCls} value={form.managerName} onChange={(e) => update("managerName", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Reporting Manager Employee ID / Code</label>
                <input className={inputCls} value={form.managerId} onChange={(e) => update("managerId", e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <p className="text-[10.5px] md:text-[12px] text-[#8A968F] mb-2 md:mb-3">
                Select all loan products you can offer
              </p>
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3.5 md:mb-5">
                {LOAN_PURPOSES.map((p) => {
                  const active = form.loanPurposes.includes(p);
                  return (
                    <button
                      key={p}
                      onClick={() => toggleArray("loanPurposes", p)}
                      className={`px-2.5 md:px-3 py-1.5 md:py-2 rounded-full border text-[11px] md:text-[12px] font-medium transition-all ${
                        active
                          ? "border-[#00695C] bg-[#00695C] text-white"
                          : "border-[#E3E9E4] bg-white text-[#3B4A41] hover:border-[#00695C]/40"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 md:pt-4 border-t border-[#E3E9E4]">
                <label className={labelCls}>Preferred Loan Amount Range</label>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {LOAN_AMOUNT_RANGES.map((r) => {
                    const active = form.amountRange === r;
                    return (
                      <button
                        key={r}
                        onClick={() => update("amountRange", active ? "" : r)}
                        className={`px-2.5 md:px-3 py-1.5 md:py-2 rounded-full border text-[11px] md:text-[12px] font-medium transition-all ${
                          active
                            ? "border-[#00695C] bg-[#00695C] text-white"
                            : "border-[#E3E9E4] bg-white text-[#3B4A41] hover:border-[#00695C]/40"
                        }`}
                      >
                        {r}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div className="flex flex-col gap-3.5 md:gap-5">
              <div>
                <label className={labelCls}>Preferred Customer Segment</label>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {CUSTOMER_SEGMENTS.map((s) => {
                    const active = form.customerSegments.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => toggleArray("customerSegments", s)}
                        className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border text-[10.5px] md:text-[11px] font-medium transition-all ${
                          active
                            ? "border-[#00695C] bg-[#00695C] text-white"
                            : "border-[#E3E9E4] bg-white text-[#3B4A41] hover:border-[#00695C]/40"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className={labelCls}>Customer Profile Handled</label>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {CUSTOMER_PROFILES.map((s) => {
                    const active = form.customerProfiles.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => toggleArray("customerProfiles", s)}
                        className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border text-[10.5px] md:text-[11px] font-medium transition-all ${
                          active
                            ? "border-[#00695C] bg-[#00695C] text-white"
                            : "border-[#E3E9E4] bg-white text-[#3B4A41] hover:border-[#00695C]/40"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 6 */}
          {step === 6 && (
            <div className="flex flex-col gap-2.5 md:gap-4">
              <div>
                <label className={labelCls}>Loan Processing Location *</label>
                <input className={inputCls} value={form.loanLocation} onChange={(e) => update("loanLocation", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2.5 md:gap-3">
                <div>
                  <label className={labelCls}>City / District *</label>
                  <input className={inputCls} value={form.serviceCity} onChange={(e) => update("serviceCity", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>State *</label>
                  <input className={inputCls} value={form.serviceState} onChange={(e) => update("serviceState", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Serviceable PIN Codes</label>
                <input className={inputCls} value={form.servicePincodes} onChange={(e) => update("servicePincodes", e.target.value)} placeholder="Comma separated" />
              </div>
              <div>
                <label className={labelCls}>Preferred Service Locations</label>
                <input className={inputCls} value={form.preferredLocations} onChange={(e) => update("preferredLocations", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Maximum Service Distance</label>
                <input className={inputCls} value={form.maxServiceDistance} onChange={(e) => update("maxServiceDistance", e.target.value)} placeholder="e.g. 50 km" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.onlineRemote} onChange={(e) => update("onlineRemote", e.target.checked)} className="w-3.5 h-3.5 md:w-4 md:h-4 accent-[#00695C]" />
                <span className="text-[11.5px] md:text-[13px] text-[#3B4A41]">Online / Remote Service Available</span>
              </label>

              <div>
                <label className={labelCls}>Service Coverage</label>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {SERVICE_COVERAGE.map((s) => {
                    const active = form.serviceCoverage === s;
                    return (
                      <button
                        key={s}
                        onClick={() => update("serviceCoverage", active ? "" : s)}
                        className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border text-[10.5px] md:text-[11px] font-medium transition-all ${
                          active
                            ? "border-[#00695C] bg-[#00695C] text-white"
                            : "border-[#E3E9E4] bg-white text-[#3B4A41] hover:border-[#00695C]/40"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Progress + Footer ── */}
        <div className="bg-white border-t border-[#E3E9E4] flex-shrink-0">
          <div className="px-3 md:px-6 pt-2.5 md:pt-3 pb-2 md:pb-3">
            <div className="flex items-center justify-between text-[10px] md:text-[11px] text-[#8A968F] mb-1 md:mb-1.5">
              <span>Form completion</span>
              <span className="font-semibold text-[#00695C]">{completion}%</span>
            </div>
            <div className="h-1 md:h-1.5 rounded-full bg-[#EAF2EE] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${completion}%`,
                  background: `linear-gradient(90deg, ${ACCENT} 0%, #26A69A 100%)`,
                }}
              />
            </div>
          </div>

          <div className="px-3 md:px-6 pb-3 md:pb-5 flex items-center gap-2.5 md:gap-3">
            <button
              onClick={goBack}
              disabled={step === 1}
              className={`flex-1 py-2.5 md:py-3.5 rounded-full font-bold text-[13px] md:text-[14px] border-2 transition-all ${
                step === 1
                  ? "border-[#E3E9E4] text-[#C7CDC1] cursor-not-allowed"
                  : "border-[#00695C] text-[#00695C] hover:bg-[#00695C]/5"
              }`}
            >
              ← Previous
            </button>
            <button
              onClick={goNext}
              className="flex-1 py-2.5 md:py-3.5 rounded-full text-white font-bold text-[13px] md:text-[14px] transition-transform duration-200 hover:scale-[1.01]"
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #26A69A 100%)`,
                boxShadow: "0 12px 28px -12px rgba(0,105,92,0.55)",
              }}
            >
              {step === totalSteps ? "Submit Registration" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DsaAgentRegistrationForm;