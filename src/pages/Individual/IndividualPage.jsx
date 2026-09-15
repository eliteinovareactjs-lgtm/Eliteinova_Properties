import React, { useState, useEffect } from "react";
import { ChevronDown, Search, Home, MapPin, Star, Filter, X, Building, Landmark, Warehouse, Building2, ChevronRight, Instagram, Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Import images for the banner
import mainPropertyImage from "../../assets/indmainbanner.jpg"; // Replace with your main image
import apartmentImg from "../../assets/banner1.jpg";
import villaImg from "../../assets/banner1.jpg";
import commercialImg from "../../assets/banner1.jpg";
import landImg from "../../assets/banner1.jpg";

// Import category images
import independentHouseImg from "../../assets/banner1.jpg";
import independentVillaImg from "../../assets/banner1.jpg";
import residentialApartmentImg from "../../assets/banner1.jpg";
import duplexResidentialImg from "../../assets/banner1.jpg";
import rowHouseImg from "../../assets/banner1.jpg";

const IndividualPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("Rent");
  const [activeHouseType, setActiveHouseType] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [hoveredFilter, setHoveredFilter] = useState(null);

  const propertyCategories = [
    { name: "Apartment", path: "/apartment", icon: <Building className="w-4 h-4" /> },
    { name: "Commercial", path: "/commercial", icon: <Landmark className="w-4 h-4" /> },
    { name: "Land & Plots", path: "/land-plots", icon: <Warehouse className="w-4 h-4" /> },
    { name: "Hostel", path: "/hostel", icon: <Building2 className="w-4 h-4" /> }
  ];

  // Property type categories with images for round display - includes "All"
  const propertyTypeCategories = [
    { 
      name: "All", 
      path: "/individual", 
      image: null,
      icon: <Home className="w-7 h-7" />,
      isAll: true
    },
    { 
      name: "Independent House", 
      path: "/individual/independent-house", 
      image: independentHouseImg,
      icon: <Home className="w-6 h-6" />
    },
    { 
      name: "Independent Villa", 
      path: "/individual/independent-villa", 
      image: independentVillaImg,
      icon: <Home className="w-6 h-6" />
    },
    // { 
    //   name: "Residential Apartment", 
    //   path: "/individual/residential-apartment", 
    //   image: residentialApartmentImg,
    //   icon: <Building className="w-6 h-6" />
    // },
    { 
      name: "Duplex Unit", 
      path: "/individual/duplex-residential-unit", 
      image: duplexResidentialImg,
      icon: <Building2 className="w-6 h-6" />
    },
    // { 
    //   name: "Row House", 
    //   path: "/individual/row-house", 
    //   image: rowHouseImg,
    //   icon: <Home className="w-6 h-6" />
    // }
  ];

  const houseTypes = [
    { name: "All", path: "/individual", component: "IndividualPage" },
    { name: "Independent House", path: "/individual/independent-house", component: "IndependentHousePage" },
    { name: "Independent Villa", path: "/individual/independent-villa", component: "IndependentVillaPage" },
    { name: "Residential Apartment", path: "/individual/residential-apartment", component: "ResidentialApartmentPage" },
    { name: "Duplex Residential Unit", path: "/individual/duplex-residential-unit", component: "DuplexResidentialUnitPage" },
    { name: "Row House", path: "/individual/row-house", component: "RowHousePage" }
  ];

  // Diamond data - matches the reference banner: a single horizontal row,
  // each diamond has a small icon badge and a label underneath.
  const bannerDiamonds = [
    {
      image: apartmentImg,
      label: "Apartments",
      icon: <Building className="w-4 h-4" style={{ color: "#00695C" }} />,
      path: "/apartment"
    },
    {
      image: villaImg,
      label: "Hostel",
      icon: <Building2 className="w-4 h-4" style={{ color: "#00695C" }} />,
      path: "/hostel"
    },
    {
      image: commercialImg,
      label: "Commercial",
      icon: <Landmark className="w-4 h-4" style={{ color: "#00695C" }} />,
      path: "/commercial"
    },
    {
      image: landImg,
      label: "Land & Plots",
      icon: <Warehouse className="w-4 h-4" style={{ color: "#00695C" }} />,
      path: "/land-plots"
    }
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeType = houseTypes.find(type => type.path === currentPath);
    if (activeType) {
      setActiveHouseType(activeType.name);
    } else if (currentPath === "/individual" || currentPath === "/individual/") {
      setActiveHouseType("All");
    }
  }, [location.pathname]);

  const handleNavigation = (path, typeName = null) => {
    if (typeName) {
      setActiveHouseType(typeName);
    }
    navigate(path);
  };

  const handlePropertyCategoryNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full min-h-screen relative">
      <div className="relative z-10">
        {/* ====== PROPERTY BANNER ====== */}
        <section className="w-full bg-[#EAF2EE] relative overflow-hidden">
          <div className="relative flex flex-col lg:flex-row min-h-[480px] lg:h-[480px]">
            {/* Slim accent spine along the left edge — a small signature touch */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[6px] bg-gradient-to-b from-[#00695C] via-[#26A69A] to-[#00695C]" />

            {/* Faint diamond motif in the corner, echoing the category thumbnails below */}
            <div className="hidden lg:grid absolute top-10 right-[47%] grid-cols-3 gap-2 opacity-[0.15] pointer-events-none">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="w-2 h-2 rotate-45 border border-[#00695C]" />
              ))}
            </div>

            {/* Content panel — its own column, no text floating over the photo */}
            <div className="relative z-10 flex flex-col justify-center w-full lg:w-[46%] px-6 md:px-10 lg:pl-16 lg:pr-8 py-10 lg:py-0">
              <h1
                className="text-[#143B35] text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.05] mb-3"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Home <span className="text-[#00695C]">For Sale</span>
              </h1>

              <h2 className="text-[#00695C] text-lg md:text-xl font-semibold mb-4">
                Find your dream property with ease
              </h2>

              <p className="text-[#4B5C58] text-sm md:text-base leading-relaxed max-w-sm mb-9">
                Discover premium villas, apartments, plots and commercial spaces near you.
              </p>

              {/* ====== ENHANCED DIAMOND CATEGORY ROW ====== */}
              <div className="flex items-start gap-5 sm:gap-7">
                {bannerDiamonds.map((diamond, index) => (
                  <button
                    key={index}
                    onClick={() => handlePropertyCategoryNavigation(diamond.path)}
                    className="flex flex-col items-center gap-3 group relative"
                  >
                    {/* Glow ring on hover */}
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#26A69A]/0 via-[#26A69A]/20 to-[#26A69A]/0 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 pointer-events-none" />
                    
                    {/* Diamond container with layered effects */}
                    <div
                      className="relative w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                      style={{ 
                        filter: "drop-shadow(0 10px 20px rgba(0,105,92,0.25))",
                      }}
                    >
                      {/* Animated rotating gradient border layer */}
                      <div
                        className="absolute -inset-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ 
                          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                          background: "conic-gradient(from 0deg, #00695C, #26A69A, #4DB6AC, #26A69A, #00695C)",
                          animation: "spin-slow 3s linear infinite"
                        }}
                      />
                      
                      {/* White outer frame */}
                      <div
                        className="absolute inset-0 bg-white shadow-lg"
                        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                      />
                      
                      {/* Teal accent frame ring */}
                      <div
                        className="absolute inset-[3px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ 
                          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                          background: "linear-gradient(135deg, #00695C, #26A69A)"
                        }}
                      />

                      {/* Image container */}
                      <div
                        className="absolute inset-[5px] overflow-hidden"
                        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                      >
                        <img
                          src={diamond.image}
                          alt={diamond.label}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                          style={{ 
                            filter: "brightness(0.95) saturate(1.1)",
                          }}
                        />
                        {/* Image overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00695C]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Shine sweep effect */}
                      <div
                        className="absolute inset-[5px] overflow-hidden pointer-events-none"
                        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>

                      {/* Icon badge with enhanced styling */}
                      <div className="absolute -bottom-1.5 -right-1.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-xl border-2 border-[#D1E2DB] group-hover:border-[#26A69A] flex items-center justify-center z-10 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,105,92,0.4)] group-hover:rotate-[360deg]">
                        <div className="group-hover:scale-110 transition-transform duration-500">
                          {diamond.icon}
                        </div>
                      </div>

                      {/* Sparkle accent dots */}
                      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#C9A227] opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
                      <div className="absolute top-1/2 -right-2 w-1.5 h-1.5 rounded-full bg-[#26A69A] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                      <div className="absolute bottom-2 -left-2 w-1.5 h-1.5 rounded-full bg-[#00695C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
                    </div>

                    {/* Label with enhanced hover effect */}
                    <span className="text-xs sm:text-[13px] font-semibold text-[#143B35] text-center whitespace-nowrap group-hover:text-[#00695C] transition-all duration-300 relative">
                      {diamond.label}
                      {/* Underline accent */}
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#00695C] to-[#26A69A] rounded-full group-hover:w-full transition-all duration-500" />
                    </span>

                    {/* Bottom glow reflection */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-3 bg-[#26A69A]/0 group-hover:bg-[#26A69A]/30 rounded-full blur-md transition-all duration-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Image panel — its own column, full-bleed photo with a soft seam into the panel above */}
            <div className="relative w-full lg:w-[54%] h-64 lg:h-full">
              <div
                className="absolute inset-0 lg:inset-y-8 lg:right-8 lg:rounded-[36px] overflow-hidden"
                style={{ boxShadow: "0 24px 60px rgba(20,59,53,0.35)" }}
              >
                <img
                  src={mainPropertyImage}
                  alt="Luxury Property"
                  className="absolute inset-0 w-full h-full object-cover object-[70%_40%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                {/* Hairline gold frame, just inside the rounded edge */}
                <div
                  className="hidden lg:block absolute inset-3 rounded-[28px] pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1.5px rgba(201,162,39,0.6)" }}
                />
              </div>
              <div
                className="absolute inset-y-0 left-0 w-24 lg:w-32 hidden lg:block"
                style={{
                  background: "linear-gradient(to right, #EAF2EE 0%, rgba(234,242,238,0) 100%)"
                }}
              />

              {/* Gold corner accents, opposite corners for balance */}
              <div
                className="hidden lg:block absolute top-14 right-14 w-10 h-10 pointer-events-none opacity-90"
                style={{ borderTop: "2px solid #C9A227", borderRight: "2px solid #C9A227" }}
              />
              <div
                className="hidden lg:block absolute bottom-14 left-9 w-10 h-10 pointer-events-none opacity-90"
                style={{ borderBottom: "2px solid #C9A227", borderLeft: "2px solid #C9A227" }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </section>

        {/* ====== SEARCH & FILTER BAR ====== */}
        <div className="bg-gradient-to-r from-teal-50/95 via-emerald-50/95 to-teal-50/95 backdrop-blur-xl shadow-2xl sticky top-0 z-40 border-b border-teal-200/30 transition-all duration-500 animate-slide-down">
          <div className="max-w-none mx-auto px-6 py-4">
            <div className="hidden md:block space-y-4">
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === "toggle" ? null : "toggle")}
                    className="group relative px-4 py-2 rounded-lg text-white font-semibold text-sm flex items-center gap-2 shadow-xl hover:shadow-[0_0_30px_rgba(0,105,92,0.4)] transition-all duration-500 transform hover:scale-105 overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #00695C, #26A69A)",
                      backgroundSize: "200% 200%"
                    }}
                  >
                    <div className="absolute inset-0 animate-gradient-shift-slow"></div>
                    <Home className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                    <span className="relative z-10">{activeButton}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "toggle" ? 'rotate-180' : ''} relative z-10`} />
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                  </button>

                  {openDropdown === "toggle" && (
                    <div className="absolute top-full left-0 mt-2 bg-teal-50/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden z-50 min-w-[180px] border border-teal-200/30 animate-slide-down-fast">
                      <button
                        onClick={() => {
                          handleNavigation("/buy");
                          setActiveButton("Buy");
                          setOpenDropdown(null);
                        }}
                        className="w-full px-5 py-3.5 text-left text-base hover:bg-teal-100/50 transition-all duration-300 text-teal-900 font-medium group"
                      >
                        <div className="flex items-center gap-3 group-hover:gap-4 transition-all">
                          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                          Buy
                        </div>
                      </button>
                      <div className="h-px bg-gradient-to-r from-transparent via-teal-200/50 to-transparent"></div>
                      <button
                        onClick={() => {
                          handleNavigation("/rent");
                          setActiveButton("Rent");
                          setOpenDropdown(null);
                        }}
                        className="w-full px-5 py-3.5 text-left text-base font-semibold transition-all duration-300 group"
                        style={{ color: "#00695C", backgroundColor: "#e0f2f1" }}
                      >
                        <div className="flex items-center gap-3 group-hover:gap-4 transition-all">
                          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                          Rent
                        </div>
                      </button>
                      <div className="h-px bg-gradient-to-r from-transparent via-teal-200/50 to-transparent"></div>
                      <button
                        onClick={() => {
                          handleNavigation("/lease");
                          setActiveButton("Lease");
                          setOpenDropdown(null);
                        }}
                        className="w-full px-5 py-3.5 text-left text-base hover:bg-teal-100/50 transition-all duration-300 text-teal-900 font-medium group"
                      >
                        <div className="flex items-center gap-3 group-hover:gap-4 transition-all">
                          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                          Lease
                        </div>
                      </button>
                      <div className="h-px bg-gradient-to-r from-transparent via-teal-200/50 to-transparent"></div>
                      <button
                        onClick={() => {
                          handleNavigation("/sell");
                          setActiveButton("Sell");
                          setOpenDropdown(null);
                        }}
                        className="w-full px-5 py-3.5 text-left text-base hover:bg-teal-100/50 transition-all duration-300 text-teal-900 font-medium group"
                      >
                        <div className="flex items-center gap-3 group-hover:gap-4 transition-all">
                          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                          Sell
                        </div>
                      </button>
                    </div>   
                  )}
                </div>

                <div className="relative flex-1 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <Search className="absolute left-3.5 top-1/2  transform -translate-y-1/2 w-4 h-4 text-teal-400 group-hover:text-teal-600 group-hover:scale-110 transition-all duration-300 z-10" />
                  <input
                    type="text"
                    placeholder="Search by city, locality, or landmark"
                    className="w-full pl-10 pr-5 py-2 rounded-xl border-2 border-teal-200/50 bg-teal-50/90 text-base focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 shadow-xl text-teal-900 placeholder-teal-400 transition-all duration-500 relative z-10 hover:shadow-2xl"
                  />
                  <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-300 group-hover:text-emerald-500 group-hover:rotate-12 transition-all duration-300 z-10" />
                </div>
              </div>

              {/* ====== PROPERTY TYPE CATEGORIES - Below Rent & Search Bar - Centered ====== */}
              <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8 pt-2">
                {propertyTypeCategories.map((category) => {
                  const isActive = activeHouseType === category.name || 
                    (category.name === "All" && activeHouseType === "All");
                  
                  return (
                    <div
                      key={category.name}
                      className="group cursor-pointer flex flex-col items-center transition-all duration-300 hover:scale-105"
                      onClick={() => handleNavigation(category.path, category.name)}
                    >
                      {/* Round Image - Increased Size */}
                      <div 
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 transition-all duration-300 shadow-md hover:shadow-lg ${
                          isActive 
                            ? 'border-[#00695C] shadow-[0_0_25px_rgba(0,105,92,0.35)]' 
                            : 'border-gray-300 hover:border-[#00695C]'
                        }`}
                      >
                        {category.isAll ? (
                          <div className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${
                            isActive ? 'bg-[#00695C]' : 'bg-gray-100 group-hover:bg-[#D1E2DB]'
                          }`}>
                            <Home className={`w-7 h-7 md:w-9 md:h-9 transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-[#00695C]'
                            }`} />
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
                      
                      {/* Label - Increased Size */}
                      <span className={`mt-1.5 text-[10px] sm:text-xs md:text-sm font-semibold text-center transition-colors duration-300 ${
                        isActive ? 'text-[#00695C]' : 'text-[#143B35] group-hover:text-[#00695C]'
                      }`}>
                        {category.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="md:hidden space-y-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {houseTypes.map((type, index) => {
                  const isActive = activeHouseType === type.name;
                  return (
                    <button
                      key={type.name}
                      onClick={() => handleNavigation(type.path, type.name)}
                      className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                        isActive
                          ? "bg-gradient-to-r from-teal-700 to-emerald-700 text-white shadow-lg"
                          : "bg-gradient-to-r from-teal-600 to-teal-500 text-white/90 hover:text-white"
                      }`}
                    >
                      {type.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-none mx-auto px-6 py-8 lg:py-12">
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
                      {activeHouseType}
                    </span>
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
                    <Home className="w-12 h-12 text-white group-hover:rotate-12 transition-transform duration-700 relative z-10" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4 group-hover:text-teal-950 transition-colors duration-300">
                    {activeHouseType === "All" ? "Premium Properties" : `${activeHouseType} Properties`}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 animate-gradient-text-slow"> Coming Soon</span>
                  </h2>
                  
                  <p className="text-teal-800 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed group-hover:text-teal-900 transition-colors duration-300 backdrop-blur-sm bg-teal-100/30 rounded-2xl p-6 border border-teal-200/20">
                    {activeHouseType === "All" 
                      ? "We're currently adding exclusive individual properties to our database."
                      : `We're currently adding exclusive ${activeHouseType.toLowerCase()} properties to our database.`}
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
                    <Home className="w-10 h-10 text-teal-600 animate-bounce-slow relative z-10" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-teal-900 mb-4">
                    No {activeHouseType !== "All" ? `${activeHouseType} ` : ""}Properties Found
                  </h3>
                  
                  <p className="text-teal-800 mb-6 backdrop-blur-sm bg-teal-100/30 rounded-xl p-4 border border-teal-200/20">
                    {activeHouseType !== "All"
                      ? `We don't have any ${activeHouseType.toLowerCase()} properties available at the moment.`
                      : "Use the filters on the right to find properties that match your criteria."}
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
                      {activeHouseType !== "All" 
                        ? `Check back later for ${activeHouseType.toLowerCase()} listings` 
                        : "Adjust your filters to see matching properties"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 lg:relative">
              <div className="lg:sticky lg:top-[120px] lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto lg:scrollbar-hide animate-slide-in-right">
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
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-1/2 px-4 py-3 rounded-xl border-2 border-teal-200/50 bg-teal-50/80 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 shadow-lg text-teal-900 placeholder-teal-400 transition-all duration-300 hover:shadow-xl"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-1/2 px-4 py-3 rounded-xl border-2 border-teal-200/50 bg-teal-50/80 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 shadow-lg text-teal-900 placeholder-teal-400 transition-all duration-300 hover:shadow-xl"
                      />
                    </div>
                    <div className="mt-3 h-2 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-progress"></div>
                    </div>
                  </div>

                  <div className="mb-6 animate-fade-in-up delay-200">
                    <label className="text-sm font-semibold text-teal-800 mb-3 block flex items-center gap-2">
                      <span className="text-xl animate-bounce-slow">🏠</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                        BHK Type
                      </span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((bhk, index) => (
                        <label 
                          key={bhk} 
                          onMouseEnter={() => setHoveredFilter(`bhk-${index}`)}
                          onMouseLeave={() => setHoveredFilter(null)}
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 border-teal-200/50 hover:border-teal-300 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r from-teal-50/50 to-emerald-50/50 group animate-fade-in-up ${
                            hoveredFilter === `bhk-${index}` ? 'scale-[1.02]' : ''
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-teal-300 text-teal-600 focus:ring-teal-500/30 transition-all duration-300" 
                          />
                          <span className="text-sm text-teal-800 group-hover:text-teal-900 group-hover:font-medium transition-all duration-300">
                            {bhk}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-teal-200/30 animate-fade-in-up delay-500">
                    <button
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-teal-200/50 text-sm font-medium text-teal-700 hover:bg-gradient-to-r from-teal-50 to-emerald-50 hover:border-teal-300 transition-all duration-500 transform hover:scale-[1.02] relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative z-10">Clear All</span>
                    </button>
                    <button
                      className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-white shadow-xl hover:shadow-[0_0_25px_rgba(0,105,92,0.4)] transition-all duration-500 transform hover:scale-[1.02] group relative overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, #00695C, #26A69A)",
                        backgroundSize: "200% 200%"
                      }}
                    >
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
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-flow {
          background-size: 200% 200%;
          animation: gradient-flow 20s ease infinite;
        }
        .animate-gradient-slow {
          background-size: 300% 300%;
          animation: gradient-flow 15s ease infinite;
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-flow 2s linear infinite;
        }
        .animate-gradient-shift-slow {
          background-size: 200% 200%;
          animation: gradient-flow 4s linear infinite;
        }
        .animate-gradient-text {
          background-size: 300% 300%;
          animation: gradient-flow 3s ease infinite;
        }
        .animate-gradient-text-slow {
          background-size: 300% 300%;
          animation: gradient-flow 5s ease infinite;
        }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-40px) translateX(20px) rotate(180deg); opacity: 0.8; }
        }
        .animate-particle-float {
          animation: particle-float 12s ease-in-out infinite;
        }
        @keyframes geometric-float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-30px) rotate(180deg) scale(1.1); }
        }
        .animate-geometric-float {
          animation: geometric-float 20s ease-in-out infinite;
        }
        @keyframes bubble-float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-25px) scale(1.2); opacity: 0.8; }
        }
        .animate-bubble-float {
          animation: bubble-float 6s ease-in-out infinite;
        }
        @keyframes float-glow {
          0%, 100% { transform: translateY(0px); box-shadow: 0 0 30px rgba(0,105,92,0.3); }
          50% { transform: translateY(-5px); box-shadow: 0 0 40px rgba(0,105,92,0.5); }
        }
        .animate-float-glow {
          animation: float-glow 3s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
        @keyframes slide-down {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.4s ease-out forwards;
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-rotate-slow {
          animation: spin-slow 10s linear infinite;
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
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .lg\:custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .lg\:custom-scrollbar::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, transparent, rgba(0, 105, 92, 0.1), transparent);
          border-radius: 10px;
        }
        .lg\:custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00695C, #26A69A);
          border-radius: 10px;
        }
        .lg\:custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #004D40, #00796B);
          box-shadow: 0 0 10px rgba(0, 105, 92, 0.5);
        }
      `}</style>
    </div>
  );
};

export default IndividualPage;