import React, { useState, useEffect, useRef } from "react";
import { User, Menu, ChevronDown, X, Sparkles, Bell, Search, HelpCircle, Settings, LogOut, Home, Building, Landmark, Warehouse, TrendingUp, Shield, DollarSign, Wrench, PaintBucket, Droplets, Heart, Star, Zap, CheckCircle, Award, MapPin, Globe, Phone, Mail, Calendar, Clock, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";

const Header = ({ onPostPropertyClick }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [mobileDropdowns, setMobileDropdowns] = useState({
    customer: false,
    post: false,
    loan: false,
    services: false,
    customerSub: {},
    postSub: {}
  });
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const customerPortalMenu = {
    "Individual": ["Rent", "Buy", "Lease", "Sell"],
    "Apartment": ["Rent", "Buy", "Lease", "Sell"],
    "Commercial": ["Rent", "Buy", "Lease", "Sell"],
    "Land & Plots": ["Rent", "Buy", "Lease", "Sell"],
    "Hostel": ["Rent", "Buy", "Lease", "Sell"],
  };

 const postPropertyMenu = {
    "Owner": ["Individual", "Apartment", "Commercial", "Land & Plots", "Hostel"],
    "Agent": ["Individual", "Apartment", "Commercial", "Land & Plots", "Hostel"],
    "Builder": ["Individual", "Apartment", "Commercial", "Land & Plots", "Hostel"],
    "Property Management": ["Individual", "Apartment", "Commercial", "Land & Plots", "Hostel"],
  };

  const loanMenu = [
    "Home Loan",
    "Property Loan",
    "Construction Loan",
    "Plot Loan",
    "Commercial Loan"
  ];

  const servicesMenu = [
    "Construction",
    "Interior",
    "Painting",
    "Plumbing",
    "Cleaning"
  ];

  const userMenuItems = [
    { name: "👤 Profile", icon: <User className="w-4 h-4" /> },
    { name: "⚙️ Settings", icon: <Settings className="w-4 h-4" /> },
    { name: "❓ Help & Support", icon: <HelpCircle className="w-4 h-4" /> },
    { name: "🚪 Logout", icon: <LogOut className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // role = "Owner" | "Agent" | "Builder" | "Property Management"
  // propertyType = "Individual" | "Apartment" | "Commercial" | "Land & Plots" | "Hostel"
  const handlePostSubmenuClick = (role, propertyType) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (onPostPropertyClick) {
      onPostPropertyClick(role, propertyType);
    }
  };

  const handleCustomerPortalClick = (type) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    
    const typeKey = type.toLowerCase().replace(/\s+/g, '-');
    
    if (typeKey === "individual") {
      navigate("/individual");
    } else if (typeKey === "rent") {
      navigate("/rent");
    } else if (typeKey === "buy") {
      navigate("/buy");
    } else if (typeKey === "lease") {
      navigate("/lease");
    } else if (typeKey === "sell") {
      navigate("/sell");
    } else if (typeKey === "apartment") {
      navigate("/apartment");
    } else if (typeKey === "commercial") {
      navigate("/commercial");
    } else if (typeKey === "land-&-plots") {
      navigate("/land-plots");
    } else if (typeKey === "hostel") {
      navigate("/hostel");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Reset mobile dropdowns when closing menu
    if (!mobileMenuOpen) {
      setMobileDropdowns({
        customer: false,
        post: false,
        loan: false,
        services: false,
        customerSub: {},
        postSub: {}
      });
    }
  };

  // Toggle mobile dropdown
  const toggleMobileDropdown = (key) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [key]: !prev[key],
      // Close other dropdowns when opening one
      ...(key !== 'customerSub' && key !== 'postSub' && Object.keys(prev).reduce((acc, k) => {
        if (k !== key && k !== 'customerSub' && k !== 'postSub') acc[k] = false;
        return acc;
      }, {}))
    }));
  };

  // Toggle customer sub dropdown
  const toggleCustomerSub = (key) => {
    setMobileDropdowns(prev => ({
      ...prev,
      customerSub: {
        ...prev.customerSub,
        [key]: !prev.customerSub[key]
      }
    }));
  };

  // Toggle post-property role sub dropdown
  const togglePostSub = (key) => {
    setMobileDropdowns(prev => ({
      ...prev,
      postSub: {
        ...prev.postSub,
        [key]: !prev.postSub[key]
      }
    }));
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-r from-[#00695C]/95 via-[#26A69A]/95 to-[#00695C]/95 backdrop-blur-xl shadow-2xl shadow-[#00695C]/20' 
          : 'bg-gradient-to-r from-[#00695C] via-[#26A69A] to-[#00695C]'
      }`}>
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)',
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 12}s`,
              }}
            />
          ))}
          
          <div className="absolute bottom-0 left-0 right-0 h-8">
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/5 to-transparent animate-wave-slow" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />

        {/* ================= TOP BAR ================= */}
        <div className="h-[72px] md:h-[84px] w-full px-3 md:px-6 flex items-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] via-transparent to-white/[0.03] animate-sweep" />
          
          <div className="flex items-center justify-between w-full relative z-10">
            {/* LEFT SECTION */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-1.5 rounded-lg hover:bg-white/20 transition-all duration-300 group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Menu className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300 relative z-10" />
              </button>

              <div
                onClick={() => navigate("/")}
                className="cursor-pointer group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative w-13 h-13 md:w-[76px] md:h-[76px] rounded-full overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#004D40] to-[#00695C] opacity-80" />
                  <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#26A69A]/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF]/20 via-transparent to-[#00FF88]/20 animate-spin-slow rounded-full" />
                  
                  <img
                    src={logo}
                    alt="Eliteinova Properties Logo"
                    className="w-11 h-11 md:w-[60px] md:h-[60px] object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                    style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
                  />
                </div>
              </div>

              <div 
                onClick={() => navigate("/")} 
                className="cursor-pointer group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00E5FF]/10 via-transparent to-[#00FF88]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <h1
                  className="text-lg md:text-2xl lg:text-3xl font-light leading-tight relative tracking-wide"
                  style={{
                    fontFamily: "Pacifico, cursive",
                    color: "#E8F5E9",
                    textShadow: '0 2px 16px rgba(0, 229, 255, 0.2)',
                    fontWeight: 150,
                  }}
                >
                  <span className="relative inline-block group-hover:scale-105 transition-transform duration-500">
                    Eliteinova <span className="text-[0.75em]">Properties</span>
                    <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#00E5FF]/20 via-[#00FF88]/20 to-[#00E5FF]/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700" />
                  </span>
                </h1>
                
                <p 
                  className="text-[11px] md:text-sm lg:text-base font-light leading-tight mt-0 flex items-center gap-2"
                  style={{
                    fontFamily: "Pacifico, cursive",
                    color: "#C8E6C9",
                    fontWeight: 300,
                  }}
                >
                  <span className="relative whitespace-nowrap">
                    No Brokerage
                    <Sparkles className="absolute -right-5 -top-0.5 w-3 h-3 text-yellow-300 animate-sparkle-glow" />
                  </span>
                  <span className="text-[8px] md:text-[10px] bg-gradient-to-r from-[#00FF88]/20 to-[#00E5FF]/20 px-2 py-0.5 rounded-full border border-white/15 backdrop-blur-sm">
                    ⭐ Trusted
                  </span>
                </p>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-1.5 md:gap-3">
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center relative group transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#00695C]/30"
                  style={{
                    background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
                    boxShadow: '0 3px 12px rgba(0,105,92,0.2)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00695C] via-[#26A69A] to-[#00695C] opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full" />
                  <Search className="w-5 h-5 text-[#00695C] group-hover:text-[#004D40] transition-colors duration-300" />
                </button>

                {searchOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-[#00695C]/20 z-50 border border-white/30 animate-dropdown">
                    <form onSubmit={handleSearch} className="p-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#26A69A]" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search properties..."
                          className="w-full pl-9 pr-3 py-2 text-sm bg-[#E8F5E9]/50 rounded-lg border border-[#26A69A]/20 focus:outline-none focus:ring-2 focus:ring-[#26A69A]/40 focus:border-transparent text-gray-800 placeholder-gray-500"
                          autoFocus
                        />
                      </div>
                      <div className="mt-2 flex gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setSearchQuery("Mumbai")}
                          className="text-[10px] bg-gradient-to-r from-[#26A69A]/10 to-[#00695C]/10 hover:from-[#26A69A]/20 hover:to-[#00695C]/20 text-[#00695C] px-2 py-1 rounded-lg transition-all duration-300"
                        >
                          🏙️ Mumbai
                        </button>
                        <button
                          type="button"
                          onClick={() => setSearchQuery("Bangalore")}
                          className="text-[10px] bg-gradient-to-r from-[#26A69A]/10 to-[#00695C]/10 hover:from-[#26A69A]/20 hover:to-[#00695C]/20 text-[#00695C] px-2 py-1 rounded-lg transition-all duration-300"
                        >
                          🏡 Bangalore
                        </button>
                        <button
                          type="button"
                          onClick={() => setSearchQuery("Commercial")}
                          className="text-[10px] bg-gradient-to-r from-[#26A69A]/10 to-[#00695C]/10 hover:from-[#26A69A]/20 hover:to-[#00695C]/20 text-[#00695C] px-2 py-1 rounded-lg transition-all duration-300"
                        >
                          🏪 Commercial
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              <button className="relative group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center relative transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30"
                  style={{
                    background: 'linear-gradient(135deg, #FFEB3B, #FF9800)',
                    boxShadow: '0 3px 12px rgba(255,152,0,0.2)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full" />
                  <Bell className="w-5 h-5 text-[#E65100] group-hover:text-[#BF360C] transition-colors duration-300" />
                </div>
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse-ring">
                    <span className="text-white text-[8px] font-bold">{notificationCount}</span>
                  </div>
                )}
              </button>

              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center relative group transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#00695C]/30"
                  style={{
                    background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
                    boxShadow: '0 3px 12px rgba(0,105,92,0.2)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00695C] via-[#26A69A] to-[#00695C] opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full" />
                  <div className="absolute -inset-0.5 rounded-full border border-white/20 animate-spin-slow" />
                  
                  <User className="w-5 h-5 md:w-6 md:h-6 text-[#00695C] group-hover:text-[#004D40] transition-colors duration-300 relative z-10" />
                  
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse border-2 border-white" />
                </button>

                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-[#00695C]/20 z-50 border border-white/30 animate-dropdown">
                    <div className="p-3 border-b border-[#E8F5E9]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00695C] to-[#26A69A] flex items-center justify-center shadow-md">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-800">John Doe</p>
                          <p className="text-[8px] text-[#26A69A] font-medium">⭐ Premium</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-1.5">
                      {userMenuItems.map((item, index) => (
                        <button
                          key={item.name}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gradient-to-r from-[#00695C]/5 to-[#26A69A]/5 transition-all duration-300 rounded-lg animate-slide-item"
                          style={{ animationDelay: `${index * 50}ms` }}
                          onClick={() => {
                            setUserMenuOpen(false);
                            if (item.name === "🚪 Logout") {
                              // Handle logout
                            } else {
                              navigate(`/${item.name.toLowerCase().replace(/[👤⚙️❓🚪]/g, '').trim()}`);
                            }
                          }}
                        >
                          <span className="text-[#26A69A]">{item.icon}</span>
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <nav className="hidden md:flex h-12 items-center relative bg-gradient-to-r from-[#004D40]/90 via-[#00796B]/90 to-[#004D40]/90 backdrop-blur-sm border-t border-white/5">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer-slow" />
          </div>
          
          <div className="flex items-center h-full relative z-10">
            <button
              onClick={() => {
                navigate("/");
                setActiveTab("home");
              }}
              className={`group relative px-5 h-full text-white font-medium text-sm tracking-wide transition-all duration-300 overflow-hidden ${
                activeTab === "home" 
                  ? 'bg-gradient-to-r from-white/10 to-transparent' 
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="flex items-center gap-2 relative z-10">
                <Home className="w-4 h-4" />
                Home
              </span>
              
              {activeTab === "home" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-300 to-amber-400 animate-pulse-glow" />
              )}
            </button>

            {/* Customer Portal */}
            <div
              className="relative h-full"
              onMouseEnter={() => setActiveDropdown("customer")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => navigate("/customer-portal")}
                className="group relative px-5 h-full text-white font-medium text-sm tracking-wide hover:bg-white/5 flex items-center gap-2 transition-all duration-300"
              >
                <Building className="w-4 h-4" />
                <span>Customer Portal</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "customer" ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === "customer" && (
                <div className="absolute top-full left-0 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-[#00695C]/20 z-50 min-w-[180px] border border-white/30 animate-dropdown">
                  {Object.entries(customerPortalMenu).map(([key, submenu]) => (
                    <div key={key} className="relative group/item">
                      <button 
                        onClick={() => handleCustomerPortalClick(key)}
                        className="w-full px-5 py-2.5 text-left text-sm font-semibold text-gray-800 hover:bg-gradient-to-r from-[#00695C]/5 to-[#26A69A]/5 transition-all duration-300 capitalize"
                      >
                        {key}
                      </button>
                      <div className="absolute left-full top-0 hidden group-hover/item:block bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-[#00695C]/20 min-w-[160px] z-50 border border-white/30 animate-dropdown-nested">
                        {submenu.map((item) => (
                          <button
                            key={item}
                            onClick={() => handleCustomerPortalClick(item.toLowerCase())}
                            className="w-full px-5 py-2.5 text-left text-sm text-gray-700 hover:bg-gradient-to-r from-[#00695C]/5 to-[#26A69A]/5 transition-all duration-300"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Post Property */}
            <div
              className="relative h-full"
              onMouseEnter={() => setActiveDropdown("post")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => navigate("/post-property")}
                className="group relative px-5 h-full text-white font-medium text-sm tracking-wide hover:bg-white/5 flex items-center gap-2 transition-all duration-300"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Post Property</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "post" ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === "post" && (
                <div className="absolute top-full left-0 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-[#00695C]/20 z-50 min-w-[190px] border border-white/30 animate-dropdown">
                  {Object.entries(postPropertyMenu).map(([role, submenu]) => (
                    <div key={role} className="relative group/item">
                      <button
                        className="w-full px-5 py-2.5 text-left text-sm font-semibold text-gray-800 hover:bg-gradient-to-r from-[#00695C]/5 to-[#26A69A]/5 transition-all duration-300 flex items-center justify-between gap-3"
                      >
                        {role}
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-gray-400" />
                      </button>
                      <div className="absolute left-full top-0 hidden group-hover/item:block bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-[#00695C]/20 min-w-[170px] z-50 border border-white/30 animate-dropdown-nested">
                        {submenu.map((propertyType) => (
                          <button
                            key={propertyType}
                            onClick={() => handlePostSubmenuClick(role, propertyType)}
                            className="w-full px-5 py-2.5 text-left text-sm text-gray-700 hover:bg-gradient-to-r from-[#00695C]/5 to-[#26A69A]/5 transition-all duration-300"
                          >
                            {propertyType}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Find Your Loan */}
            <div
              className="relative h-full"
              onMouseEnter={() => setActiveDropdown("loan")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="group relative px-5 h-full text-white font-medium text-sm tracking-wide hover:bg-white/5 flex items-center gap-2 transition-all duration-300">
                <Landmark className="w-4 h-4" />
                <span>Find Loan</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "loan" ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === "loan" && (
                <div className="absolute top-full left-0 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-[#00695C]/20 z-50 min-w-[180px] border border-white/30 animate-dropdown">
                  {loanMenu.map((item) => (
                    <button
                      key={item}
                      className="w-full px-5 py-2.5 text-left text-sm font-semibold text-gray-800 hover:bg-gradient-to-r from-[#00695C]/5 to-[#26A69A]/5 transition-all duration-300"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Services */}
            <div
              className="relative h-full"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="group relative px-5 h-full text-white font-medium text-sm tracking-wide hover:bg-white/5 flex items-center gap-2 transition-all duration-300">
                <Settings className="w-4 h-4" />
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "services" ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === "services" && (
                <div className="absolute top-full left-0 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-[#00695C]/20 z-50 min-w-[160px] border border-white/30 animate-dropdown">
                  {servicesMenu.map((item) => (
                    <button
                      key={item}
                      className="w-full px-5 py-2.5 text-left text-sm font-semibold text-gray-800 hover:bg-gradient-to-r from-[#00695C]/5 to-[#26A69A]/5 transition-all duration-300"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div> 
        </nav>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 animate-fade"
          onClick={toggleMobileMenu}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00695C]/95 via-[#26A69A]/95 to-[#00695C]/95 backdrop-blur-xl animate-backdrop" />
          
          <div 
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-gradient-to-b from-[#00695C] to-[#26A69A] shadow-2xl shadow-[#00695C]/50 overflow-y-auto animate-slide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                  <Menu className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm">Menu</h2>
                  <p className="text-white/50 text-[10px]">Welcome back!</p>
                </div>
              </div>
              <button 
                onClick={toggleMobileMenu} 
                className="p-1.5 rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
            
            <div className="p-4">
              <form onSubmit={handleSearch} className="mb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white/10 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-white/40"
                  />
                </div>
              </form>
            </div>
            
            <div className="px-4 pb-32">
              <button 
                onClick={() => {
                  navigate('/');
                  toggleMobileMenu();
                }}
                className="w-full text-left text-white font-medium py-3 border-b border-white/5 text-sm animate-slide-item"
                style={{ animationDelay: '0ms' }}
              >
                🏠 Home
              </button>
              
              {/* Customer Portal Mobile */}
              <div className="border-b border-white/5 animate-slide-item" style={{ animationDelay: '50ms' }}>
                <div 
                  className="flex items-center justify-between py-3 cursor-pointer"
                  onClick={() => toggleMobileDropdown('customer')}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">🏢 Customer Portal</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-300 ${mobileDropdowns.customer ? 'rotate-180' : ''}`} />
                </div>
                
                {mobileDropdowns.customer && (
                  <div className="pl-4 pb-2 space-y-1">
                    {Object.entries(customerPortalMenu).map(([key, submenu]) => (
                      <div key={key} className="border-l border-white/10 pl-3">
                        <div 
                          className="flex items-center justify-between py-2 cursor-pointer"
                          onClick={() => toggleCustomerSub(key)}
                        >
                          <span className="text-white/90 text-sm capitalize">{key}</span>
                          <ChevronDown className={`w-3 h-3 text-white/70 transition-transform duration-300 ${mobileDropdowns.customerSub[key] ? 'rotate-180' : ''}`} />
                        </div>
                        
                        {mobileDropdowns.customerSub[key] && (
                          <div className="pl-3 pb-1 space-y-1">
                            {submenu.map((item) => (
                              <button 
                                key={item} 
                                onClick={() => {
                                  handleCustomerPortalClick(item.toLowerCase());
                                  toggleMobileMenu();
                                }}
                                className="block text-white/70 text-xs py-1.5 w-full text-left hover:text-white transition-colors"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Post Property Mobile */}
              <div className="border-b border-white/5 animate-slide-item" style={{ animationDelay: '100ms' }}>
                <div 
                  className="flex items-center justify-between py-3 cursor-pointer"
                  onClick={() => toggleMobileDropdown('post')}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">📊 Post Property</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-300 ${mobileDropdowns.post ? 'rotate-180' : ''}`} />
                </div>
                
                {mobileDropdowns.post && (
                  <div className="pl-4 pb-2 space-y-1">
                    {Object.entries(postPropertyMenu).map(([role, submenu]) => (
                      <div key={role} className="border-l border-white/10 pl-3">
                        <div
                          className="flex items-center justify-between py-2 cursor-pointer"
                          onClick={() => togglePostSub(role)}
                        >
                          <span className="text-white/90 text-sm">{role}</span>
                          <ChevronDown className={`w-3 h-3 text-white/70 transition-transform duration-300 ${mobileDropdowns.postSub[role] ? 'rotate-180' : ''}`} />
                        </div>

                        {mobileDropdowns.postSub[role] && (
                          <div className="pl-3 pb-1 space-y-1">
                            {submenu.map((propertyType) => (
                              <button
                                key={propertyType}
                                onClick={() => {
                                  handlePostSubmenuClick(role, propertyType);
                                  toggleMobileMenu();
                                }}
                                className="block text-white/70 text-xs py-1.5 w-full text-left hover:text-white transition-colors"
                              >
                                {propertyType}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Find Loan Mobile */}
              <div className="border-b border-white/5 animate-slide-item" style={{ animationDelay: '150ms' }}>
                <div 
                  className="flex items-center justify-between py-3 cursor-pointer"
                  onClick={() => toggleMobileDropdown('loan')}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">💰 Find Loan</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-300 ${mobileDropdowns.loan ? 'rotate-180' : ''}`} />
                </div>
                
                {mobileDropdowns.loan && (
                  <div className="pl-4 pb-2 space-y-1">
                    {loanMenu.map((item) => (
                      <button 
                        key={item} 
                        onClick={() => {
                          // Navigate to loan page
                          toggleMobileMenu();
                        }}
                        className="block text-white/90 text-xs py-2 w-full text-left hover:text-white transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Services Mobile */}
              <div className="border-b border-white/5 animate-slide-item" style={{ animationDelay: '200ms' }}>
                <div 
                  className="flex items-center justify-between py-3 cursor-pointer"
                  onClick={() => toggleMobileDropdown('services')}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">🛠️ Services</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-300 ${mobileDropdowns.services ? 'rotate-180' : ''}`} />
                </div>
                
                {mobileDropdowns.services && (
                  <div className="pl-4 pb-2 space-y-1">
                    {servicesMenu.map((item) => (
                      <button 
                        key={item} 
                        onClick={() => {
                          // Navigate to service page
                          toggleMobileMenu();
                        }}
                        className="block text-white/90 text-xs py-2 w-full text-left hover:text-white transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  navigate("/profile");
                  toggleMobileMenu();
                }}
                className="w-full text-left text-white font-medium py-3 border-b border-white/5 text-sm animate-slide-item"
                style={{ animationDelay: '250ms' }}
              >
                👤 Profile
              </button>

              <button
                onClick={() => {
                  navigate("/notifications");
                  toggleMobileMenu();
                }}
                className="w-full text-left text-white font-medium py-3 border-b border-white/5 text-sm animate-slide-item"
                style={{ animationDelay: '300ms' }}
              >
                🔔 Notifications
              </button>

              <button
                onClick={() => {
                  navigate("/help");
                  toggleMobileMenu();
                }}
                className="w-full text-left text-white font-medium py-3 text-sm animate-slide-item"
                style={{ animationDelay: '350ms' }}
              >
                ❓ Help
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0.2;
          }
          25% { 
            transform: translateY(-20px) translateX(15px) rotate(90deg); 
            opacity: 0.5;
          }
          50% { 
            transform: translateY(-12px) translateX(-12px) rotate(180deg); 
            opacity: 0.7;
          }
          75% { 
            transform: translateY(12px) translateX(18px) rotate(270deg); 
            opacity: 0.3;
          }
        }
        .animate-float-particle {
          animation: float-particle 10s ease-in-out infinite;
        }

        @keyframes wave-slow {
          0% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(40px) scaleY(1.2); }
          100% { transform: translateX(80px) scaleY(1); }
        }
        .animate-wave-slow {
          animation: wave-slow 8s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer-slow {
          animation: shimmer-slow 8s linear infinite;
        }

        @keyframes sweep {
          0%, 100% { 
            background-position: 0% 50%; 
            opacity: 0.3;
          }
          50% { 
            background-position: 100% 50%; 
            opacity: 0.6;
          }
        }
        .animate-sweep {
          background-size: 200% 200%;
          animation: sweep 4s ease infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }

        @keyframes sparkle-glow {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(0.8) rotate(0deg);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }
        .animate-sparkle-glow {
          animation: sparkle-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0);
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 1.5s ease-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-glow {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }

        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.2s ease-out forwards;
        }

        @keyframes dropdown-nested {
          from {
            opacity: 0;
            transform: translateX(-6px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-dropdown-nested {
          animation: dropdown-nested 0.15s ease-out forwards;
        }

        @keyframes slide-item {
          from {
            opacity: 0;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-item {
          animation: slide-item 0.3s ease-out forwards;
        }

        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade {
          animation: fade 0.25s ease-out forwards;
        }

        @keyframes backdrop {
          from {
            backdrop-filter: blur(0);
            opacity: 0;
          }
          to {
            backdrop-filter: blur(10px);
            opacity: 1;
          }
        }
        .animate-backdrop {
          animation: backdrop 0.25s ease-out forwards;
        }

        @keyframes slide {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide {
          animation: slide 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </>
  );
};

export default Header;