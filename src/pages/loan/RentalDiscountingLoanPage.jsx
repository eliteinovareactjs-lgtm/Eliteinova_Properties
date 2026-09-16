import React from "react";
import LoanPageShell from "./LoanPageShell";
import bannerImage from "../../assets/loanimage.jpg";

const RentalDiscountingLoanPage = () => (
  <LoanPageShell
    loanId="rental-discounting-loan"
    bannerImage={bannerImage}
    categoryLabel="Rental Discounting"
    title="Rental Discounting Loan"
    subtitle="Turn future rent into today's capital"
    description="Get a lump-sum loan against the future rental income from your commercial property. Ideal for landlords looking to unlock liquidity without selling."
    icon="rental"
    accent="#00897B"
    metrics={[
      { label: "Starting rate", value: "8.75% p.a." },
      { label: "Lending partners", value: "6 verified" },
      { label: "Max tenure", value: "10 years" },
      { label: "Approval speed", value: "5–7 days" },
    ]}
    aboutText={`Rental Discounting (also called Lease Rental Discounting or LRD) is a loan where you pledge the future rental income from a commercial property as collateral. The lender advances a lump sum based on the present value of the lease, and the tenant's rent is redirected to the lender.

It's an excellent option for owners of commercial property with long-term lease agreements (typically 3+ years) from creditworthy tenants. The loan is usually structured as an overdraft, allowing flexible repayment.`}
    features={[
      "Lump-sum against future rental income",
      "Tenant's rent redirected to lender",
      "Ideal for commercial property landlords",
      "Overdraft structure with flexible draw",
      "Interest only on utilised amount",
      "No personal guarantee in most cases",
    ]}
    eligibility={[
      "Commercial property with a valid lease agreement",
      "Lease tenure of 3+ years remaining",
      "Creditworthy tenant (MNC, listed company, bank, etc.)",
      "Clear and marketable property title",
      "No existing loans against the same rental stream",
    ]}
    documents={[
      "PAN Card and property ownership proof",
      "Registered lease agreement",
      "Tenant's financial statements and credit rating",
      "Rent receipts and TDS certificates",
      "Property tax receipts and encumbrance certificate",
    ]}
  />
);

export default RentalDiscountingLoanPage;