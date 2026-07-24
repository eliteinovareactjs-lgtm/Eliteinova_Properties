import React, { useState } from "react";
import { ArrowLeft, ImagePlus, Video, X, MapPin, Bed, Bath, Home, Car, Trees, Building, Lock, Camera, Wifi, Shield, Sun, Coffee, Users, Briefcase, Square, TrendingUp, Clock, FileText, CheckCircle, Sprout, Leaf, Dumbbell, Waves, Hotel, ParkingCircle, Landmark, ArrowUpDown, Calendar } from "lucide-react";

const steps = ["Owner Details", "Property Details", "Pricing & Amenities", "Media Upload", "Document Upload"];
const subtitles = [
  "Enter your personal information",
  "Tell us about your property",
  "Set pricing & select amenities",
  "Upload property photos & video",
  "Upload ownership documents"
];

// Updated Field to match Buy form styling
const Field = ({ label, required, hint, children }) => (
  <div className="mb-2">
    <label className="block text-[12px] font-semibold text-[#00695C] mb-0.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="text-[10px] text-gray-400 mt-0.5">{hint}</p>}
  </div>
);

// Updated FieldDt to match Buy form styling
const FieldDt = ({ label, required, hint, children }) => (
  <div className="mb-2.5">
    <label className="block text-[13px] font-semibold text-[#00695C] mb-0.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="text-[10px] text-gray-400 mt-0.5">{hint}</p>}
  </div>
);

// Updated input styles to match Buy form
const inMob = "w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] text-gray-700 placeholder:text-gray-300 placeholder:text-[11px] focus:outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C]/20 bg-white transition-all";
const inDt = "w-full border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-700 placeholder:text-gray-300 placeholder:text-xs focus:outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C]/20 bg-white transition-all";

const availableAmenities = ["Lift", "Power Backup", "Security", "Water Supply", "Garden", "Gym", "Pool"];

// Lease options - integrated as form fields
const bedroomOptions = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];
const bathroomOptions = ["1", "2", "3", "4+"];
const furnishingOptions = ["Fully Furnished", "Semi Furnished", "Unfurnished"];
const parkingOptions = ["1 Car", "2 Cars", "3+ Cars"];
const yesNoOptions = ["Yes", "No"];

const leaseAmenities = [
  { id: "gatedCommunity", label: "Gated Community", icon: <Building className="w-4 h-4" /> },
  { id: "security247", label: "24/7 Security", icon: <Shield className="w-4 h-4" /> },
  { id: "powerBackup", label: "Power Backup", icon: <Lock className="w-4 h-4" /> },
  { id: "cctv", label: "CCTV Surveillance", icon: <Camera className="w-4 h-4" /> },
  { id: "waterSupply247", label: "24/7 Water Supply", icon: <Coffee className="w-4 h-4" /> },
  { id: "wifiReady", label: "Wi-Fi Ready", icon: <Wifi className="w-4 h-4" /> },
  { id: "playArea", label: "Children's Play Area", icon: <Users className="w-4 h-4" /> },
  { id: "gym", label: "Gym / Fitness Center", icon: <Dumbbell className="w-4 h-4" /> },
  { id: "balcony", label: "Balcony / Terrace", icon: <Sun className="w-4 h-4" /> },
  { id: "lift", label: "Lift / Elevator", icon: <ArrowUpDown className="w-4 h-4" /> },
  { id: "visitorParking", label: "Visitor Parking", icon: <ParkingCircle className="w-4 h-4" /> }
];

export default function IndLeaseForm({ isOpen, onClose }) {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    // Owner Details
    ownerName: "", contactNumber: "", emailId: "", address: "", idProof: "",
    // Property Details
    propertyTitle: "", propertyCategory: "", propertyType: "", propertyAddress: "",
    city: "", builtUpArea: "", carpetArea: "", bedrooms: "", bathrooms: "",
    furnishingStatus: "", parking: "",
    // Pricing & Amenities
    listingPurpose: "lease", expectedPrice: "", priceType: "", maintenance: "",
    availableFrom: "", selectedAmenities: [], otherAmenities: "",
    // Lease Preferences (integrated)
    preferredLocation: "",
    leaseBedrooms: [],
    leaseBathrooms: [],
    leaseFurnishing: "",
    leaseParking: "",
    gardenSpace: "",
    terrace: "",
    leaseBudget: { min: "", max: "" },
    advanceDeposit: { min: "", max: "" },
    leaseDuration: "",
    occupancyType: "",
    leasePetFriendly: "",
    leaseAmenities: [],
    // Media
    propertyImages: [], propertyVideo: null,
    // Documents
    ownershipDoc: null, idProofDoc: null, additionalDocs: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [customAmenitiesList, setCustomAmenitiesList] = useState([]);

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

  const toggleLeaseAmenity = (amenityId) => {
    const current = formData.leaseAmenities;
    if (current.includes(amenityId)) {
      updateForm("leaseAmenities", current.filter(id => id !== amenityId));
    } else {
      updateForm("leaseAmenities", [...current, amenityId]);
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

  const handleSubmit = () => {
    console.log("Lease Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* MOBILE - Updated to match Buy form structure */}
      <div className="fixed inset-0 z-50 flex flex-col sm:hidden">
        <div className="bg-black/50" style={{ height: "10vh" }} onClick={onClose} />
        <div className="flex-1 bg-white rounded-3xl flex flex-col overflow-hidden shadow-2xl mx-5 mb-5">
          {/* Header - Updated minHeight to match Buy form */}
          <div className="relative flex flex-col items-center justify-center px-4 pt-3 pb-3 overflow-hidden shrink-0 rounded-t-3xl"
            style={{ background: "linear-gradient(160deg,#00695C 0%,#00897B 45%,#26A69A 75%,#80CBC4 100%)", minHeight: 75 }}>
            <button onClick={onClose} className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10">
              <ArrowLeft className="w-3.5 h-3.5 text-white" />
            </button>
            <button onClick={onClose} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10 text-white font-bold text-[11px]">✕</button>
            <div className="text-xl mb-0.5 relative z-10">🏠</div>
            <h1 className="text-[13px] font-extrabold text-white tracking-wide relative z-10 text-center">Lease Property - Individual Owner</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5 text-center">List your property for lease</p>
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
            <MobContentLease
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
              toggleAmenity={toggleAmenity}
              toggleLeaseAmenity={toggleLeaseAmenity}
              availableAmenities={availableAmenities}
              customAmenitiesList={customAmenitiesList}
              addCustomAmenity={addCustomAmenity}
              removeCustomAmenity={removeCustomAmenity}
              bedroomOptions={bedroomOptions}
              bathroomOptions={bathroomOptions}
              furnishingOptions={furnishingOptions}
              parkingOptions={parkingOptions}
              yesNoOptions={yesNoOptions}
              leaseAmenities={leaseAmenities}
            />
          </div>

          {/* Footer - Updated to match Buy form structure with progress bar and dots */}
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

      {/* DESKTOP - Updated to match Buy form structure */}
      <div className="fixed inset-0 bg-black/60 z-50 hidden sm:flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
          {/* Header - Updated minHeight to match Buy form */}
          <div className="relative flex flex-col items-center justify-center min-h-[65px] px-4 pt-2.5 pb-2.5 overflow-hidden shrink-0 rounded-3xl"
            style={{ background: "linear-gradient(160deg,#00695C 0%,#00897B 45%,#26A69A 75%,#80CBC4 100%)" }}>
            <button onClick={onClose} className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10">
              <ArrowLeft className="w-3.5 h-3.5 text-white" />
            </button>
            <button onClick={onClose} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center z-10 text-white font-bold text-[11px]">✕</button>
            <div className="text-xl mb-0.5 relative z-10">🏠</div>
            <h1 className="text-[14px] font-extrabold text-white tracking-wide relative z-10">Lease Property - Individual Owner</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5">List your property for lease</p>
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
            <DtContentLease
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
              toggleAmenity={toggleAmenity}
              toggleLeaseAmenity={toggleLeaseAmenity}
              availableAmenities={availableAmenities}
              customAmenitiesList={customAmenitiesList}
              addCustomAmenity={addCustomAmenity}
              removeCustomAmenity={removeCustomAmenity}
              bedroomOptions={bedroomOptions}
              bathroomOptions={bathroomOptions}
              furnishingOptions={furnishingOptions}
              parkingOptions={parkingOptions}
              yesNoOptions={yesNoOptions}
              leaseAmenities={leaseAmenities}
            />
          </div>

          {/* Footer - Updated to match Buy form structure */}
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

// MOBILE CONTENT - LEASE (Updated to match Buy form styling)
function MobContentLease({ step, inp, formData, updateForm, imagePreviews, handleImageUpload, removeImage, handleVideoUpload, videoPreview, removeVideo, handleDocumentUpload, toggleAmenity, toggleLeaseAmenity, availableAmenities, customAmenitiesList, addCustomAmenity, removeCustomAmenity, bedroomOptions, bathroomOptions, furnishingOptions, parkingOptions, yesNoOptions, leaseAmenities }) {
  const ta = `${inp} resize-y`;

  // STEP 0: Owner Details
  if (step === 0) return (
    <>
      <Field label="Owner Name" required hint="As per your government-issued ID">
        <input className={inp} placeholder="Enter your full name" value={formData.ownerName} onChange={(e) => updateForm("ownerName", e.target.value)} />
      </Field>
      <Field label="Contact Number" required>
        <input className={inp} type="tel" placeholder="Enter your 10-digit mobile number" value={formData.contactNumber} onChange={(e) => updateForm("contactNumber", e.target.value)} />
      </Field>
      <Field label="Email ID" required hint="We'll send listing updates to this email">
        <input className={inp} type="email" placeholder="Enter your email address" value={formData.emailId} onChange={(e) => updateForm("emailId", e.target.value)} />
      </Field>
      <Field label="Address" required>
        <textarea className={`${ta} min-h-[65px]`} placeholder="Enter your residential address (Street, Area, City, State, PIN)" value={formData.address} onChange={(e) => updateForm("address", e.target.value)} />
      </Field>
      <Field label="ID Proof / Aadhaar / PAN" required hint="12-digit Aadhaar or 10-character PAN">
        <input className={inp} placeholder="Enter Aadhaar or PAN number" value={formData.idProof} onChange={(e) => updateForm("idProof", e.target.value)} />
      </Field>
    </>
  );

  // STEP 1: Property Details + Lease Preferences
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
            <input type="radio" name="mob-ptype-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.propertyType === t} onChange={() => updateForm("propertyType", t)} readOnly={false} />
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
            <input type="radio" name="mob-furnish-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.furnishingStatus === f} onChange={() => updateForm("furnishingStatus", f)} readOnly={false} />
            {f}
          </label>
        ))}
      </Field>
      <Field label="Parking">
        <div className="flex gap-4">
          <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
            <input type="radio" name="mob-parking-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.parking === "yes"} onChange={() => updateForm("parking", "yes")} readOnly={false} />
            Yes
          </label>
          <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
            <input type="radio" name="mob-parking-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.parking === "no"} onChange={() => updateForm("parking", "no")} readOnly={false} />
            No
          </label>
        </div>
      </Field>

      {/* Integrated Lease Preferences */}
      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Lease Preferences</h3>
      </div>
      <Field label="Preferred Location">
        <input className={inp} placeholder="Enter city, locality, or landmark" value={formData.preferredLocation} onChange={(e) => updateForm("preferredLocation", e.target.value)} />
      </Field>
      <Field label="Lease Budget (₹/month)">
        <div className="flex gap-1">
          <input className={inp} type="number" placeholder="Min" value={formData.leaseBudget.min} onChange={(e) => updateForm("leaseBudget", { ...formData.leaseBudget, min: e.target.value })} />
          <input className={inp} type="number" placeholder="Max" value={formData.leaseBudget.max} onChange={(e) => updateForm("leaseBudget", { ...formData.leaseBudget, max: e.target.value })} />
        </div>
      </Field>
      <Field label="Advance / Security Deposit (₹)">
        <div className="flex gap-1">
          <input className={inp} type="number" placeholder="Min" value={formData.advanceDeposit.min} onChange={(e) => updateForm("advanceDeposit", { ...formData.advanceDeposit, min: e.target.value })} />
          <input className={inp} type="number" placeholder="Max" value={formData.advanceDeposit.max} onChange={(e) => updateForm("advanceDeposit", { ...formData.advanceDeposit, max: e.target.value })} />
        </div>
      </Field>
      <Field label="Preferred Lease Duration">
        {["1 Year", "2 Years", "3 Years", "5+ Years"].map(duration => (
          <label key={duration} className="flex items-center gap-1.5 text-[10px] cursor-pointer">
            <input type="radio" name="mob-lease-duration" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.leaseDuration === duration} onChange={() => updateForm("leaseDuration", duration)} />
            {duration}
          </label>
        ))}
      </Field>
      <Field label="Occupancy Type">
        {["Family", "Company Lease", "Vacation Stay"].map(type => (
          <label key={type} className="flex items-center gap-1.5 text-[10px] cursor-pointer">
            <input type="radio" name="mob-occupancy-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.occupancyType === type} onChange={() => updateForm("occupancyType", type)} />
            {type}
          </label>
        ))}
      </Field>
      <Field label="Pet Friendly">
        <div className="flex gap-2">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-1.5 text-[10px] cursor-pointer">
              <input type="radio" name="mob-pet-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.leasePetFriendly === option} onChange={() => updateForm("leasePetFriendly", option)} />
              {option}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Garden Space">
        <div className="flex gap-2">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-1.5 text-[10px] cursor-pointer">
              <input type="radio" name="mob-garden-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.gardenSpace === option} onChange={() => updateForm("gardenSpace", option)} />
              {option}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Terrace / Balcony">
        <div className="flex gap-2">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-1.5 text-[10px] cursor-pointer">
              <input type="radio" name="mob-terrace-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.terrace === option} onChange={() => updateForm("terrace", option)} />
              {option}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Amenities Required">
        <div className="grid grid-cols-2 gap-1">
          {leaseAmenities.map(amenity => (
            <label key={amenity.id} className="flex items-center gap-1 text-[9px] cursor-pointer">
              <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.leaseAmenities.includes(amenity.id)} onChange={() => toggleLeaseAmenity(amenity.id)} />
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
            <input type="radio" name="mob-purpose-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.listingPurpose === "lease"} onChange={() => updateForm("listingPurpose", "lease")} readOnly={false} />
            For Lease
          </label>
        </div>
      </Field>
      <Field label="Expected Lease (₹/month)" required>
        <input className={inp} placeholder="e.g. 20,000" value={formData.expectedPrice} onChange={(e) => updateForm("expectedPrice", e.target.value)} />
      </Field>
      <Field label="Price Type">
        <div className="flex gap-4">
          <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
            <input type="radio" name="mob-pt-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.priceType === "fixed"} onChange={() => updateForm("priceType", "fixed")} readOnly={false} />
            Fixed
          </label>
          <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
            <input type="radio" name="mob-pt-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.priceType === "negotiable"} onChange={() => updateForm("priceType", "negotiable")} readOnly={false} />
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
          <input type="file" accept="image/*" multiple className="hidden" id="m-imgs-lease" onChange={handleImageUpload} />
          <label htmlFor="m-imgs-lease" className="cursor-pointer flex flex-col items-center">
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
          <input type="file" accept="video/mp4,video/mov" className="hidden" id="m-vid-lease" onChange={handleVideoUpload} />
          <label htmlFor="m-vid-lease" className="cursor-pointer flex flex-col items-center">
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

  // STEP 4: Document Upload
  if (step === 4) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Document Upload</h3>
      </div>
      {[
        { id: "m-own-lease", e: "📄", t: "Upload Ownership Document", s: "Sale deed, registry (PDF/JPG/PNG)", l: "Ownership Proof", r: true, key: "ownershipDoc" },
        { id: "m-id-lease", e: "🪪", t: "Upload ID Proof", s: "Aadhaar, PAN or Passport", l: "Owner ID Proof", r: true, key: "idProofDoc" },
        { id: "m-add-lease", e: "📎", t: "+ Add More Documents", s: "Tax receipts, NOC, floor plans", l: "Additional Documents", r: false, key: "additionalDocs" }
      ].map(d => (
        <Field key={d.id} label={d.l} required={d.r}>
          <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" id={d.id} onChange={(e) => handleDocumentUpload(d.key, e)} />
            <label htmlFor={d.id} className="cursor-pointer">
              <div className="text-xl mb-0.5">{d.e}</div>
              <div className="text-[11px] font-semibold text-[#00695C]">{d.t}</div>
              <span className="text-[10px] text-gray-400">{d.s}</span>
            </label>
          </div>
          {formData[d.key] && <p className="text-[10px] text-green-600 mt-1">✓ {formData[d.key].name}</p>}
        </Field>
      ))}
    </>
  );
}

// DESKTOP CONTENT - LEASE (Updated to match Buy form styling)
function DtContentLease({ step, inp, formData, updateForm, imagePreviews, handleImageUpload, removeImage, handleVideoUpload, videoPreview, removeVideo, handleDocumentUpload, toggleAmenity, toggleLeaseAmenity, availableAmenities, customAmenitiesList, addCustomAmenity, removeCustomAmenity, bedroomOptions, bathroomOptions, furnishingOptions, parkingOptions, yesNoOptions, leaseAmenities }) {
  const ta = `${inp} resize-y`;

  // STEP 0: Owner Details
  if (step === 0) return (
    <>
      <FieldDt label="Owner Name" required hint="As per your government-issued ID">
        <input className={inp} placeholder="Enter your full name" value={formData.ownerName} onChange={(e) => updateForm("ownerName", e.target.value)} />
      </FieldDt>
      <FieldDt label="Contact Number" required>
        <input className={inp} type="tel" placeholder="Enter your 10-digit mobile number" value={formData.contactNumber} onChange={(e) => updateForm("contactNumber", e.target.value)} />
      </FieldDt>
      <FieldDt label="Email ID" required hint="We'll send listing updates to this email">
        <input className={inp} type="email" placeholder="Enter your email address" value={formData.emailId} onChange={(e) => updateForm("emailId", e.target.value)} />
      </FieldDt>
      <FieldDt label="Address" required>
        <textarea className={`${ta} min-h-[80px]`} placeholder="Enter your current residential address (Street, Area, City, State, PIN)" value={formData.address} onChange={(e) => updateForm("address", e.target.value)} />
      </FieldDt>
      <FieldDt label="ID Proof / Aadhaar / PAN" required hint="12-digit Aadhaar or 10-character PAN">
        <input className={inp} placeholder="Enter Aadhaar or PAN number" value={formData.idProof} onChange={(e) => updateForm("idProof", e.target.value)} />
      </FieldDt>
    </>
  );

  // STEP 1: Property Details + Lease Preferences
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
            <input type="radio" name="dt-ptype-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.propertyType === t} onChange={() => updateForm("propertyType", t)} readOnly={false} />
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
            <input type="radio" name="dt-furnish-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.furnishingStatus === f} onChange={() => updateForm("furnishingStatus", f)} readOnly={false} />
            {f}
          </label>
        ))}
      </FieldDt>
      <FieldDt label="Parking Facility">
        <div className="flex gap-5">
          <label className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="radio" name="dt-parking-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.parking === "yes"} onChange={() => updateForm("parking", "yes")} readOnly={false} />
            Yes, available
          </label>
          <label className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="radio" name="dt-parking-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.parking === "no"} onChange={() => updateForm("parking", "no")} readOnly={false} />
            No parking
          </label>
        </div>
      </FieldDt>

      {/* Integrated Lease Preferences */}
      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Lease Preferences</h3>
      </div>
      <FieldDt label="Preferred Location">
        <input className={inp} placeholder="Enter city, locality, or landmark" value={formData.preferredLocation} onChange={(e) => updateForm("preferredLocation", e.target.value)} />
      </FieldDt>
      <FieldDt label="Lease Budget (₹/month)">
        <div className="flex gap-2">
          <input className={inp} type="number" placeholder="Min" value={formData.leaseBudget.min} onChange={(e) => updateForm("leaseBudget", { ...formData.leaseBudget, min: e.target.value })} />
          <input className={inp} type="number" placeholder="Max" value={formData.leaseBudget.max} onChange={(e) => updateForm("leaseBudget", { ...formData.leaseBudget, max: e.target.value })} />
        </div>
      </FieldDt>
      <FieldDt label="Advance / Security Deposit (₹)">
        <div className="flex gap-2">
          <input className={inp} type="number" placeholder="Min" value={formData.advanceDeposit.min} onChange={(e) => updateForm("advanceDeposit", { ...formData.advanceDeposit, min: e.target.value })} />
          <input className={inp} type="number" placeholder="Max" value={formData.advanceDeposit.max} onChange={(e) => updateForm("advanceDeposit", { ...formData.advanceDeposit, max: e.target.value })} />
        </div>
      </FieldDt>
      <FieldDt label="Preferred Lease Duration">
        {["1 Year", "2 Years", "3 Years", "5+ Years"].map(duration => (
          <label key={duration} className="flex items-center gap-2 text-[13px] mb-1.5 cursor-pointer">
            <input type="radio" name="dt-lease-duration" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.leaseDuration === duration} onChange={() => updateForm("leaseDuration", duration)} />
            {duration}
          </label>
        ))}
      </FieldDt>
      <FieldDt label="Occupancy Type">
        {["Family", "Company Lease", "Vacation Stay"].map(type => (
          <label key={type} className="flex items-center gap-2 text-[13px] mb-1.5 cursor-pointer">
            <input type="radio" name="dt-occupancy-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.occupancyType === type} onChange={() => updateForm("occupancyType", type)} />
            {type}
          </label>
        ))}
      </FieldDt>
      <FieldDt label="Pet Friendly">
        <div className="flex gap-5">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-pet-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.leasePetFriendly === option} onChange={() => updateForm("leasePetFriendly", option)} />
              {option}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Garden Space">
        <div className="flex gap-5">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-garden-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.gardenSpace === option} onChange={() => updateForm("gardenSpace", option)} />
              {option}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Terrace / Balcony">
        <div className="flex gap-5">
          {yesNoOptions.map(option => (
            <label key={option} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-terrace-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.terrace === option} onChange={() => updateForm("terrace", option)} />
              {option}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Amenities Required">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {leaseAmenities.map(amenity => (
            <label key={amenity.id} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.leaseAmenities.includes(amenity.id)} onChange={() => toggleLeaseAmenity(amenity.id)} />
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
            <input type="radio" name="dt-purpose-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.listingPurpose === "lease"} onChange={() => updateForm("listingPurpose", "lease")} readOnly={false} />
            For Lease
          </label>
        </div>
      </FieldDt>
      <FieldDt label="Expected Lease (₹/month)" required>
        <input className={inp} placeholder="e.g. 20,000" value={formData.expectedPrice} onChange={(e) => updateForm("expectedPrice", e.target.value)} />
      </FieldDt>
      <FieldDt label="Price Type">
        <div className="flex gap-5">
          <label className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="radio" name="dt-priceType-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.priceType === "fixed"} onChange={() => updateForm("priceType", "fixed")} readOnly={false} />
            Fixed Price
          </label>
          <label className="flex items-center gap-2 text-[13px] cursor-pointer">
            <input type="radio" name="dt-priceType-lease" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.priceType === "negotiable"} onChange={() => updateForm("priceType", "negotiable")} readOnly={false} />
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
          <input type="file" accept="image/*" multiple className="hidden" id="property-images-lease" onChange={handleImageUpload} />
          <label htmlFor="property-images-lease" className="cursor-pointer flex flex-col items-center">
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
          <input type="file" accept="video/mp4,video/mov" className="hidden" id="property-video-lease" onChange={handleVideoUpload} />
          <label htmlFor="property-video-lease" className="cursor-pointer flex flex-col items-center">
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

  // STEP 4: Document Upload
  if (step === 4) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Document Upload</h3>
      </div>
      {[
        { id: "ownership-proof-lease", e: "📄", t: "Upload Ownership Document", s: "Sale deed, registry (PDF/JPG/PNG)", l: "Property Ownership Proof", r: true, key: "ownershipDoc" },
        { id: "id-proof-lease", e: "🪪", t: "Upload ID Proof", s: "Aadhaar, PAN, or Passport", l: "Owner ID Proof", r: true, key: "idProofDoc" },
        { id: "additional-docs-lease", e: "📎", t: "+ Add More Documents", s: "Tax receipts, NOC, floor plans", l: "Additional Documents", r: false, key: "additionalDocs" }
      ].map(d => (
        <FieldDt key={d.id} label={d.l} required={d.r}>
          <div className="border-2 border-dashed border-teal-300 rounded-xl p-4 text-center cursor-pointer hover:bg-green-50">
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" id={d.id} onChange={(e) => handleDocumentUpload(d.key, e)} />
            <label htmlFor={d.id} className="cursor-pointer">
              <div className="text-2xl mb-1">{d.e}</div>
              <div className="text-[13px] font-semibold text-[#00695C]">{d.t}</div>
              <span className="block text-[11px] text-gray-400 mt-1">{d.s}</span>
            </label>
          </div>
          {formData[d.key] && <p className="text-[13px] text-green-600 mt-2">✓ File selected: {formData[d.key].name}</p>}
        </FieldDt>
      ))}
    </>
  );
}