// GirlsHostelPage.jsx
import React, { useState, useEffect } from "react";
import { ChevronDown, Search, Home, MapPin, Star, Filter, X, Building, Landmark, Warehouse, Building2, Users, BedDouble, Hotel, LayoutGrid, Grid3X3, Crown, Castle, Building as BuildingIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Import banner images
import bannerImg from "../../assets/hostelban2.png";
import individualImg from "../../assets/individualcat.jpg";
import commercialImg from "../../assets/commercialcat.jpg";
import landPlotsImg from "../../assets/landcat.jpg";
import apartmentImg from "../../assets/Apartmentban.jpg";

// Import category images
import girlsHostelImg from "../../assets/banner1.jpg";
import boysHostelImg from "../../assets/banner1.jpg";
import coLivingImg from "../../assets/banner1.jpg";
import workingProfessionalImg from "../../assets/banner1.jpg";

import GirlsHostelFilter from "../../components/filters/Hostel/GirlsHostelFilter";
import GirlsHostel from "../../components/propertycard/Hostel/GirlsHostel";

const GirlsHostelPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("Rent");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [activeHostelType, setActiveHostelType] = useState("Girls Hostel");

  // Sibling property categories
  const propertyCategories = [
    { name: "Individual", path: "/individual", icon: <Building className="w-4 h-4" /> },
    { name: "Apartment", path: "/apartment", icon: <Landmark className="w-4 h-4" /> },
    { name: "Commercial", path: "/commercial", icon: <Warehouse className="w-4 h-4" /> },
    { name: "Land & Plots", path: "/land-plots", icon: <Building2 className="w-4 h-4" /> }
  ];

  // Property type categories with images for round display - same as ApartmentPage
  const propertyTypeCategories = [
    { 
      name: "All", 
      path: "/hostel", 
      image: null,
      icon: <Home className="w-6 h-6" />,
      isAll: true,
      displayName: "All",
      subText: ""
    },
    { 
      name: "Girls Hostel", 
      path: "/hostel/girls-hostel", 
      image: girlsHostelImg,
      icon: <Users className="w-5 h-5" />,
      displayName: "Girls",
      subText: "Hostel"
    },
    { 
      name: "Boys Hostel", 
      path: "/hostel/boys-hostel", 
      image: boysHostelImg,
      icon: <Users className="w-5 h-5" />,
      displayName: "Boys",
      subText: "Hostel"
    },
    { 
      name: "Co Living Space", 
      path: "/hostel/co-living-space", 
      image: coLivingImg,
      icon: <Building2 className="w-5 h-5" />,
      displayName: "Co Living",
      subText: "Space"
    },
    { 
      name: "Working Professional Hostel", 
      path: "/hostel/working-professional-hostel", 
      image: workingProfessionalImg,
      icon: <Building className="w-5 h-5" />,
      displayName: "Working",
      subText: "Professional"
    }
  ];

  // Sibling hostel types
  const hostelCategories = [
    { name: "All Hostels", path: "/hostel", icon: <Home className="w-3.5 h-3.5" />, isAllButton: true },
    { name: "Girls Hostel", path: "/hostel/girls-hostel", icon: <Users className="w-3.5 h-3.5" /> },
    { name: "Boys Hostel", path: "/hostel/boys-hostel", icon: <Users className="w-3.5 h-3.5" /> },
    { name: "Co Living Space", path: "/hostel/co-living-space", icon: <Building2 className="w-3.5 h-3.5" /> },
    { name: "Working Professional Hostel", path: "/hostel/working-professional-hostel", icon: <Building className="w-3.5 h-3.5" /> }
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
      label: "Land & Plots",
      path: "/land-plots",
      image: landPlotsImg,
      position: "bottom"
    }
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/hostel/girls-hostel") {
      setActiveHostelType("Girls Hostel");
    }
  }, [location.pathname]);

  const handleNavigation = (path) => navigate(path);
  const handlePropertyCategoryNavigation = (path) => navigate(path);

  const handleFilterChange = (filters) => {
    setAppliedFilters(filters);
    console.log("Girls Hostel filters applied:", filters);
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
          {["Rent", "Lease"].map((item, idx, arr) => (
            <React.Fragment key={item}>
              <button
                onClick={() => { setActiveButton(item); setOpenDropdown(null); }}
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
        placeholder="Search girls hostels by city, locality, or landmark"
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
        {/* ===================== BANNER - SAME AS APARTMENT PAGE ===================== */}
        <section className="relative overflow-hidden bg-[#E7EFEA]">
          {/* Decorative top shape */}
          <div className="absolute top-0 left-0 w-[130px] h-[45px] rounded-br-[35px] sm:w-[170px] sm:h-[58px] sm:rounded-br-[50px] md:w-[210px] md:h-[72px] md:rounded-br-[60px] lg:w-[250px] lg:h-[85px] lg:rounded-br-[70px] bg-[#D6E4DE]" />

          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-row min-h-[170px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[330px]">

              {/* LEFT CONTENT */}
              <div className="flex flex-col justify-center w-[38%] sm:w-[37%] md:w-[36%] lg:w-[35%] shrink-0 px-2.5 sm:px-5 md:px-6 lg:px-10 py-2.5 sm:py-4 md:py-6 lg:py-7 z-20">

                <h1 className="leading-none">
                  <span className="block text-[11px] sm:text-[15px] md:text-[20px] lg:text-[28px] font-light text-[#042F2A]">
                    SAFE &amp; VERIFIED
                  </span>

                  <span className="block text-[16px] sm:text-[24px] md:text-[36px] lg:text-[50px] font-black text-[#012D29] leading-tight">
                    GIRLS HOSTELS
                  </span>

                  <span className="block text-[12px] sm:text-[17px] md:text-[23px] lg:text-[30px] font-bold text-[#012D29] leading-tight">
                    FOR RENT
                  </span>
                </h1>

                <p className="mt-1 sm:mt-2 md:mt-2.5 lg:mt-3 max-w-[120px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[340px] text-[#31544E] text-[8px] sm:text-[10px] md:text-xs lg:text-sm leading-snug lg:leading-relaxed">
                  Discover safe, verified girls hostels with
                  warden supervision near your college or
                  workplace.
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
                  src={bannerImg}
                  alt="Girls Hostel accommodation"
                  className="absolute inset-0 w-full h-full object-cover object-top contrast-105 saturate-110"
                />

                {/* Soft overlay - reduced opacity so the image stays vivid */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#E7EFEA]/60 via-transparent to-transparent" />

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
                      onClick={() => handlePropertyCategoryNavigation(bannerDiamonds[0].path)}
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
                      onClick={() => handlePropertyCategoryNavigation(bannerDiamonds[1].path)}
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
                      onClick={() => handlePropertyCategoryNavigation(bannerDiamonds[2].path)}
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

                    {/* BOTTOM DIAMOND - Land & Plots */}
                    <div
                      className="absolute cursor-pointer transition-all duration-500 hover:scale-110 hover:z-30 animate-diamond-float"
                      style={{
                        width: "100px",
                        height: "100px",
                        top: "160px",
                        left: "80px",
                        animationDelay: "1.5s",
                      }}
                      onClick={() => handlePropertyCategoryNavigation(bannerDiamonds[3].path)}
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
                          alt="Land & Plots"
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
                          Land & Plots
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

        {/* ══════════════════════════════════════════════
            STICKY NAVBAR (DESKTOP) - SAME AS APARTMENT PAGE
        ══════════════════════════════════════════════ */}
        <div className="hidden md:block bg-gradient-to-r from-teal-50/95 via-emerald-50/95 to-teal-50/95 backdrop-blur-xl shadow-2xl sticky top-0 z-40 border-b border-teal-200/30 transition-all duration-500">
          <div className="max-w-none mx-auto px-6 py-3.5">
            <div className="space-y-3.5">
              {/* Row 1: Dropdown + Search + Filter */}
              <div className="flex gap-3.5 items-center">
                <RentBuyDropdown />
                <SearchBar />
                <AdvancedFilterBtn />
              </div>

              {/* ====== PROPERTY TYPE CATEGORIES - ROUND LIKE APARTMENT PAGE ====== */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 md:gap-5 pt-1.5">
                {propertyTypeCategories.map((category) => {
                  const isActive = activeHostelType === category.name ||
                    (category.name === "All" && activeHostelType === "All");

                  return (
                    <div
                      key={category.name}
                      className="group cursor-pointer flex flex-col items-center transition-all duration-300 hover:scale-105"
                      onClick={() => handleNavigation(category.path)}
                    >
                      {/* Round Image - Same as ApartmentPage */}
                      <div 
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-17 md:h-17 rounded-full overflow-hidden border-[3px] transition-all duration-300 shadow-md hover:shadow-lg ${
                          isActive 
                            ? 'border-[#00695C] shadow-[0_0_18px_rgba(0,105,92,0.3)]' 
                            : 'border-gray-300 hover:border-[#00695C]'
                        }`}
                      >
                        {category.isAll ? (
                          <div className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${
                            isActive ? 'bg-[#00695C]' : 'bg-gray-100 group-hover:bg-[#D1E2DB]'
                          }`}>
                            <Home className={`w-5 h-5 md:w-5.5 md:h-5.5 transition-colors duration-300 ${
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
                      
                      {/* Label - Two lines */}
                      <div className="flex flex-col items-center mt-0.5">
                        <span className={`text-[8px] sm:text-[9px] md:text-[11px] font-semibold text-center leading-tight transition-colors duration-300 ${
                          isActive ? 'text-[#00695C]' : 'text-[#143B35] group-hover:text-[#00695C]'
                        }`}>
                          {category.displayName || category.name}
                        </span>
                        {category.subText && (
                          <span className={`text-[8px] sm:text-[9px] md:text-[11px] font-semibold text-center leading-tight transition-colors duration-300 ${
                            isActive ? 'text-[#00695C]' : 'text-[#143B35] group-hover:text-[#00695C]'
                          }`}>
                            {category.subText}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            MOBILE VIEW - SAME AS APARTMENT PAGE
        ══════════════════════════════════════════════ */}
        <div className="md:hidden bg-gradient-to-r from-teal-50/95 via-emerald-50/95 to-teal-50/95 backdrop-blur-xl shadow-2xl sticky top-0 z-40 border-b border-teal-200/30 transition-all duration-500">
          <div className="px-6 py-3.5 space-y-3">

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

            {/* ====== PROPERTY TYPE CATEGORIES - ROUND LIKE APARTMENT PAGE ====== */}
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
              {propertyTypeCategories.map((category) => {
                const isActive = activeHostelType === category.name ||
                  (category.name === "All" && activeHostelType === "All");

                return (
                  <div
                    key={category.name}
                    className="flex flex-col items-center flex-shrink-0 transition-transform duration-200 active:scale-95"
                    onClick={() => handleNavigation(category.path)}
                  >
                    {/* Round Image - Same size as ApartmentPage */}
                    <div
                      className={`relative w-9 h-9 xs:w-10 xs:h-10 rounded-full overflow-hidden border-2 transition-all duration-300 shadow-sm ${
                        isActive
                          ? 'border-[#00695C] shadow-[0_0_10px_rgba(0,105,92,0.3)]'
                          : 'border-gray-300'
                      }`}
                    >
                      {category.isAll ? (
                        <div className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${
                          isActive ? 'bg-[#00695C]' : 'bg-gray-100'
                        }`}>
                          <Home className={`w-3.5 h-3.5 transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-[#00695C]'
                          }`} />
                        </div>
                      ) : (
                        <>
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </>
                      )}
                    </div>

                    {/* Label - Same as ApartmentPage */}
                    <div className="flex flex-col items-center mt-0.5">
                      <span className={`text-[7px] font-semibold text-center leading-tight whitespace-nowrap transition-colors duration-300 ${
                        isActive ? 'text-[#00695C]' : 'text-[#143B35]'
                      }`}>
                        {category.displayName || category.name}
                      </span>
                      {category.subText && (
                        <span className={`text-[7px] font-semibold text-center leading-tight whitespace-nowrap transition-colors duration-300 ${
                          isActive ? 'text-[#00695C]' : 'text-[#143B35]'
                        }`}>
                          {category.subText}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════
            FILTER MODAL (mobile + tablet trigger)
        ══════════════════════════════════════════════ */}
        {showFilterModal && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[140px] px-4 pb-4 bg-black/50 backdrop-blur-sm animate-fade-in lg:hidden">
            <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <GirlsHostelFilter
                onFilterChange={handleFilterChange}
                onClose={() => setShowFilterModal(false)}
              />
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════════════ */}
        <div className="max-w-none mx-auto px-4 sm:px-6 py-6 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

            {/* ── Property Cards ── */}
            <div className="w-full lg:w-2/3">
              <section>
                <GirlsHostel />
              </section>
            </div>

            {/* ── Sidebar Filter (desktop only) ── */}
            <div className="hidden lg:block lg:w-1/3 lg:relative">
              <div className="lg:sticky lg:top-[110px] lg:max-h-[calc(100vh-130px)] lg:overflow-y-auto lg:scrollbar-hide animate-slide-in-right">
                <GirlsHostelFilter onFilterChange={handleFilterChange} />
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
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
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

export default GirlsHostelPage;