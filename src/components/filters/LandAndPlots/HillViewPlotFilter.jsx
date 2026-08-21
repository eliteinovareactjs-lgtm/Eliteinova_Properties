import React, { useState, useRef, useEffect } from 'react';
import {
  X, ChevronDown, Building, MapPin, IndianRupee, Ruler, Shield,
  Phone, FileText, RefreshCw, DollarSign, Calendar, Zap,
  Square, Home, Bus, CheckCircle, TrendingUp, Clock, Wifi, Camera,
  Trees as TreesIcon, Users, ShieldCheck, FileCheck, Truck, Store,
  Factory, Hotel, Briefcase, ShoppingBag, Fuel, Warehouse, Building2,
  Server, Network, Database, Globe, Cpu, Sun, Mountain, Waves, Eye,
  Leaf, Coffee, Tent, Compass, Navigation
} from 'lucide-react';

// Custom Road Icon
const RoadIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12h20" />
    <path d="M6 18l-4-6 4-6" />
    <path d="M18 18l4-6-4-6" />
    <path d="M12 6v12" />
    <path d="M8 6v12" />
    <path d="M16 6v12" />
  </svg>
);

// Custom Square Icon
const SquareIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"/>
  </svg>
);

// Custom Mountain Icon
const MountainIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20l4-6 3 4 5-8 4 10H4z" />
    <path d="M2 20h20" />
    <path d="M9 14l2-3" />
    <path d="M16 10l2-3" />
  </svg>
);

// Custom Valley Icon
const ValleyIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18l5-7 3 4 5-7 5 10" />
    <path d="M2 20h20" />
    <path d="M12 14v4" />
  </svg>
);

// Custom Lake Icon
const LakeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 14c2-2 4-3 6-3s4 1 6 3c2 2 4 3 6 3" />
    <path d="M2 18c2-2 4-3 6-3s4 1 6 3c2 2 4 3 6 3" />
    <path d="M2 10c2-2 4-3 6-3s4 1 6 3" />
    <path d="M2 6c2-2 4-3 6-3s4 1 6 3" />
  </svg>
);

// Custom Waterfall Icon
const WaterfallIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16" />
    <path d="M8 16V4" />
    <path d="M12 16V8" />
    <path d="M16 16V12" />
    <path d="M8 16l-2 4" />
    <path d="M12 16l-1 4" />
    <path d="M16 16l-1 4" />
  </svg>
);

// Custom Forest Icon
const ForestIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 16l2-4 2 4" />
    <path d="M12 12l2-4 2 4" />
    <path d="M4 16h16" />
    <path d="M6 16l-1 4h14l-1-4" />
    <path d="M10 12l-1 4h6l-1-4" />
    <path d="M14 8l-1 4h-2l-1-4" />
  </svg>
);

// Custom Scenic View Icon
const ScenicIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M4.93 19.07l1.41-1.41" />
    <path d="M17.66 6.34l1.41-1.41" />
  </svg>
);

// Custom Green Belt Icon
const GreenBeltIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M4.93 4.93l2.83 2.83" />
    <path d="M16.24 16.24l2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="M4.93 19.07l2.83-2.83" />
    <path d="M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

// Custom Date Picker
const CustomDatePicker = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || '');
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const pickerRef = useRef(null);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handleDateSelect = (day) => {
    const newDate = new Date(viewYear, viewMonth, day);
    const formattedDate = newDate.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    onChange(formattedDate);
    setIsOpen(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const today = new Date();
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-6 w-6"></div>);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
      const isSelected = selectedDate === `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      calendarDays.push(
        <button
          key={d}
          type="button"
          onClick={() => handleDateSelect(d)}
          className={`h-6 w-6 rounded text-xs font-medium transition-all duration-200 ${
            isSelected ? 'bg-teal-500 text-white' :
            isToday ? 'bg-teal-100 text-teal-700 border border-teal-300' :
            'text-gray-700 hover:bg-teal-100 hover:text-teal-700'
          }`}
        >
          {d}
        </button>
      );
    }
    return calendarDays;
  };

  return (
    <div className="relative" ref={pickerRef}>
      <label className="text-xs text-teal-800 font-semibold block mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={selectedDate}
          onFocus={() => setIsOpen(true)}
          readOnly
          placeholder="Select Date"
          className="w-full px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer"
        />
        <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-teal-500 pointer-events-none" />
      </div>
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-xl border border-teal-200 overflow-hidden" style={{ width: '240px' }}>
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-3 py-1.5 flex items-center justify-between">
            <button type="button" onClick={() => {
              if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
              else { setViewMonth(viewMonth - 1); }
            }} className="p-0.5 rounded hover:bg-white/20 text-white transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 18l-6-6 6-6" strokeLinecap="round"/></svg>
            </button>
            <span className="text-white font-semibold text-xs">{months[viewMonth]} {viewYear}</span>
            <button type="button" onClick={() => {
              if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
              else { setViewMonth(viewMonth + 1); }
            }} className="p-0.5 rounded hover:bg-white/20 text-white transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 18l6-6-6-6" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div className="p-2">
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {days.map(day => <div key={day} className="h-6 w-6 flex items-center justify-center text-[10px] font-semibold text-teal-600">{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-0.5">{renderCalendar()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Select Component
const CustomSelect = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={selectRef}>
      <label className="text-xs text-teal-800 font-semibold block mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-2 py-1.5 rounded border border-teal-300 bg-white text-xs text-left flex justify-between items-center focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 hover:bg-teal-50 transition-all duration-200"
      >
        <span className={selectedOption ? 'text-gray-700' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder || `Select ${label}`}
        </span>
        <ChevronDown className={`w-3 h-3 text-teal-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-xl border border-teal-200 max-h-40 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              className={`w-full px-2 py-1.5 text-xs text-left transition-all duration-150 ${
                value === opt.value
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-700 hover:bg-teal-500 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Area Unit Select
const AreaUnitSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const units = [
    { value: 'sqft', label: 'Sq.ft' },
    { value: 'sqyards', label: 'Sq.Yards' },
    { value: 'acres', label: 'Acres' },
    { value: 'hectares', label: 'Hectares' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedUnit = units.find(unit => unit.value === value);

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs flex items-center justify-between gap-1 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 hover:bg-teal-50 transition-all duration-200"
      >
        <span className="text-gray-700">{selectedUnit ? selectedUnit.label : 'Unit'}</span>
        <ChevronDown className={`w-3 h-3 text-teal-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 right-0 bg-white rounded-lg shadow-xl border border-teal-200 overflow-hidden">
          {units.map((unit) => (
            <button
              key={unit.value}
              type="button"
              onClick={() => { onChange(unit.value); setIsOpen(false); }}
              className={`w-full px-2 py-1.5 text-xs text-left whitespace-nowrap transition-all duration-150 ${
                value === unit.value
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-700 hover:bg-teal-500 hover:text-white'
              }`}
            >
              {unit.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Yes/No Radio Group
const YesNoRadioGroup = ({ label, name, value, onChange }) => (
  <div className="bg-white rounded-md p-2 border border-teal-200">
    <label className="text-xs text-teal-800 font-semibold block mb-1.5">
      {label}
    </label>
    <div className="flex gap-3">
      <label className="flex items-center gap-1.5 cursor-pointer group">
        <input
          type="radio"
          name={name}
          value="Yes"
          checked={value === 'Yes'}
          onChange={(e) => onChange(e.target.value)}
          className="w-3.5 h-3.5 border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500"
        />
        <span className="text-xs text-gray-700 font-medium group-hover:text-teal-500">Yes</span>
      </label>
      <label className="flex items-center gap-1.5 cursor-pointer group">
        <input
          type="radio"
          name={name}
          value="No"
          checked={value === 'No'}
          onChange={(e) => onChange(e.target.value)}
          className="w-3.5 h-3.5 border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500"
        />
        <span className="text-xs text-gray-700 font-medium group-hover:text-teal-500">No</span>
      </label>
    </div>
  </div>
);

// Radio Group
const RadioGroup = ({ label, name, options, value, onChange, className = "" }) => (
  <div className={className}>
    {label && <label className="text-xs text-teal-800 font-semibold block mb-1">{label}</label>}
    <div className="flex flex-wrap gap-3">
      {options.map(option => (
        <label key={option.value} className="flex items-center gap-1.5 cursor-pointer group">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-3.5 h-3.5 border border-teal-300 checked:bg-teal-500 checked:border-teal-500 accent-teal-500"
          />
          <span className="text-xs text-gray-700 group-hover:text-teal-500">{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

// Checkbox Group
const CheckboxGroup = ({ label, options, values, onChange, columns = 2 }) => (
  <div>
    {label && <label className="text-xs text-teal-800 font-semibold block mb-1.5">{label}</label>}
    <div className={`grid grid-cols-1 sm:grid-cols-${columns} gap-1.5`}>
      {options.map(option => (
        <label key={option} className="flex items-center gap-1.5 cursor-pointer group p-1 rounded hover:bg-teal-50 transition-colors">
          <input
            type="checkbox"
            checked={values.includes(option)}
            onChange={(e) => {
              if (e.target.checked) onChange([...values, option]);
              else onChange(values.filter(v => v !== option));
            }}
            className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500"
          />
          <span className="text-xs text-gray-700 group-hover:text-teal-500">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

const HillViewPlotFilter = ({ activeTab = 'Buy', onFilterChange, onClose, onTabChange }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [activeMainSection, setActiveMainSection] = useState('basic');

  const [filters, setFilters] = useState({
    // Basic Details
    listingType: [],
    // Location
    state: '', city: '', area: '', village: '', landmark: '', pincode: '',
    hillMountainName: '', hillFacing: '', valleyFacing: '', highwayFacing: '',
    mainRoadFacing: '', cornerPlot: '', distanceToHill: '', nearbyConnectivity: '',
    // Price/Budget/Rent/Lease
    minBudget: '', maxBudget: '', priceNegotiable: '',
    maintenanceCharges: '', propertyTax: '',
    minRent: '', maxRent: '', securityDeposit: '', rentNegotiable: '',
    electricityCharges: '', waterCharges: '',
    minLeaseRent: '', maxLeaseRent: '', leaseDuration: '', securityDepositLease: '',
    leaseNegotiable: '', renewalOption: '', leaseRegistrationAvailable: '',
    leaseAgreementAvailable: '',
    // Plot Details
    totalArea: '', areaUnit: 'sqft', plotLength: '', plotWidth: '',
    frontageWidth: '', roadWidth: '', facing: '', boundaryWall: '',
    landLevel: '', slopePercentage: '', soilType: '', ownershipType: '',
    // View & Location Features
    viewFeatures: [],
    hillAccess: '', natureForestAccess: '',
    // Suitable For
    suitableFor: [],
    // Infrastructure
    electricityAvailable: false, waterSupply: false, borewell: false,
    drainageFacility: false, sewageConnection: false, internalRoads: false,
    streetLights: false, internetConnectivity: false,
    // Amenities
    gatedCommunityAmenity: '', security247: false, cctvSurveillance: false,
    childrensPark: false, walkingTrack: false, clubHouse: false,
    landscapedGarden: false, publicTransport: false,
    // Legal Details
    titleDeedVerified: '', loanEligible: '', reraApproved: '',
    dtcpApproved: '', cmdaApproved: '', panchayatApproved: '',
    encumbranceCertificate: '', hillForestRestrictionChecked: '',
    landConversionApproved: '',
    // Rental Terms
    minRentalPeriod: '', maxRentalPeriod: '', rentalFrequency: '',
    noticePeriod: '', rentIncreaseEscalation: '', commercialUseAllowed: '',
    subLeasingAllowed: '', petsAllowed: '',
    // Lease Terms
    leasePeriod: '', longTermLease: '', renewalOptionLease: '',
    subLeasingAllowedLease: '', commercialUseAllowedLease: '',
    constructionPermission: '', developmentPermission: '',
    rentLeaseEscalation: '', earlyTerminationTerms: '',
    // Buy Terms
    possessionTimeline: '', registrationCharges: '', stampDuty: '',
    gstApplicable: '', tdsApplicable: '', paymentTerms: '',
    constructionEligibility: '', resaleAllowed: '',
    // Availability
    readyForRegistration: '', immediatePossession: '', vacantPlot: '',
    underDevelopment: '', availableFrom: '', currentlyOccupied: '',
    availableImmediately: '', readyForLease: '', currentlyLeased: '',
    readyForLeaseRegistration: '',
    // Nearby Access
    nearbyAccess: [],
    // Contact
    contactOwner: false, contactAgent: false, contactBuilder: false, contactDeveloper: false,
    preferredContactTime: ''
  });

  // Options arrays
  const facingOptions = [
    { value: 'North', label: 'North' },
    { value: 'South', label: 'South' },
    { value: 'East', label: 'East' },
    { value: 'West', label: 'West' },
    { value: 'North-East', label: 'North-East' },
    { value: 'North-West', label: 'North-West' },
    { value: 'South-East', label: 'South-East' },
    { value: 'South-West', label: 'South-West' }
  ];

  const landLevelOptions = [
    { value: 'Flat', label: 'Flat' },
    { value: 'Sloped', label: 'Sloped' },
    { value: 'Elevated', label: 'Elevated' },
    { value: 'Hilly', label: 'Hilly' },
    { value: 'Low Lying', label: 'Low Lying' }
  ];

  const soilTypeOptions = [
    { value: 'Black', label: 'Black' },
    { value: 'Red', label: 'Red' },
    { value: 'Laterite', label: 'Laterite' },
    { value: 'Alluvial', label: 'Alluvial' },
    { value: 'Sandy', label: 'Sandy' },
    { value: 'Clay', label: 'Clay' },
    { value: 'Loamy', label: 'Loamy' }
  ];

  const ownershipTypeOptions = [
    { value: 'Freehold', label: 'Freehold' },
    { value: 'Leasehold', label: 'Leasehold' }
  ];

  const viewFeaturesOptions = {
    buy: [
      'Direct Hill View', 'Mountain View', 'Valley View', 'Forest View',
      'Waterfall View', 'Sunrise View', 'Sunset View', 'Lake View',
      'Green Belt View', 'Scenic View'
    ],
    rent: [
      'Direct Hill View', 'Mountain View', 'Valley View', 'Forest View',
      'Waterfall View', 'Sunrise View', 'Sunset View', 'Lake View',
      'Green Belt View', 'Scenic View'
    ],
    lease: [
      'Direct Hill View', 'Mountain View', 'Valley View', 'Forest View',
      'Waterfall View', 'Sunrise View', 'Sunset View', 'Lake View',
      'Green Belt View', 'Scenic View'
    ]
  };

  const suitableForOptions = {
    buy: [
      'Residential Villa', 'Farm House', 'Holiday Home', 'Luxury Villa',
      'Resort Development', 'Hotel', 'Eco Tourism', 'Commercial Development',
      'Mixed Use Development', 'Agricultural / Plantation Use'
    ],
    rent: [
      'Residential Villa', 'Farm House', 'Holiday Home', 'Luxury Villa',
      'Resort', 'Hotel', 'Eco Tourism', 'Commercial Use',
      'Event / Outdoor Activity', 'Agricultural / Plantation Use'
    ],
    lease: [
      'Residential Villa', 'Farm House', 'Holiday Home', 'Luxury Villa',
      'Resort Development', 'Hotel', 'Eco Tourism', 'Commercial Development',
      'Mixed Use Development', 'Event / Outdoor Activity',
      'Agricultural / Plantation Use'
    ]
  };

  const nearbyOptions = {
    buy: [
      'Hill / Mountain', 'National Highway', 'State Highway', 'Bus Stop',
      'Railway Station', 'Metro Station', 'Airport', 'Schools & Colleges',
      'Hospitals', 'Commercial Hub', 'Residential Area', 'Bank / ATM',
      'Shopping Center', 'Tourist Attractions'
    ],
    rent: [
      'Hill / Mountain', 'National Highway', 'State Highway', 'Bus Stop',
      'Railway Station', 'Metro Station', 'Airport', 'Schools & Colleges',
      'Hospitals', 'Commercial Hub', 'Residential Area', 'Bank / ATM',
      'Shopping Center', 'Tourist Attractions'
    ],
    lease: [
      'Hill / Mountain', 'National Highway', 'State Highway', 'Bus Stop',
      'Railway Station', 'Metro Station', 'Airport', 'Schools & Colleges',
      'Hospitals', 'Commercial Hub', 'Residential Area', 'Bank / ATM',
      'Shopping Center', 'Tourist Attractions'
    ]
  };

  const leaseDurationOptions = [
    { value: '3', label: '3 Months' },
    { value: '6', label: '6 Months' },
    { value: '12', label: '1 Year' },
    { value: '24', label: '2 Years' },
    { value: '36', label: '3 Years' },
    { value: '60', label: '5 Years' },
    { value: '120', label: '10 Years' },
    { value: '240', label: '20 Years' },
    { value: '360', label: '30 Years' }
  ];

  const rentalDurationOptions = [
    { value: '3', label: '3 Months' },
    { value: '6', label: '6 Months' },
    { value: '11', label: '11 Months' },
    { value: '12', label: '12 Months' },
    { value: '24', label: '24 Months' },
    { value: '36', label: '36 Months' }
  ];

  const rentalFrequencyOptions = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Quarterly', label: 'Quarterly' },
    { value: 'Yearly', label: 'Yearly' }
  ];

  const leasePeriodOptions = [
    { value: '1', label: '1 Year' },
    { value: '3', label: '3 Years' },
    { value: '5', label: '5 Years' },
    { value: '10', label: '10 Years' },
    { value: '20', label: '20 Years' },
    { value: '30+', label: '30+ Years' }
  ];

  const possessionTimelineOptions = [
    { value: 'Immediate', label: 'Immediate' },
    { value: 'Within 1 Month', label: 'Within 1 Month' },
    { value: 'Within 3 Months', label: 'Within 3 Months' },
    { value: 'Within 6 Months', label: 'Within 6 Months' },
    { value: 'Within 1 Year', label: 'Within 1 Year' }
  ];

  const paymentTermsOptions = [
    { value: 'Full Payment', label: 'Full Payment' },
    { value: 'Down Payment + EMI', label: 'Down Payment + EMI' },
    { value: 'Construction Linked', label: 'Construction Linked' },
    { value: 'Flexible Payment', label: 'Flexible Payment' }
  ];

  const contactTimeOptions = [
    { value: 'Morning', label: 'Morning (9 AM - 12 PM)' },
    { value: 'Afternoon', label: 'Afternoon (12 PM - 4 PM)' },
    { value: 'Evening', label: 'Evening (4 PM - 8 PM)' },
    { value: 'Any', label: 'Any Time' }
  ];

  const mainSections = [
    { id: 'basic', label: '📍 Basic', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'price', label: currentTab === 'Rent' ? '💰 Rent' : currentTab === 'Buy' ? '💰 Budget' : '💰 Lease', icon: <IndianRupee className="w-3.5 h-3.5" /> },
    { id: 'plot', label: '📐 Plot', icon: <SquareIcon className="w-3.5 h-3.5" /> },
    { id: 'view', label: '🏔️ View', icon: <MountainIcon className="w-3.5 h-3.5" /> },
    { id: 'usage', label: '🏠 Usage', icon: <Building className="w-3.5 h-3.5" /> },
    { id: 'infrastructure', label: '⚡ Infrastructure', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'amenities', label: '🏘️ Amenities', icon: <TreesIcon className="w-3.5 h-3.5" /> },
    { id: 'legal', label: '⚖️ Legal', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'terms', label: '📋 Terms', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'availability', label: '📅 Available', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'nearby', label: '🚌 Nearby', icon: <Bus className="w-3.5 h-3.5" /> },
    { id: 'contact', label: '📞 Contact', icon: <Phone className="w-3.5 h-3.5" /> }
  ];

  const tabs = [
    { id: 'Buy', label: 'Buy', icon: <DollarSign className="w-3 h-3" /> },
    { id: 'Rent', label: 'Rent', icon: <IndianRupee className="w-3 h-3" /> },
    { id: 'Lease', label: 'Lease', icon: <FileText className="w-3 h-3" /> }
  ];

  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
    setActiveMainSection('basic');
    if (onTabChange) onTabChange(tabId);
  };

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field, checked) => {
    setFilters(prev => ({ ...prev, [field]: checked }));
  };

  const handleRadioChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    const filtersToSend = { ...filters, purpose: currentTab, propertyType: 'Hill View Plot' };
    if (onFilterChange) onFilterChange(filtersToSend);
    if (onClose) onClose();
  };

  const clearAllFilters = () => {
    setFilters({
      listingType: [],
      state: '', city: '', area: '', village: '', landmark: '', pincode: '',
      hillMountainName: '', hillFacing: '', valleyFacing: '', highwayFacing: '',
      mainRoadFacing: '', cornerPlot: '', distanceToHill: '', nearbyConnectivity: '',
      minBudget: '', maxBudget: '', priceNegotiable: '',
      maintenanceCharges: '', propertyTax: '',
      minRent: '', maxRent: '', securityDeposit: '', rentNegotiable: '',
      electricityCharges: '', waterCharges: '',
      minLeaseRent: '', maxLeaseRent: '', leaseDuration: '', securityDepositLease: '',
      leaseNegotiable: '', renewalOption: '', leaseRegistrationAvailable: '',
      leaseAgreementAvailable: '',
      totalArea: '', areaUnit: 'sqft', plotLength: '', plotWidth: '',
      frontageWidth: '', roadWidth: '', facing: '', boundaryWall: '',
      landLevel: '', slopePercentage: '', soilType: '', ownershipType: '',
      viewFeatures: [],
      hillAccess: '', natureForestAccess: '',
      suitableFor: [],
      electricityAvailable: false, waterSupply: false, borewell: false,
      drainageFacility: false, sewageConnection: false, internalRoads: false,
      streetLights: false, internetConnectivity: false,
      gatedCommunityAmenity: '', security247: false, cctvSurveillance: false,
      childrensPark: false, walkingTrack: false, clubHouse: false,
      landscapedGarden: false, publicTransport: false,
      titleDeedVerified: '', loanEligible: '', reraApproved: '',
      dtcpApproved: '', cmdaApproved: '', panchayatApproved: '',
      encumbranceCertificate: '', hillForestRestrictionChecked: '',
      landConversionApproved: '',
      minRentalPeriod: '', maxRentalPeriod: '', rentalFrequency: '',
      noticePeriod: '', rentIncreaseEscalation: '', commercialUseAllowed: '',
      subLeasingAllowed: '', petsAllowed: '',
      leasePeriod: '', longTermLease: '', renewalOptionLease: '',
      subLeasingAllowedLease: '', commercialUseAllowedLease: '',
      constructionPermission: '', developmentPermission: '',
      rentLeaseEscalation: '', earlyTerminationTerms: '',
      possessionTimeline: '', registrationCharges: '', stampDuty: '',
      gstApplicable: '', tdsApplicable: '', paymentTerms: '',
      constructionEligibility: '', resaleAllowed: '',
      readyForRegistration: '', immediatePossession: '', vacantPlot: '',
      underDevelopment: '', availableFrom: '', currentlyOccupied: '',
      availableImmediately: '', readyForLease: '', currentlyLeased: '',
      readyForLeaseRegistration: '',
      nearbyAccess: [],
      contactOwner: false, contactAgent: false, contactBuilder: false, contactDeveloper: false,
      preferredContactTime: ''
    });
  };

  const SectionNav = () => (
    <div className="flex flex-wrap gap-1 p-1.5 bg-teal-50/80 rounded-lg sticky top-0 z-20 border border-teal-200">
      {mainSections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveMainSection(section.id)}
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all duration-200 whitespace-nowrap ${
            activeMainSection === section.id
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm'
              : 'bg-white text-teal-700 hover:bg-teal-100 border border-teal-200'
          }`}
        >
          {section.icon}
          <span>{section.label}</span>
        </button>
      ))}
    </div>
  );

  const renderBasicSection = () => (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
        <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><Home className="w-3.5 h-3.5" /> Basic Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
          <div>
            <label className="text-xs text-teal-800 font-semibold block mb-1">Property Type</label>
            <input type="text" value="Hill View Plot" disabled className="w-full px-2 py-1.5 rounded border border-teal-300 bg-gray-50 text-xs text-gray-600" />
          </div>
          <div>
            <label className="text-xs text-teal-800 font-semibold block mb-1">Purpose</label>
            <input type="text" value={currentTab} disabled className="w-full px-2 py-1.5 rounded border border-teal-300 bg-gray-50 text-xs text-gray-600" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-teal-800 font-semibold block mb-1.5">Listing Type</label>
            <div className="flex flex-wrap gap-4">
              {['Owner', 'Agent', 'Builder', 'Developer'].map(type => (
                <label key={type} className="flex items-center gap-1.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.listingType.includes(type)}
                    onChange={(e) => {
                      const newList = e.target.checked ? [...filters.listingType, type] : filters.listingType.filter(t => t !== type);
                      handleInputChange('listingType', newList);
                    }}
                    className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500"
                  />
                  <span className="text-xs text-gray-700 font-medium group-hover:text-teal-500">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
        <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><MapPin className="w-3.5 h-3.5" /> Location Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
          <input type="text" placeholder="State" className="w-full px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.state} onChange={(e) => handleInputChange('state', e.target.value)} />
          <input type="text" placeholder="City" className="w-full px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.city} onChange={(e) => handleInputChange('city', e.target.value)} />
          <input type="text" placeholder="Area / Locality" className="w-full px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.area} onChange={(e) => handleInputChange('area', e.target.value)} />
          <input type="text" placeholder="Village / Town" className="w-full px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.village} onChange={(e) => handleInputChange('village', e.target.value)} />
          <input type="text" placeholder="Landmark" className="w-full px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.landmark} onChange={(e) => handleInputChange('landmark', e.target.value)} />
          <input type="text" placeholder="PIN Code" className="w-full px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.pincode} onChange={(e) => handleInputChange('pincode', e.target.value)} />
          <input type="text" placeholder="Hill / Mountain Name" className="w-full px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.hillMountainName} onChange={(e) => handleInputChange('hillMountainName', e.target.value)} />
          <input type="text" placeholder="Distance to Hill (km)" className="w-full px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.distanceToHill} onChange={(e) => handleInputChange('distanceToHill', e.target.value)} />
          <YesNoRadioGroup label="Hill Facing" name="hillFacing" value={filters.hillFacing} onChange={(val) => handleRadioChange('hillFacing', val)} />
          <YesNoRadioGroup label="Valley Facing" name="valleyFacing" value={filters.valleyFacing} onChange={(val) => handleRadioChange('valleyFacing', val)} />
          <YesNoRadioGroup label="Highway Facing" name="highwayFacing" value={filters.highwayFacing} onChange={(val) => handleRadioChange('highwayFacing', val)} />
          <YesNoRadioGroup label="Main Road Facing" name="mainRoadFacing" value={filters.mainRoadFacing} onChange={(val) => handleRadioChange('mainRoadFacing', val)} />
          <YesNoRadioGroup label="Corner Plot" name="cornerPlot" value={filters.cornerPlot} onChange={(val) => handleRadioChange('cornerPlot', val)} />
          <input type="text" placeholder="Nearby Connectivity" className="w-full px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.nearbyConnectivity} onChange={(e) => handleInputChange('nearbyConnectivity', e.target.value)} />
        </div>
      </div>
    </div>
  );

  const renderPriceSection = () => {
    if (currentTab === 'Rent') {
      return (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><IndianRupee className="w-3.5 h-3.5" /> Rent Details</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Min Rent (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.minRent} onChange={(e) => handleInputChange('minRent', e.target.value)} />
                <input type="number" placeholder="Max Rent (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.maxRent} onChange={(e) => handleInputChange('maxRent', e.target.value)} />
              </div>
              <input type="number" placeholder="Security Deposit (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.securityDeposit} onChange={(e) => handleInputChange('securityDeposit', e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
              <YesNoRadioGroup label="Rent Negotiable" name="rentNegotiable" value={filters.rentNegotiable} onChange={(val) => handleRadioChange('rentNegotiable', val)} />
              <input type="text" placeholder="Maintenance Charges (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.maintenanceCharges} onChange={(e) => handleInputChange('maintenanceCharges', e.target.value)} />
              <input type="text" placeholder="Property Tax (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.propertyTax} onChange={(e) => handleInputChange('propertyTax', e.target.value)} />
              <input type="text" placeholder="Electricity Charges (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.electricityCharges} onChange={(e) => handleInputChange('electricityCharges', e.target.value)} />
              <input type="text" placeholder="Water Charges (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.waterCharges} onChange={(e) => handleInputChange('waterCharges', e.target.value)} />
            </div>
          </div>
        </div>
      );
    } else if (currentTab === 'Buy') {
      return (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><DollarSign className="w-3.5 h-3.5" /> Budget Details</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Min Budget (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.minBudget} onChange={(e) => handleInputChange('minBudget', e.target.value)} />
                <input type="number" placeholder="Max Budget (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.maxBudget} onChange={(e) => handleInputChange('maxBudget', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
              <YesNoRadioGroup label="Price Negotiable" name="priceNegotiable" value={filters.priceNegotiable} onChange={(val) => handleRadioChange('priceNegotiable', val)} />
              <input type="text" placeholder="Maintenance Charges (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.maintenanceCharges} onChange={(e) => handleInputChange('maintenanceCharges', e.target.value)} />
              <input type="text" placeholder="Property Tax (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.propertyTax} onChange={(e) => handleInputChange('propertyTax', e.target.value)} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><FileText className="w-3.5 h-3.5" /> Lease Details</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Min Lease Rent (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.minLeaseRent} onChange={(e) => handleInputChange('minLeaseRent', e.target.value)} />
                <input type="number" placeholder="Max Lease Rent (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.maxLeaseRent} onChange={(e) => handleInputChange('maxLeaseRent', e.target.value)} />
              </div>
              <input type="number" placeholder="Security Deposit (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.securityDepositLease} onChange={(e) => handleInputChange('securityDepositLease', e.target.value)} />
              <CustomSelect label="Lease Duration" options={leaseDurationOptions} value={filters.leaseDuration} onChange={(val) => handleInputChange('leaseDuration', val)} placeholder="Select Duration" />
              <YesNoRadioGroup label="Lease Negotiable" name="leaseNegotiable" value={filters.leaseNegotiable} onChange={(val) => handleRadioChange('leaseNegotiable', val)} />
              <YesNoRadioGroup label="Renewal Option" name="renewalOption" value={filters.renewalOption} onChange={(val) => handleRadioChange('renewalOption', val)} />
              <YesNoRadioGroup label="Lease Registration Available" name="leaseRegistrationAvailable" value={filters.leaseRegistrationAvailable} onChange={(val) => handleRadioChange('leaseRegistrationAvailable', val)} />
            </div>
          </div>
        </div>
      );
    }
  };

  const renderPlotSection = () => (
    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
      <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><SquareIcon className="w-3.5 h-3.5" /> Plot Details</h3>
      <div className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex gap-2 items-center min-w-0 overflow-hidden">
            <input type="text" placeholder="Total Plot Area" className="flex-1 min-w-0 px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.totalArea} onChange={(e) => handleInputChange('totalArea', e.target.value)} />
            <AreaUnitSelect value={filters.areaUnit} onChange={(val) => handleInputChange('areaUnit', val)} />
          </div>
          <div className="flex gap-2 min-w-0 overflow-hidden">
            <input type="text" placeholder="Length (ft)" className="flex-1 min-w-0 px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.plotLength} onChange={(e) => handleInputChange('plotLength', e.target.value)} />
            <input type="text" placeholder="Width (ft)" className="flex-1 min-w-0 px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.plotWidth} onChange={(e) => handleInputChange('plotWidth', e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
          <input type="text" placeholder="Frontage Width (ft)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.frontageWidth} onChange={(e) => handleInputChange('frontageWidth', e.target.value)} />
          <input type="text" placeholder="Road Width (ft)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.roadWidth} onChange={(e) => handleInputChange('roadWidth', e.target.value)} />
          <CustomSelect label="Facing Direction" options={facingOptions} value={filters.facing} onChange={(val) => handleInputChange('facing', val)} placeholder="Select Facing" />
          <YesNoRadioGroup label="Boundary Wall" name="boundaryWall" value={filters.boundaryWall} onChange={(val) => handleRadioChange('boundaryWall', val)} />
          <CustomSelect label="Land Level" options={landLevelOptions} value={filters.landLevel} onChange={(val) => handleInputChange('landLevel', val)} placeholder="Select Level" />
          <input type="text" placeholder="Slope Percentage (%)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.slopePercentage} onChange={(e) => handleInputChange('slopePercentage', e.target.value)} />
          <CustomSelect label="Soil Type" options={soilTypeOptions} value={filters.soilType} onChange={(val) => handleInputChange('soilType', val)} placeholder="Select Soil Type" />
          <CustomSelect label="Ownership Type" options={ownershipTypeOptions} value={filters.ownershipType} onChange={(val) => handleInputChange('ownershipType', val)} placeholder="Select Ownership" />
        </div>
      </div>
    </div>
  );

  const renderViewSection = () => {
    const options = viewFeaturesOptions[currentTab.toLowerCase()] || viewFeaturesOptions.buy;
    return (
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
        <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><MountainIcon className="w-3.5 h-3.5" /> View & Location Features</h3>
        <div className="space-y-2">
          <CheckboxGroup options={options} values={filters.viewFeatures} onChange={(val) => handleInputChange('viewFeatures', val)} columns={2} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <YesNoRadioGroup label="Hill Access" name="hillAccess" value={filters.hillAccess} onChange={(val) => handleRadioChange('hillAccess', val)} />
            <YesNoRadioGroup label="Nature / Forest Access" name="natureForestAccess" value={filters.natureForestAccess} onChange={(val) => handleRadioChange('natureForestAccess', val)} />
          </div>
        </div>
      </div>
    );
  };

  const renderUsageSection = () => {
    const options = suitableForOptions[currentTab.toLowerCase()] || suitableForOptions.buy;
    return (
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
        <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm">
          <Building className="w-3.5 h-3.5" />
          {currentTab === 'Buy' ? 'Suitable For' : currentTab === 'Rent' ? 'Suitable For' : 'Suitable For'}
        </h3>
        <CheckboxGroup options={options} values={filters.suitableFor} onChange={(val) => handleInputChange('suitableFor', val)} columns={2} />
      </div>
    );
  };

  const renderInfrastructureSection = () => (
    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
      <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><Zap className="w-3.5 h-3.5" /> Infrastructure</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <label className="flex items-center gap-1.5 cursor-pointer group">
          <input type="checkbox" checked={filters.electricityAvailable} onChange={(e) => handleCheckboxChange('electricityAvailable', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
          <span className="text-xs text-gray-700 group-hover:text-teal-500">Electricity Available</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer group">
          <input type="checkbox" checked={filters.waterSupply} onChange={(e) => handleCheckboxChange('waterSupply', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
          <span className="text-xs text-gray-700 group-hover:text-teal-500">Water Supply</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer group">
          <input type="checkbox" checked={filters.borewell} onChange={(e) => handleCheckboxChange('borewell', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
          <span className="text-xs text-gray-700 group-hover:text-teal-500">Borewell</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer group">
          <input type="checkbox" checked={filters.drainageFacility} onChange={(e) => handleCheckboxChange('drainageFacility', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
          <span className="text-xs text-gray-700 group-hover:text-teal-500">Drainage Facility</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer group">
          <input type="checkbox" checked={filters.sewageConnection} onChange={(e) => handleCheckboxChange('sewageConnection', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
          <span className="text-xs text-gray-700 group-hover:text-teal-500">Sewage Connection</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer group">
          <input type="checkbox" checked={filters.internalRoads} onChange={(e) => handleCheckboxChange('internalRoads', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
          <span className="text-xs text-gray-700 group-hover:text-teal-500">Internal Roads</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer group">
          <input type="checkbox" checked={filters.streetLights} onChange={(e) => handleCheckboxChange('streetLights', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
          <span className="text-xs text-gray-700 group-hover:text-teal-500">Street Lights</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer group">
          <input type="checkbox" checked={filters.internetConnectivity} onChange={(e) => handleCheckboxChange('internetConnectivity', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
          <span className="text-xs text-gray-700 group-hover:text-teal-500">Internet / Fiber Connectivity</span>
        </label>
      </div>
    </div>
  );

  const renderAmenitiesSection = () => (
    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
      <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><TreesIcon className="w-3.5 h-3.5" /> Amenities</h3>
      <div className="space-y-2">
        <YesNoRadioGroup label="Gated Property" name="gatedCommunityAmenity" value={filters.gatedCommunityAmenity} onChange={(val) => handleRadioChange('gatedCommunityAmenity', val)} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <input type="checkbox" checked={filters.security247} onChange={(e) => handleCheckboxChange('security247', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
            <span className="text-xs text-gray-700 group-hover:text-teal-500">24/7 Security</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <input type="checkbox" checked={filters.cctvSurveillance} onChange={(e) => handleCheckboxChange('cctvSurveillance', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
            <span className="text-xs text-gray-700 group-hover:text-teal-500">CCTV Surveillance</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <input type="checkbox" checked={filters.childrensPark} onChange={(e) => handleCheckboxChange('childrensPark', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
            <span className="text-xs text-gray-700 group-hover:text-teal-500">Children's Park</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <input type="checkbox" checked={filters.walkingTrack} onChange={(e) => handleCheckboxChange('walkingTrack', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
            <span className="text-xs text-gray-700 group-hover:text-teal-500">Walking Track</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <input type="checkbox" checked={filters.clubHouse} onChange={(e) => handleCheckboxChange('clubHouse', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
            <span className="text-xs text-gray-700 group-hover:text-teal-500">Club House</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <input type="checkbox" checked={filters.landscapedGarden} onChange={(e) => handleCheckboxChange('landscapedGarden', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
            <span className="text-xs text-gray-700 group-hover:text-teal-500">Landscaped Garden</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <input type="checkbox" checked={filters.publicTransport} onChange={(e) => handleCheckboxChange('publicTransport', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
            <span className="text-xs text-gray-700 group-hover:text-teal-500">Public Transport Access</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderLegalSection = () => {
    if (currentTab === 'Rent') {
      return (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><Shield className="w-3.5 h-3.5" /> Legal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
            <YesNoRadioGroup label="Title Deed Verified" name="titleDeedVerified" value={filters.titleDeedVerified} onChange={(val) => handleRadioChange('titleDeedVerified', val)} />
            <YesNoRadioGroup label="Lease Agreement Available" name="leaseAgreementAvailable" value={filters.leaseAgreementAvailable} onChange={(val) => handleRadioChange('leaseAgreementAvailable', val)} />
            <YesNoRadioGroup label="RERA Approved" name="reraApproved" value={filters.reraApproved} onChange={(val) => handleRadioChange('reraApproved', val)} />
            <YesNoRadioGroup label="DTCP Approved" name="dtcpApproved" value={filters.dtcpApproved} onChange={(val) => handleRadioChange('dtcpApproved', val)} />
            <YesNoRadioGroup label="CMDA Approved" name="cmdaApproved" value={filters.cmdaApproved} onChange={(val) => handleRadioChange('cmdaApproved', val)} />
            <YesNoRadioGroup label="Panchayat Approved" name="panchayatApproved" value={filters.panchayatApproved} onChange={(val) => handleRadioChange('panchayatApproved', val)} />
            <YesNoRadioGroup label="Encumbrance Certificate Available" name="encumbranceCertificate" value={filters.encumbranceCertificate} onChange={(val) => handleRadioChange('encumbranceCertificate', val)} />
            <YesNoRadioGroup label="Hill / Forest Land Restriction Checked" name="hillForestRestrictionChecked" value={filters.hillForestRestrictionChecked} onChange={(val) => handleRadioChange('hillForestRestrictionChecked', val)} />
          </div>
        </div>
      );
    } else if (currentTab === 'Buy') {
      return (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><ShieldCheck className="w-3.5 h-3.5" /> Legal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
            <YesNoRadioGroup label="Title Deed Verified" name="titleDeedVerified" value={filters.titleDeedVerified} onChange={(val) => handleRadioChange('titleDeedVerified', val)} />
            <YesNoRadioGroup label="Loan Eligible" name="loanEligible" value={filters.loanEligible} onChange={(val) => handleRadioChange('loanEligible', val)} />
            <YesNoRadioGroup label="RERA Approved" name="reraApproved" value={filters.reraApproved} onChange={(val) => handleRadioChange('reraApproved', val)} />
            <YesNoRadioGroup label="DTCP Approved" name="dtcpApproved" value={filters.dtcpApproved} onChange={(val) => handleRadioChange('dtcpApproved', val)} />
            <YesNoRadioGroup label="CMDA Approved" name="cmdaApproved" value={filters.cmdaApproved} onChange={(val) => handleRadioChange('cmdaApproved', val)} />
            <YesNoRadioGroup label="Panchayat Approved" name="panchayatApproved" value={filters.panchayatApproved} onChange={(val) => handleRadioChange('panchayatApproved', val)} />
            <YesNoRadioGroup label="Encumbrance Certificate Available" name="encumbranceCertificate" value={filters.encumbranceCertificate} onChange={(val) => handleRadioChange('encumbranceCertificate', val)} />
            <YesNoRadioGroup label="Hill / Forest Land Restriction Checked" name="hillForestRestrictionChecked" value={filters.hillForestRestrictionChecked} onChange={(val) => handleRadioChange('hillForestRestrictionChecked', val)} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><FileText className="w-3.5 h-3.5" /> Legal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
            <YesNoRadioGroup label="Title Deed Verified" name="titleDeedVerified" value={filters.titleDeedVerified} onChange={(val) => handleRadioChange('titleDeedVerified', val)} />
            <YesNoRadioGroup label="Lease Agreement Available" name="leaseAgreementAvailable" value={filters.leaseAgreementAvailable} onChange={(val) => handleRadioChange('leaseAgreementAvailable', val)} />
            <YesNoRadioGroup label="RERA Approved" name="reraApproved" value={filters.reraApproved} onChange={(val) => handleRadioChange('reraApproved', val)} />
            <YesNoRadioGroup label="DTCP Approved" name="dtcpApproved" value={filters.dtcpApproved} onChange={(val) => handleRadioChange('dtcpApproved', val)} />
            <YesNoRadioGroup label="CMDA Approved" name="cmdaApproved" value={filters.cmdaApproved} onChange={(val) => handleRadioChange('cmdaApproved', val)} />
            <YesNoRadioGroup label="Panchayat Approved" name="panchayatApproved" value={filters.panchayatApproved} onChange={(val) => handleRadioChange('panchayatApproved', val)} />
            <YesNoRadioGroup label="Encumbrance Certificate Available" name="encumbranceCertificate" value={filters.encumbranceCertificate} onChange={(val) => handleRadioChange('encumbranceCertificate', val)} />
            <YesNoRadioGroup label="Hill / Forest Land Restriction Checked" name="hillForestRestrictionChecked" value={filters.hillForestRestrictionChecked} onChange={(val) => handleRadioChange('hillForestRestrictionChecked', val)} />
            <YesNoRadioGroup label="Land Conversion Approved" name="landConversionApproved" value={filters.landConversionApproved} onChange={(val) => handleRadioChange('landConversionApproved', val)} />
          </div>
        </div>
      );
    }
  };

  const renderTermsSection = () => {
    if (currentTab === 'Rent') {
      return (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><FileText className="w-3.5 h-3.5" /> Rental Terms</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
              <CustomSelect label="Minimum Rental Period" options={rentalDurationOptions} value={filters.minRentalPeriod} onChange={(val) => handleInputChange('minRentalPeriod', val)} placeholder="Select Duration" />
              <CustomSelect label="Maximum Rental Period" options={rentalDurationOptions} value={filters.maxRentalPeriod} onChange={(val) => handleInputChange('maxRentalPeriod', val)} placeholder="Select Duration" />
              <CustomSelect label="Rental Frequency" options={rentalFrequencyOptions} value={filters.rentalFrequency} onChange={(val) => handleInputChange('rentalFrequency', val)} placeholder="Select Frequency" />
              <input type="text" placeholder="Notice Period (Days)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.noticePeriod} onChange={(e) => handleInputChange('noticePeriod', e.target.value)} />
              <input type="text" placeholder="Rent Increase / Escalation (%)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.rentIncreaseEscalation} onChange={(e) => handleInputChange('rentIncreaseEscalation', e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 min-w-0">
              <YesNoRadioGroup label="Commercial Use Allowed" name="commercialUseAllowed" value={filters.commercialUseAllowed} onChange={(val) => handleRadioChange('commercialUseAllowed', val)} />
              <YesNoRadioGroup label="Sub-Leasing Allowed" name="subLeasingAllowed" value={filters.subLeasingAllowed} onChange={(val) => handleRadioChange('subLeasingAllowed', val)} />
              <YesNoRadioGroup label="Pets Allowed" name="petsAllowed" value={filters.petsAllowed} onChange={(val) => handleRadioChange('petsAllowed', val)} />
            </div>
          </div>
        </div>
      );
    } else if (currentTab === 'Lease') {
      return (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><FileText className="w-3.5 h-3.5" /> Lease Terms</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
              <CustomSelect label="Lease Period" options={leasePeriodOptions} value={filters.leasePeriod} onChange={(val) => handleInputChange('leasePeriod', val)} placeholder="Select Period" />
              <YesNoRadioGroup label="Long-Term Lease" name="longTermLease" value={filters.longTermLease} onChange={(val) => handleRadioChange('longTermLease', val)} />
              <YesNoRadioGroup label="Renewal Option" name="renewalOptionLease" value={filters.renewalOptionLease} onChange={(val) => handleRadioChange('renewalOptionLease', val)} />
              <YesNoRadioGroup label="Sub-Leasing Allowed" name="subLeasingAllowedLease" value={filters.subLeasingAllowedLease} onChange={(val) => handleRadioChange('subLeasingAllowedLease', val)} />
              <YesNoRadioGroup label="Commercial Use Allowed" name="commercialUseAllowedLease" value={filters.commercialUseAllowedLease} onChange={(val) => handleRadioChange('commercialUseAllowedLease', val)} />
              <YesNoRadioGroup label="Construction Permission" name="constructionPermission" value={filters.constructionPermission} onChange={(val) => handleRadioChange('constructionPermission', val)} />
              <YesNoRadioGroup label="Development Permission" name="developmentPermission" value={filters.developmentPermission} onChange={(val) => handleRadioChange('developmentPermission', val)} />
              <input type="text" placeholder="Rent / Lease Escalation (%)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.rentLeaseEscalation} onChange={(e) => handleInputChange('rentLeaseEscalation', e.target.value)} />
              <input type="text" placeholder="Early Termination Terms" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.earlyTerminationTerms} onChange={(e) => handleInputChange('earlyTerminationTerms', e.target.value)} />
            </div>
          </div>
        </div>
      );
    } else {
      // Buy Terms
      return (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><FileText className="w-3.5 h-3.5" /> Buy Terms</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
              <CustomSelect label="Possession Timeline" options={possessionTimelineOptions} value={filters.possessionTimeline} onChange={(val) => handleInputChange('possessionTimeline', val)} placeholder="Select Timeline" />
              <input type="text" placeholder="Registration Charges (₹)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.registrationCharges} onChange={(e) => handleInputChange('registrationCharges', e.target.value)} />
              <input type="text" placeholder="Stamp Duty (%)" className="px-2 py-1.5 rounded border border-teal-300 bg-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" value={filters.stampDuty} onChange={(e) => handleInputChange('stampDuty', e.target.value)} />
              <CustomSelect label="Payment Terms" options={paymentTermsOptions} value={filters.paymentTerms} onChange={(val) => handleInputChange('paymentTerms', val)} placeholder="Select Payment Terms" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 min-w-0">
              <YesNoRadioGroup label="GST Applicable" name="gstApplicable" value={filters.gstApplicable} onChange={(val) => handleRadioChange('gstApplicable', val)} />
              <YesNoRadioGroup label="TDS Applicable" name="tdsApplicable" value={filters.tdsApplicable} onChange={(val) => handleRadioChange('tdsApplicable', val)} />
              <YesNoRadioGroup label="Construction Eligibility" name="constructionEligibility" value={filters.constructionEligibility} onChange={(val) => handleRadioChange('constructionEligibility', val)} />
              <YesNoRadioGroup label="Resale Allowed" name="resaleAllowed" value={filters.resaleAllowed} onChange={(val) => handleRadioChange('resaleAllowed', val)} />
            </div>
          </div>
        </div>
      );
    }
  };

  const renderAvailabilitySection = () => {
    if (currentTab === 'Rent') {
      return (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><Clock className="w-3.5 h-3.5" /> Availability</h3>
          <div className="space-y-2">
            <CustomDatePicker label="Available From" value={filters.availableFrom} onChange={(val) => handleInputChange('availableFrom', val)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
              <YesNoRadioGroup label="Immediate Possession" name="immediatePossession" value={filters.immediatePossession} onChange={(val) => handleRadioChange('immediatePossession', val)} />
              <YesNoRadioGroup label="Vacant Plot" name="vacantPlot" value={filters.vacantPlot} onChange={(val) => handleRadioChange('vacantPlot', val)} />
              <YesNoRadioGroup label="Currently Occupied" name="currentlyOccupied" value={filters.currentlyOccupied} onChange={(val) => handleRadioChange('currentlyOccupied', val)} />
            </div>
          </div>
        </div>
      );
    } else if (currentTab === 'Buy') {
      return (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><Clock className="w-3.5 h-3.5" /> Availability</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
              <YesNoRadioGroup label="Ready for Registration" name="readyForRegistration" value={filters.readyForRegistration} onChange={(val) => handleRadioChange('readyForRegistration', val)} />
              <YesNoRadioGroup label="Immediate Possession" name="immediatePossession" value={filters.immediatePossession} onChange={(val) => handleRadioChange('immediatePossession', val)} />
              <YesNoRadioGroup label="Vacant Plot" name="vacantPlot" value={filters.vacantPlot} onChange={(val) => handleRadioChange('vacantPlot', val)} />
              <YesNoRadioGroup label="Under Development" name="underDevelopment" value={filters.underDevelopment} onChange={(val) => handleRadioChange('underDevelopment', val)} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><Clock className="w-3.5 h-3.5" /> Availability</h3>
          <div className="space-y-2">
            <CustomDatePicker label="Available From" value={filters.availableFrom} onChange={(val) => handleInputChange('availableFrom', val)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
              <YesNoRadioGroup label="Available Immediately" name="availableImmediately" value={filters.availableImmediately} onChange={(val) => handleRadioChange('availableImmediately', val)} />
              <YesNoRadioGroup label="Ready for Lease" name="readyForLease" value={filters.readyForLease} onChange={(val) => handleRadioChange('readyForLease', val)} />
              <YesNoRadioGroup label="Currently Leased" name="currentlyLeased" value={filters.currentlyLeased} onChange={(val) => handleRadioChange('currentlyLeased', val)} />
              <YesNoRadioGroup label="Ready for Lease Registration" name="readyForLeaseRegistration" value={filters.readyForLeaseRegistration} onChange={(val) => handleRadioChange('readyForLeaseRegistration', val)} />
            </div>
          </div>
        </div>
      );
    }
  };

  const renderNearbySection = () => {
    const options = nearbyOptions[currentTab.toLowerCase()] || nearbyOptions.buy;
    return (
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
        <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><Bus className="w-3.5 h-3.5" /> Nearby Access</h3>
        <CheckboxGroup options={options} values={filters.nearbyAccess} onChange={(val) => handleInputChange('nearbyAccess', val)} columns={2} />
      </div>
    );
  };

  const renderContactSection = () => (
    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
      <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-1.5 text-sm"><Phone className="w-3.5 h-3.5" /> Contact Preference</h3>
      <div className="space-y-2">
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <input type="checkbox" checked={filters.contactOwner} onChange={(e) => handleCheckboxChange('contactOwner', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
            <span className="text-xs text-gray-700 font-medium group-hover:text-teal-500">Owner</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <input type="checkbox" checked={filters.contactAgent} onChange={(e) => handleCheckboxChange('contactAgent', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
            <span className="text-xs text-gray-700 font-medium group-hover:text-teal-500">Agent</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <input type="checkbox" checked={filters.contactBuilder} onChange={(e) => handleCheckboxChange('contactBuilder', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
            <span className="text-xs text-gray-700 font-medium group-hover:text-teal-500">Builder</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <input type="checkbox" checked={filters.contactDeveloper} onChange={(e) => handleCheckboxChange('contactDeveloper', e.target.checked)} className="w-3.5 h-3.5 rounded border border-teal-400 checked:bg-teal-500 checked:border-teal-500 accent-teal-500" />
            <span className="text-xs text-gray-700 font-medium group-hover:text-teal-500">Developer</span>
          </label>
        </div>
        <CustomSelect label="Preferred Contact Time" options={contactTimeOptions} value={filters.preferredContactTime} onChange={(val) => handleInputChange('preferredContactTime', val)} placeholder="Select Time" />
      </div>
    </div>
  );

  const animationStyle = `
    @keyframes slowRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .slow-rotate {
      animation: slowRotate 4s linear infinite;
    }
  `;

  return (
    <>
      <style>{animationStyle}</style>
      <div className="bg-white rounded-xl shadow-xl border border-teal-100 overflow-hidden flex flex-col" style={{ maxHeight: '85vh', width: '100%', maxWidth: '900px' }}>
        <div className="sticky top-0 z-10 bg-white border-b border-teal-100">
          <div className="flex justify-between items-center px-3 py-2 bg-gradient-to-r from-teal-600 to-emerald-700">
            <div className="flex items-center gap-2">
              <div className="p-0.5 bg-white/20 rounded">
                <MountainIcon className="w-4 h-4 text-white slow-rotate" />
              </div>
              <h3 className="text-white font-semibold text-lg">Filter Hill View Plot</h3>
            </div>
            {onClose && (
              <button onClick={onClose} className="text-white/80 hover:text-white transition-all p-0.5" type="button">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex border-b border-teal-100 bg-teal-50/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                type="button"
                className={`flex-1 py-2 text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  currentTab === tab.id ? 'text-teal-600 border-b-2 border-teal-500 bg-white shadow-sm' : 'text-teal-500 hover:text-teal-600 hover:bg-teal-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <SectionNav />
          <div className="p-3 space-y-3">
            {activeMainSection === 'basic' && renderBasicSection()}
            {activeMainSection === 'price' && renderPriceSection()}
            {activeMainSection === 'plot' && renderPlotSection()}
            {activeMainSection === 'view' && renderViewSection()}
            {activeMainSection === 'usage' && renderUsageSection()}
            {activeMainSection === 'infrastructure' && renderInfrastructureSection()}
            {activeMainSection === 'amenities' && renderAmenitiesSection()}
            {activeMainSection === 'legal' && renderLegalSection()}
            {activeMainSection === 'terms' && renderTermsSection()}
            {activeMainSection === 'availability' && renderAvailabilitySection()}
            {activeMainSection === 'nearby' && renderNearbySection()}
            {activeMainSection === 'contact' && renderContactSection()}
          </div>
        </div>

        <div className="sticky bottom-0 p-2 border-t border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50">
          <div className="flex gap-2">
            <button onClick={clearAllFilters} className="flex-1 px-3 py-1.5 rounded-lg border border-teal-400 text-teal-600 font-semibold text-xs hover:bg-teal-200 transition-all flex items-center justify-center gap-1.5" type="button">
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
            <button onClick={applyFilters} className="flex-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-700 text-white font-semibold text-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5" type="button">
              <CheckCircle className="w-3 h-3" /> Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HillViewPlotFilter;