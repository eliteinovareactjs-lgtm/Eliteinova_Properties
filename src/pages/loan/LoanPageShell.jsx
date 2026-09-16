// src/pages/loan/LoanPageShell.jsx
// Wraps every per-loan page. Takes the loan id plus a content config that
// controls the banner image, headline, subheading, metric values, and the
// "about" / "eligibility" / "documents" sections. Each individual page
// file just fills in those values for its own loan type.
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Percent,
  Clock,
  Users2,
  Sparkles,
  TrendingUp,
  Wallet,
  Users,
  Zap,
  Award,
  Briefcase,
  Home,
  Building2,
  Landmark,
  Banknote,
  Calendar,
  Calculator,
  BadgePercent,
  Timer,
  ShieldPlus,
  Target,
  Layers,
  HandCoins,
  Repeat,
  RefreshCw,
  Rocket,
} from "lucide-react";
import {
  loanProviders,
  defaultProviders,
} from "../../components/data/loan/loanCategories";
import { getIcon } from "../../components/data/loan/loanIcons";
import { ProviderCard, MetricTile } from "./loanShared";

const LoanPageShell = ({
  loanId,
  // Banner
  bannerImage,
  categoryLabel,
  title,
  subtitle,
  description,
  icon,
  accent = "#00695C",
  // Metric tiles (4 items, each { icon, label, value })
  metrics,
  // Content sections
  aboutTitle = "About this loan",
  aboutText,
  goodForTitle = "What it's good for",
  features = [],
  eligibility = [],
  documents = [],
  // Optional per-page extras (JSX, rendered between the "about" grid
  // and the agent cards)
  extras = null,
}) => {
  const navigate = useNavigate();
  const partnersRef = useRef(null);

  const providers = loanProviders[loanId] || defaultProviders;
  const startingRate = providers[0]?.rateRange.split(" – ")[0];
  const longestTenure = providers.reduce((longest, p) => {
    const years = parseInt(p.maxTenure, 10);
    return years > longest ? years : longest;
  }, 0);

  const scrollToPartners = () => {
    partnersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#F6F8F7]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
        .loanpage-root { font-family: 'Inter', system-ui, sans-serif; }
        .loanpage-display { font-family: 'Fraunces', Georgia, serif; }
      `}</style>

      <div className="loanpage-root">
        {/* ══════ BANNER ══════ */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundImage: bannerImage
              ? `linear-gradient(150deg, ${accent}E6 0%, rgba(11,59,51,0.88) 55%, rgba(11,59,51,0.94) 100%), url(${bannerImage})`
              : `linear-gradient(150deg, ${accent} 0%, #0B3B33 100%)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-25 pointer-events-none mix-blend-screen"
            style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
          />
          <div
            className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full opacity-15 pointer-events-none"
            style={{ background: "radial-gradient(circle, #26A69A 0%, transparent 70%)" }}
          />
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
                      {categoryLabel}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/15 border border-emerald-300/30 backdrop-blur-sm">
                    <ShieldCheck className="w-3 h-3 text-emerald-200" />
                    <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-emerald-100">
                      Verified Partners
                    </span>
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  {icon && (
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/20"
                      style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#ffffff" }}
                    >
                      {getIcon(icon, { className: "w-6 h-6" })}
                    </div>
                  )}
                  <div>
                    <h1 className="loanpage-display text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-[1.1] mb-2">
                      {title}
                    </h1>
                    {subtitle && (
                      <p className="text-white/70 text-sm md:text-base">{subtitle}</p>
                    )}
                  </div>
                </div>

                <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-2xl">
                  {description}
                </p>

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

              <div className="flex gap-7 md:gap-9">
                <div>
                  <p className="loanpage-display text-2xl md:text-3xl font-medium text-white">
                    {startingRate}
                  </p>
                  <p className="text-xs text-white/60">rate from</p>
                </div>
                <div>
                  <p className="loanpage-display text-2xl md:text-3xl font-medium text-white">
                    {longestTenure}y
                  </p>
                  <p className="text-xs text-white/60">max tenure</p>
                </div>
                <div>
                  <p className="loanpage-display text-2xl md:text-3xl font-medium text-white">
                    {providers.length}
                  </p>
                  <p className="text-xs text-white/60">lenders</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#F6F8F7] to-transparent" />
        </div>

        {/* ══════ METRIC TILES ══════ */}
        <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {(metrics || [
              {
                icon: <Percent className="w-4 h-4" />,
                label: "Starting rate",
                value: startingRate || "—",
              },
              {
                icon: <Users className="w-4 h-4" />,
                label: "Lending partners",
                value: `${providers.length} verified`,
              },
              {
                icon: <Clock className="w-4 h-4" />,
                label: "Max tenure",
                value: `${longestTenure} years`,
              },
              {
                icon: <TrendingUp className="w-4 h-4" />,
                label: "Approval speed",
                value: "24–72 hrs",
              },
            ]).map((m, i) => (
              <MetricTile
                key={i}
                accent={accent}
                icon={m.icon || <Percent className="w-4 h-4" />}
                label={m.label}
                value={m.value}
              />
            ))}
          </div>
        </div>

        {/* ══════ CONTENT ══════ */}
        <div className="max-w-5xl mx-auto px-6 pb-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 md:gap-12">
            <div>
              {aboutText && (
                <section className="mb-10">
                  <h2 className="loanpage-display text-xl font-medium text-[#10241F] mb-3">
                    {aboutTitle}
                  </h2>
                  <p className="text-[#3B4A41] text-sm leading-relaxed whitespace-pre-line">
                    {aboutText}
                  </p>
                </section>
              )}

              {features.length > 0 && (
                <section className="mb-10">
                  <h2 className="loanpage-display text-xl font-medium text-[#10241F] mb-4">
                    {goodForTitle}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature, i) => (
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
              )}

              {eligibility.length > 0 && (
                <section className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Users2 className="w-4 h-4" style={{ color: accent }} />
                    <h2 className="loanpage-display text-xl font-medium text-[#10241F]">
                      Who can apply
                    </h2>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {eligibility.map((item, i) => (
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

              {documents.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4" style={{ color: accent }} />
                    <h2 className="loanpage-display text-xl font-medium text-[#10241F]">
                      Documents you'll need
                    </h2>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {documents.map((item, i) => (
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

              {extras}
            </div>
          </div>
        </div>

        {/* ══════ AGENT CARDS ══════ */}
        <div ref={partnersRef} className="max-w-5xl mx-auto px-6 pb-16 scroll-mt-24">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="loanpage-display text-xl md:text-2xl font-medium text-[#10241F] mb-1">
                Choose your lending partner
              </h2>
              <p className="text-xs text-[#8A968F]">
                Every partner below is verified and processes{" "}
                {title.toLowerCase()} applications directly.
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
                  provider.rating === Math.max(...providers.map((p) => p.rating))
                }
              />
            ))}
          </div>

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

export default LoanPageShell;