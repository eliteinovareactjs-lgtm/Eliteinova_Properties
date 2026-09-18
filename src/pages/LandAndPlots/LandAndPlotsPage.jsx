// LandAndPlotsPage.jsx
import React, { useState, useEffect } from "react";
import { ChevronDown, Search, Home, MapPin, Star, Filter, X, Building, Landmark, Warehouse, Building2, Store, Factory, Hotel, Briefcase, Trees, Sprout, Heart, School, Layers, ChevronRight, Compass, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Import banner images
import mainPropertyImage from "../../assets/Apartmentban.jpg";
import individualImg from "../../assets/individualcat.jpg";
import commercialImg from "../../assets/commercialcat.jpg";
import landPlotsImg from "../../assets/landcat.jpg";
import apartmentImg from "../../assets/Apartmentban.jpg";

// Import category images
import residentialLandImg from "../../assets/landandplots/mainbg.png";
import commercialLandImg from "../../assets/landandplots/mainbg.png";
import agriculturalLandImg from "../../assets/landandplots/mainbg.png";
import industrialLandImg from "../../assets/landandplots/mainbg.png";
import mixedUseLandImg from "../../assets/landandplots/mainbg.png";
import institutionalLandImg from "../../assets/landandplots/mainbg.png";
import investmentLandImg from "../../assets/landandplots/mainbg.png";

const LandAndPlotsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("Buy");
  const [activeLandType, setActiveLandType] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);

  const propertyCategories = [
    { name: "Individual", path: "/individual", icon: <Building className="w-4 h-4" /> },
    { name: "Apartment", path: "/apartment", icon: <Landmark className="w-4 h-4" /> },
    { name: "Commercial", path: "/commercial", icon: <Warehouse className="w-4 h-4" /> },
    { name: "Hostel", path: "/hostel", icon: <Building2 className="w-4 h-4" /> }
  ];

  // Diamond collage entries - changed Hostel to Apartment
  const bannerDiamonds = [
    {
      label: "Individual",
      path: "/individual",
      image: individualImg,
      position: "top"
    },
    {
      label: "Apartment",
      path: "/apartment",
      image: apartmentImg,
      position: "left"
    },
    {
      label: "Commercial",
      path: "/commercial",
      image: commercialImg,
      position: "right"
    },
    {
      label: "Hostel",
      path: "/hostel",
      image: landPlotsImg,
      position: "bottom"
    }
  ];

  // Land categories with submenus - preserved from original
  const landCategories = [
    {
      name: "All",
      icon: <Compass className="w-7 h-7" />,
      image: null,
      path: "/land-plots",
      isAllButton: true,
      submenus: []
    },
    {
      name: "Residential Land / Plots",
      icon: <Building className="w-6 h-6" />,
      image: residentialLandImg,
      path: "/land-plots/residential-land-plots",
      submenus: [
        "Residential Plot",
        "DTCP & CMDA Approved Plot",
        "Gated Community Plot",
        "Villa Plot",
        "Farm House Plot",
        "Common Plot",
        "Independent House Plot",
        "Duplex House Plot",
        "Row House Plot"
      ]
    },
    {
      name: "Commercial Land / Plots",
      icon: <Building2 className="w-6 h-6" />,
      image: commercialLandImg,
      path: "/land-plots/commercial-land-plots",
      submenus: [
        "Commercial Plot",
        "Office Space Land",
        "Retail Shop Plot",
        "Showroom Plot",
        "Shopping Complex Land",
        "Hotel / Resort Land",
        "Petrol Bunk Plot",
        "IT Park Land",
        "Warehouse Land",
        "Industrial Commercial Plot"
      ]
    },
    {
      name: "Agricultural Land / Plots",
      icon: <Sprout className="w-6 h-6" />,
      image: agriculturalLandImg,
      path: "/land-plots/agricultural-land-plots",
      submenus: [
        "Agricultural Land",
        "Farm Land",
        "Organic Farming Land",
        "Coconut Farm Land",
        "Mango Grove Land",
        "Tea / Coffee Estate",
        "Poultry Farm Land",
        "Dairy Farm Land",
        "Fisheries / Aquaculture Land"
      ]
    },
    {
      name: "Industrial Land",
      icon: <Factory className="w-6 h-6" />,
      image: industrialLandImg,
      path: "/land-plots/industrial-land-plots",
      submenus: [
        "Industrial Plot",
        "Factory Land",
        "Manufacturing Unit Plot",
        "Logistics Hub Land",
        "Warehouse Plot",
        "Cold Storage Land",
        "SEZ Land"
      ]
    },
    {
      name: "Mixed-Use Land",
      icon: <Layers className="w-6 h-6" />,
      image: mixedUseLandImg,
      path: "/land-plots/mixed-use-land-plots",
      submenus: [
        "Residential + Commercial Plot",
        "Commercial + Industrial Land",
        "Township Development Land",
        "Multi-purpose Development Land"
      ]
    },
    {
      name: "Institutional Land",
      icon: <School className="w-6 h-6" />,
      image: institutionalLandImg,
      path: "/land-plots/institutional-land-plots",
      submenus: [
        "School / College Land",
        "Hospital / Clinic Land",
        "Training Institute Plot",
        "Religious Institution Land"
      ]
    },
    {
      name: "Investment & Special Purpose Land",
      icon: <Heart className="w-6 h-6" />,
      image: investmentLandImg,
      path: "/land-plots/investment-land-plots",
      submenus: [
        "Highway Facing Plot",
        "Lake View Plot",
        "Hill View Plot",
        "Beach Side Plot",
        "River Side Land",
        "Eco Tourism Land",
        "Layout Development Land",
        "Future Investment Plot"
      ]
    }
  ];

  const landTypes = [
    { name: "All", path: "/land-plots", parent: null },
    { name: "Residential Land / Plots", path: "/land-plots/residential-land-plots", parent: null },
    { name: "Commercial Land / Plots", path: "/land-plots/commercial-land-plots", parent: null },
    { name: "Agricultural Land / Plots", path: "/land-plots/agricultural-land-plots", parent: null },
    { name: "Industrial Land", path: "/land-plots/industrial-land-plots", parent: null },
    { name: "Mixed-Use Land", path: "/land-plots/mixed-use-land-plots", parent: null },
    { name: "Institutional Land", path: "/land-plots/institutional-land-plots", parent: null },
    { name: "Investment & Special Purpose Land", path: "/land-plots/investment-land-plots", parent: null },
    { name: "Residential Plot", path: "/land-plots/residential-land-plots/residential-plot", parent: "Residential Land / Plots" },
    { name: "DTCP & CMDA Approved Plot", path: "/land-plots/residential-land-plots/dtcp-cmda-approved-plot", parent: "Residential Land / Plots" },
    { name: "Gated Community Plot", path: "/land-plots/residential-land-plots/gated-community-plot", parent: "Residential Land / Plots" },
    { name: "Villa Plot", path: "/land-plots/residential-land-plots/villa-plot", parent: "Residential Land / Plots" },
    { name: "Farm House Plot", path: "/land-plots/residential-land-plots/farm-house-plot", parent: "Residential Land / Plots" },
    { name: "Common Plot", path: "/land-plots/residential-land-plots/common-plot", parent: "Residential Land / Plots" },
    { name: "Independent House Plot", path: "/land-plots/residential-land-plots/independent-house-plot", parent: "Residential Land / Plots" },
    { name: "Duplex House Plot", path: "/land-plots/residential-land-plots/duplex-house-plot", parent: "Residential Land / Plots" },
    { name: "Row House Plot", path: "/land-plots/residential-land-plots/row-house-plot", parent: "Residential Land / Plots" },
    { name: "Commercial Plot", path: "/land-plots/commercial-land-plots/commercial-plot", parent: "Commercial Land / Plots" },
    { name: "Office Space Land", path: "/land-plots/commercial-land-plots/office-space-land", parent: "Commercial Land / Plots" },
    { name: "Retail Shop Plot", path: "/land-plots/commercial-land-plots/retail-shop-plot", parent: "Commercial Land / Plots" },
    { name: "Showroom Plot", path: "/land-plots/commercial-land-plots/showroom-plot", parent: "Commercial Land / Plots" },
    { name: "Shopping Complex Land", path: "/land-plots/commercial-land-plots/shopping-complex-land", parent: "Commercial Land / Plots" },
    { name: "Hotel / Resort Land", path: "/land-plots/commercial-land-plots/hotel-resort-land", parent: "Commercial Land / Plots" },
    { name: "Petrol Bunk Plot", path: "/land-plots/commercial-land-plots/petrol-bunk-plot", parent: "Commercial Land / Plots" },
    { name: "IT Park Land", path: "/land-plots/commercial-land-plots/it-park-land", parent: "Commercial Land / Plots" },
    { name: "Warehouse Land", path: "/land-plots/commercial-land-plots/warehouse-land", parent: "Commercial Land / Plots" },
    { name: "Industrial Commercial Plot", path: "/land-plots/commercial-land-plots/industrial-commercial-plot", parent: "Commercial Land / Plots" },
    { name: "Agricultural Land", path: "/land-plots/agricultural-land-plots/agricultural-land", parent: "Agricultural Land / Plots" },
    { name: "Farm Land", path: "/land-plots/agricultural-land-plots/farm-land", parent: "Agricultural Land / Plots" },
    { name: "Organic Farming Land", path: "/land-plots/agricultural-land-plots/organic-farming-land", parent: "Agricultural Land / Plots" },
    { name: "Coconut Farm Land", path: "/land-plots/agricultural-land-plots/coconut-farm-land", parent: "Agricultural Land / Plots" },
    { name: "Mango Grove Land", path: "/land-plots/agricultural-land-plots/mango-grove-land", parent: "Agricultural Land / Plots" },
    { name: "Tea / Coffee Estate", path: "/land-plots/agricultural-land-plots/tea-coffee-estate", parent: "Agricultural Land / Plots" },
    { name: "Poultry Farm Land", path: "/land-plots/agricultural-land-plots/poultry-farm-land", parent: "Agricultural Land / Plots" },
    { name: "Dairy Farm Land", path: "/land-plots/agricultural-land-plots/dairy-farm-land", parent: "Agricultural Land / Plots" },
    { name: "Fisheries / Aquaculture Land", path: "/land-plots/agricultural-land-plots/fisheries-aquaculture-land", parent: "Agricultural Land / Plots" },
    { name: "Industrial Plot", path: "/land-plots/industrial-land-plots/industrial-plot", parent: "Industrial Land" },
    { name: "Factory Land", path: "/land-plots/industrial-land-plots/factory-land", parent: "Industrial Land" },
    { name: "Manufacturing Unit Plot", path: "/land-plots/industrial-land-plots/manufacturing-unit-plot", parent: "Industrial Land" },
    { name: "Logistics Hub Land", path: "/land-plots/industrial-land-plots/logistics-hub-land", parent: "Industrial Land" },
    { name: "Warehouse Plot", path: "/land-plots/industrial-land-plots/warehouse-plot", parent: "Industrial Land" },
    { name: "Cold Storage Land", path: "/land-plots/industrial-land-plots/cold-storage-land", parent: "Industrial Land" },
    { name: "SEZ Land", path: "/land-plots/industrial-land-plots/sez-land", parent: "Industrial Land" },
    { name: "Residential + Commercial Plot", path: "/land-plots/mixed-use-land-plots/residential-commercial-plot", parent: "Mixed-Use Land" },
    { name: "Commercial + Industrial Land", path: "/land-plots/mixed-use-land-plots/commercial-industrial-land", parent: "Mixed-Use Land" },
    { name: "Township Development Land", path: "/land-plots/mixed-use-land-plots/township-development-land", parent: "Mixed-Use Land" },
    { name: "Multi-purpose Development Land", path: "/land-plots/mixed-use-land-plots/multi-purpose-development-land", parent: "Mixed-Use Land" },
    { name: "School / College Land", path: "/land-plots/institutional-land-plots/school-college-land", parent: "Institutional Land" },
    { name: "Hospital / Clinic Land", path: "/land-plots/institutional-land-plots/hospital-clinic-land", parent: "Institutional Land" },
    { name: "Training Institute Plot", path: "/land-plots/institutional-land-plots/training-institute-plot", parent: "Institutional Land" },
    { name: "Religious Institution Land", path: "/land-plots/institutional-land-plots/religious-institution-land", parent: "Institutional Land" },
    { name: "Highway Facing Plot", path: "/land-plots/investment-land-plots/highway-facing-plot", parent: "Investment & Special Purpose Land" },
    { name: "Lake View Plot", path: "/land-plots/investment-land-plots/lake-view-plot", parent: "Investment & Special Purpose Land" },
    { name: "Hill View Plot", path: "/land-plots/investment-land-plots/hill-view-plot", parent: "Investment & Special Purpose Land" },
    { name: "Beach Side Plot", path: "/land-plots/investment-land-plots/beach-side-plot", parent: "Investment & Special Purpose Land" },
    { name: "River Side Land", path: "/land-plots/investment-land-plots/river-side-land", parent: "Investment & Special Purpose Land" },
    { name: "Eco Tourism Land", path: "/land-plots/investment-land-plots/eco-tourism-land", parent: "Investment & Special Purpose Land" },
    { name: "Layout Development Land", path: "/land-plots/investment-land-plots/layout-development-land", parent: "Investment & Special Purpose Land" },
    { name: "Future Investment Plot", path: "/land-plots/investment-land-plots/future-investment-plot", parent: "Investment & Special Purpose Land" }
  ];

  useEffect(() => {
    const currentPath = location.pathname;

    const mainCategoryPaths = [
      { path: "/land-plots/residential-land-plots", name: "Residential Land / Plots" },
      { path: "/land-plots/commercial-land-plots", name: "Commercial Land / Plots" },
      { path: "/land-plots/agricultural-land-plots", name: "Agricultural Land / Plots" },
      { path: "/land-plots/industrial-land-plots", name: "Industrial Land" },
      { path: "/land-plots/mixed-use-land-plots", name: "Mixed-Use Land" },
      { path: "/land-plots/institutional-land-plots", name: "Institutional Land" },
      { path: "/land-plots/investment-land-plots", name: "Investment & Special Purpose Land" }
    ];

    const mainMatch = mainCategoryPaths.find(item => item.path === currentPath);
    if (mainMatch) {
      setActiveLandType(mainMatch.name);
      return;
    }

    if (currentPath === "/land-plots" || currentPath === "/land-plots/") {
      setActiveLandType("All");
      return;
    }

    const activeType = landTypes.find(type => type.path === currentPath);
    if (activeType) {
      setActiveLandType(activeType.name);
    } else {
      setActiveLandType("All");
    }
  }, [location.pathname]);

  const handleNavigation = (path, typeName = null) => {
    if (typeName) {
      setActiveLandType(typeName);
    }
    navigate(path);
  };

  const handlePropertyCategoryNavigation = (path) => navigate(path);

  const handleDiamondClick = (path) => navigate(path);

  const getParentCategory = (typeName) => {
    const landType = landTypes.find(t => t.name === typeName);
    return landType?.parent || null;
  };

  const mainCategoryActiveMap = {
    "Residential Land / Plots": "Residential Land / Plots",
    "Commercial Land / Plots": "Commercial Land / Plots",
    "Agricultural Land / Plots": "Agricultural Land / Plots",
    "Industrial Land": "Industrial Land / Plots",
    "Mixed-Use Land": "Mixed-Use Land / Plots",
    "Institutional Land": "Institutional Land / Plots",
    "Investment & Special Purpose Land": "Investment & Special Purpose Land / Plots"
  };

  const handleFilterChange = (filters) => {
    setAppliedFilters(filters);
    console.log("Applied Filters:", filters);
  };

  /* ─── Shared sub-components ─────────────────────────────────────────── */

  const RentBuyDropdown = ({ isMobile = false }) => (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(openDropdown === "toggle" ? null : "toggle")}
        className="group relative px-3.5 py-2 rounded-lg text-white font-semibold text-sm flex items-center gap-2 shadow-xl w-full"
        style={{ background: "linear-gradient(135deg, #00695C, #26A69A)", backgroundSize: "200% 200%" }}
      >
        <div className="absolute inset-0 animate-gradient-shift-slow rounded-lg"></div>
        <Home className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
        <span className="relative z-10 text-sm">{activeButton}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "toggle" ? "rotate-180" : ""} relative z-10 ml-auto`} />
      </button>

      {openDropdown === "toggle" && (
        <div className="absolute top-full left-0 mt-2 bg-teal-50/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden z-50 min-w-[170px] border border-teal-200/30 animate-slide-down-fast">
          {["Buy", "Rent", "Lease", "Sell"].map((item, idx, arr) => (
            <React.Fragment key={item}>
              <button
                onClick={() => { handleNavigation(`/${item.toLowerCase()}`); setActiveButton(item); setOpenDropdown(null); }}
                className="w-full px-5 py-3 text-left text-sm hover:bg-teal-100/50 transition-all duration-300 text-teal-900 font-medium group"
                style={activeButton === item ? { color: "#00695C", backgroundColor: "#e0f2f1", fontWeight: 600 } : {}}
              >
                <div className="flex items-center gap-3 group-hover:gap-4 transition-all">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                  {item}
                </div>
              </button>
              {idx < arr.length - 1 && <div className="h-px bg-gradient-to-r from-transparent via-teal-200/50 to-transparent"></div>}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );

  const SearchBar = () => (
    <div className="relative flex-1 group">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400 group-hover:text-teal-600 group-hover:scale-110 transition-all duration-300 z-10" />
      <input
        type="text"
        placeholder="Search by city, locality, or landmark"
        className="w-full pl-9 pr-5 py-2 rounded-xl border-2 border-teal-200/50 bg-teal-50/90 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 shadow-xl text-teal-900 placeholder-teal-400 transition-all duration-500 relative z-10 hover:shadow-2xl"
      />
      <MapPin className="absolute right-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-300 group-hover:text-emerald-500 group-hover:rotate-12 transition-all duration-300 z-10" />
    </div>
  );

  const AdvancedFilterBtn = ({ fullWidth = false }) => (
    <button
      onClick={() => setShowFilterModal(true)}
      className={`group relative px-3.5 py-2 rounded-lg text-white font-semibold text-sm flex items-center gap-2 shadow-xl hover:shadow-[0_0_30px_rgba(0,105,92,0.4)] transition-all duration-500 hover:scale-105 overflow-hidden ${fullWidth ? "w-full justify-center" : ""}`}
      style={{ background: "linear-gradient(135deg, #00897B, #26A69A)", backgroundSize: "200% 200%" }}
    >
      <div className="absolute inset-0 animate-gradient-shift-slow rounded-lg"></div>
      <Filter className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
      <span className="relative z-10 text-sm">Advanced Filters</span>
      {appliedFilters && (
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
      )}
    </button>
  );

  /* ─── Render ─────────────────────────────────────────────────────────── */

  return (
    <div className="w-full min-h-screen relative bg-gradient-to-b from-teal-50 via-white to-teal-50">
      <div className="relative z-10">
        {/* ===================== BANNER - SAME AS HOSTEL PAGE ===================== */}
        <section className="relative overflow-hidden bg-[#E7EFEA]">
          {/* Decorative top shape */}
          <div className="absolute top-0 left-0 w-[130px] h-[45px] rounded-br-[35px] sm:w-[170px] sm:h-[58px] sm:rounded-br-[50px] md:w-[210px] md:h-[72px] md:rounded-br-[60px] lg:w-[250px] lg:h-[85px] lg:rounded-br-[70px] bg-[#D6E4DE]" />

          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-row min-h-[170px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[330px]">

              {/* LEFT CONTENT */}
              <div className="flex flex-col justify-center w-[38%] sm:w-[37%] md:w-[36%] lg:w-[35%] shrink-0 px-2.5 sm:px-5 md:px-6 lg:px-10 py-2.5 sm:py-4 md:py-6 lg:py-7 z-20">

                <h1 className="leading-none">
                  <span className="block text-[11px] sm:text-[15px] md:text-[20px] lg:text-[28px] font-light text-[#042F2A]">
                    PREMIUM
                  </span>

                  <span className="block text-[16px] sm:text-[24px] md:text-[36px] lg:text-[50px] font-black text-[#012D29] leading-tight">
                    LAND & PLOTS
                  </span>

                  <span className="block text-[12px] sm:text-[17px] md:text-[23px] lg:text-[30px] font-bold text-[#012D29] leading-tight">
                    FOR SALE
                  </span>
                </h1>

                <p className="mt-1 sm:mt-2 md:mt-2.5 lg:mt-3 max-w-[120px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[340px] text-[#31544E] text-[8px] sm:text-[10px] md:text-xs lg:text-sm leading-snug lg:leading-relaxed">
                  Find the perfect property from our curated
                  collection of premium land and plot options.
                </p>

                <button
                  className="mt-1.5 sm:mt-2.5 md:mt-3 lg:mt-4 w-fit px-2.5 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-1.5 lg:px-6 lg:py-2 rounded-md lg:rounded-lg text-white font-bold shadow-md lg:shadow-xl text-[7px] sm:text-[9px] md:text-[11px] lg:text-sm"
                  style={{
                    background: "linear-gradient(135deg,#00695C,#26A69A)"
                  }}
                >
                  EXPLORE NOW
                </button>
              </div>

              {/* RIGHT COLLAGE */}
              <div className="relative overflow-hidden flex-1" style={{ aspectRatio: '16/8' }}>
                {/* Main Building Background */}
                <img
                  src={mainPropertyImage}
                  alt="Land & Plots"
                  className="absolute inset-0 w-full h-full object-cover object-top brightness-75"
                />

                {/* Soft overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#E7EFEA] via-transparent to-transparent" />

                {/* DIAMOND COLLAGE */}
                <div className="absolute inset-0 flex items-center justify-start pl-2 sm:pl-4 md:pl-6 lg:pl-7 z-20">
                  <div className="relative w-[260px] h-[260px] scale-[0.42] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 origin-left transition-transform duration-300">

                    {/* TOP DIAMOND - Individual */}
                    <div
                      className="absolute cursor-pointer transition-all duration-500 hover:scale-110 hover:z-30 animate-diamond-float"
                      style={{
                        width: "100px",
                        height: "100px",
                        top: "0px",
                        left: "80px",
                        animationDelay: "0s",
                      }}
                      onClick={() => handleDiamondClick(bannerDiamonds[0].path)}
                    >
                      <div className="absolute -inset-4 rounded-full bg-[#26A69A]/0 hover:bg-[#26A69A]/20 blur-xl transition-all duration-700 pointer-events-none" />
                      
                      <div
                        className="relative w-full h-full overflow-hidden shadow-xl group/diamond"
                        style={{
                          transform: "rotate(45deg)",
                          borderRadius: "18px",
                          border: "3px solid rgba(255,255,255,0.85)",
                          boxShadow: "0 6px 30px rgba(0,0,0,0.3)",
                          transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      >
                        <div 
                          className="absolute -inset-1 opacity-0 group-hover/diamond:opacity-100 transition-opacity duration-500"
                          style={{
                            background: "conic-gradient(from 0deg, #00695C, #26A69A, #4DB6AC, #26A69A, #00695C)",
                            animation: "diamond-spin 3s linear infinite",
                            borderRadius: "18px",
                          }}
                        />
                        
                        <img
                          src={bannerDiamonds[0].image}
                          alt="Individual"
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/diamond:scale-125"
                          style={{
                            transform: "rotate(-45deg) scale(1.3)",
                            transformOrigin: "center",
                          }}
                        />
                        
                        <div 
                          className="absolute inset-0 overflow-hidden"
                          style={{
                            transform: "rotate(-45deg) scale(1.3)",
                            transformOrigin: "center",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/diamond:translate-x-full transition-transform duration-1000" />
                        </div>
                        
                        <div
                          className="absolute inset-0 transition-opacity duration-500 group-hover/diamond:opacity-80"
                          style={{
                            background: "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.05))",
                          }}
                        />
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-white font-bold text-[11px] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] z-10 transition-all duration-300 group-hover/diamond:scale-110">
                          Individual
                        </span>
                      </div>
                      
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C9A227] opacity-0 group-hover/diamond:opacity-100 group-hover/diamond:animate-ping" />
                    </div>

                    {/* LEFT DIAMOND - Apartment */}
                    <div
                      className="absolute cursor-pointer transition-all duration-500 hover:scale-110 hover:z-30 animate-diamond-float"
                      style={{
                        width: "100px",
                        height: "100px",
                        top: "80px",
                        left: "0px",
                        animationDelay: "0.5s",
                      }}
                      onClick={() => handleDiamondClick(bannerDiamonds[1].path)}
                    >
                      <div className="absolute -inset-4 rounded-full bg-[#26A69A]/0 hover:bg-[#26A69A]/20 blur-xl transition-all duration-700 pointer-events-none" />
                      
                      <div
                        className="relative w-full h-full overflow-hidden shadow-xl group/diamond"
                        style={{
                          transform: "rotate(45deg)",
                          borderRadius: "18px",
                          border: "3px solid rgba(255,255,255,0.85)",
                          boxShadow: "0 6px 30px rgba(0,0,0,0.3)",
                          transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      >
                        <div 
                          className="absolute -inset-1 opacity-0 group-hover/diamond:opacity-100 transition-opacity duration-500"
                          style={{
                            background: "conic-gradient(from 0deg, #00695C, #26A69A, #4DB6AC, #26A69A, #00695C)",
                            animation: "diamond-spin 3s linear infinite",
                            borderRadius: "18px",
                          }}
                        />
                        
                        <img
                          src={bannerDiamonds[1].image}
                          alt="Apartment"
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/diamond:scale-125"
                          style={{
                            transform: "rotate(-45deg) scale(1.5)",
                            transformOrigin: "center",
                          }}
                        />
                        
                        <div 
                          className="absolute inset-0 overflow-hidden"
                          style={{
                            transform: "rotate(-45deg) scale(1.5)",
                            transformOrigin: "center",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/diamond:translate-x-full transition-transform duration-1000" />
                        </div>
                        
                        <div
                          className="absolute inset-0 transition-opacity duration-500 group-hover/diamond:opacity-80"
                          style={{
                            background: "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.05))",
                          }}
                        />
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-white font-bold text-[11px] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] z-10 transition-all duration-300 group-hover/diamond:scale-110">
                          Apartment
                        </span>
                      </div>
                      
                      <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-[#C9A227] opacity-0 group-hover/diamond:opacity-100 group-hover/diamond:animate-ping" />
                    </div>

                    {/* RIGHT DIAMOND - Commercial */}
                    <div
                      className="absolute cursor-pointer transition-all duration-500 hover:scale-110 hover:z-30 animate-diamond-float"
                      style={{
                        width: "100px",
                        height: "100px",
                        top: "80px",
                        left: "160px",
                        animationDelay: "1s",
                      }}
                      onClick={() => handleDiamondClick(bannerDiamonds[2].path)}
                    >
                      <div className="absolute -inset-4 rounded-full bg-[#26A69A]/0 hover:bg-[#26A69A]/20 blur-xl transition-all duration-700 pointer-events-none" />
                      
                      <div
                        className="relative w-full h-full overflow-hidden shadow-xl group/diamond"
                        style={{
                          transform: "rotate(45deg)",
                          borderRadius: "18px",
                          border: "3px solid rgba(255,255,255,0.85)",
                          boxShadow: "0 6px 30px rgba(0,0,0,0.3)",
                          transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      >
                        <div 
                          className="absolute -inset-1 opacity-0 group-hover/diamond:opacity-100 transition-opacity duration-500"
                          style={{
                            background: "conic-gradient(from 0deg, #00695C, #26A69A, #4DB6AC, #26A69A, #00695C)",
                            animation: "diamond-spin 3s linear infinite",
                            borderRadius: "18px",
                          }}
                        />
                        
                        <img
                          src={bannerDiamonds[2].image}
                          alt="Commercial"
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/diamond:scale-125"
                          style={{
                            transform: "rotate(-45deg) scale(1.5)",
                            transformOrigin: "center",
                          }}
                        />
                        
                        <div 
                          className="absolute inset-0 overflow-hidden"
                          style={{
                            transform: "rotate(-45deg) scale(1.5)",
                            transformOrigin: "center",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/diamond:translate-x-full transition-transform duration-1000" />
                        </div>
                        
                        <div
                          className="absolute inset-0 transition-opacity duration-500 group-hover/diamond:opacity-80"
                          style={{
                            background: "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.05))",
                          }}
                        />
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-white font-bold text-[10px] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-center leading-tight z-10 transition-all duration-300 group-hover/diamond:scale-110">
                          Commercial
                        </span>
                      </div>
                      
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C9A227] opacity-0 group-hover/diamond:opacity-100 group-hover/diamond:animate-ping" />
                    </div>

                    {/* BOTTOM DIAMOND - Hostel */}
                    <div
                      className="absolute cursor-pointer transition-all duration-500 hover:scale-110 hover:z-30 animate-diamond-float"
                      style={{
                        width: "100px",
                        height: "100px",
                        top: "160px",
                        left: "80px",
                        animationDelay: "1.5s",
                      }}
                      onClick={() => handleDiamondClick(bannerDiamonds[3].path)}
                    >
                      <div className="absolute -inset-4 rounded-full bg-[#26A69A]/0 hover:bg-[#26A69A]/20 blur-xl transition-all duration-700 pointer-events-none" />
                      
                      <div
                        className="relative w-full h-full overflow-hidden shadow-xl group/diamond"
                        style={{
                          transform: "rotate(45deg)",
                          borderRadius: "18px",
                          border: "3px solid rgba(255,255,255,0.85)",
                          boxShadow: "0 6px 30px rgba(0,0,0,0.3)",
                          transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      >
                        <div 
                          className="absolute -inset-1 opacity-0 group-hover/diamond:opacity-100 transition-opacity duration-500"
                          style={{
                            background: "conic-gradient(from 0deg, #00695C, #26A69A, #4DB6AC, #26A69A, #00695C)",
                            animation: "diamond-spin 3s linear infinite",
                            borderRadius: "18px",
                          }}
                        />
                        
                        <img
                          src={bannerDiamonds[3].image}
                          alt="Hostel"
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/diamond:scale-125"
                          style={{
                            transform: "rotate(-45deg) scale(1.5)",
                            transformOrigin: "center",
                          }}
                        />
                        
                        <div 
                          className="absolute inset-0 overflow-hidden"
                          style={{
                            transform: "rotate(-45deg) scale(1.5)",
                            transformOrigin: "center",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/diamond:translate-x-full transition-transform duration-1000" />
                        </div>
                        
                        <div
                          className="absolute inset-0 transition-opacity duration-500 group-hover/diamond:opacity-80"
                          style={{
                            background: "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.05))",
                          }}
                        />
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-white font-bold text-[11px] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] z-10 transition-all duration-300 group-hover/diamond:scale-110">
                          Hostel
                        </span>
                      </div>
                      
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-[#C9A227] opacity-0 group-hover/diamond:opacity-100 group-hover/diamond:animate-ping" />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* =================== END BANNER =================== */}

        {/* =================== MENU - SAME AS HOSTEL PAGE =================== */}
        <div className="bg-gradient-to-r from-teal-50/95 via-emerald-50/95 to-teal-50/95 backdrop-blur-xl shadow-2xl sticky top-0 z-40 border-b border-teal-200/30 transition-all duration-500">
          <div className="max-w-none mx-auto px-6 py-3.5">
            <div className="hidden md:block space-y-3.5">
              <div className="flex gap-3.5 items-center">
                <RentBuyDropdown />
                <SearchBar />
                <AdvancedFilterBtn />
              </div>

              {/* ====== LAND CATEGORIES WITH SUBMENUS - SAME LAYOUT AS HOSTEL PAGE ====== */}
              <div className="flex flex-wrap items-start justify-center gap-3.5 md:gap-5 pt-1.5">
                {landCategories.map((category) => {
                  const isActive =
                    activeLandType === (mainCategoryActiveMap[category.name] || category.name);

                  return (
                    <div
                      key={category.name}
                      className="relative"
                      onMouseEnter={() => !category.isAllButton && setHoveredCategory(category.name)}
                      onMouseLeave={() => !category.isAllButton && setHoveredCategory(null)}
                    >
                      <div
                        className="group cursor-pointer flex flex-col items-center transition-all duration-300 hover:scale-105"
                        onClick={() => {
                          if (category.isAllButton) {
                            handleNavigation(category.path, "All");
                          } else if (category.path) {
                            handleNavigation(category.path, category.name);
                          }
                        }}
                      >
                        {/* Round Image - Same as HostelPage */}
                        <div
                          className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-17 md:h-17 rounded-full overflow-hidden border-[3px] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg ${
                            isActive
                              ? 'border-[#00695C] shadow-[0_0_18px_rgba(0,105,92,0.3)]'
                              : 'border-gray-300 hover:border-[#00695C]'
                          }`}
                        >
                          {category.isAllButton ? (
                            <div
                              className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${
                                isActive ? 'bg-[#00695C]' : 'bg-gray-100 group-hover:bg-[#D1E2DB]'
                              }`}
                            >
                              {React.cloneElement(category.icon, {
                                className: `w-5 h-5 md:w-5.5 md:h-5.5 transition-colors duration-300 ${
                                  isActive ? 'text-white' : 'text-[#00695C]'
                                }`
                              })}
                            </div>
                          ) : (
                            <>
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </>
                          )}
                        </div>

                        {/* Label */}
                        <span
                          className={`mt-0.5 text-[8px] sm:text-[9px] md:text-[11px] font-semibold text-center leading-tight max-w-[100px] transition-colors duration-300 ${
                            isActive ? 'text-[#00695C]' : 'text-[#143B35] group-hover:text-[#00695C]'
                          }`}
                        >
                          {category.name}
                        </span>
                      </div>

                      {/* Submenu dropdown on hover */}
                      {!category.isAllButton && hoveredCategory === category.name && category.submenus.length > 0 && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-teal-50/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden z-50 min-w-[240px] border border-teal-200/30 animate-slide-down-fast">
                          <div className="py-2 max-h-[400px] overflow-y-auto">
                            {category.submenus.map((submenu) => {
                              const landType = landTypes.find(t => t.name === submenu);
                              const isSubmenuActive = activeLandType === submenu;
                              return (
                                <button
                                  key={submenu}
                                  onClick={() => {
                                    if (landType) {
                                      handleNavigation(landType.path, submenu);
                                    }
                                    setHoveredCategory(null);
                                  }}
                                  className={`w-full px-4 py-2 text-left text-sm transition-all duration-300 group flex items-center gap-2 ${
                                    isSubmenuActive
                                      ? "bg-teal-600 text-white font-semibold"
                                      : "text-teal-900 hover:bg-teal-600 hover:text-white"
                                  }`}
                                >
                                  <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${
                                    isSubmenuActive ? "text-white" : "text-teal-500 group-hover:text-white group-hover:translate-x-1"
                                  }`} />
                                  {submenu}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =================== MOBILE MENU - SAME AS HOSTEL PAGE =================== */}
            <div className="md:hidden space-y-3">
              <div className="flex gap-2.5 items-center">
                <div className="w-[110px] flex-shrink-0">
                  <RentBuyDropdown isMobile />
                </div>
                <div className="flex-1">
                  <SearchBar />
                </div>
                <div className="flex-shrink-0">
                  <AdvancedFilterBtn />
                </div>
              </div>

              {/* Mobile categories */}
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
                {landCategories.map((category) => {
                  const isActive =
                    activeLandType === (mainCategoryActiveMap[category.name] || category.name);

                  return (
                    <div
                      key={category.name}
                      className="flex flex-col items-center flex-shrink-0 transition-transform duration-200 active:scale-95"
                      onClick={() => {
                        if (category.isAllButton) {
                          handleNavigation(category.path, "All");
                        } else {
                          setHoveredCategory(hoveredCategory === category.name ? null : category.name);
                        }
                      }}
                    >
                      <div
                        className={`relative w-9 h-9 xs:w-10 xs:h-10 rounded-full overflow-hidden border-2 flex items-center justify-center transition-all duration-300 shadow-sm ${
                          isActive
                            ? 'border-[#00695C] shadow-[0_0_10px_rgba(0,105,92,0.3)]'
                            : 'border-gray-300'
                        }`}
                      >
                        {category.isAllButton ? (
                          <div className={`w-full h-full flex items-center justify-center ${
                            isActive ? 'bg-[#00695C]' : 'bg-gray-100'
                          }`}>
                            {React.cloneElement(category.icon, {
                              className: `w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#00695C]'}`
                            })}
                          </div>
                        ) : (
                          <>
                            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                          </>
                        )}
                      </div>
                      <span className={`mt-0.5 text-[7px] font-semibold text-center leading-tight max-w-[70px] whitespace-nowrap transition-colors duration-300 ${
                        isActive ? 'text-[#00695C]' : 'text-[#143B35]'
                      }`}>
                        {category.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Mobile submenu chips */}
              {hoveredCategory && (
                <div className="bg-teal-50 rounded-xl p-2 border border-teal-200">
                  <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
                    {landCategories.find(c => c.name === hoveredCategory)?.submenus.map((submenu) => {
                      const landType = landTypes.find(t => t.name === submenu);
                      const isSubmenuActive = activeLandType === submenu;
                      return (
                        <button
                          key={submenu}
                          onClick={() => {
                            if (landType) {
                              handleNavigation(landType.path, submenu);
                            }
                            setHoveredCategory(null);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                            isSubmenuActive
                              ? "bg-teal-600 text-white"
                              : "bg-white text-teal-700 hover:bg-teal-600 hover:text-white"
                          }`}
                        >
                          {submenu}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =================== FILTER MODAL =================== */}
        {showFilterModal && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[140px] px-4 pb-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="bg-gradient-to-b from-teal-50/95 via-emerald-50/95 to-teal-50/95 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 border border-teal-200/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-teal-900 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-teal-600" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                      Advanced Filters
                    </span>
                  </h3>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="p-2 hover:bg-teal-100 rounded-full transition-all duration-300"
                  >
                    <X className="w-5 h-5 text-teal-600" />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-semibold text-teal-800 mb-2 block">Price Range</label>
                  <div className="flex gap-3">
                    <input type="number" placeholder="Min" className="w-1/2 px-3 py-2 rounded-xl border-2 border-teal-200/50 bg-teal-50/80 text-sm focus:outline-none focus:border-teal-500" />
                    <input type="number" placeholder="Max" className="w-1/2 px-3 py-2 rounded-xl border-2 border-teal-200/50 bg-teal-50/80 text-sm focus:outline-none focus:border-teal-500" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-semibold text-teal-800 mb-2 block">Area (sq. ft. / acres)</label>
                  <div className="flex gap-3">
                    <input type="number" placeholder="Min Area" className="w-1/2 px-3 py-2 rounded-xl border-2 border-teal-200/50 bg-teal-50/80 text-sm focus:outline-none focus:border-teal-500" />
                    <input type="number" placeholder="Max Area" className="w-1/2 px-3 py-2 rounded-xl border-2 border-teal-200/50 bg-teal-50/80 text-sm focus:outline-none focus:border-teal-500" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-teal-200/30">
                  <button className="flex-1 px-4 py-2 rounded-xl border-2 border-teal-200/50 text-sm font-medium text-teal-700 hover:bg-teal-50 transition-all duration-300">
                    Clear All
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-xl hover:shadow-[0_0_25px_rgba(0,105,92,0.4)] transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, #00695C, #26A69A)" }}>
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================== MAIN CONTENT =================== */}
        <div className="max-w-none mx-auto px-4 sm:px-6 py-6 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="lg:w-2/3">
              <section>
                <div className="bg-gradient-to-br from-teal-50/90 via-emerald-50/90 to-teal-50/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 text-center border border-teal-200/30 hover:shadow-[0_0_60px_rgba(0,105,92,0.3)] transition-all duration-700 group animate-fade-in-up">
                  <div className="absolute inset-0 opacity-[0.03] rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent animate-shimmer"></div>
                  </div>

                  <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 border border-teal-200">
                    <span className="text-sm font-medium text-teal-700">Active Filter:</span>
                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                      {activeLandType}
                    </span>
                    {getParentCategory(activeLandType) && (
                      <span className="text-xs text-teal-500">({getParentCategory(activeLandType)})</span>
                    )}
                  </div>

                  <div
                    className="w-24 h-24 md:w-28 md:h-28 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl group-hover:shadow-[0_0_50px_rgba(0,105,92,0.5)] transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-3 relative"
                    style={{
                      background: "linear-gradient(135deg, #00695C, #26A69A, #4DB6AC)",
                      backgroundSize: "200% 200%"
                    }}
                  >
                    <div className="absolute inset-0 animate-gradient-shift-slow rounded-3xl"></div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
                    <Landmark className="w-12 h-12 text-white group-hover:rotate-12 transition-transform duration-700 relative z-10" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4 group-hover:text-teal-950 transition-colors duration-300">
                    {activeLandType === "All" ? "Premium Land & Plots" : `${activeLandType} Properties`}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 animate-gradient-text-slow"> Coming Soon</span>
                  </h2>

                  <p className="text-teal-800 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed group-hover:text-teal-900 transition-colors duration-300 backdrop-blur-sm bg-teal-100/30 rounded-2xl p-6 border border-teal-200/20">
                    {activeLandType === "All"
                      ? "We're currently adding verified land and plot listings across all categories."
                      : `We're currently adding exclusive ${activeLandType.toLowerCase()} listings to our database.`}
                    <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 font-semibold text-xl">
                      Check back soon for amazing deals!
                    </span>
                  </p>

                  <div className="mt-8 flex justify-center gap-4">
                    <button className="group relative px-6 py-3 rounded-xl border-2 border-teal-500 text-teal-600 font-semibold hover:bg-gradient-to-r from-teal-50 to-emerald-50 transition-all duration-500 transform hover:scale-105 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative z-10">Get Notified</span>
                    </button>
                    <button
                      className="group relative px-6 py-3 rounded-xl text-white font-semibold shadow-xl hover:shadow-[0_0_30px_rgba(0,105,92,0.5)] transition-all duration-500 transform hover:scale-105 overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, #00695C, #26A69A)",
                        backgroundSize: "200% 200%"
                      }}
                    >
                      <div className="absolute inset-0 animate-gradient-shift"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                      <span className="relative z-10">Browse Similar</span>
                    </button>
                  </div>
                </div>
              </section>

              <div className="mt-8 bg-gradient-to-br from-teal-50/90 via-emerald-50/90 to-teal-50/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 text-center border border-teal-200/30 animate-fade-in-up delay-300">
                <div className="max-w-2xl mx-auto">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-teal-500/10 to-emerald-500/10 mx-auto mb-6 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-3xl animate-pulse-slow"></div>
                    <Landmark className="w-10 h-10 text-teal-600 animate-bounce-slow relative z-10" />
                  </div>

                  <h3 className="text-2xl font-bold text-teal-900 mb-4">
                    No {activeLandType !== "All" ? `${activeLandType} ` : ""}Land & Plots Found
                  </h3>

                  <p className="text-teal-800 mb-6 backdrop-blur-sm bg-teal-100/30 rounded-xl p-4 border border-teal-200/20">
                    {activeLandType !== "All"
                      ? `We don't have any ${activeLandType.toLowerCase()} listings available at the moment.`
                      : "Click on 'All' to see all properties or hover over any category above and select a subcategory to find specific land types."}
                  </p>

                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100">
                    {[0, 150, 300].map((delay) => (
                      <div
                        key={delay}
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 animate-pulse"
                        style={{ animationDelay: `${delay}ms` }}
                      ></div>
                    ))}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 font-medium">
                      {activeLandType !== "All"
                        ? `Check back later for ${activeLandType.toLowerCase()} listings`
                        : "Click 'All' to view all properties or select a subcategory from any menu"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 lg:relative">
              <div className="lg:sticky lg:top-[110px] lg:max-h-[calc(100vh-130px)] lg:overflow-y-auto lg:scrollbar-hide animate-slide-in-right">
                <div className="bg-gradient-to-b from-teal-50/95 via-emerald-50/95 to-teal-50/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-teal-200/30 hover:shadow-[0_0_40px_rgba(0,105,92,0.2)] transition-all duration-500">
                  <h3 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-teal-500/10 to-emerald-500/10 animate-pulse-slow">
                      <Filter className="w-5 h-5 animate-rotate-slow" style={{ color: "#00695C" }} />
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                      Advanced Filters
                    </span>
                  </h3>

                  <div className="mb-6 animate-fade-in-up delay-100">
                    <label className="text-sm font-semibold text-teal-800 mb-3 block flex items-center gap-2">
                      <span className="text-xl animate-bounce-slow">💰</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                        Price Range
                      </span>
                    </label>
                    <div className="flex gap-3">
                      <input type="number" placeholder="Min" className="w-1/2 px-4 py-3 rounded-xl border-2 border-teal-200/50 bg-teal-50/80 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 shadow-lg text-teal-900 placeholder-teal-400 transition-all duration-300 hover:shadow-xl" />
                      <input type="number" placeholder="Max" className="w-1/2 px-4 py-3 rounded-xl border-2 border-teal-200/50 bg-teal-50/80 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 shadow-lg text-teal-900 placeholder-teal-400 transition-all duration-300 hover:shadow-xl" />
                    </div>
                    <div className="mt-3 h-2 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-progress"></div>
                    </div>
                  </div>

                  <div className="mb-6 animate-fade-in-up delay-200">
                    <label className="text-sm font-semibold text-teal-800 mb-3 block flex items-center gap-2">
                      <span className="text-xl animate-bounce-slow">📐</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                        Area (sq. ft. / acres)
                      </span>
                    </label>
                    <div className="flex gap-3">
                      <input type="number" placeholder="Min Area" className="w-1/2 px-4 py-3 rounded-xl border-2 border-teal-200/50 bg-teal-50/80 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 shadow-lg text-teal-900 placeholder-teal-400 transition-all duration-300 hover:shadow-xl" />
                      <input type="number" placeholder="Max Area" className="w-1/2 px-4 py-3 rounded-xl border-2 border-teal-200/50 bg-teal-50/80 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 shadow-lg text-teal-900 placeholder-teal-400 transition-all duration-300 hover:shadow-xl" />
                    </div>
                  </div>

                  <div className="mb-6 animate-fade-in-up delay-300">
                    <label className="text-sm font-semibold text-teal-800 mb-3 block flex items-center gap-2">
                      <span className="text-xl animate-bounce-slow">🏢</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                        Land Category
                      </span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {landCategories.filter(c => !c.isAllButton).map((category) => (
                        <label
                          key={category.name}
                          className="flex items-center gap-3 p-3 rounded-xl border-2 border-teal-200/50 hover:border-teal-300 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r from-teal-50/50 to-emerald-50/50 group"
                        >
                          <input type="checkbox" className="w-4 h-4 rounded border-teal-300 text-teal-600 focus:ring-teal-500/30 transition-all duration-300" />
                          <span className="flex items-center gap-2 text-sm text-teal-800 group-hover:text-teal-900 group-hover:font-medium transition-all duration-300">
                            {React.cloneElement(category.icon, { className: "w-4 h-4" })}
                            {category.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 animate-fade-in-up delay-400">
                    <label className="text-sm font-semibold text-teal-800 mb-3 block flex items-center gap-2">
                      <span className="text-xl animate-bounce-slow">📍</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                        Features
                      </span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Commercial Plot", "Road Access", "Water Connection", "Electricity", "Level Ground", "Clear Title", "Approved Layout", "Gated Community", "Highway Facing", "Lake View", "Hill View", "Beach Side"].map((feature) => (
                        <label key={feature} className="flex items-center gap-3 p-2 rounded-lg border border-teal-200/50 hover:border-teal-300 cursor-pointer transition-all duration-300 hover:bg-teal-50/50">
                          <input type="checkbox" className="w-3.5 h-3.5 rounded border-teal-300 text-teal-600 focus:ring-teal-500/30" />
                          <span className="text-xs text-teal-700">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-teal-200/30 animate-fade-in-up delay-500">
                    <button className="flex-1 px-4 py-3 rounded-xl border-2 border-teal-200/50 text-sm font-medium text-teal-700 hover:bg-gradient-to-r from-teal-50 to-emerald-50 hover:border-teal-300 transition-all duration-500 transform hover:scale-[1.02] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative z-10">Clear All</span>
                    </button>
                    <button className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-white shadow-xl hover:shadow-[0_0_25px_rgba(0,105,92,0.4)] transition-all duration-500 transform hover:scale-[1.02] group relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg, #00695C, #26A69A)", backgroundSize: "200% 200%" }}>
                      <div className="absolute inset-0 animate-gradient-shift"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Apply Filters
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 2s linear infinite;
        }
        .animate-gradient-shift-slow {
          background-size: 200% 200%;
          animation: gradient-shift 4s linear infinite;
        }
        @keyframes diamond-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes diamond-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-diamond-float {
          animation: diamond-float 4s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        @keyframes slide-down {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down-fast {
          animation: slide-down 0.2s ease-out forwards;
        }
        @keyframes slide-in-right {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-rotate-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 75%; }
        }
        .animate-progress {
          animation: progress 1.5s ease-out forwards;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-text-slow {
          background-size: 300% 300%;
          animation: gradient-text 5s ease infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LandAndPlotsPage;