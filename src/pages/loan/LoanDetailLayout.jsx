// src/pages/loan/LoanDetailLayout.jsx
// Shared layout used by every individual loan page (HomeLoanPage,
// PlotLoanPage, etc). Each of those files is a few lines that just pass
// their own loanId in — this file holds the actual banner + content + agent
// cards markup so it isn't duplicated 12 times.
import React, { useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Percent,
  Clock,
  Users2,
  Star,
  MapPin,
  Award,
  Sparkles,
  TrendingUp,
  Wallet,
  Users,
} from "lucide-react";
import {
  getLoanById,
  loanProviders,
  defaultProviders,
  loanCategories,
} from "../../components/data/loan/loanCategories";
import { getIcon } from "../../components/data/loan/loanIcons";

/* ══════════════════════════════════════════════════════════════
   PROVIDER CARD — full-bleed image left, terms + CTA right
   ══════════════════════════════════════════════════════════════ */
const ProviderCard = ({ provider, accent, featured }) => (
  <div
    className="relative rounded-3xl overflow-hidden bg-white transition-all duration-500 hover:-translate-y-0.5 group"
    style={{
      boxShadow: "0 1px 2px rgba(16,36,31,0.04), 0 0 0 1px rgba(16,36,31,0.06)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = `0 1px 2px rgba(16,36,31,0.04), 0 0 0 1px ${accent}33, 0 24px 48px -20px rgba(16,36,31,0.30)`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow =
        "0 1px 2px rgba(16,36,31,0.04), 0 0 0 1px rgba(16,36,31,0.06)";
    }}
  >
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
      {/* LEFT: full-bleed image panel */}
      <div className="relative min-h-[240px] md:min-h-[280px] overflow-hidden">
        <img
          src={
            provider.image ||
            "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&q=80"
          }
          alt={provider.institution}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${accent}99 0%, rgba(11,59,51,0.15) 35%, rgba(11,59,51,0.75) 78%, rgba(11,59,51,0.94) 100%)`,
          }}
        />

        <div
          className="absolute -right-16 -top-16 w-44 h-44 rounded-full opacity-30 pointer-events-none mix-blend-screen"
          style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
        />

        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {featured ? (
          <div
            className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm"
            style={{ background: "linear-gradient(135deg, #E4C661, #C9A227)" }}
          >
            <Award className="w-3 h-3 text-[#10241F]" />
            <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#10241F]">
              Top Rated
            </span>
          </div>
        ) : (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-white/60">
            <ShieldCheck className="w-3 h-3" style={{ color: accent }} />
            <span
              className="text-[9px] font-bold tracking-[0.14em] uppercase"
              style={{ color: accent }}
            >
              Verified
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/65 font-medium mb-2">
            {provider.institutionType}
          </p>
          <h3 className="loandetail-display text-[22px] md:text-[24px] font-medium text-white leading-[1.15] mb-3">
            {provider.institution}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3"
                  style={{
                    fill: i < Math.round(provider.rating) ? "#C9A227" : "transparent",
                    color:
                      i < Math.round(provider.rating)
                        ? "#C9A227"
                        : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-white">
              {provider.rating}
              <span className="text-white/50 font-normal ml-1">/ 5</span>
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT: terms, highlights, contact, CTA */}
      <div className="p-6 md:p-7 flex flex-col">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-4 mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#9AA79E] font-medium mb-1.5">
              Interest rate
            </p>
            <p className="text-[15px] font-semibold text-[#10241F] flex items-center gap-1">
              <Percent className="w-3.5 h-3.5" style={{ color: accent }} />
              {provider.rateRange}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#9AA79E] font-medium mb-1.5">
              Processing fee
            </p>
            <p className="text-[15px] font-semibold text-[#10241F]">
              {provider.processingFee}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#9AA79E] font-medium mb-1.5">
              Max tenure
            </p>
            <p className="text-[15px] font-semibold text-[#10241F] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" style={{ color: accent }} />
              {provider.maxTenure}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#9AA79E] font-medium mb-1.5">
              Location
            </p>
            <p className="text-[15px] font-semibold text-[#10241F] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
              {provider.city}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {provider.highlights.map((h, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#3B4A41] rounded-full px-2.5 py-1"
              style={{ backgroundColor: `${accent}0D`, border: `1px solid ${accent}22` }}
            >
              <CheckCircle2 className="w-3 h-3" style={{ color: accent }} />
              {h}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 border-t border-[#EDF1EE]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
              style={{
                backgroundColor: `${accent}14`,
                color: accent,
                border: `1px solid ${accent}22`,
              }}
            >
              {provider.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-[#9AA79E] font-medium leading-none mb-1">
                Point of contact
              </p>
              <p className="text-[13px] text-[#3B4A41] font-semibold truncate">
                {provider.name}
                <span className="text-[#8A968F] font-normal"> · {provider.role}</span>
              </p>
            </div>
          </div>

          <button
            className="group/btn relative px-5 py-2.5 text-white text-[13px] font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] whitespace-nowrap flex-shrink-0 inline-flex items-center gap-1.5 overflow-hidden"
            style={{
              background: `linear-gradient(120deg, ${accent} 0%, #26A69A 100%)`,
              boxShadow: `0 10px 24px -12px ${accent}99`,
            }}
          >
            <span className="relative z-10">Connect with agent</span>
            <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   METRIC TILE
   ══════════════════════════════════════════════════════════════ */
const MetricTile = ({ icon, label, value, accent }) => (
  <div className="rounded-2xl bg-white border border-[#EDF1EE] p-4 flex items-start gap-3">
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: `${accent}14`, color: accent }}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-[0.1em] text-[#9AA79E] font-medium mb-1">
        {label}
      </p>
      <p className="text-[15px] font-semibold text-[#10241F] leading-tight">{value}</p>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   MAIN LAYOUT
   ══════════════════════════════════════════════════════════════ */
const LoanDetailLayout = ({ loanId: loanIdProp }) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const partnersRef = useRef(null);

  const loanId = loanIdProp || params.loanId;

  const stateLoan = location.state?.loan;
  const stateCategory = location.state?.category;

  // Fallback: resolve loan + owning category from master data
  const fallback = (() => {
    const direct = getLoanById(loanId);
    if (direct) {
      const owner = loanCategories.find((c) =>
        c.loans.some((l) => l.id === loanId)
      );
      return { loan: direct, category: owner };
    }
    return { loan: null, category: null };
  })();

  const loan = stateLoan || fallback.loan;
  const category = stateCategory || fallback.category;
  const accent = category?.accent || loan?.accent || "#00695C";

  const providers = loanProviders[loanId] || defaultProviders;
  const startingRate = providers[0]?.rateRange.split(" – ")[0];
  const longestTenure = providers.reduce((longest, p) => {
    const years = parseInt(p.maxTenure, 10);
    return years > longest ? years : longest;
  }, 0);

  // Scroll down to the agent cards section instead of navigating away
  const scrollToPartners = () => {
    partnersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!loan) {
    return (
      <div className="min-h-screen bg-[#F6F8F7] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#10241F] font-medium mb-2">We couldn't find that loan.</p>
          <button
            onClick={() => navigate("/loans")}
            className="text-sm underline text-[#00695C]"
          >
            Back to all loans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8F7]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
        .loandetail-root { font-family: 'Inter', system-ui, sans-serif; }
        .loandetail-display { font-family: 'Fraunces', Georgia, serif; }
      `}</style>

      <div className="loandetail-root">
        {/* ══════════════════════════════════════════════
            BANNER — image + accent gradient + identity
            ══════════════════════════════════════════════ */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundImage: loan.image
              ? `linear-gradient(150deg, ${accent}E6 0%, rgba(11,59,51,0.88) 55%, rgba(11,59,51,0.94) 100%), url(${loan.image})`
              : `linear-gradient(150deg, ${accent} 0%, #0B3B33 100%)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Ambient glows */}
          <div
            className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-25 pointer-events-none mix-blend-screen"
            style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
          />
          <div
            className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full opacity-15 pointer-events-none"
            style={{ background: "radial-gradient(circle, #26A69A 0%, transparent 70%)" }}
          />

          {/* Dotted texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 pt-8 pb-14 md:pb-16">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to loans
            </button>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="max-w-xl">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/12 border border-white/20 backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 text-[#E4C661]" />
                    <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-white">
                      {loan.categoryTitle || category?.title || "Loan"}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/15 border border-emerald-300/30 backdrop-blur-sm">
                    <ShieldCheck className="w-3 h-3 text-emerald-200" />
                    <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-emerald-100">
                      Verified Partners
                    </span>
                  </span>
                </div>

                <h1 className="loandetail-display text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-[1.1] mb-4">
                  {loan.title}
                </h1>

                <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-2xl">
                  {loan.description}
                </p>

                {/* CTA now scrolls down to the agent cards instead of navigating */}
                <button
                  onClick={scrollToPartners}
                  className="mt-7 inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-semibold rounded-full transition-transform duration-200 hover:scale-[1.03]"
                  style={{
                    background: `linear-gradient(120deg, ${accent}, #26A69A)`,
                    boxShadow: "0 14px 30px -14px rgba(0,0,0,0.5)",
                  }}
                >
                  View lending partners
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </button>
              </div>

              {/* Quick stats */}
              <div className="flex gap-7 md:gap-9">
                <div>
                  <p className="loandetail-display text-2xl md:text-3xl font-medium text-white">
                    {startingRate}
                  </p>
                  <p className="text-xs text-white/60">rate from</p>
                </div>
                <div>
                  <p className="loandetail-display text-2xl md:text-3xl font-medium text-white">
                    {longestTenure}y
                  </p>
                  <p className="text-xs text-white/60">max tenure</p>
                </div>
                <div>
                  <p className="loandetail-display text-2xl md:text-3xl font-medium text-white">
                    {providers.length}
                  </p>
                  <p className="text-xs text-white/60">lenders</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#F6F8F7] to-transparent" />
        </div>

        {/* ══════════════════════════════════════════════
            METRIC TILES (floating up into banner)
            ══════════════════════════════════════════════ */}
        <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            <MetricTile
              accent={accent}
              icon={<Percent className="w-4 h-4" />}
              label="Starting rate"
              value={startingRate || "—"}
            />
            <MetricTile
              accent={accent}
              icon={<Users className="w-4 h-4" />}
              label="Lending partners"
              value={`${providers.length} verified`}
            />
            <MetricTile
              accent={accent}
              icon={<Clock className="w-4 h-4" />}
              label="Max tenure"
              value={`${longestTenure} years`}
            />
            <MetricTile
              accent={accent}
              icon={<TrendingUp className="w-4 h-4" />}
              label="Approval speed"
              value="24–72 hrs"
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            BODY — content grid (main col + sticky summary)
            ══════════════════════════════════════════════ */}
        <div className="max-w-5xl mx-auto px-6 pb-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 md:gap-12">
            {/* Main column */}
            <div>
              <section className="mb-10">
                <h2 className="loandetail-display text-xl font-medium text-[#10241F] mb-3">
                  About this loan
                </h2>
                <p className="text-[#3B4A41] text-sm leading-relaxed">
                  {loan.overview || loan.description}
                </p>
              </section>

              <section className="mb-10">
                <h2 className="loandetail-display text-xl font-medium text-[#10241F] mb-4">
                  What it's good for
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {loan.features?.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[#3B4A41] bg-white rounded-xl px-4 py-3 border border-[#E3E9E4]"
                    >
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: accent }}
                      />
                      {feature}
                    </div>
                  ))}
                </div>
              </section>

              {loan.eligibility?.length > 0 && (
                <section className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Users2 className="w-4 h-4" style={{ color: accent }} />
                    <h2 className="loandetail-display text-xl font-medium text-[#10241F]">
                      Who can apply
                    </h2>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {loan.eligibility.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#3B4A41]">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: accent }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {loan.documents?.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4" style={{ color: accent }} />
                    <h2 className="loandetail-display text-xl font-medium text-[#10241F]">
                      Documents you'll need
                    </h2>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {loan.documents.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#3B4A41]">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: accent }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Sticky summary card */}
            <aside className="md:sticky md:top-8 h-fit">
              <div className="bg-white rounded-2xl border border-[#E3E9E4] p-6">
                <p className="text-[11px] uppercase tracking-wide text-[#8A968F] font-medium mb-4">
                  At a glance
                </p>

                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-[#6B7B70]">
                      <Percent className="w-3.5 h-3.5" style={{ color: accent }} />
                      Rate from
                    </span>
                    <span className="text-sm font-semibold text-[#10241F]">
                      {startingRate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-[#6B7B70]">
                      <Clock className="w-3.5 h-3.5" style={{ color: accent }} />
                      Max tenure
                    </span>
                    <span className="text-sm font-semibold text-[#10241F]">
                      {longestTenure} years
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-[#6B7B70]">
                      <ShieldCheck className="w-3.5 h-3.5" style={{ color: accent }} />
                      Partners
                    </span>
                    <span className="text-sm font-semibold text-[#10241F]">
                      {providers.length} verified
                    </span>
                  </div>
                </div>

                <button
                  onClick={scrollToPartners}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-white text-sm font-semibold rounded-full transition-transform duration-200 hover:scale-[1.02]"
                  style={{ background: `linear-gradient(120deg, ${accent}, #26A69A)` }}
                >
                  View partners
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </button>
                <p className="text-[11px] text-[#8A968F] text-center mt-3">
                  Compare rates from all {providers.length} partners below
                </p>
              </div>
            </aside>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            AGENT CARDS
            ══════════════════════════════════════════════ */}
        <div ref={partnersRef} className="max-w-5xl mx-auto px-6 pb-16 scroll-mt-24">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="loandetail-display text-xl md:text-2xl font-medium text-[#10241F] mb-1">
                Choose your lending partner
              </h2>
              <p className="text-xs text-[#8A968F]">
                Every partner below is verified and processes{" "}
                {loan.title.toLowerCase()} applications directly.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#6B7B70] flex-shrink-0">
              <ShieldCheck className="w-4 h-4" style={{ color: accent }} />
              <span>{providers.length} partners</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                accent={accent}
                featured={
                  provider.rating ===
                  Math.max(...providers.map((p) => p.rating))
                }
              />
            ))}
          </div>

          {/* Bottom helper strip */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-white border border-[#EDF1EE] p-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${accent}14`, color: accent }}
              >
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#10241F] leading-tight">
                  Not sure which one fits?
                </p>
                <p className="text-[11px] text-[#8A968F]">
                  Talk to a loan expert and get matched to the right partner.
                </p>
              </div>
            </div>
            <button
              className="px-5 py-2.5 rounded-full text-white text-[13px] font-semibold whitespace-nowrap transition-transform duration-300 hover:scale-[1.03]"
              style={{
                background: `linear-gradient(120deg, ${accent} 0%, #26A69A 100%)`,
                boxShadow: `0 10px 24px -12px ${accent}99`,
              }}
            >
              Talk to an expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailLayout;