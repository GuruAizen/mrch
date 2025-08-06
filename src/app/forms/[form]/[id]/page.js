// src/app/forms/[form]/[id]/page.js

import AdityaBirlaHealthInsuranceDashboard from "@/components/insurance/cashlessforms/adityabirla/AdityaBirlaHealthInsuranceDashboard";
import AegonHealthInsuranceDashboard from "@/components/insurance/cashlessforms/aegon/AegonHealthInsuranceDashboard";
import FHPLHealthInsuranceDashboard from "@/components/insurance/cashlessforms/fhpl_health/FHPLHealthInsuranceDashboard";
import FHPLMedicalDashboard from "@/components/insurance/cashlessforms/fhpl_medical/FHPLMedicalDashboard";
import HDFCErgoHealthInsuranceDashboard from "@/components/insurance/cashlessforms/bajaj/BajajHealthInsuranceDashboard.jsx";
import MediAssistDashboard from "@/components/insurance/cashlessforms/medi_assist/MediAssistDashboard";
import StarHealthDashboard from "@/components/insurance/cashlessforms/star_health/StarHealthDashboard";
import BajajHealthInsuranceDashboard from "@/components/insurance/cashlessforms/bajaj/BajajHealthInsuranceDashboard.jsx";

export default function FormPage({ params }) {
  const { form, id } = params;

  switch (form) {
    case "fhplmedicalcashlessform":
      return <FHPLMedicalDashboard id={id} />;

    case "fhplhealthcashlessform":
      return <FHPLHealthInsuranceDashboard id={id} />;

    case "mediassistcashlessform":
      return <MediAssistDashboard id={id} />;

    case "starhealthcashlessform":
      return <StarHealthDashboard id={id} />;

    case "aegonhealthcashlessform":
      return <AegonHealthInsuranceDashboard id={id} />;

    case "adityabirlacashlessform":
      return <AdityaBirlaHealthInsuranceDashboard id={id} />;

    case "bajajhealthinsurancecashlessform":
      return <BajajHealthInsuranceDashboard id={id} />;

    default:
      return <div>Unknown form type: {form}</div>;
  }
}
