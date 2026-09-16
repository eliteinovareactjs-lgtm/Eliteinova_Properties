// src/components/Forms/loans/BankEmployeeRegistrationForm.jsx
import React, { useState } from "react";
import { ArrowLeft, X, Check } from "lucide-react";

const LOAN_PRODUCTS = [
  "Home Purchase", "Land / Plot Purchase", "House Construction",
  "Commercial Property Purchase", "Loan Against Property",
  "Home Loan Balance Transfer", "Home Renovation",
  "Plot + Construction Loan", "Builder / Project Home Loan",
  "Commercial Property Loan", "Mortgage Loan",
  "Property Purchase Loan", "Top-Up Loan",
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

const STEPS = [
  { n: 1, label: "Employee Details",   title: "Employee Details",   sub: "Basic information about you" },
  { n: 2, label: "Bank Details",       title: "Bank Details",       sub: "Your branch and bank information" },
  { n: 3, label: "Verification",       title: "Employee Verification", sub: "Upload your ID and reporting details" },
  { n: 4, label: "Products",           title: "Loan Products Handled", sub: "Pick the products you can offer" },
  { n: 5, label: "Service Area",       title: "Service Area",       sub: "Where you can process loans" },
];

const BankEmployeeRegistrationForm = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "", employeeId: "", gender: "", dob: "", mobile: "",
    email: "", altMobile: "", designation: "", department: "",
    bankName: "", branchName: "", branchCode: "", ifsc: "",
    bankAddress: "", city: "", district: "", state: "", pincode: "",
    branchPhone: "", username: "", password: "", confirmPassword: "",
    twoFA: false, securityQuestion: "", accepted: false,
    idCard: null, joiningDate: "", yearsOfExperience: "",
    managerName: "", managerId: "",
    loanProducts: [], loanLocation: "", serviceCity: "",
    serviceState: "", servicePincodes: "",
    customerSegments: [], customerProfiles: [],
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
              <div className="text-[18px] md:text-[22px] leading-none mb-0.5 md:mb-1">🏦</div>
              <h2 className="text-white font-bold text-[13.5px] md:text-[17px] leading-tight">
                Bank Employee Registration
              </h2>
              <p className="text-white/80 text-[10px] md:text-[12px] mt-0.5">
                Register to offer loan products
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
                      className="flex flex-col items-center px-1.5 md:px-3 min-w-[58px] md:min-w-[80px] focus:outline-none"
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
                      <div className="w-4 md:w-10 h-[2px] mt-[11px] md:mt-[15px] bg-[#E3E9E4] flex-shrink-0" />
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
                <label className={labelCls}>Contact Person Name *</label>
                <input className={inputCls} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter full name" />
              </div>
              <div>
                <label className={labelCls}>Employee ID *</label>
                <input className={inputCls} value={form.employeeId} onChange={(e) => update("employeeId", e.target.value)} placeholder="Enter employee ID" />
              </div>
              <div className="grid grid-cols-2 gap-2.5 md:gap-3">
                <div>
                  <label className={labelCls}>Gender *</label>
                  <div className="flex items-center gap-2.5 md:gap-4 pt-1.5 md:pt-2">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          checked={form.gender === g}
                          onChange={() => update("gender", g)}
                          className="w-3.5 h-3.5 md:w-4 md:h-4 accent-[#00695C]"
                        />
                        <span className="text-[11.5px] md:text-[13px] text-[#3B4A41]">{g}</span>
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
                <label className={labelCls}>Contact Person Mobile Number *</label>
                <input className={inputCls} value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="Enter your 10-digit mobile number" />
              </div>
              <div>
                <label className={labelCls}>Contact Person Email Address *</label>
                <input type="email" className={inputCls} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Enter your email address" />
                <p className="text-[10px] md:text-[11px] text-[#8A968F] mt-1">
                  We'll send listing updates to this email
                </p>
              </div>
              <div>
                <label className={labelCls}>Alternate Mobile Number</label>
                <input className={inputCls} value={form.altMobile} onChange={(e) => update("altMobile", e.target.value)} placeholder="Optional" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                <div>
                  <label className={labelCls}>Designation *</label>
                  <input className={inputCls} value={form.designation} onChange={(e) => update("designation", e.target.value)} placeholder="e.g. Loan Officer" />
                </div>
                <div>
                  <label className={labelCls}>Department *</label>
                  <input className={inputCls} value={form.department} onChange={(e) => update("department", e.target.value)} placeholder="e.g. Retail Banking" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Profile Photo</label>
                <input type="file" accept="image/*" className={fileCls} />
              </div>

              <div className="pt-2 md:pt-3 border-t border-[#E3E9E4] mt-0.5 md:mt-1">
                <h4 className="text-[12px] md:text-[13px] font-bold text-[#10241F] mb-2 md:mb-3">Login &amp; Security</h4>
                <div className="flex flex-col gap-2.5 md:gap-4">
                  <div>
                    <label className={labelCls}>Username / Official Email *</label>
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
                    <input className={inputCls} value={form.securityQuestion} onChange={(e) => update("securityQuestion", e.target.value)} placeholder="e.g. Mother's maiden name" />
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
                <label className={labelCls}>Bank Name *</label>
                <input className={inputCls} value={form.bankName} onChange={(e) => update("bankName", e.target.value)} placeholder="Enter bank name" />
              </div>
              <div>
                <label className={labelCls}>Branch Name *</label>
                <input className={inputCls} value={form.branchName} onChange={(e) => update("branchName", e.target.value)} placeholder="Enter branch name" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                <div>
                  <label className={labelCls}>Branch Code *</label>
                  <input className={inputCls} value={form.branchCode} onChange={(e) => update("branchCode", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>IFSC Code *</label>
                  <input className={inputCls} value={form.ifsc} onChange={(e) => update("ifsc", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Bank Address *</label>
                <textarea rows="2" className={inputCls} value={form.bankAddress} onChange={(e) => update("bankAddress", e.target.value)} />
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
              <div>
                <label className={labelCls}>Branch Phone Number</label>
                <input className={inputCls} value={form.branchPhone} onChange={(e) => update("branchPhone", e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="flex flex-col gap-2.5 md:gap-4">
              <div>
                <label className={labelCls}>Employee ID Card Upload *</label>
                <input type="file" className={fileCls} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                <div>
                  <label className={labelCls}>Joining Date</label>
                  <input type="date" className={inputCls} value={form.joiningDate} onChange={(e) => update("joiningDate", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Years of Experience</label>
                  <input className={inputCls} value={form.yearsOfExperience} onChange={(e) => update("yearsOfExperience", e.target.value)} placeholder="e.g. 5" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Reporting Manager Name</label>
                <input className={inputCls} value={form.managerName} onChange={(e) => update("managerName", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Reporting Manager Employee ID</label>
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
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {LOAN_PRODUCTS.map((p) => {
                  const active = form.loanProducts.includes(p);
                  return (
                    <button
                      key={p}
                      onClick={() => toggleArray("loanProducts", p)}
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
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div className="flex flex-col gap-3.5 md:gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                <div>
                  <label className={labelCls}>Loan Processing Location</label>
                  <input className={inputCls} value={form.loanLocation} onChange={(e) => update("loanLocation", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>City / District</label>
                  <input className={inputCls} value={form.serviceCity} onChange={(e) => update("serviceCity", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>State</label>
                  <input className={inputCls} value={form.serviceState} onChange={(e) => update("serviceState", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Serviceable PIN Codes</label>
                  <input className={inputCls} value={form.servicePincodes} onChange={(e) => update("servicePincodes", e.target.value)} placeholder="Comma separated" />
                </div>
              </div>

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

export default BankEmployeeRegistrationForm;