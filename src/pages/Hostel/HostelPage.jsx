// src/pages/hostel/HostelPage.jsx
import React, { useState, useEffect } from "react";
import { ChevronDown, Search, Home, MapPin, Star, Filter, X, Building, Landmark, Warehouse, Building2, ChevronRight, Globe, Users, ArrowRight, BedDouble, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Import images for the banner
import mainPropertyImage from "../../assets/indmainbanner.jpg";
import individualImg from "../../assets/banner1.jpg";
import apartmentImg from "../../assets/banner1.jpg";
import commercialImg from "../../assets/banner1.jpg";
import landImg from "../../assets/banner1.jpg";

// Import category images
import girlsHostelImg from "../../assets/banner1.jpg";
import boysHostelImg from "../../assets/banner1.jpg";
import coLivingImg from "../../assets/banner1.jpg";
import workingProfessionalImg from "../../assets/banner1.jpg";

const HostelPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("Rent");
  const [activeHouseType, setActiveHouseType] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [hoveredFilter, setHoveredFilter] = useState(null);

  const propertyCategories = [
    { name: "Individual", path: "/individual", icon: <Home className="w-4 h-4" /> },
    { name: "Apartment", path: "/apartment", icon: <Building className="w-4 h-4" /> },
    { name: "Commercial", path: "/commercial", icon: <Landmark className="w-4 h-4" /> },
    { name: "Land & Plots", path: "/land-plots", icon: <Warehouse className="w-4 h-4" /> }
  ];

  const propertyTypeCategories = [
    { name: "All", path: "/hostel", image: null, icon: <Home className="w-7 h-7" />, isAll: true },
    { name: "Girls Hostel", path: "/hostel/girls-hostel", image: girlsHostelImg, icon: <Users className="w-6 h-6" /> },
    { name: "Boys Hostel", path: "/hostel/boys-hostel", image: boysHostelImg, icon: <Users className="w-6 h-6" /> },
    { name: "Co Living Space", path: "/hostel/co-living-space", image: coLivingImg, icon: <Building2 className="w-6 h-6" /> },
    { name: "Working Professional Hostel", path: "/hostel/working-professional-hostel", image: workingProfessionalImg, icon: <Building className="w-6 h-6" /> }
  ];

  const houseTypes = [
    { name: "All", path: "/hostel", component: "HostelPage" },
    { name: "Girls Hostel", path: "/hostel/girls-hostel", component: "GirlsHostelPage" },
    { name: "Boys Hostel", path: "/hostel/boys-hostel", component: "BoysHostelPage" },
    { name: "Co Living Space", path: "/hostel/co-living-space", component: "CoLivingSpacePage" },
    { name: "Working Professional Hostel", path: "/hostel/working-professional-hostel", component: "WorkingProfessionalHostelPage" }
  ];

  const bannerDiamonds = [
    { image: individualImg, label: "Individual", icon: <Home className="w-4 h-4" style={{ color: "#00695C" }} />, path: "/individual" },
    { image: apartmentImg, label: "Apartment", icon: <Building className="w-4 h-4" style={{ color: "#00695C" }} />, path: "/apartment" },
    { image: commercialImg, label: "Commercial", icon: <Landmark className="w-4 h-4" style={{ color: "#00695C" }} />, path: "/commercial" },
    { image: landImg, label: "Land & Plots", icon: <Warehouse className="w-4 h-4" style={{ color: "#00695C" }} />, path: "/land-plots" }
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeType = houseTypes.find(type => type.path === currentPath);
    if (activeType) {
      setActiveHouseType(activeType.name);
    } else if (currentPath === "/hostel" || currentPath === "/hostel/") {
      setActiveHouseType("All");
    }
  }, [location.pathname]);

  const handleNavigation = (path, typeName = null) => {
    if (typeName) setActiveHouseType(typeName);
    navigate(path);
  };

  const handlePropertyCategoryNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full min-h-screen relative">
      <div className="relative z-10">
        {/* ====== BROCHURE-STYLE BANNER (teal green + pastel green theme) ====== */}
        <section className="w-full min-h-[560px] md:min-h-[520px] lg:h-[560px] bg-gradient-to-br from-[#F0F7F4] via-[#E8F2EC] to-[#DFEEE7] overflow-hidden relative">

          {/* ✨ Floating particles */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-[5]">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-float-particle"
                style={{
                  left: `${10 + (i * 7)}%`,
                  top: `${15 + ((i % 4) * 20)}%`,
                  width: `${3 + (i % 3)}px`,
                  height: `${3 + (i % 3)}px`,
                  background: i % 2 === 0 ? "rgba(0,105,92,0.35)" : "rgba(38,166,154,0.45)",
                  animationDelay: `${i * 0.6}s`,
                  animationDuration: `${8 + (i % 4) * 2}s`
                }}
              />
            ))}
          </div>

          {/* ====== RIGHT: TEAL GREEN chevron panel ====== */}
          <div
            className="hidden md:block absolute top-0 right-0 h-full w-[58%] z-0"
            style={{
              background: "linear-gradient(135deg, #00695C 0%, #00897B 50%, #004D40 100%)",
              clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 22% 100%, 0% 50%)"
            }}
          >
            {/* Animated shimmer */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer-slow" />
            </div>

            {/* Subtle inner border accent along the diagonal */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, transparent 0%, transparent 21%, rgba(178,223,219,0.4) 21.3%, rgba(178,223,219,0.4) 21.6%, transparent 21.9%)"
              }}
            />

            {/* ✅ PENTAGON PHOTO with DETAILINGS */}
            <div
              className="absolute animate-scale-in"
              style={{
                top: "8%",
                left: "-4%",
                width: "90%",
                height: "84%",
                clipPath: "polygon(16% 0%, 84% 0%, 100% 50%, 84% 100%, 16% 100%, 0% 50%)",
                background: "linear-gradient(135deg, #B2DFDB, #80CBC4, #4DB6AC)",
                padding: "12px",
                animationDelay: "0.3s",
                filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.25))"
              }}
            >
              {/* Inner white frame */}
              <div
                className="w-full h-full bg-white p-1.5 relative"
                style={{
                  clipPath: "polygon(16% 0%, 84% 0%, 100% 50%, 84% 100%, 16% 100%, 0% 50%)"
                }}
              >
                {/* Photo */}
                <img
                  src={mainPropertyImage}
                  alt="Hostel & PG accommodation"
                  className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-105"
                  style={{
                    clipPath: "polygon(16% 0%, 84% 0%, 100% 50%, 84% 100%, 16% 100%, 0% 50%)"
                  }}
                />

                {/* Inner shine sweep (subtle) */}
                <div
                  className="absolute inset-0 pointer-events-none animate-shine-sweep"
                  style={{
                    clipPath: "polygon(16% 0%, 84% 0%, 100% 50%, 84% 100%, 16% 100%, 0% 50%)",
                    background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                    backgroundSize: "250% 100%"
                  }}
                />
              </div>

              {/* Floating corner accent dots on the pentagon */}
              <div className="absolute -top-1 left-[28%] w-2 h-2 rounded-full bg-[#4DB6AC] shadow-[0_0_12px_rgba(77,182,172,0.9)] animate-ping-slow" />
              <div className="absolute -bottom-1 left-[28%] w-2 h-2 rounded-full bg-[#4DB6AC] shadow-[0_0_12px_rgba(77,182,172,0.9)] animate-ping-slow" style={{ animationDelay: "1s" }} />
              <div className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-[#80CBC4] shadow-[0_0_12px_rgba(128,203,196,0.9)] animate-ping-slow" style={{ animationDelay: "2s" }} />
            </div>

            {/* Diagonal stripes — animated */}
            <div className="absolute top-14 left-[4%] flex flex-col gap-2.5 opacity-40 z-10">
              <div className="w-20 h-2.5 bg-white rotate-[50deg] rounded-sm animate-stripe-slide" style={{ animationDelay: "0s" }} />
              <div className="w-20 h-2.5 bg-white rotate-[50deg] rounded-sm animate-stripe-slide" style={{ animationDelay: "0.3s" }} />
              <div className="w-20 h-2.5 bg-white rotate-[50deg] rounded-sm animate-stripe-slide" style={{ animationDelay: "0.6s" }} />
            </div>

            {/* Dotted grid (top-right) */}
            <div
              className="absolute top-10 right-10 w-24 h-24 opacity-50 z-10 animate-dots-pulse"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(178,223,219,0.9) 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px"
              }}
            />

            {/* Diagonal stripes (bottom) */}
            <div className="absolute bottom-14 left-[4%] flex flex-col gap-2.5 opacity-40 z-10">
              <div className="w-20 h-2.5 bg-white rotate-[50deg] rounded-sm animate-stripe-slide" style={{ animationDelay: "0.15s" }} />
              <div className="w-20 h-2.5 bg-white rotate-[50deg] rounded-sm animate-stripe-slide" style={{ animationDelay: "0.45s" }} />
              <div className="w-20 h-2.5 bg-white rotate-[50deg] rounded-sm animate-stripe-slide" style={{ animationDelay: "0.75s" }} />
            </div>

            {/* Dotted grid (bottom-right) */}
            <div
              className="absolute bottom-10 right-10 w-24 h-24 opacity-50 z-10 animate-dots-pulse"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(178,223,219,0.9) 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
                animationDelay: "1s"
              }}
            />
          </div>

          {/* ====== LEFT: Content panel ====== */}
          <div className="relative z-30 flex flex-col justify-center h-full w-full md:w-[44%] lg:w-[42%] px-6 md:px-10 lg:px-14 py-8 md:py-10">

            <h1 className="leading-[0.9] mb-3 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
              <span className="block text-2xl md:text-3xl font-light tracking-[0.1em] text-[#00897B]">
                Luxury
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#004D40]">
                Furniture
              </span>
            </h1>

            <p
              className="text-[#4B5C58] max-w-md text-sm md:text-[15px] leading-relaxed mb-10 animate-slide-in-left"
              style={{ animationDelay: "0.25s" }}
            >
              Discover the perfect place to live, work, and grow your future.
            </p>

            {/* Diamonds — teal themed */}
            <div className="flex items-start gap-6 md:gap-8 lg:gap-10">
              {bannerDiamonds.map((diamond, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer group animate-diamond-in"
                  style={{ animationDelay: `${0.4 + index * 0.12}s` }}
                  onClick={() => handlePropertyCategoryNavigation(diamond.path)}
                >
                  <div className="relative">
                    {/* Pulsing ring behind diamond */}
                    <div
                      className="absolute inset-0 rounded-[12px] rotate-45 border-2 border-[#00695C]/0 group-hover:border-[#00695C]/40 group-hover:scale-125 transition-all duration-500 pointer-events-none"
                      style={{ margin: "-6px" }}
                    />

                    <div className="w-[76px] h-[76px] md:w-[86px] md:h-[86px] rotate-45 rounded-[12px] overflow-hidden border-[3px] border-[#00695C] shadow-[0_8px_22px_rgba(0,105,92,0.25)] group-hover:scale-110 group-hover:shadow-[0_12px_30px_rgba(0,105,92,0.5)] group-hover:border-[#00897B] transition-all duration-300 bg-white relative">
                      <img
                        src={diamond.image}
                        alt={diamond.label}
                        className="w-full h-full object-cover -rotate-45 scale-[1.55] group-hover:scale-[1.65] transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                    </div>

                    <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-[0_4px_12px_rgba(0,105,92,0.25)] border-2 border-[#00695C]/40 flex items-center justify-center z-10 group-hover:scale-110 group-hover:border-[#00695C] group-hover:rotate-[360deg] transition-all duration-700">
                      {diamond.icon}
                    </div>
                  </div>

                  <span className="mt-6 text-[10px] md:text-[11px] font-bold tracking-[0.12em] text-[#004D40] text-center whitespace-nowrap group-hover:text-[#00695C] group-hover:tracking-[0.15em] transition-all duration-300">
                    {diamond.label.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ====== MOBILE fallback ====== */}
          <div className="md:hidden relative z-30 flex flex-col px-5 py-6">
            <h1 className="leading-[0.9] mb-2.5 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
              <span className="block text-xl font-light tracking-[0.1em] text-[#00897B]">Luxury</span>
              <span className="block text-4xl font-black tracking-tight text-[#004D40]">Furniture</span>
            </h1>

            <p className="text-[#4B5C58] text-[13px] mb-5 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
              Discover the perfect place to live, work, and grow your future.
            </p>

            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-7 animate-scale-in ring-4 ring-[#B2DFDB]" style={{ animationDelay: "0.3s" }}>
              <img src={mainPropertyImage} alt="Hostel & PG accommodation" className="w-full h-40 object-cover" />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {bannerDiamonds.map((diamond, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer group animate-diamond-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  onClick={() => handlePropertyCategoryNavigation(diamond.path)}
                >
                  <div className="relative">
                    <div className="w-[56px] h-[56px] rotate-45 rounded-[9px] overflow-hidden border-[3px] border-[#00695C] shadow-[0_6px_16px_rgba(0,105,92,0.25)] bg-white transition-transform duration-300 group-active:scale-110">
                      <img
                        src={diamond.image}
                        alt={diamond.label}
                        className="w-full h-full object-cover -rotate-45 scale-[1.55]"
                      />
                    </div>
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white shadow-[0_3px_10px_rgba(0,105,92,0.25)] border-2 border-[#00695C]/40 flex items-center justify-center z-10">
                      {diamond.icon}
                    </div>
                  </div>
                  <span className="mt-4 text-[8px] font-bold tracking-[0.1em] text-[#004D40] text-center whitespace-nowrap">
                    {diamond.label.toUpperCase()}
                  </span>
                </div>
              ))}
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
                    style={{ background: "linear-gradient(135deg, #00695C, #26A69A)", backgroundSize: "200% 200%" }}
                  >
                    <div className="absolute inset-0 animate-gradient-shift-slow"></div>
                    <Home className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                    <span className="relative z-10">{activeButton}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "toggle" ? 'rotate-180' : ''} relative z-10`} />
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                  </button>

                  {openDropdown === "toggle" && (
                    <div className="absolute top-full left-0 mt-2 bg-teal-50/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden z-50 min-w-[180px] border border-teal-200/30 animate-slide-down-fast">
                      {["Buy", "Rent", "Lease", "Sell"].map((option) => (
                        <React.Fragment key={option}>
                          <button
                            onClick={() => {
                              handleNavigation(`/${option.toLowerCase()}`);
                              setActiveButton(option);
                              setOpenDropdown(null);
                            }}
                            className={`w-full px-5 py-3.5 text-left text-base transition-all duration-300 group ${
                              activeButton === option ? "font-semibold" : "hover:bg-teal-100/50 text-teal-900 font-medium"
                            }`}
                            style={activeButton === option ? { color: "#00695C", backgroundColor: "#e0f2f1" } : {}}
                          >
                            <div className="flex items-center gap-3 group-hover:gap-4 transition-all">
                              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                              {option}
                            </div>
                          </button>
                          <div className="h-px bg-gradient-to-r from-transparent via-teal-200/50 to-transparent"></div>
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative flex-1 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400 group-hover:text-teal-600 group-hover:scale-110 transition-all duration-300 z-10" />
                  <input
                    type="text"
                    placeholder="Search by city, locality, or landmark"
                    className="w-full pl-10 pr-5 py-2 rounded-xl border-2 border-teal-200/50 bg-teal-50/90 text-base focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 shadow-xl text-teal-900 placeholder-teal-400 transition-all duration-500 relative z-10 hover:shadow-2xl"
                  />
                  <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-300 group-hover:text-emerald-500 group-hover:rotate-12 transition-all duration-300 z-10" />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8 pt-2">
                {propertyTypeCategories.map((category) => {
                  const isActive = activeHouseType === category.name || (category.name === "All" && activeHouseType === "All");
                  return (
                    <div
                      key={category.name}
                      className="group cursor-pointer flex flex-col items-center transition-all duration-300 hover:scale-105"
                      onClick={() => handleNavigation(category.path, category.name)}
                    >
                      <div className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 transition-all duration-300 shadow-md hover:shadow-lg ${isActive ? 'border-[#00695C] shadow-[0_0_25px_rgba(0,105,92,0.35)]' : 'border-gray-300 hover:border-[#00695C]'}`}>
                        {category.isAll ? (
                          <div className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-[#00695C]' : 'bg-gray-100 group-hover:bg-[#D1E2DB]'}`}>
                            <Home className={`w-7 h-7 md:w-9 md:h-9 transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#00695C]'}`} />
                          </div>
                        ) : (
                          <>
                            <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                          </>
                        )}
                      </div>
                      <span className={`mt-1.5 text-[10px] sm:text-xs md:text-sm font-semibold text-center transition-colors duration-300 ${isActive ? 'text-[#00695C]' : 'text-[#143B35] group-hover:text-[#00695C]'}`}>
                        {category.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="md:hidden space-y-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {houseTypes.map((type) => {
                  const isActive = activeHouseType === type.name;
                  return (
                    <button
                      key={type.name}
                      onClick={() => handleNavigation(type.path, type.name)}
                      className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${isActive ? "bg-gradient-to-r from-teal-700 to-emerald-700 text-white shadow-lg" : "bg-gradient-to-r from-teal-600 to-teal-500 text-white/90 hover:text-white"}`}
                    >
                      {type.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ====== MAIN CONTENT ====== */}
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
                    style={{ background: "linear-gradient(135deg, #00695C, #26A69A, #4DB6AC)", backgroundSize: "200% 200%" }}
                  >
                    <div className="absolute inset-0 animate-gradient-shift-slow rounded-3xl"></div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
                    <Users className="w-12 h-12 text-white group-hover:rotate-12 transition-transform duration-700 relative z-10" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4 group-hover:text-teal-950 transition-colors duration-300">
                    {activeHouseType === "All" ? "Premium Hostels & PGs" : `${activeHouseType} Listings`}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 animate-gradient-text-slow"> Coming Soon</span>
                  </h2>

                  <p className="text-teal-800 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed group-hover:text-teal-900 transition-colors duration-300 backdrop-blur-sm bg-teal-100/30 rounded-2xl p-6 border border-teal-200/20">
                    {activeHouseType === "All"
                      ? "We're currently adding exclusive hostel and PG listings to our database."
                      : `We're currently adding exclusive ${activeHouseType.toLowerCase()} listings to our database.`}
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
                      style={{ background: "linear-gradient(135deg, #00695C, #26A69A)", backgroundSize: "200% 200%" }}
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
                    <Users className="w-10 h-10 text-teal-600 animate-bounce-slow relative z-10" />
                  </div>

                  <h3 className="text-2xl font-bold text-teal-900 mb-4">
                    No {activeHouseType !== "All" ? `${activeHouseType} ` : ""}Listings Found
                  </h3>

                  <p className="text-teal-800 mb-6 backdrop-blur-sm bg-teal-100/30 rounded-xl p-4 border border-teal-200/20">
                    {activeHouseType !== "All"
                      ? `We don't have any ${activeHouseType.toLowerCase()} listings available at the moment.`
                      : "Use the filters on the right to find a hostel or PG that matches your criteria."}
                  </p>

                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100">
                    {[0, 150, 300].map((delay) => (
                      <div key={delay} className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 animate-pulse" style={{ animationDelay: `${delay}ms` }}></div>
                    ))}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 font-medium">
                      {activeHouseType !== "All"
                        ? `Check back later for ${activeHouseType.toLowerCase()} listings`
                        : "Adjust your filters to see matching listings"}
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
                        Monthly Rent
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
                      <span className="text-xl animate-bounce-slow">🛏️</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                        Sharing Type
                      </span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Single", "Double", "Triple", "4-Sharing", "Dormitory"].map((sharing, index) => (
                        <label
                          key={sharing}
                          onMouseEnter={() => setHoveredFilter(`sharing-${index}`)}
                          onMouseLeave={() => setHoveredFilter(null)}
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 border-teal-200/50 hover:border-teal-300 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r from-teal-50/50 to-emerald-50/50 group animate-fade-in-up ${hoveredFilter === `sharing-${index}` ? 'scale-[1.02]' : ''}`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <input type="checkbox" className="w-4 h-4 rounded border-teal-300 text-teal-600 focus:ring-teal-500/30 transition-all duration-300" />
                          <span className="text-sm text-teal-800 group-hover:text-teal-900 group-hover:font-medium transition-all duration-300">{sharing}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 animate-fade-in-up delay-200">
                    <label className="text-sm font-semibold text-teal-800 mb-3 block flex items-center gap-2">
                      <span className="text-xl animate-bounce-slow">🍽️</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                        Amenities
                      </span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Food Included", "WiFi", "Laundry", "AC Rooms", "Power Backup"].map((amenity, index) => (
                        <label
                          key={amenity}
                          className="flex items-center gap-3 p-3 rounded-xl border-2 border-teal-200/50 hover:border-teal-300 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r from-teal-50/50 to-emerald-50/50 group animate-fade-in-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <input type="checkbox" className="w-4 h-4 rounded border-teal-300 text-teal-600 focus:ring-teal-500/30 transition-all duration-300" />
                          <span className="text-sm text-teal-800 group-hover:text-teal-900 group-hover:font-medium transition-all duration-300">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-teal-200/30 animate-fade-in-up delay-500">
                    <button className="flex-1 px-4 py-3 rounded-xl border-2 border-teal-200/50 text-sm font-medium text-teal-700 hover:bg-gradient-to-r from-teal-50 to-emerald-50 hover:border-teal-300 transition-all duration-500 transform hover:scale-[1.02] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative z-10">Clear All</span>
                    </button>
                    <button
                      className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-white shadow-xl hover:shadow-[0_0_25px_rgba(0,105,92,0.4)] transition-all duration-500 transform hover:scale-[1.02] group relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg, #00695C, #26A69A)", backgroundSize: "200% 200%" }}
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
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-flow 2s linear infinite;
        }
        .animate-gradient-shift-slow {
          background-size: 200% 200%;
          animation: gradient-flow 4s linear infinite;
        }
        .animate-gradient-text-slow {
          background-size: 300% 300%;
          animation: gradient-flow 5s ease infinite;
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

        /* ── Banner enhancement animations ── */
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-18px) translateX(8px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.4; }
          75% { transform: translateY(12px) translateX(6px); opacity: 0.5; }
        }
        .animate-float-particle {
          animation: float-particle 10s ease-in-out infinite;
        }

        @keyframes shimmer-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer-slow {
          animation: shimmer-slow 6s linear infinite;
        }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.9s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
          opacity: 0;
        }

        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }

        @keyframes diamond-in {
          0% { opacity: 0; transform: scale(0.4) rotate(-90deg); }
          60% { opacity: 1; transform: scale(1.08) rotate(6deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .animate-diamond-in {
          animation: diamond-in 0.8s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
          opacity: 0;
        }

        @keyframes stripe-slide {
          0%, 100% { transform: rotate(50deg) translateX(0); opacity: 0.3; }
          50% { transform: rotate(50deg) translateX(8px); opacity: 0.55; }
        }
        .animate-stripe-slide {
          animation: stripe-slide 4s ease-in-out infinite;
        }

        @keyframes dots-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.03); }
        }
        .animate-dots-pulse {
          animation: dots-pulse 4s ease-in-out infinite;
        }

        /* Pentagon detail animations */
        @keyframes shine-sweep {
          0%, 100% { background-position: 150% 0; }
          50% { background-position: -50% 0; }
        }
        .animate-shine-sweep {
          animation: shine-sweep 6s ease-in-out infinite;
          mix-blend-mode: overlay;
        }

        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.4); opacity: 0.4; }
        }
        .animate-ping-slow {
          animation: ping-slow 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HostelPage;