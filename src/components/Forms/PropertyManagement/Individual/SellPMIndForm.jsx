import React, { useState } from "react";
import { ArrowLeft, ImagePlus, Video, X, MapPin, Bed, Bath, Home, Car, Trees, Building, Lock, Camera, Wifi, Shield, Sun, Coffee, Users, Briefcase, Square, TrendingUp, Clock, FileText, CheckCircle, Sprout, Leaf, Dumbbell, Waves, Hotel, ParkingCircle, Landmark, ArrowUpDown, Upload } from "lucide-react";

const steps = ["Property Management Details", "Property Details", "Pricing & Amenities", "Media Upload", "Document Upload"];
const subtitles = [
  "Enter property management & company information",
  "Tell us about the property",
  "Set pricing & select amenities",
  "Upload property photos & video",
  "Upload required documents"
];

const Field = ({ label, required, hint, children }) => (
  <div className="mb-2">
    <label className="block text-[12px] font-semibold text-[#00695C] mb-0.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="text-[10px] text-gray-400 mt-0.5">{hint}</p>}
  </div>
);

const FieldDt = ({ label, required, hint, children }) => (
  <div className="mb-2.5">
    <label className="block text-[13px] font-semibold text-[#00695C] mb-0.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="text-[10px] text-gray-400 mt-0.5">{hint}</p>}
  </div>
);

const inMob = "w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] text-gray-700 placeholder:text-gray-300 placeholder:text-[11px] focus:outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C]/20 bg-white transition-all";
const inDt = "w-full border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-700 placeholder:text-gray-300 placeholder:text-xs focus:outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C]/20 bg-white transition-all";

const availableAmenities = ["Lift", "Power Backup", "Security", "Water Supply", "Garden", "Gym", "Pool"];
const availableServices = [
  "Tenant Search & Rental Management",
  "Rental Collection",
  "Legal/Agreement Support",
  "Property Management & Repairs",
  "Security & Facility Management",
  "Resale Assistance",
  "Other Services",
];

const bedroomOptions = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];
const bathroomOptions = ["1", "2", "3", "4+"];
const furnishingOptions = ["Fully Furnished", "Semi Furnished", "Unfurnished"];
const parkingOptions = ["1 Car", "2 Cars", "3+ Cars"];
const yesNoOptions = ["Yes", "No"];

const sellAmenities = [
  { id: "gatedCommunity", label: "Gated Community", icon: <Building className="w-4 h-4" /> },
  { id: "security247", label: "24/7 Security", icon: <Shield className="w-4 h-4" /> },
  { id: "powerBackup", label: "Power Backup", icon: <Lock className="w-4 h-4" /> },
  { id: "cctv", label: "CCTV Surveillance", icon: <Camera className="w-4 h-4" /> },
  { id: "clubhouse", label: "Clubhouse", icon: <Hotel className="w-4 h-4" /> },
  { id: "playArea", label: "Children's Play Area", icon: <Users className="w-4 h-4" /> },
  { id: "gym", label: "Gym / Fitness Center", icon: <Dumbbell className="w-4 h-4" /> },
  { id: "swimmingPool", label: "Swimming Pool", icon: <Waves className="w-4 h-4" /> },
  { id: "balcony", label: "Balcony / Terrace", icon: <Sun className="w-4 h-4" /> },
  { id: "lift", label: "Lift / Elevator", icon: <ArrowUpDown className="w-4 h-4" /> },
  { id: "waterSupply247", label: "24/7 Water Supply", icon: <Coffee className="w-4 h-4" /> }
];

export default function SellPMIndForm({ isOpen, onClose }) {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    // Property Management Details
    companyName: "", officeAddress: "", contactPerson: "", phoneNumber: "", emailId: "",
    // Property Details
    propertyTitle: "", propertyCategory: "", propertyType: "", propertyAddress: "",
    city: "", builtUpArea: "", carpetArea: "", bedrooms: "", bathrooms: "",
    furnishingStatus: "", parking: "",
    currentStatus: "", selectedServices: [],
    // Pricing & Amenities
    listingPurpose: "sale", expectedPrice: "", priceType: "", maintenance: "",
    availableFrom: "", selectedAmenities: [], otherAmenities: "",
    // Sell Preferences
    preferredLocation: "",
    sellBedrooms: [],
    sellBathrooms: [],
    sellFurnishing: "",
    sellParking: "",
    gardenSpace: "",
    terrace: "",
    expectedPriceRange: { min: "", max: "" },
    negotiable: "",
    propertyAge: "",
    propertyCondition: "",
    ownershipType: "",
    loanOutstanding: "",
    floorCount: "",
    sellAmenities: [],
    // Media
    propertyImages: [], propertyVideo: null,
    // Documents - Property Management specific
    ownershipDoc: null,
    ownerIdProof: null,
    managementAgreement: null
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [customAmenitiesList, setCustomAmenitiesList] = useState([]);
  const [customServicesList, setCustomServicesList] = useState([]);
  const [ownershipDocPreview, setOwnershipDocPreview] = useState(null);
  const [ownerIdProofPreview, setOwnerIdProofPreview] = useState(null);
  const [managementAgreementPreview, setManagementAgreementPreview] = useState(null);

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...formData.propertyImages, ...files];
    updateForm("propertyImages", newImages);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = formData.propertyImages.filter((_, i) => i !== index);
    updateForm("propertyImages", newImages);
    URL.revokeObjectURL(imagePreviews[index]);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateForm("propertyVideo", file);
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    updateForm("propertyVideo", null);
    setVideoPreview(null);
  };

  const handleDocumentUpload = (docType, e) => {
    const file = e.target.files[0];
    if (file) {
      updateForm(docType, file);
      if (docType === "ownershipDoc") {
        if (ownershipDocPreview) URL.revokeObjectURL(ownershipDocPreview);
        setOwnershipDocPreview(URL.createObjectURL(file));
      } else if (docType === "ownerIdProof") {
        if (ownerIdProofPreview) URL.revokeObjectURL(ownerIdProofPreview);
        setOwnerIdProofPreview(URL.createObjectURL(file));
      } else if (docType === "managementAgreement") {
        if (managementAgreementPreview) URL.revokeObjectURL(managementAgreementPreview);
        setManagementAgreementPreview(URL.createObjectURL(file));
      }
    }
  };

  const removeDocument = (docType) => {
    updateForm(docType, null);
    if (docType === "ownershipDoc" && ownershipDocPreview) {
      URL.revokeObjectURL(ownershipDocPreview);
      setOwnershipDocPreview(null);
    } else if (docType === "ownerIdProof" && ownerIdProofPreview) {
      URL.revokeObjectURL(ownerIdProofPreview);
      setOwnerIdProofPreview(null);
    } else if (docType === "managementAgreement" && managementAgreementPreview) {
      URL.revokeObjectURL(managementAgreementPreview);
      setManagementAgreementPreview(null);
    }
  };

  const toggleAmenity = (amenity) => {
    const current = formData.selectedAmenities;
    if (current.includes(amenity)) {
      updateForm("selectedAmenities", current.filter(a => a !== amenity));
    } else {
      updateForm("selectedAmenities", [...current, amenity]);
    }
  };

  const toggleSellAmenity = (amenityId) => {
    const current = formData.sellAmenities;
    if (current.includes(amenityId)) {
      updateForm("sellAmenities", current.filter(id => id !== amenityId));
    } else {
      updateForm("sellAmenities", [...current, amenityId]);
    }
  };

  const toggleService = (service) => {
    const current = formData.selectedServices;
    if (current.includes(service)) {
      updateForm("selectedServices", current.filter(s => s !== service));
    } else {
      updateForm("selectedServices", [...current, service]);
    }
  };

  const addCustomAmenity = () => {
    const newAmenity = formData.otherAmenities.trim();
    if (newAmenity && !formData.selectedAmenities.includes(newAmenity) && !customAmenitiesList.includes(newAmenity)) {
      setCustomAmenitiesList([...customAmenitiesList, newAmenity]);
      updateForm("selectedAmenities", [...formData.selectedAmenities, newAmenity]);
      updateForm("otherAmenities", "");
    }
  };

  const removeCustomAmenity = (amenity) => {
    setCustomAmenitiesList(customAmenitiesList.filter(a => a !== amenity));
    updateForm("selectedAmenities", formData.selectedAmenities.filter(a => a !== amenity));
  };

  const addCustomService = () => {
    const newService = formData.otherService?.trim();
    if (newService && !formData.selectedServices.includes(newService) && !customServicesList.includes(newService)) {
      setCustomServicesList([...customServicesList, newService]);
      updateForm("selectedServices", [...formData.selectedServices, newService]);
      updateForm("otherService", "");
    }
  };

  const removeCustomService = (service) => {
    setCustomServicesList(customServicesList.filter(s => s !== service));
    updateForm("selectedServices", formData.selectedServices.filter(s => s !== service));
  };

  const handleSubmit = () => {
    console.log("Sell Property Management Form submitted:", formData);
    onClose();
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
            <h1 className="text-[13px] font-extrabold text-white tracking-wide relative z-10 text-center">Sell Property - Property Management</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5 text-center">List property for sale by property management</p>
          </div>

          <div className="text-center px-3 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-100 border-b border-teal-200 shrink-0">
            <h2 className="text-[12px] font-bold text-[#00695C]">{steps[step]}</h2>
            <p className="text-[9px] text-green-500 mt-0.5">Step {step + 1} of {steps.length} — {subtitles[step]}</p>
          </div>

          <div className="flex items-start justify-between px-1.5 py-1.5 shrink-0 border-b border-gray-100 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center min-w-[50px]">
                <div className={`w-5 h-5 rounded-full text-[9px] flex items-center justify-center font-bold ${i < step ? "bg-green-500 text-white" : i === step ? "bg-[#00695C] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <p className={`text-[8px] mt-0.5 text-center px-0.5 ${i === step ? "text-[#00695C] font-bold" : "text-gray-400"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="px-3 py-2.5 overflow-y-auto flex-1">
            <MobContentSellPM
              step={step}
              inp={inMob}
              formData={formData}
              updateForm={updateForm}
              imagePreviews={imagePreviews}
              handleImageUpload={handleImageUpload}
              removeImage={removeImage}
              handleVideoUpload={handleVideoUpload}
              videoPreview={videoPreview}
              removeVideo={removeVideo}
              handleDocumentUpload={handleDocumentUpload}
              removeDocument={removeDocument}
              ownershipDocPreview={ownershipDocPreview}
              ownerIdProofPreview={ownerIdProofPreview}
              managementAgreementPreview={managementAgreementPreview}
              toggleAmenity={toggleAmenity}
              toggleSellAmenity={toggleSellAmenity}
              toggleService={toggleService}
              availableAmenities={availableAmenities}
              availableServices={availableServices}
              customAmenitiesList={customAmenitiesList}
              customServicesList={customServicesList}
              addCustomAmenity={addCustomAmenity}
              removeCustomAmenity={removeCustomAmenity}
              addCustomService={addCustomService}
              removeCustomService={removeCustomService}
              bedroomOptions={bedroomOptions}
              bathroomOptions={bathroomOptions}
              furnishingOptions={furnishingOptions}
              parkingOptions={parkingOptions}
              yesNoOptions={yesNoOptions}
              sellAmenities={sellAmenities}
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
                onClick={() => step === steps.length - 1 ? handleSubmit() : setStep(step + 1)}
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
            <h1 className="text-[14px] font-extrabold text-white tracking-wide relative z-10">Sell Property - Property Management</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5">List property for sale by property management</p>
          </div>

          <div className="text-center px-4 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-100 border-b border-teal-200 shrink-0">
            <h2 className="text-[12px] font-bold text-[#00695C]">{steps[step]}</h2>
            <p className="text-[9px] text-green-500 mt-0.5">Step {step + 1} of {steps.length} — {subtitles[step]}</p>
          </div>

          <div className="flex items-start justify-between px-2 sm:px-3 py-1.5 shrink-0 border-b border-gray-100 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center min-w-[54px]">
                <div className={`w-5.5 h-5.5 rounded-full text-[10px] flex items-center justify-center font-bold ${i < step ? "bg-green-500 text-white" : i === step ? "bg-[#00695C] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <p className={`text-[8px] mt-0.5 text-center px-0.5 ${i === step ? "text-[#00695C] font-bold" : "text-gray-400"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="px-3 sm:px-4 py-3 overflow-y-auto flex-1">
            <DtContentSellPM
              step={step}
              inp={inDt}
              formData={formData}
              updateForm={updateForm}
              imagePreviews={imagePreviews}
              handleImageUpload={handleImageUpload}
              removeImage={removeImage}
              handleVideoUpload={handleVideoUpload}
              videoPreview={videoPreview}
              removeVideo={removeVideo}
              handleDocumentUpload={handleDocumentUpload}
              removeDocument={removeDocument}
              ownershipDocPreview={ownershipDocPreview}
              ownerIdProofPreview={ownerIdProofPreview}
              managementAgreementPreview={managementAgreementPreview}
              toggleAmenity={toggleAmenity}
              toggleSellAmenity={toggleSellAmenity}
              toggleService={toggleService}
              availableAmenities={availableAmenities}
              availableServices={availableServices}
              customAmenitiesList={customAmenitiesList}
              customServicesList={customServicesList}
              addCustomAmenity={addCustomAmenity}
              removeCustomAmenity={removeCustomAmenity}
              addCustomService={addCustomService}
              removeCustomService={removeCustomService}
              bedroomOptions={bedroomOptions}
              bathroomOptions={bathroomOptions}
              furnishingOptions={furnishingOptions}
              parkingOptions={parkingOptions}
              yesNoOptions={yesNoOptions}
              sellAmenities={sellAmenities}
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
                onClick={() => step === steps.length - 1 ? handleSubmit() : setStep(step + 1)}>
                {step === steps.length - 1 ? <><span>✓</span> Submit Form</> : <>Continue <span className="text-sm">→</span></>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// MOBILE CONTENT - Sell Property Management
function MobContentSellPM({ step, inp, formData, updateForm, imagePreviews, handleImageUpload, removeImage, handleVideoUpload, videoPreview, removeVideo, handleDocumentUpload, removeDocument, ownershipDocPreview, ownerIdProofPreview, managementAgreementPreview, toggleAmenity, toggleSellAmenity, toggleService, availableAmenities, availableServices, customAmenitiesList, customServicesList, addCustomAmenity, removeCustomAmenity, addCustomService, removeCustomService, bedroomOptions, bathroomOptions, furnishingOptions, parkingOptions, yesNoOptions, sellAmenities }) {
  const ta = `${inp} resize-y`;

  // STEP 0: Property Management Details
  if (step === 0) return (
    <>
      <Field label="Company/Property Management Name" required>
        <input className={inp} placeholder="Enter company/property management name" value={formData.companyName} onChange={(e) => updateForm("companyName", e.target.value)} />
      </Field>
      <Field label="Office Address" required>
        <textarea className={`${ta} min-h-[65px]`} placeholder="Enter office address (Street, Area, City, State, PIN)" value={formData.officeAddress} onChange={(e) => updateForm("officeAddress", e.target.value)} />
      </Field>
      <Field label="Contact Person Name" required>
        <input className={inp} placeholder="Enter contact person name" value={formData.contactPerson} onChange={(e) => updateForm("contactPerson", e.target.value)} />
      </Field>
      <Field label="Phone Number" required>
        <input className={inp} type="tel" placeholder="Enter your 10-digit mobile number" value={formData.phoneNumber} onChange={(e) => updateForm("phoneNumber", e.target.value)} />
      </Field>
      <Field label="Email ID" required hint="We'll send listing updates to this email">
        <input className={inp} type="email" placeholder="Enter your email address" value={formData.emailId} onChange={(e) => updateForm("emailId", e.target.value)} />
      </Field>
    </>
  );

  // STEP 1: Property Details + Sell Preferences
  if (step === 1) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Property Details</h3>
      </div>
      <Field label="Property Title / Name" required>
        <input className={inp} placeholder="e.g. Green Valley 3BHK Apartment" value={formData.propertyTitle} onChange={(e) => updateForm("propertyTitle", e.target.value)} />
      </Field>
      <Field label="Property Category" required>
        <input className={inp} placeholder="e.g. Apartment, Villa, Plot..." value={formData.propertyCategory} onChange={(e) => updateForm("propertyCategory", e.target.value)} />
      </Field>
      <Field label="Property Type" required>
        {["Residential", "Commercial", "Mill / Industrial"].map(t => (
          <label key={t} className="flex items-center gap-2 text-[11px] mb-1 cursor-pointer">
            <input type="radio" name="mob-ptype-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.propertyType === t} onChange={() => updateForm("propertyType", t)} readOnly={false} />
            {t}
          </label>
        ))}
      </Field>
      <Field label="Property Address" required>
        <textarea className={`${ta} min-h-[55px]`} placeholder="Enter complete property address" value={formData.propertyAddress} onChange={(e) => updateForm("propertyAddress", e.target.value)} />
      </Field>
      <Field label="City" required>
        <input className={inp} placeholder="Enter city name" value={formData.city} onChange={(e) => updateForm("city", e.target.value)} />
      </Field>
      <Field label="Area Details" required hint="In square feet">
        <div className="grid grid-cols-2 gap-1.5">
          <input className={inp} type="number" placeholder="Build-up Area" value={formData.builtUpArea} onChange={(e) => updateForm("builtUpArea", e.target.value)} />
          <input className={inp} type="number" placeholder="Carpet Area" value={formData.carpetArea} onChange={(e) => updateForm("carpetArea", e.target.value)} />
        </div>
      </Field>
      <Field label="Room Details">
        <div className="grid grid-cols-2 gap-1.5">
          <input className={inp} type="number" placeholder="Bedrooms" value={formData.bedrooms} onChange={(e) => updateForm("bedrooms", e.target.value)} />
          <input className={inp} type="number" placeholder="Bathrooms" value={formData.bathrooms} onChange={(e) => updateForm("bathrooms", e.target.value)} />
        </div>
      </Field>
      <Field label="Furnishing Status" required>
        {["Full Furnish", "Semi Furnish", "Unfurnished"].map(f => (
          <label key={f} className="flex items-center gap-2 text-[11px] mb-1 cursor-pointer">
            <input type="radio" name="mob-furnish-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.furnishingStatus === f} onChange={() => updateForm("furnishingStatus", f)} readOnly={false} />
            {f}
          </label>
        ))}
      </Field>
      <Field label="Parking">
        <div className="flex gap-4">
          <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
            <input type="radio" name="mob-parking-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.parking === "yes"} onChange={() => updateForm("parking", "yes")} readOnly={false} />
            Yes
          </label>
          <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
            <input type="radio" name="mob-parking-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.parking === "no"} onChange={() => updateForm("parking", "no")} readOnly={false} />
            No
          </label>
        </div>
      </Field>

      <Field label="Current Status" required>
        {["Vacant", "Occupied", "Under Maintenance"].map(t => (
          <label key={t} className="flex items-center gap-2 text-[11px] mb-1 cursor-pointer">
            <input type="radio" name="mob-status-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.currentStatus === t} onChange={() => updateForm("currentStatus", t)} readOnly={false} />
            {t}
          </label>
        ))}
      </Field>

      <Field label="Management Service Requirement">
        <div className="flex flex-wrap gap-1 mt-0.5">
          {availableServices.map(s => (
            <span key={s} onClick={() => toggleService(s)} className={`px-1.5 py-0.5 text-[10px] rounded-full border cursor-pointer transition-all ${formData.selectedServices.includes(s) ? 'bg-[#00695C] text-white border-[#00695C]' : 'bg-teal-50 text-[#00695C] border-teal-200 hover:bg-teal-100'}`}>
              {s}
            </span>
          ))}
          {customServicesList.map(s => (
            <span key={s} className="px-1.5 py-0.5 text-[10px] bg-[#00695C] text-white rounded-full border border-[#00695C] flex items-center gap-1">
              {s}
              <X className="w-2.5 h-2.5 cursor-pointer hover:text-red-200" onClick={() => removeCustomService(s)} />
            </span>
          ))}
        </div>
      </Field>
      <Field label="Other Services">
        <div className="flex gap-1">
          <input className={`${inp} flex-1`} placeholder="e.g. Property valuation..." value={formData.otherService} onChange={(e) => updateForm("otherService", e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addCustomService()} />
          <button onClick={addCustomService} className="px-2 py-1 text-[11px] bg-[#00695C] text-white rounded-lg">Add</button>
        </div>
      </Field>

      {/* Sell Preferences */}
      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Sell Preferences</h3>
      </div>
      <Field label="Preferred Location">
        <input className={inp} placeholder="Enter city, locality, or landmark" value={formData.preferredLocation} onChange={(e) => updateForm("preferredLocation", e.target.value)} />
      </Field>
      <Field label="Expected Price Range (₹)">
        <div className="flex gap-1">
          <input className={inp} type="number" placeholder="Min" value={formData.expectedPriceRange.min} onChange={(e) => updateForm("expectedPriceRange", { ...formData.expectedPriceRange, min: e.target.value })} />
          <input className={inp} type="number" placeholder="Max" value={formData.expectedPriceRange.max} onChange={(e) => updateForm("expectedPriceRange", { ...formData.expectedPriceRange, max: e.target.value })} />
        </div>
      </Field>
      <Field label="Negotiable">
        <div className="flex gap-2">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-1.5 text-[10px] cursor-pointer">
              <input type="radio" name="mob-negotiable-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.negotiable === option} onChange={() => updateForm("negotiable", option)} />
              {option}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Property Age (Years)">
        <input className={inp} type="number" placeholder="Enter property age" value={formData.propertyAge} onChange={(e) => updateForm("propertyAge", e.target.value)} />
      </Field>
      <Field label="Property Condition">
        {["New", "Good", "Renovated", "Needs Renovation"].map(condition => (
          <label key={condition} className="flex items-center gap-1.5 text-[10px] cursor-pointer">
            <input type="radio" name="mob-condition-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.propertyCondition === condition} onChange={() => updateForm("propertyCondition", condition)} />
            {condition}
          </label>
        ))}
      </Field>
      <Field label="Ownership Type">
        {["Freehold", "Leasehold"].map(type => (
          <label key={type} className="flex items-center gap-1.5 text-[10px] cursor-pointer">
            <input type="radio" name="mob-ownership-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.ownershipType === type} onChange={() => updateForm("ownershipType", type)} />
            {type}
          </label>
        ))}
      </Field>
      <Field label="Loan Outstanding">
        <div className="flex gap-2">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-1.5 text-[10px] cursor-pointer">
              <input type="radio" name="mob-loan-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.loanOutstanding === option} onChange={() => updateForm("loanOutstanding", option)} />
              {option}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Garden Space">
        <div className="flex gap-2">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-1.5 text-[10px] cursor-pointer">
              <input type="radio" name="mob-garden-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.gardenSpace === option} onChange={() => updateForm("gardenSpace", option)} />
              {option}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Terrace / Balcony">
        <div className="flex gap-2">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-1.5 text-[10px] cursor-pointer">
              <input type="radio" name="mob-terrace-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.terrace === option} onChange={() => updateForm("terrace", option)} />
              {option}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Amenities Required">
        <div className="grid grid-cols-2 gap-1">
          {sellAmenities.map(amenity => (
            <label key={amenity.id} className="flex items-center gap-1 text-[9px] cursor-pointer">
              <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.sellAmenities.includes(amenity.id)} onChange={() => toggleSellAmenity(amenity.id)} />
              {amenity.icon}
              {amenity.label}
            </label>
          ))}
        </div>
      </Field>
    </>
  );

  // STEP 2: Pricing & Amenities
  if (step === 2) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Pricing & Amenities</h3>
      </div>
      <Field label="Listing Purpose" required>
        <div className="flex gap-4">
          <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
            <input type="radio" name="mob-purpose-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.listingPurpose === "sale"} onChange={() => updateForm("listingPurpose", "sale")} readOnly={false} />
            For Sale
          </label>
        </div>
      </Field>
      <Field label="Expected Price (₹)" required>
        <input className={inp} placeholder="e.g. 45,00,000" value={formData.expectedPrice} onChange={(e) => updateForm("expectedPrice", e.target.value)} />
      </Field>
      <Field label="Price Type">
        <div className="flex gap-4">
          <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
            <input type="radio" name="mob-pt-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.priceType === "fixed"} onChange={() => updateForm("priceType", "fixed")} readOnly={false} />
            Fixed
          </label>
          <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
            <input type="radio" name="mob-pt-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.priceType === "negotiable"} onChange={() => updateForm("priceType", "negotiable")} readOnly={false} />
            Negotiable
          </label>
        </div>
      </Field>
      <Field label="Maintenance (₹/month)">
        <input className={inp} placeholder="Enter monthly maintenance" value={formData.maintenance} onChange={(e) => updateForm("maintenance", e.target.value)} />
      </Field>
      <Field label="Available From">
        <input className={inp} type="date" value={formData.availableFrom} onChange={(e) => updateForm("availableFrom", e.target.value)} />
      </Field>
      <Field label="Amenities">
        <div className="flex flex-wrap gap-1 mt-0.5">
          {availableAmenities.map(a => (
            <span key={a} onClick={() => toggleAmenity(a)} className={`px-1.5 py-0.5 text-[10px] rounded-full border cursor-pointer transition-all ${formData.selectedAmenities.includes(a) ? 'bg-[#00695C] text-white border-[#00695C]' : 'bg-teal-50 text-[#00695C] border-teal-200 hover:bg-teal-100'}`}>
              {a}
            </span>
          ))}
          {customAmenitiesList.map(a => (
            <span key={a} className="px-1.5 py-0.5 text-[10px] bg-[#00695C] text-white rounded-full border border-[#00695C] flex items-center gap-1">
              {a}
              <X className="w-2.5 h-2.5 cursor-pointer hover:text-red-200" onClick={() => removeCustomAmenity(a)} />
            </span>
          ))}
        </div>
      </Field>
      <Field label="Other Amenities">
        <div className="flex gap-1">
          <input className={`${inp} flex-1`} placeholder="e.g. Clubhouse, CCTV..." value={formData.otherAmenities} onChange={(e) => updateForm("otherAmenities", e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addCustomAmenity()} />
          <button onClick={addCustomAmenity} className="px-2 py-1 text-[11px] bg-[#00695C] text-white rounded-lg">Add</button>
        </div>
      </Field>
    </>
  );

  // STEP 3: Media Upload
  if (step === 3) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Media Upload</h3>
      </div>
      <p className="text-[10px] text-center text-gray-400 mb-2">📸 Minimum 3 property images required</p>
      <Field label="Property Images" required>
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="image/*" multiple className="hidden" id="m-imgs-sellpm" onChange={handleImageUpload} />
          <label htmlFor="m-imgs-sellpm" className="cursor-pointer flex flex-col items-center">
            <ImagePlus className="mb-1 w-7 h-7 text-[#00695C]" />
            <span className="text-[11px] font-semibold text-[#00695C]">Upload Property Photos</span>
            <span className="text-[10px] text-gray-400">JPG, PNG supported</span>
          </label>
        </div>
        {imagePreviews.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-1">
            {imagePreviews.map((preview, idx) => (
              <div key={idx} className="relative">
                <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-16 object-cover rounded-lg" />
                <button onClick={() => removeImage(idx)} className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center">✕</button>
              </div>
            ))}
          </div>
        )}
      </Field>
      <Field label="Property Video">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="video/mp4,video/mov" className="hidden" id="m-vid-sellpm" onChange={handleVideoUpload} />
          <label htmlFor="m-vid-sellpm" className="cursor-pointer flex flex-col items-center">
            <Video className="mb-1 w-7 h-7 text-[#00695C]" />
            <span className="text-[11px] font-semibold text-[#00695C]">Upload Video Tour</span>
            <span className="text-[10px] text-gray-400">MP4 or MOV</span>
          </label>
        </div>
        {videoPreview && (
          <div className="mt-2 relative">
            <video src={videoPreview} controls className="w-full h-24 object-cover rounded-lg" />
            <button onClick={removeVideo} className="absolute top-1 right-1 w-5.5 h-5.5 bg-red-500 text-white rounded-full text-[11px] flex items-center justify-center">✕</button>
          </div>
        )}
      </Field>
    </>
  );

  // STEP 4: Document Upload - Property Management Version
  if (step === 4) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Documents To Upload</h3>
      </div>
      <p className="text-[9px] text-gray-400 text-center mb-2">Upload required documents for verification</p>

      {/* Property Ownership Document */}
      <Field label="Property Ownership Document" required>
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="m-ownership-sellpm" onChange={(e) => handleDocumentUpload("ownershipDoc", e)} />
          <label htmlFor="m-ownership-sellpm" className="cursor-pointer flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#00695C] flex items-center justify-center mb-1">
              <Upload className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-semibold text-[#00695C]">Upload Property Ownership Document</span>
            <span className="text-[9px] text-gray-400">Upload property papers, registry etc.</span>
          </label>
        </div>
        {ownershipDocPreview && (
          <div className="mt-2 relative">
            <p className="text-[9px] text-green-600 truncate">{formData.ownershipDoc?.name}</p>
            <button onClick={() => removeDocument("ownershipDoc")} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[8px] flex items-center justify-center">✕</button>
          </div>
        )}
      </Field>

      {/* ID Proof of Owner */}
      <Field label="ID Proof of Owner" required>
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="m-ownerid-sellpm" onChange={(e) => handleDocumentUpload("ownerIdProof", e)} />
          <label htmlFor="m-ownerid-sellpm" className="cursor-pointer flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#00695C] flex items-center justify-center mb-1">
              <Upload className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-semibold text-[#00695C]">Upload ID Proof of Owner</span>
            <span className="text-[9px] text-gray-400">Upload Aadhar, PAN, Passport etc.</span>
          </label>
        </div>
        {ownerIdProofPreview && (
          <div className="mt-2 relative">
            <p className="text-[9px] text-green-600 truncate">{formData.ownerIdProof?.name}</p>
            <button onClick={() => removeDocument("ownerIdProof")} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[8px] flex items-center justify-center">✕</button>
          </div>
        )}
      </Field>

      {/* Management Agreement/Authorization Letter */}
      <Field label="Management Agreement/Authorization Letter" required>
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="m-agreement-sellpm" onChange={(e) => handleDocumentUpload("managementAgreement", e)} />
          <label htmlFor="m-agreement-sellpm" className="cursor-pointer flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#00695C] flex items-center justify-center mb-1">
              <Upload className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-semibold text-[#00695C]">Upload Management Agreement/Authorization Letter</span>
            <span className="text-[9px] text-gray-400">Upload signed management agreement</span>
          </label>
        </div>
        {managementAgreementPreview && (
          <div className="mt-2 relative">
            <p className="text-[9px] text-green-600 truncate">{formData.managementAgreement?.name}</p>
            <button onClick={() => removeDocument("managementAgreement")} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[8px] flex items-center justify-center">✕</button>
          </div>
        )}
      </Field>
    </>
  );
}

// DESKTOP CONTENT - Sell Property Management
function DtContentSellPM({ step, inp, formData, updateForm, imagePreviews, handleImageUpload, removeImage, handleVideoUpload, videoPreview, removeVideo, handleDocumentUpload, removeDocument, ownershipDocPreview, ownerIdProofPreview, managementAgreementPreview, toggleAmenity, toggleSellAmenity, toggleService, availableAmenities, availableServices, customAmenitiesList, customServicesList, addCustomAmenity, removeCustomAmenity, addCustomService, removeCustomService, bedroomOptions, bathroomOptions, furnishingOptions, parkingOptions, yesNoOptions, sellAmenities }) {
  const ta = `${inp} resize-y`;

  // STEP 0: Property Management Details
  if (step === 0) return (
    <>
      <FieldDt label="Company/Property Management Name" required>
        <input className={inp} placeholder="Enter company/property management name" value={formData.companyName} onChange={(e) => updateForm("companyName", e.target.value)} />
      </FieldDt>
      <FieldDt label="Office Address" required>
        <textarea className={`${ta} min-h-[80px]`} placeholder="Enter office address (Street, Area, City, State, PIN)" value={formData.officeAddress} onChange={(e) => updateForm("officeAddress", e.target.value)} />
      </FieldDt>
      <FieldDt label="Contact Person Name" required>
        <input className={inp} placeholder="Enter contact person name" value={formData.contactPerson} onChange={(e) => updateForm("contactPerson", e.target.value)} />
      </FieldDt>
      <FieldDt label="Phone Number" required>
        <input className={inp} type="tel" placeholder="Enter your 10-digit mobile number" value={formData.phoneNumber} onChange={(e) => updateForm("phoneNumber", e.target.value)} />
      </FieldDt>
      <FieldDt label="Email ID" required hint="We'll send listing updates to this email">
        <input className={inp} type="email" placeholder="Enter your email address" value={formData.emailId} onChange={(e) => updateForm("emailId", e.target.value)} />
      </FieldDt>
    </>
  );

  // STEP 1: Property Details + Sell Preferences
  if (step === 1) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Property Details</h3>
      </div>
      <FieldDt label="Property Title / Name" required>
        <input className={inp} placeholder="e.g. Green Valley 3BHK Apartment" value={formData.propertyTitle} onChange={(e) => updateForm("propertyTitle", e.target.value)} />
      </FieldDt>
      <FieldDt label="Property Category" required>
        <input className={inp} placeholder="e.g. Apartment, Villa, Plot..." value={formData.propertyCategory} onChange={(e) => updateForm("propertyCategory", e.target.value)} />
      </FieldDt>
      <FieldDt label="Property Type" required>
        {["Residential", "Commercial", "Mill / Industrial"].map(t => (
          <label key={t} className="flex items-center gap-2 text-[13px] mb-2 cursor-pointer">
            <input type="radio" name="dt-ptype-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.propertyType === t} onChange={() => updateForm("propertyType", t)} readOnly={false} />
            {t}
          </label>
        ))}
      </FieldDt>
      <FieldDt label="Property Address" required>
        <textarea className={`${ta} min-h-[70px]`} placeholder="Enter complete property address (Flat No., Building, Street, Locality)" value={formData.propertyAddress} onChange={(e) => updateForm("propertyAddress", e.target.value)} />
      </FieldDt>
      <FieldDt label="City" required>
        <input className={inp} placeholder="Enter city name" value={formData.city} onChange={(e) => updateForm("city", e.target.value)} />
      </FieldDt>
      <FieldDt label="Area Details" required hint="Enter values in square feet">
        <div className="grid grid-cols-2 gap-2">
          <input className={inp} type="number" placeholder="Build-up Area (sq ft)" value={formData.builtUpArea} onChange={(e) => updateForm("builtUpArea", e.target.value)} />
          <input className={inp} type="number" placeholder="Carpet Area (sq ft)" value={formData.carpetArea} onChange={(e) => updateForm("carpetArea", e.target.value)} />
        </div>
      </FieldDt>
      <FieldDt label="Room Details">
        <div className="grid grid-cols-2 gap-2">
          <input className={inp} type="number" placeholder="No. of Bedrooms" value={formData.bedrooms} onChange={(e) => updateForm("bedrooms", e.target.value)} />
          <input className={inp} type="number" placeholder="No. of Bathrooms" value={formData.bathrooms} onChange={(e) => updateForm("bathrooms", e.target.value)} />
        </div>
      </FieldDt>
      <FieldDt label="Furnishing Status" required>
        {["Full Furnish", "Semi Furnish", "Unfurnished"].map(f => (
          <label key={f} className="flex items-center gap-2 text-[13px] mb-2 cursor-pointer">
            <input type="radio" name="dt-furnish-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.furnishingStatus === f} onChange={() => updateForm("furnishingStatus", f)} readOnly={false} />
            {f}
          </label>
        ))}
      </FieldDt>
      <FieldDt label="Parking Facility">
        <div className="flex gap-5">
          <label className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="radio" name="dt-parking-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.parking === "yes"} onChange={() => updateForm("parking", "yes")} readOnly={false} />
            Yes, available
          </label>
          <label className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="radio" name="dt-parking-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.parking === "no"} onChange={() => updateForm("parking", "no")} readOnly={false} />
            No parking
          </label>
        </div>
      </FieldDt>

      <FieldDt label="Current Status" required>
        <div className="flex gap-5">
          {["Vacant", "Occupied", "Under Maintenance"].map(t => (
            <label key={t} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-status-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.currentStatus === t} onChange={() => updateForm("currentStatus", t)} readOnly={false} />
              {t}
            </label>
          ))}
        </div>
      </FieldDt>

      <FieldDt label="Management Service Requirement">
        <div className="flex flex-wrap gap-1.5 mt-1">
          {availableServices.map(s => (
            <span key={s} onClick={() => toggleService(s)} className={`px-2 py-1 text-xs sm:text-sm rounded-full border cursor-pointer transition-all ${formData.selectedServices.includes(s) ? 'bg-[#00695C] text-white border-[#00695C]' : 'bg-teal-50 text-[#00695C] border-teal-200 hover:bg-teal-100'}`}>
              {s}
            </span>
          ))}
          {customServicesList.map(s => (
            <span key={s} className="px-2 py-1 text-xs sm:text-sm bg-[#00695C] text-white rounded-full border border-[#00695C] flex items-center gap-1">
              {s}
              <X className="w-3 h-3 cursor-pointer hover:text-red-200" onClick={() => removeCustomService(s)} />
            </span>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Other Services">
        <div className="flex gap-2">
          <input className={inp} placeholder="e.g. Property valuation..." value={formData.otherService} onChange={(e) => updateForm("otherService", e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addCustomService()} />
          <button onClick={addCustomService} className="px-3 py-1 text-sm bg-[#00695C] text-white rounded-lg hover:bg-[#004d42] transition-colors">Add</button>
        </div>
      </FieldDt>

      {/* Sell Preferences */}
      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Sell Preferences</h3>
      </div>
      <FieldDt label="Preferred Location">
        <input className={inp} placeholder="Enter city, locality, or landmark" value={formData.preferredLocation} onChange={(e) => updateForm("preferredLocation", e.target.value)} />
      </FieldDt>
      <FieldDt label="Expected Price Range (₹)">
        <div className="flex gap-2">
          <input className={inp} type="number" placeholder="Min" value={formData.expectedPriceRange.min} onChange={(e) => updateForm("expectedPriceRange", { ...formData.expectedPriceRange, min: e.target.value })} />
          <input className={inp} type="number" placeholder="Max" value={formData.expectedPriceRange.max} onChange={(e) => updateForm("expectedPriceRange", { ...formData.expectedPriceRange, max: e.target.value })} />
        </div>
      </FieldDt>
      <FieldDt label="Negotiable">
        <div className="flex gap-2">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-2 p-2 rounded-lg border-2 border-teal-200 bg-white hover:border-teal-500 cursor-pointer transition-all duration-300 flex-1 text-center justify-center">
              <input type="radio" name="dt-negotiable-sellpm" className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500/30" checked={formData.negotiable === option} onChange={() => updateForm("negotiable", option)} />
              <span className="text-sm font-semibold text-teal-900">{option}</span>
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Property Age (Years)">
        <input className={inp} type="number" placeholder="Enter property age" value={formData.propertyAge} onChange={(e) => updateForm("propertyAge", e.target.value)} />
      </FieldDt>
      <FieldDt label="Property Condition">
        <div className="grid grid-cols-2 gap-2">
          {["New", "Good", "Renovated", "Needs Renovation"].map(condition => (
            <label key={condition} className="flex items-center gap-2 p-2 rounded-lg border-2 border-teal-200 bg-white hover:border-teal-500 cursor-pointer transition-all duration-300">
              <input type="radio" name="dt-condition-sellpm" className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500/30" checked={formData.propertyCondition === condition} onChange={() => updateForm("propertyCondition", condition)} />
              <span className="text-sm font-semibold text-teal-900">{condition}</span>
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Ownership Type">
        <div className="flex gap-2">
          {["Freehold", "Leasehold"].map(type => (
            <label key={type} className="flex items-center gap-2 p-2 rounded-lg border-2 border-teal-200 bg-white hover:border-teal-500 cursor-pointer transition-all duration-300 flex-1 text-center justify-center">
              <input type="radio" name="dt-ownership-sellpm" className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500/30" checked={formData.ownershipType === type} onChange={() => updateForm("ownershipType", type)} />
              <span className="text-sm font-semibold text-teal-900">{type}</span>
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Loan Outstanding">
        <div className="flex gap-2">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-2 p-2 rounded-lg border-2 border-teal-200 bg-white hover:border-teal-500 cursor-pointer transition-all duration-300 flex-1 text-center justify-center">
              <input type="radio" name="dt-loan-sellpm" className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500/30" checked={formData.loanOutstanding === option} onChange={() => updateForm("loanOutstanding", option)} />
              <span className="text-sm font-semibold text-teal-900">{option}</span>
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Garden Space">
        <div className="flex gap-2">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-2 p-2 rounded-lg border-2 border-teal-200 bg-white hover:border-teal-500 cursor-pointer transition-all duration-300 flex-1 text-center justify-center">
              <input type="radio" name="dt-garden-sellpm" className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500/30" checked={formData.gardenSpace === option} onChange={() => updateForm("gardenSpace", option)} />
              <span className="text-sm font-semibold text-teal-900">{option}</span>
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Terrace / Balcony">
        <div className="flex gap-2">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-2 p-2 rounded-lg border-2 border-teal-200 bg-white hover:border-teal-500 cursor-pointer transition-all duration-300 flex-1 text-center justify-center">
              <input type="radio" name="dt-terrace-sellpm" className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500/30" checked={formData.terrace === option} onChange={() => updateForm("terrace", option)} />
              <span className="text-sm font-semibold text-teal-900">{option}</span>
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Amenities Required">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {sellAmenities.map(amenity => (
            <label key={amenity.id} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.sellAmenities.includes(amenity.id)} onChange={() => toggleSellAmenity(amenity.id)} />
              {amenity.label}
            </label>
          ))}
        </div>
      </FieldDt>
    </>
  );

  // STEP 2: Pricing & Amenities
  if (step === 2) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Pricing & Amenities</h3>
      </div>
      <FieldDt label="Listing Purpose" required>
        <div className="flex gap-5">
          <label className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="radio" name="dt-purpose-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.listingPurpose === "sale"} onChange={() => updateForm("listingPurpose", "sale")} readOnly={false} />
            For Sale
          </label>
        </div>
      </FieldDt>
      <FieldDt label="Expected Price (₹)" required>
        <input className={inp} placeholder="e.g. 45,00,000" value={formData.expectedPrice} onChange={(e) => updateForm("expectedPrice", e.target.value)} />
      </FieldDt>
      <FieldDt label="Price Type">
        <div className="flex gap-5">
          <label className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="radio" name="dt-priceType-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.priceType === "fixed"} onChange={() => updateForm("priceType", "fixed")} readOnly={false} />
            Fixed Price
          </label>
          <label className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="radio" name="dt-priceType-sellpm" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.priceType === "negotiable"} onChange={() => updateForm("priceType", "negotiable")} readOnly={false} />
            Negotiable
          </label>
        </div>
      </FieldDt>
      <FieldDt label="Maintenance Charges (₹/month)">
        <input className={inp} placeholder="Enter monthly maintenance amount" value={formData.maintenance} onChange={(e) => updateForm("maintenance", e.target.value)} />
      </FieldDt>
      <FieldDt label="Available From" hint="Date from which the property is available">
        <input className={inp} type="date" value={formData.availableFrom} onChange={(e) => updateForm("availableFrom", e.target.value)} />
      </FieldDt>
      <FieldDt label="Select Amenities">
        <div className="flex flex-wrap gap-1.5 mt-1">
          {availableAmenities.map(a => (
            <span key={a} onClick={() => toggleAmenity(a)} className={`px-2.5 py-1.5 text-[13px] rounded-full border cursor-pointer transition-all ${formData.selectedAmenities.includes(a) ? 'bg-[#00695C] text-white border-[#00695C]' : 'bg-teal-50 text-[#00695C] border-teal-200 hover:bg-teal-100'}`}>
              {a}
            </span>
          ))}
          {customAmenitiesList.map(a => (
            <span key={a} className="px-2.5 py-1.5 text-[13px] bg-[#00695C] text-white rounded-full border border-[#00695C] flex items-center gap-1">
              {a}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-200" onClick={() => removeCustomAmenity(a)} />
            </span>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Other Amenities">
        <div className="flex gap-2">
          <input className={inp} placeholder="e.g. Clubhouse, CCTV, Solar Panel..." value={formData.otherAmenities} onChange={(e) => updateForm("otherAmenities", e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addCustomAmenity()} />
          <button onClick={addCustomAmenity} className="px-3 py-1.5 text-[13px] bg-[#00695C] text-white rounded-lg hover:bg-[#004d42] transition-colors">Add</button>
        </div>
      </FieldDt>
    </>
  );

  // STEP 3: Media Upload
  if (step === 3) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Media Upload</h3>
      </div>
      <p className="text-[11px] text-center text-gray-400 mb-3">📸 Minimum 3 property images required</p>
      <FieldDt label="Property Images" required>
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-4 text-center cursor-pointer hover:bg-green-50">
          <input type="file" accept="image/*" multiple className="hidden" id="property-images-sellpm" onChange={handleImageUpload} />
          <label htmlFor="property-images-sellpm" className="cursor-pointer flex flex-col items-center">
            <ImagePlus className="mx-auto mb-2 w-8 h-8 sm:w-10 sm:h-10 text-[#00695C]" />
            <span className="text-[13px] font-semibold text-[#00695C]">Upload Property Photos</span>
            <span className="text-[11px] text-gray-400 mt-1">Click to select multiple images (JPG, PNG)</span>
          </label>
        </div>
        {imagePreviews.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {imagePreviews.map((preview, idx) => (
              <div key={idx} className="relative">
                <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-20 object-cover rounded-lg border border-gray-200" />
                <button onClick={() => removeImage(idx)} className="absolute -top-2 -right-2 w-5.5 h-5.5 bg-red-500 text-white rounded-full text-[11px] flex items-center justify-center hover:bg-red-600">✕</button>
              </div>
            ))}
          </div>
        )}
      </FieldDt>
      <FieldDt label="Property Video">
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-4 text-center cursor-pointer hover:bg-green-50">
          <input type="file" accept="video/mp4,video/mov" className="hidden" id="property-video-sellpm" onChange={handleVideoUpload} />
          <label htmlFor="property-video-sellpm" className="cursor-pointer flex flex-col items-center">
            <Video className="mx-auto mb-2 w-8 h-8 sm:w-10 sm:h-10 text-[#00695C]" />
            <span className="text-[13px] font-semibold text-[#00695C]">Upload Property Video Tour</span>
            <p className="text-[11px] text-gray-400 mt-1">MP4 or MOV format supported</p>
          </label>
        </div>
        {videoPreview && (
          <div className="mt-3 relative">
            <video src={videoPreview} controls className="w-full h-32 object-cover rounded-lg border border-gray-200" />
            <button onClick={removeVideo} className="absolute top-2 right-2 w-6.5 h-6.5 bg-red-500 text-white rounded-full text-[13px] flex items-center justify-center hover:bg-red-600">✕</button>
          </div>
        )}
      </FieldDt>
    </>
  );

  // STEP 4: Document Upload - Property Management Version Desktop
  if (step === 4) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Documents To Upload</h3>
      </div>
      <p className="text-[10px] text-gray-400 text-center mb-3">Upload required documents for verification</p>

      {/* Property Ownership Document */}
      <FieldDt label="Property Ownership Document" required>
        <div className="upload-box cursor-pointer hover:bg-green-50 border-2 border-dashed border-teal-300 rounded-xl p-4 text-center">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="dt-ownership-sellpm" onChange={(e) => handleDocumentUpload("ownershipDoc", e)} />
          <label htmlFor="dt-ownership-sellpm" className="cursor-pointer flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#00695C] flex items-center justify-center mb-2">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <span className="text-[13px] font-semibold text-[#00695C]">Upload Property Ownership Document</span>
            <span className="text-[10px] text-gray-400 mt-1">Upload property papers, registry etc.</span>
          </label>
        </div>
        {ownershipDocPreview && (
          <div className="mt-2 relative">
            <p className="text-xs text-green-600">{formData.ownershipDoc?.name}</p>
            <button onClick={() => removeDocument("ownershipDoc")} className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">✕</button>
          </div>
        )}
      </FieldDt>

      {/* ID Proof of Owner */}
      <FieldDt label="ID Proof of Owner" required>
        <div className="upload-box cursor-pointer hover:bg-green-50 border-2 border-dashed border-teal-300 rounded-xl p-4 text-center">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="dt-ownerid-sellpm" onChange={(e) => handleDocumentUpload("ownerIdProof", e)} />
          <label htmlFor="dt-ownerid-sellpm" className="cursor-pointer flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#00695C] flex items-center justify-center mb-2">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <span className="text-[13px] font-semibold text-[#00695C]">Upload ID Proof of Owner</span>
            <span className="text-[10px] text-gray-400 mt-1">Upload Aadhar, PAN, Passport etc.</span>
          </label>
        </div>
        {ownerIdProofPreview && (
          <div className="mt-2 relative">
            <p className="text-xs text-green-600">{formData.ownerIdProof?.name}</p>
            <button onClick={() => removeDocument("ownerIdProof")} className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">✕</button>
          </div>
        )}
      </FieldDt>

      {/* Management Agreement/Authorization Letter */}
      <FieldDt label="Management Agreement/Authorization Letter" required>
        <div className="upload-box cursor-pointer hover:bg-green-50 border-2 border-dashed border-teal-300 rounded-xl p-4 text-center">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="dt-agreement-sellpm" onChange={(e) => handleDocumentUpload("managementAgreement", e)} />
          <label htmlFor="dt-agreement-sellpm" className="cursor-pointer flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#00695C] flex items-center justify-center mb-2">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <span className="text-[13px] font-semibold text-[#00695C]">Upload Management Agreement/Authorization Letter</span>
            <span className="text-[10px] text-gray-400 mt-1">Upload signed management agreement</span>
          </label>
        </div>
        {managementAgreementPreview && (
          <div className="mt-2 relative">
            <p className="text-xs text-green-600">{formData.managementAgreement?.name}</p>
            <button onClick={() => removeDocument("managementAgreement")} className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">✕</button>
          </div>
        )}
      </FieldDt>
    </>
  );
}