// src/service/pages/ServicePage.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  ArrowRight,
  Star,
  SlidersHorizontal,
  X,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck,
  LayoutGrid,
  List,
  ChevronDown,
  Phone,
  Heart,
} from "lucide-react";

/* ---------------- DATA ---------------- */
const servicesList = [
  {
    id: 1,
    title: "Construction",
    description:
      "End-to-end construction services for residential and commercial projects.",
    icon: "🏗️",
    color: "#FF6B6B",
    category: "Construction",
    price: "From ₹499/sq.ft",
    rating: 4.9,
    jobs: "1.2K+",
    responseTime: "2 hrs",
    popular: true,
  },
  {
    id: 2,
    title: "Interior Design",
    description:
      "Modern interior design solutions tailored to your space and budget.",
    icon: "🎨",
    color: "#4ECDC4",
    category: "Design",
    price: "From ₹299/sq.ft",
    rating: 4.8,
    jobs: "850+",
    responseTime: "1 hr",
    popular: true,
  },
  {
    id: 3,
    title: "Painting",
    description:
      "Professional painting services for homes, offices, and commercial spaces.",
    icon: "🖌️",
    color: "#FFD93D",
    category: "Painting",
    price: "From ₹18/sq.ft",
    rating: 4.9,
    jobs: "2.4K+",
    responseTime: "30 mins",
    popular: true,
  },
  {
    id: 4,
    title: "Plumbing",
    description:
      "Reliable plumbing installation, repair, and maintenance services.",
    icon: "🔧",
    color: "#6C5CE7",
    category: "Repair",
    price: "From ₹199/visit",
    rating: 4.7,
    jobs: "3.1K+",
    responseTime: "45 mins",
    popular: false,
  },
  {
    id: 5,
    title: "Cleaning",
    description:
      "Deep cleaning and regular maintenance for residential and commercial properties.",
    icon: "🧹",
    color: "#00B894",
    category: "Cleaning",
    price: "From ₹149/visit",
    rating: 4.9,
    jobs: "5.6K+",
    responseTime: "1 hr",
    popular: true,
  },
  {
    id: 6,
    title: "Electrical",
    description:
      "Certified electricians for wiring, repairs, and safety inspections.",
    icon: "⚡",
    color: "#FDCB6E",
    category: "Repair",
    price: "From ₹249/visit",
    rating: 4.8,
    jobs: "2.8K+",
    responseTime: "30 mins",
    popular: false,
  },
];

const categories = [
  "All",
  "Construction",
  "Design",
  "Painting",
  "Repair",
  "Cleaning",
];

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

/* ---------------- COMPONENT ---------------- */
const ServicePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState("all"); // all | low | mid | high
  const [minRating, setMinRating] = useState(0);
  const [favorites, setFavorites] = useState([]);

  /* ---------------- FILTERING & SORTING ---------------- */
  const filteredServices = useMemo(() => {
    let result = [...servicesList];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (activeCategory !== "All") {
      result = result.filter((s) => s.category === activeCategory);
    }

    // Rating
    if (minRating > 0) {
      result = result.filter((s) => s.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
      case "price-high":
        // (Simple placeholder — you can parse real prices here)
        break;
      case "popular":
      default:
        result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, activeCategory, sortBy, minRating]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSortBy("popular");
    setMinRating(0);
    setPriceRange("all");
  };

  const hasActiveFilters =
    searchQuery || activeCategory !== "All" || minRating > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4]">
      {/* ==================== PAGE HEADER ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00695C] via-[#26A69A] to-[#004D40] text-white">
        {/* Decorative blurs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#FFD93D] blur-3xl" />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 12}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-4">
            <Sparkles className="w-4 h-4 text-[#FFD93D]" />
            <span className="text-sm font-medium">All Services</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-white/80 max-w-2xl text-lg">
            Explore our complete range of professional property services — from
            construction to cleaning, all delivered by verified experts.
          </p>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: "Verified Pros" },
              { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: "Quality Guaranteed" },
              { icon: <Clock className="w-3.5 h-3.5" />, text: "Fast Response" },
              { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Best Prices" },
            ].map((chip, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-xs md:text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20"
              >
                <span className="text-[#FFD93D]">{chip.icon}</span>
                {chip.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SEARCH & FILTERS ==================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-5">
          {/* Top row: search + sort + view toggle */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services (e.g. Painting, Cleaning...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#26A69A] focus:border-transparent text-gray-700 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full md:w-52 pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#26A69A] text-gray-700 cursor-pointer bg-white"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View toggle */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-gray-100">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-[#00695C]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-[#00695C]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filter button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                showFilters || hasActiveFilters
                  ? "bg-[#00695C] text-white shadow-lg"
                  : "bg-[#E8F5E9] text-[#00695C] hover:bg-[#C8E6C9]"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-[#FFD93D] text-[#00695C] text-xs font-bold flex items-center justify-center">
                  !
                </span>
              )}
            </button>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-500 mr-1">
              Categories:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#00695C] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto flex items-center gap-1 text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear all
              </button>
            )}
          </div>

          {/* Expandable filters panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade">
              {/* Rating filter */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Minimum Rating
                </label>
                <div className="flex flex-wrap gap-2">
                  {[0, 4.5, 4.7, 4.9].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        minRating === r
                          ? "bg-[#FFD93D] text-[#00695C] shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {r === 0 ? (
                        "Any"
                      ) : (
                        <>
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {r}+
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Price Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { v: "all", l: "All" },
                    { v: "low", l: "Under ₹500" },
                    { v: "mid", l: "₹500 – ₹2000" },
                    { v: "high", l: "₹2000+" },
                  ].map((p) => (
                    <button
                      key={p.v}
                      onClick={() => setPriceRange(p.v)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        priceRange === p.v
                          ? "bg-[#00695C] text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {p.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==================== RESULTS COUNT ==================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-[#00695C]">
              {filteredServices.length}
            </span>{" "}
            {filteredServices.length === 1 ? "service" : "services"}
            {activeCategory !== "All" && (
              <>
                {" "}
                in{" "}
                <span className="font-semibold text-[#00695C]">
                  {activeCategory}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES GRID / LIST ==================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {filteredServices.length > 0 ? (
          viewMode === "grid" ? (
            /* ---------- GRID VIEW ---------- */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 relative overflow-hidden flex flex-col"
                >
                  {/* Hover gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}, transparent)`,
                    }}
                  />

                  {/* Top color bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-2"
                    style={{ backgroundColor: service.color }}
                  />

                  {/* Popular badge */}
                  {service.popular && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#FF9800] text-[#00695C] text-[10px] font-bold flex items-center gap-1 shadow-md z-20">
                      <Sparkles className="w-3 h-3" />
                      POPULAR
                    </div>
                  )}

                  {/* Favorite button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(service.id);
                    }}
                    className={`absolute top-3 ${
                      service.popular ? "right-24" : "right-3"
                    } p-2 rounded-full transition-all z-20 ${
                      favorites.includes(service.id)
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white"
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        favorites.includes(service.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>

                  <div className="relative z-10 flex flex-col flex-1">
                    {/* Icon + rating */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                        style={{ backgroundColor: `${service.color}20` }}
                      >
                        {service.icon}
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100">
                        <Star className="w-3 h-3 text-[#FFD93D] fill-[#FFD93D]" />
                        <span className="text-xs font-semibold text-gray-700">
                          {service.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#00695C] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2 flex-1">
                      {service.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-[#26A69A]" />
                        {service.jobs} bookings
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#26A69A]" />
                        {service.responseTime}
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-sm font-bold text-[#00695C]">
                        {service.price}
                      </div>
                      <div className="flex items-center gap-1.5 text-[#00695C] font-semibold text-sm group-hover:gap-2.5 transition-all">
                        Book Now
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ---------- LIST VIEW ---------- */
            <div className="space-y-4">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row gap-5 items-start md:items-center relative overflow-hidden"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
                    style={{ backgroundColor: service.color }}
                  />

                  <div
                    className="w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    {service.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#00695C] transition-colors">
                        {service.title}
                      </h3>
                      {service.popular && (
                        <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#FF9800] text-[#00695C] text-[10px] font-bold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
                        <span className="font-semibold text-gray-700">
                          {service.rating}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-[#26A69A]" />
                        {service.jobs}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#26A69A]" />
                        {service.responseTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end gap-3 w-full md:w-auto justify-between md:justify-end shrink-0">
                    <div className="text-sm font-bold text-[#00695C]">
                      {service.price}
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-[#00695C] text-white text-sm font-semibold hover:bg-[#004D40] transition flex items-center gap-1.5 group/btn">
                      Book Now
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* ---------- EMPTY STATE ---------- */
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="relative w-28 h-28 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center text-5xl">
                🔍
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No services found
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any services matching your filters. Try adjusting
              your search or clearing the filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-xl bg-[#00695C] text-white font-semibold hover:bg-[#004D40] transition flex items-center gap-2 mx-auto"
            >
              <X className="w-4 h-4" />
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* ==================== HELP CTA ==================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#FFEB3B] to-[#FF9800] rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#00695C] blur-3xl" />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#00695C] mb-2">
                Need a Custom Service?
              </h3>
              <p className="text-[#00695C]/80 max-w-xl">
                Can't find what you're looking for? Tell us your requirement and
                we'll connect you with the right professional.
              </p>
            </div>
            <button className="shrink-0 px-8 py-4 rounded-xl bg-[#00695C] text-white font-bold hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2 group">
              <Phone className="w-5 h-5" />
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== ANIMATIONS ==================== */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.2; }
          25% { transform: translateY(-20px) translateX(15px) rotate(90deg); opacity: 0.5; }
          50% { transform: translateY(-12px) translateX(-12px) rotate(180deg); opacity: 0.7; }
          75% { transform: translateY(12px) translateX(18px) rotate(270deg); opacity: 0.3; }
        }
        .animate-float-particle { animation: float-particle 10s ease-in-out infinite; }

        @keyframes fade {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade { animation: fade 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ServicePage;