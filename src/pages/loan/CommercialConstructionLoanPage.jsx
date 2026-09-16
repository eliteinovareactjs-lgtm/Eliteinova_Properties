import React from "react";
import LoanPageShell from "./LoanPageShell";
import bannerImage from "../../assets/loanimage.jpg";

const CommercialConstructionLoanPage = () => (
  <LoanPageShell
    loanId="commercial-construction-loan"
    bannerImage={bannerImage}
    categoryLabel="Commercial Construction"
    title="Commercial Construction Loan"
    subtitle="Build your business address"
    description="Fund the construction of office buildings, retail complexes, or industrial facilities on land you already own. Staged disbursement based on construction milestones."
    icon="construction"
    accent="#5E35B1"
    metrics={[
      { label: "Starting rate", value: "9.75% p.a." },
      { label: "Lending partners", value: "7 verified" },
      { label: "Max tenure", value: "15 years" },
      { label: "Approval speed", value: "7–10 days" },
    ]}
    aboutText={`A commercial construction loan finances the building of a commercial structure — office, retail complex, warehouse, or factory — on land you already own. The bank funds up to 70% of the construction cost in stages based on progress.

Disbursements are tied to construction milestones (foundation, structure, finishing) and require engineer inspection. Interest is charged only on the disbursed amount, not the total sanctioned limit.`}
    features={[
      "Construction on owned commercial land",
      "Staged disbursement based on progress",
      "Financing up to 70% of construction cost",
      "Interest only on disbursed amount",
      "Free project and technical evaluation",
      "Moratorium during construction period",
    ]}
    eligibility={[
      "Business entities with 3+ years of operations",
      "Minimum turnover of ₹1 crore",
      "Clear ownership of the land parcel",
      "Approved construction plan from local authority",
      "CIBIL score of 700 or above",
    ]}
    documents={[
      "PAN Card and GST registration",
      "Business registration and 3 years' ITR",
      "Land title deed and parent documents",
      "Approved construction plan and cost estimate",
      "Contractor agreement and project timeline",
    ]}
  />
);

export default CommercialConstructionLoanPage;