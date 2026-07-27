import React, { useState } from "react";
import { ArrowLeft, ImagePlus, Video, X, MapPin, Bed, Bath, Home, Car, Trees, Building, Lock, Camera, Wifi, Shield, Sun, Coffee, Users, Briefcase, Square, TrendingUp, Clock, FileText, CheckCircle, Sprout, Leaf, Dumbbell, Waves, Hotel, ParkingCircle, Landmark, ArrowUpDown, Calendar, Dog, Wind, Droplet, Layers, Layout, Smartphone, Mail, Phone, MessageCircle, Globe, Compass, RefreshCw } from "lucide-react";

const steps = ["Owner Details", "Property Details", "Pricing & Amenities", "Media Upload", "Document Upload"];
const subtitles = [
  "Enter your personal information",
  "Tell us about your property",
  "Set pricing & select amenities",
  "Upload property photos & video",
  "Upload ownership documents"
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

const availableAmenities = ["Lift", "Power Backup", "Security", "Water Supply", "Garden", "Gym", "Pool", "Covered Parking", "CCTV Surveillance", "Clubhouse", "Children's Play Area", "Jogging Track", "Visitor Parking", "Smart Home Features"];

const yesNoOptions = ["Yes", "No"];
const furnishingOptions = ["Fully Furnished", "Semi-Furnished", "Unfurnished"];
const facingOptions = ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"];
const ownershipOptions = ["Freehold", "Leasehold"];
const contactTimeOptions = ["Morning (9 AM - 12 PM)", "Afternoon (12 PM - 4 PM)", "Evening (4 PM - 8 PM)", "Anytime"];

const apartmentSellAmenities = [
  { id: "coveredParking", label: "Covered Parking", icon: <ParkingCircle className="w-4 h-4" /> },
  { id: "lift", label: "Lift / Elevator", icon: <ArrowUpDown className="w-4 h-4" /> },
  { id: "security247", label: "24/7 Security", icon: <Shield className="w-4 h-4" /> },
  { id: "cctv", label: "CCTV Surveillance", icon: <Camera className="w-4 h-4" /> },
  { id: "powerBackup", label: "Power Backup", icon: <Lock className="w-4 h-4" /> },
  { id: "gym", label: "Gym / Fitness Center", icon: <Dumbbell className="w-4 h-4" /> },
  { id: "swimmingPool", label: "Swimming Pool", icon: <Waves className="w-4 h-4" /> },
  { id: "clubhouse", label: "Clubhouse", icon: <Hotel className="w-4 h-4" /> },
  { id: "playArea", label: "Children's Play Area", icon: <Users className="w-4 h-4" /> },
  { id: "garden", label: "Garden / Park", icon: <Trees className="w-4 h-4" /> },
  { id: "joggingTrack", label: "Jogging Track", icon: <Sprout className="w-4 h-4" /> },
  { id: "visitorParking", label: "Visitor Parking", icon: <ParkingCircle className="w-4 h-4" /> },
  { id: "smartHome", label: "Smart Home Features", icon: <Layout className="w-4 h-4" /> },
  { id: "petFriendly", label: "Pet Friendly", icon: <Dog className="w-4 h-4" /> }
];

export default function ApartSellForm({ isOpen, onClose }) {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    ownerName: "", contactNumber: "", emailId: "", address: "", idProof: "",
    propertyType: "Apartment", listingType: "", purpose: "Sell",
    city: "", area: "", landmark: "", pinCode: "", nearbyConnectivity: "",
    builtUpAreaMin: "", builtUpAreaMax: "", carpetAreaMin: "", carpetAreaMax: "",
    bedrooms: "", bathrooms: "", floorNumber: "", totalFloors: "",
    facingDirection: "", balcony: "", propertyAge: "", cornerUnit: "",
    // Sell Details
    sellPriceMin: "", sellPriceMax: "", priceNegotiable: "", maintenanceCharges: "", propertyTax: "",
    ownershipType: "",
    // Interior Details
    furnishing: "", modularKitchen: "", wardrobes: "", airConditioning: "",
    utilityArea: "", smartHomeFeatures: "", 
    // Legal Details
    titleDeedVerified: "", loanEligible: "", reraApproved: "",
    // Amenities
    selectedAmenities: [], otherAmenities: "",
    // Availability
    readyToMove: "", underConstruction: "", immediatePossession: "",
    // Nearby Access
    nearbySchool: false, nearbyHospital: false, nearbyMetro: false,
    nearbyMall: false, nearbyITPark: false, nearbyAirport: false,
    // Contact
    contactVia: "", preferredContactTime: "",
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

  const toggleApartmentAmenity = (amenityId) => {
    const current = formData.selectedAmenities;
    if (current.includes(amenityId)) {
      updateForm("selectedAmenities", current.filter(id => id !== amenityId));
    } else {
      updateForm("selectedAmenities", [...current, amenityId]);
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
    console.log("Apartment Sell Form submitted:", formData);
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
            <h1 className="text-[13px] font-extrabold text-white tracking-wide relative z-10 text-center">Apartment - For Sale</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5 text-center">List your apartment for sale</p>
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
            <MobContentApartSell
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
              toggleApartmentAmenity={toggleApartmentAmenity}
              availableAmenities={availableAmenities}
              customAmenitiesList={customAmenitiesList}
              addCustomAmenity={addCustomAmenity}
              removeCustomAmenity={removeCustomAmenity}
              yesNoOptions={yesNoOptions}
              furnishingOptions={furnishingOptions}
              facingOptions={facingOptions}
              ownershipOptions={ownershipOptions}
              contactTimeOptions={contactTimeOptions}
              apartmentSellAmenities={apartmentSellAmenities}
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
            <h1 className="text-[14px] font-extrabold text-white tracking-wide relative z-10">Apartment - For Sale</h1>
            <p className="text-[10px] text-white/80 relative z-10 mt-0.5">List your apartment for sale</p>
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
            <DtContentApartSell
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
              toggleApartmentAmenity={toggleApartmentAmenity}
              availableAmenities={availableAmenities}
              customAmenitiesList={customAmenitiesList}
              addCustomAmenity={addCustomAmenity}
              removeCustomAmenity={removeCustomAmenity}
              yesNoOptions={yesNoOptions}
              furnishingOptions={furnishingOptions}
              facingOptions={facingOptions}
              ownershipOptions={ownershipOptions}
              contactTimeOptions={contactTimeOptions}
              apartmentSellAmenities={apartmentSellAmenities}
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

// MOBILE CONTENT
function MobContentApartSell({ step, inp, formData, updateForm, imagePreviews, handleImageUpload, removeImage, handleVideoUpload, videoPreview, removeVideo, handleDocumentUpload, toggleAmenity, toggleApartmentAmenity, availableAmenities, customAmenitiesList, addCustomAmenity, removeCustomAmenity, yesNoOptions, furnishingOptions, facingOptions, ownershipOptions, contactTimeOptions, apartmentSellAmenities }) {
  const ta = `${inp} resize-y`;

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
        <textarea className={`${ta} min-h-[65px]`} placeholder="Enter your residential address" value={formData.address} onChange={(e) => updateForm("address", e.target.value)} />
      </Field>
      <Field label="ID Proof / Aadhaar / PAN" required>
        <input className={inp} placeholder="Enter Aadhaar or PAN number" value={formData.idProof} onChange={(e) => updateForm("idProof", e.target.value)} />
      </Field>
    </>
  );

  if (step === 1) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">📍 Location Details</h3>
      </div>
      <Field label="City" required>
        <input className={inp} placeholder="Enter city name" value={formData.city} onChange={(e) => updateForm("city", e.target.value)} />
      </Field>
      <Field label="Area / Locality" required>
        <input className={inp} placeholder="Enter area or locality" value={formData.area} onChange={(e) => updateForm("area", e.target.value)} />
      </Field>
      <Field label="Landmark">
        <input className={inp} placeholder="Nearby landmark" value={formData.landmark} onChange={(e) => updateForm("landmark", e.target.value)} />
      </Field>
      <Field label="PIN Code">
        <input className={inp} placeholder="Enter PIN code" value={formData.pinCode} onChange={(e) => updateForm("pinCode", e.target.value)} />
      </Field>
      <Field label="Nearby Connectivity">
        <input className={inp} placeholder="Metro, Bus, Highway" value={formData.nearbyConnectivity} onChange={(e) => updateForm("nearbyConnectivity", e.target.value)} />
      </Field>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">🏠 Property Details</h3>
      </div>
      <Field label="Property Type" required>
        <input className={inp} placeholder="Apartment" value={formData.propertyType} onChange={(e) => updateForm("propertyType", e.target.value)} />
      </Field>
      <Field label="Listing Type" required>
        {["Owner", "Agent", "Builder"].map(t => (
          <label key={t} className="flex items-center gap-2 text-[11px] mb-1 cursor-pointer">
            <input type="radio" name="mob-listing-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.listingType === t} onChange={() => updateForm("listingType", t)} />
            {t}
          </label>
        ))}
      </Field>
      <Field label="Built-up Area" hint="In square feet">
        <div className="flex gap-1">
          <input className={`${inp} w-1/2`} type="number" placeholder="Min sq.ft" value={formData.builtUpAreaMin} onChange={(e) => updateForm("builtUpAreaMin", e.target.value)} />
          <input className={`${inp} w-1/2`} type="number" placeholder="Max sq.ft" value={formData.builtUpAreaMax} onChange={(e) => updateForm("builtUpAreaMax", e.target.value)} />
        </div>
      </Field>
      <Field label="Carpet Area" hint="In square feet">
        <div className="flex gap-1">
          <input className={`${inp} w-1/2`} type="number" placeholder="Min sq.ft" value={formData.carpetAreaMin} onChange={(e) => updateForm("carpetAreaMin", e.target.value)} />
          <input className={`${inp} w-1/2`} type="number" placeholder="Max sq.ft" value={formData.carpetAreaMax} onChange={(e) => updateForm("carpetAreaMax", e.target.value)} />
        </div>
      </Field>
      <Field label="Number of Bedrooms">
        {["Studio", "1 BHK", "2 BHK", "3 BHK", "4 BHK+"].map(bhk => (
          <label key={bhk} className="flex items-center gap-2 text-[11px] mb-1 cursor-pointer">
            <input type="radio" name="mob-bhk-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.bedrooms === bhk} onChange={() => updateForm("bedrooms", bhk)} />
            {bhk}
          </label>
        ))}
      </Field>
      <Field label="Number of Bathrooms">
        {["1", "2", "3", "4+"].map(b => (
          <label key={b} className="flex items-center gap-2 text-[11px] mb-1 cursor-pointer">
            <input type="radio" name="mob-bath-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.bathrooms === b} onChange={() => updateForm("bathrooms", b)} />
            {b}
          </label>
        ))}
      </Field>
      <Field label="Floor Number">
        <input className={inp} type="number" placeholder="Enter floor number" value={formData.floorNumber} onChange={(e) => updateForm("floorNumber", e.target.value)} />
      </Field>
      <Field label="Total Floors">
        <input className={inp} type="number" placeholder="Enter total floors" value={formData.totalFloors} onChange={(e) => updateForm("totalFloors", e.target.value)} />
      </Field>
      <Field label="Facing Direction">
        <div className="grid grid-cols-2 gap-1">
          {facingOptions.map(f => (
            <label key={f} className="flex items-center gap-1 text-[10px] cursor-pointer">
              <input type="radio" name="mob-facing-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.facingDirection === f} onChange={() => updateForm("facingDirection", f)} />
              {f}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Balcony">
        <div className="flex gap-4">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-balcony-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.balcony === opt} onChange={() => updateForm("balcony", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Property Age">
        <input className={inp} type="number" placeholder="Enter property age in years" value={formData.propertyAge} onChange={(e) => updateForm("propertyAge", e.target.value)} />
      </Field>
      <Field label="Corner Unit">
        <div className="flex gap-4">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-corner-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.cornerUnit === opt} onChange={() => updateForm("cornerUnit", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Ownership Type">
        <div className="flex gap-4">
          {ownershipOptions.map(opt => (
            <label key={opt} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-ownership-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.ownershipType === opt} onChange={() => updateForm("ownershipType", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </Field>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">🪑 Interior Details</h3>
      </div>
      <Field label="Furnishing Status">
        <div className="grid grid-cols-2 gap-1">
          {furnishingOptions.map(f => (
            <label key={f} className="flex items-center gap-1 text-[10px] cursor-pointer">
              <input type="radio" name="mob-furnish-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.furnishing === f} onChange={() => updateForm("furnishing", f)} />
              {f}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Interior Features">
        <div className="grid grid-cols-2 gap-1">
          {["Modular Kitchen", "Wardrobes", "Air Conditioning", "Utility Area", "Smart Home Features"].map(feature => (
            <label key={feature} className="flex items-center gap-1 text-[9px] cursor-pointer">
              <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData[feature.toLowerCase().replace(/ /g, '')] === "yes"} onChange={() => updateForm(feature.toLowerCase().replace(/ /g, ''), formData[feature.toLowerCase().replace(/ /g, '')] === "yes" ? "no" : "yes")} />
              {feature}
            </label>
          ))}
        </div>
      </Field>
    </>
  );

  if (step === 2) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">💰 Price Details</h3>
      </div>
      <Field label="Selling Price" required>
        <div className="flex gap-1">
          <input className={`${inp} w-1/2`} type="number" placeholder="Min ₹" value={formData.sellPriceMin} onChange={(e) => updateForm("sellPriceMin", e.target.value)} />
          <input className={`${inp} w-1/2`} type="number" placeholder="Max ₹" value={formData.sellPriceMax} onChange={(e) => updateForm("sellPriceMax", e.target.value)} />
        </div>
      </Field>
      <Field label="Price Negotiable">
        <div className="flex gap-4">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-negotiable-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.priceNegotiable === opt} onChange={() => updateForm("priceNegotiable", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Maintenance Charges">
        <input className={inp} type="number" placeholder="Enter monthly maintenance amount" value={formData.maintenanceCharges} onChange={(e) => updateForm("maintenanceCharges", e.target.value)} />
      </Field>
      <Field label="Property Tax">
        <input className={inp} type="number" placeholder="Enter annual property tax" value={formData.propertyTax} onChange={(e) => updateForm("propertyTax", e.target.value)} />
      </Field>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">⚖️ Legal Details</h3>
      </div>
      <Field label="Title Deed Verified">
        <div className="flex gap-4">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-title-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.titleDeedVerified === opt} onChange={() => updateForm("titleDeedVerified", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Loan Eligible">
        <div className="flex gap-4">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-loan-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.loanEligible === opt} onChange={() => updateForm("loanEligible", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </Field>
      <Field label="RERA Approved">
        <div className="flex gap-4">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-rera-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.reraApproved === opt} onChange={() => updateForm("reraApproved", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </Field>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">✨ Amenities</h3>
      </div>
      <Field label="Select Amenities">
        <div className="grid grid-cols-2 gap-1">
          {apartmentSellAmenities.map(amenity => (
            <label key={amenity.id} className="flex items-center gap-1 text-[9px] cursor-pointer">
              <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.selectedAmenities.includes(amenity.id)} onChange={() => toggleApartmentAmenity(amenity.id)} />
              {amenity.icon}
              {amenity.label}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Other Amenities">
        <div className="flex gap-1">
          <input className={`${inp} flex-1`} placeholder="e.g., Clubhouse, CCTV..." value={formData.otherAmenities} onChange={(e) => updateForm("otherAmenities", e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addCustomAmenity()} />
          <button onClick={addCustomAmenity} className="px-2 py-1 text-[11px] bg-[#00695C] text-white rounded-lg">Add</button>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {customAmenitiesList.map(a => (
            <span key={a} className="px-1.5 py-0.5 text-[10px] bg-[#00695C] text-white rounded-full border border-[#00695C] flex items-center gap-1">
              {a}
              <X className="w-2.5 h-2.5 cursor-pointer hover:text-red-200" onClick={() => removeCustomAmenity(a)} />
            </span>
          ))}
        </div>
      </Field>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">📅 Availability</h3>
      </div>
      <Field label="Ready to Move">
        <div className="flex gap-4">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-ready-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.readyToMove === opt} onChange={() => updateForm("readyToMove", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Under Construction">
        <div className="flex gap-4">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-construction-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.underConstruction === opt} onChange={() => updateForm("underConstruction", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Immediate Possession">
        <div className="flex gap-4">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-possession-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.immediatePossession === opt} onChange={() => updateForm("immediatePossession", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </Field>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">📍 Nearby Access</h3>
      </div>
      <Field label="Nearby Places">
        <div className="grid grid-cols-2 gap-1">
          {["School", "Hospital", "Metro / Bus Stop", "Shopping Mall / Market", "IT Park / Business Hub", "Airport Access"].map(place => {
            const key = place.toLowerCase().replace(/[\/\s]/g, '');
            return (
              <label key={place} className="flex items-center gap-1 text-[9px] cursor-pointer">
                <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData[`nearby${place.replace(/[\/\s]/g, '')}`] || false} onChange={() => updateForm(`nearby${place.replace(/[\/\s]/g, '')}`, !formData[`nearby${place.replace(/[\/\s]/g, '')}`])} />
                {place}
              </label>
            );
          })}
        </div>
      </Field>

      <div className="flex items-center gap-1.5 mt-3 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">📞 Contact Preference</h3>
      </div>
      <Field label="Contact via">
        <div className="flex gap-4">
          {["Owner", "Agent", "Builder"].map(opt => (
            <label key={opt} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
              <input type="radio" name="mob-contact-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.contactVia === opt} onChange={() => updateForm("contactVia", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Preferred Contact Time">
        <div className="grid grid-cols-2 gap-1">
          {contactTimeOptions.map(t => (
            <label key={t} className="flex items-center gap-1 text-[9px] cursor-pointer">
              <input type="radio" name="mob-time-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.preferredContactTime === t} onChange={() => updateForm("preferredContactTime", t)} />
              {t}
            </label>
          ))}
        </div>
      </Field>
    </>
  );

  if (step === 3) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Media Upload</h3>
      </div>
      <p className="text-[10px] text-center text-gray-400 mb-2">📸 Minimum 3 property images required</p>
      <Field label="Property Images" required>
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-3 text-center hover:bg-green-50">
          <input type="file" accept="image/*" multiple className="hidden" id="m-imgs-apart-sell" onChange={handleImageUpload} />
          <label htmlFor="m-imgs-apart-sell" className="cursor-pointer flex flex-col items-center">
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
          <input type="file" accept="video/mp4,video/mov" className="hidden" id="m-vid-apart-sell" onChange={handleVideoUpload} />
          <label htmlFor="m-vid-apart-sell" className="cursor-pointer flex flex-col items-center">
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

  if (step === 4) return (
    <>
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b-2 border-green-50">
        <div className="w-1 h-3 bg-[#00695C] rounded" />
        <h3 className="text-[11px] font-bold text-[#00695C]">Document Upload</h3>
      </div>
      {[
        { id: "m-own-apart-sell", e: "📄", t: "Upload Ownership Document", s: "Sale deed, registry (PDF/JPG/PNG)", l: "Ownership Proof", r: true, key: "ownershipDoc" },
        { id: "m-id-apart-sell", e: "🪪", t: "Upload ID Proof", s: "Aadhaar, PAN or Passport", l: "Owner ID Proof", r: true, key: "idProofDoc" },
        { id: "m-add-apart-sell", e: "📎", t: "+ Add More Documents", s: "Tax receipts, NOC, floor plans", l: "Additional Documents", r: false, key: "additionalDocs" }
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

// DESKTOP CONTENT
function DtContentApartSell({ step, inp, formData, updateForm, imagePreviews, handleImageUpload, removeImage, handleVideoUpload, videoPreview, removeVideo, handleDocumentUpload, toggleAmenity, toggleApartmentAmenity, availableAmenities, customAmenitiesList, addCustomAmenity, removeCustomAmenity, yesNoOptions, furnishingOptions, facingOptions, ownershipOptions, contactTimeOptions, apartmentSellAmenities }) {
  const ta = `${inp} resize-y`;

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
        <textarea className={`${ta} min-h-[80px]`} placeholder="Enter your current residential address" value={formData.address} onChange={(e) => updateForm("address", e.target.value)} />
      </FieldDt>
      <FieldDt label="ID Proof / Aadhaar / PAN" required>
        <input className={inp} placeholder="Enter Aadhaar or PAN number" value={formData.idProof} onChange={(e) => updateForm("idProof", e.target.value)} />
      </FieldDt>
    </>
  );

  if (step === 1) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">📍 Location Details</h3>
      </div>
      <FieldDt label="City" required>
        <input className={inp} placeholder="Enter city name" value={formData.city} onChange={(e) => updateForm("city", e.target.value)} />
      </FieldDt>
      <FieldDt label="Area / Locality" required>
        <input className={inp} placeholder="Enter area or locality" value={formData.area} onChange={(e) => updateForm("area", e.target.value)} />
      </FieldDt>
      <FieldDt label="Landmark">
        <input className={inp} placeholder="Nearby landmark" value={formData.landmark} onChange={(e) => updateForm("landmark", e.target.value)} />
      </FieldDt>
      <FieldDt label="PIN Code">
        <input className={inp} placeholder="Enter PIN code" value={formData.pinCode} onChange={(e) => updateForm("pinCode", e.target.value)} />
      </FieldDt>
      <FieldDt label="Nearby Connectivity">
        <input className={inp} placeholder="Metro, Bus, Highway" value={formData.nearbyConnectivity} onChange={(e) => updateForm("nearbyConnectivity", e.target.value)} />
      </FieldDt>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">🏠 Property Details</h3>
      </div>
      <FieldDt label="Property Type" required>
        <input className={inp} placeholder="Apartment" value={formData.propertyType} onChange={(e) => updateForm("propertyType", e.target.value)} />
      </FieldDt>
      <FieldDt label="Listing Type" required>
        {["Owner", "Agent", "Builder"].map(t => (
          <label key={t} className="flex items-center gap-2 text-[13px] mb-2 cursor-pointer">
            <input type="radio" name="dt-listing-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.listingType === t} onChange={() => updateForm("listingType", t)} />
            {t}
          </label>
        ))}
      </FieldDt>
      <FieldDt label="Built-up Area" hint="In square feet">
        <div className="flex gap-2">
          <input className={`${inp} w-1/2`} type="number" placeholder="Min sq.ft" value={formData.builtUpAreaMin} onChange={(e) => updateForm("builtUpAreaMin", e.target.value)} />
          <input className={`${inp} w-1/2`} type="number" placeholder="Max sq.ft" value={formData.builtUpAreaMax} onChange={(e) => updateForm("builtUpAreaMax", e.target.value)} />
        </div>
      </FieldDt>
      <FieldDt label="Carpet Area" hint="In square feet">
        <div className="flex gap-2">
          <input className={`${inp} w-1/2`} type="number" placeholder="Min sq.ft" value={formData.carpetAreaMin} onChange={(e) => updateForm("carpetAreaMin", e.target.value)} />
          <input className={`${inp} w-1/2`} type="number" placeholder="Max sq.ft" value={formData.carpetAreaMax} onChange={(e) => updateForm("carpetAreaMax", e.target.value)} />
        </div>
      </FieldDt>
      <FieldDt label="Number of Bedrooms">
        <div className="flex flex-wrap gap-3">
          {["Studio", "1 BHK", "2 BHK", "3 BHK", "4 BHK+"].map(bhk => (
            <label key={bhk} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-bhk-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.bedrooms === bhk} onChange={() => updateForm("bedrooms", bhk)} />
              {bhk}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Number of Bathrooms">
        <div className="flex flex-wrap gap-3">
          {["1", "2", "3", "4+"].map(b => (
            <label key={b} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-bath-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.bathrooms === b} onChange={() => updateForm("bathrooms", b)} />
              {b}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Floor Number">
        <input className={inp} type="number" placeholder="Enter floor number" value={formData.floorNumber} onChange={(e) => updateForm("floorNumber", e.target.value)} />
      </FieldDt>
      <FieldDt label="Total Floors">
        <input className={inp} type="number" placeholder="Enter total floors" value={formData.totalFloors} onChange={(e) => updateForm("totalFloors", e.target.value)} />
      </FieldDt>
      <FieldDt label="Facing Direction">
        <div className="grid grid-cols-4 gap-2">
          {facingOptions.map(f => (
            <label key={f} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-facing-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.facingDirection === f} onChange={() => updateForm("facingDirection", f)} />
              {f}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Balcony">
        <div className="flex gap-5">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-balcony-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.balcony === opt} onChange={() => updateForm("balcony", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Property Age">
        <input className={inp} type="number" placeholder="Enter property age in years" value={formData.propertyAge} onChange={(e) => updateForm("propertyAge", e.target.value)} />
      </FieldDt>
      <FieldDt label="Corner Unit">
        <div className="flex gap-5">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-corner-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.cornerUnit === opt} onChange={() => updateForm("cornerUnit", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Ownership Type">
        <div className="flex gap-5">
          {ownershipOptions.map(opt => (
            <label key={opt} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-ownership-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.ownershipType === opt} onChange={() => updateForm("ownershipType", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </FieldDt>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">🪑 Interior Details</h3>
      </div>
      <FieldDt label="Furnishing Status">
        <div className="flex flex-wrap gap-3">
          {furnishingOptions.map(f => (
            <label key={f} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-furnish-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.furnishing === f} onChange={() => updateForm("furnishing", f)} />
              {f}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Interior Features">
        <div className="grid grid-cols-2 gap-2">
          {["Modular Kitchen", "Wardrobes", "Air Conditioning", "Utility Area", "Smart Home Features"].map(feature => {
            const key = feature.toLowerCase().replace(/ /g, '');
            return (
              <label key={feature} className="flex items-center gap-2 text-[13px] cursor-pointer">
                <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData[key] === "yes"} onChange={() => updateForm(key, formData[key] === "yes" ? "no" : "yes")} />
                {feature}
              </label>
            );
          })}
        </div>
      </FieldDt>
    </>
  );

  if (step === 2) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">💰 Price Details</h3>
      </div>
      <FieldDt label="Selling Price" required>
        <div className="flex gap-2">
          <input className={`${inp} w-1/2`} type="number" placeholder="Min ₹" value={formData.sellPriceMin} onChange={(e) => updateForm("sellPriceMin", e.target.value)} />
          <input className={`${inp} w-1/2`} type="number" placeholder="Max ₹" value={formData.sellPriceMax} onChange={(e) => updateForm("sellPriceMax", e.target.value)} />
        </div>
      </FieldDt>
      <FieldDt label="Price Negotiable">
        <div className="flex gap-5">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-negotiable-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.priceNegotiable === opt} onChange={() => updateForm("priceNegotiable", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Maintenance Charges">
        <input className={inp} type="number" placeholder="Enter monthly maintenance amount" value={formData.maintenanceCharges} onChange={(e) => updateForm("maintenanceCharges", e.target.value)} />
      </FieldDt>
      <FieldDt label="Property Tax">
        <input className={inp} type="number" placeholder="Enter annual property tax" value={formData.propertyTax} onChange={(e) => updateForm("propertyTax", e.target.value)} />
      </FieldDt>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">⚖️ Legal Details</h3>
      </div>
      <FieldDt label="Title Deed Verified">
        <div className="flex gap-5">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-title-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.titleDeedVerified === opt} onChange={() => updateForm("titleDeedVerified", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Loan Eligible">
        <div className="flex gap-5">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-loan-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.loanEligible === opt} onChange={() => updateForm("loanEligible", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="RERA Approved">
        <div className="flex gap-5">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-rera-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.reraApproved === opt} onChange={() => updateForm("reraApproved", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </FieldDt>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">✨ Amenities</h3>
      </div>
      <FieldDt label="Select Amenities">
        <div className="grid grid-cols-2 gap-2">
          {apartmentSellAmenities.map(amenity => (
            <label key={amenity.id} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.selectedAmenities.includes(amenity.id)} onChange={() => toggleApartmentAmenity(amenity.id)} />
              {amenity.label}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Other Amenities">
        <div className="flex gap-2">
          <input className={`${inp} flex-1`} placeholder="e.g., Clubhouse, CCTV..." value={formData.otherAmenities} onChange={(e) => updateForm("otherAmenities", e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addCustomAmenity()} />
          <button onClick={addCustomAmenity} className="px-3 py-1.5 text-[13px] bg-[#00695C] text-white rounded-lg hover:bg-[#004d42] transition-colors">Add</button>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {customAmenitiesList.map(a => (
            <span key={a} className="px-2.5 py-1.5 text-[13px] bg-[#00695C] text-white rounded-full border border-[#00695C] flex items-center gap-1">
              {a}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-200" onClick={() => removeCustomAmenity(a)} />
            </span>
          ))}
        </div>
      </FieldDt>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">📅 Availability</h3>
      </div>
      <FieldDt label="Ready to Move">
        <div className="flex gap-5">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-ready-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.readyToMove === opt} onChange={() => updateForm("readyToMove", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Under Construction">
        <div className="flex gap-5">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-construction-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.underConstruction === opt} onChange={() => updateForm("underConstruction", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Immediate Possession">
        <div className="flex gap-5">
          {yesNoOptions.map(opt => (
            <label key={opt} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-possession-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.immediatePossession === opt} onChange={() => updateForm("immediatePossession", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </FieldDt>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">📍 Nearby Access</h3>
      </div>
      <FieldDt label="Nearby Places">
        <div className="grid grid-cols-2 gap-2">
          {["School", "Hospital", "Metro / Bus Stop", "Shopping Mall / Market", "IT Park / Business Hub", "Airport Access"].map(place => {
            const key = `nearby${place.replace(/[\/\s]/g, '')}`;
            return (
              <label key={place} className="flex items-center gap-2 text-[13px] cursor-pointer">
                <input type="checkbox" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData[key] || false} onChange={() => updateForm(key, !formData[key])} />
                {place}
              </label>
            );
          })}
        </div>
      </FieldDt>

      <div className="flex items-center gap-2 mt-4 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">📞 Contact Preference</h3>
      </div>
      <FieldDt label="Contact via">
        <div className="flex gap-5">
          {["Owner", "Agent", "Builder"].map(opt => (
            <label key={opt} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-contact-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.contactVia === opt} onChange={() => updateForm("contactVia", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </FieldDt>
      <FieldDt label="Preferred Contact Time">
        <div className="grid grid-cols-2 gap-2">
          {contactTimeOptions.map(t => (
            <label key={t} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="dt-time-sell" className="accent-[#00695C] w-3.5 h-3.5 cursor-pointer" checked={formData.preferredContactTime === t} onChange={() => updateForm("preferredContactTime", t)} />
              {t}
            </label>
          ))}
        </div>
      </FieldDt>
    </>
  );

  if (step === 3) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Media Upload</h3>
      </div>
      <p className="text-[11px] text-center text-gray-400 mb-3">📸 Minimum 3 property images required</p>
      <FieldDt label="Property Images" required>
        <div className="border-2 border-dashed border-teal-300 rounded-xl p-4 text-center cursor-pointer hover:bg-green-50">
          <input type="file" accept="image/*" multiple className="hidden" id="property-images-apart-sell" onChange={handleImageUpload} />
          <label htmlFor="property-images-apart-sell" className="cursor-pointer flex flex-col items-center">
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
          <input type="file" accept="video/mp4,video/mov" className="hidden" id="property-video-apart-sell" onChange={handleVideoUpload} />
          <label htmlFor="property-video-apart-sell" className="cursor-pointer flex flex-col items-center">
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

  if (step === 4) return (
    <>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-50">
        <div className="w-1 h-4 bg-[#00695C] rounded" />
        <h3 className="text-[14px] font-bold text-[#00695C]">Document Upload</h3>
      </div>
      {[
        { id: "ownership-proof-apart-sell", e: "📄", t: "Upload Ownership Document", s: "Sale deed, registry (PDF/JPG/PNG)", l: "Property Ownership Proof", r: true, key: "ownershipDoc" },
        { id: "id-proof-apart-sell", e: "🪪", t: "Upload ID Proof", s: "Aadhaar, PAN, or Passport", l: "Owner ID Proof", r: true, key: "idProofDoc" },
        { id: "additional-docs-apart-sell", e: "📎", t: "+ Add More Documents", s: "Tax receipts, NOC, floor plans", l: "Additional Documents", r: false, key: "additionalDocs" }
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