// src/app/forms/[form]/[id]/page.js

import AegonHealthInsuranceDashboard from "@/components/insurance/cashlessforms/aegon/AegonHealthInsuranceDashboard";
import FHPLHealthInsuranceDashboard from "@/components/insurance/cashlessforms/fhpl_health/FHPLHealthInsuranceDashboard";
import FHPLMedicalDashboard from "@/components/insurance/cashlessforms/fhpl_medical/FHPLMedicalDashboard";
import MediAssistDashboard from "@/components/insurance/cashlessforms/medi_assist/MediAssistDashboard";
import StarHealthDashboard from "@/components/insurance/cashlessforms/star_health/StarHealthDashboard";

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

    default:
      return <div>Unknown form type: {form}</div>;
  }
}
