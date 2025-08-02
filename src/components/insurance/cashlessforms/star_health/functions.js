export const normalizeString = (str) =>
  String(str || "")
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
    .trim()
    .toLowerCase();

export const hasValidDate = (dateStr) => {
  const trimmed = (dateStr || "").trim().toLowerCase();

  if (!trimmed || ["null", "undefined", "not applicable"].includes(trimmed)) {
    return "no";
  }

  // Check if it's a valid date
  const timestamp = Date.parse(trimmed);
  if (isNaN(timestamp)) return "no";

  return "yes";
};

export const getValidFormattedDate = (dateStr) => {
  if (!dateStr) return "-";

  const trimmed = dateStr.trim().toLowerCase();
  if (trimmed === "" || trimmed === "null") return "-";

  // Expected format: "DD/MM/YYYY HH:mm:ss" or "DD/MM/YYYY"
  // Split date and time parts
  const [datePart] = trimmed.split(" ");

  const dateParts = datePart.split("/");
  if (dateParts.length !== 3) return "-";

  const [dd, mm, yyyy] = dateParts.map(Number);

  // Validate numbers
  if (
    isNaN(dd) ||
    isNaN(mm) ||
    isNaN(yyyy) ||
    dd < 1 ||
    dd > 31 ||
    mm < 1 ||
    mm > 12 ||
    yyyy < 1000
  ) {
    return "-";
  }

  

  // Return formatted date DD/MM/YYYY (already in that format)
  return `${String(dd).padStart(2, "0")}/${String(mm).padStart(
    2,
    "0"
  )}/${yyyy}`;
};

export const getTimeFromDate = (dateStr) => {
  if (!dateStr) return "-";

  const trimmed = dateStr.trim().toLowerCase();
  if (trimmed === "" || trimmed === "null") return "-";

  // Split time part
  const timePart = trimmed.split(" ")[1];
  if (!timePart) return "-";

  const timeParts = timePart.split(":");
  if (timeParts.length !== 3) return "-";

  const [hh, mm, ss] = timeParts.map(Number);

  if (
    isNaN(hh) ||
    isNaN(mm) ||
    isNaN(ss) ||
    hh < 0 ||
    hh > 23 ||
    mm < 0 ||
    mm > 59 ||
    ss < 0 ||
    ss > 59
  ) {
    return "-";
  }

  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(
    2,
    "0"
  )}:${String(ss).padStart(2, "0")}`;
};
export const getDateOnly = (dateStr = "") => {
  return dateStr.split(" ")[0]; // "02/06/2020"
};


export const dateGaps = [8, 8, 13, 7, 13, 13, 7, 7, 7, 10]; // sample for "02/06/2020"

/**********************************AGE 5 Y MM YY ****************************/
export function parseAgeToYYMM(ageStr) {
  let years = 0;
  let months = 0;

  // Example input: "5 Y", "5 Y 3 M", "10 Y 0 M"
  const yearMatch = ageStr.match(/(\d+)\s*Y/i);
  if (yearMatch) {
    years = parseInt(yearMatch[1], 10);
  }

  const monthMatch = ageStr.match(/(\d+)\s*M/i);
  if (monthMatch) {
    months = parseInt(monthMatch[1], 10);
  }

  const yearsStr = years.toString().padStart(2, "0");
  const monthsStr = months.toString().padStart(2, "0");

  return yearsStr + monthsStr; // e.g. "0500" or "0503"
}

export const ageGaps = [15, 48, 15, 33];

export const truncateToGaps = (text, gaps) =>
  text.length > gaps ? text.slice(0, gaps) : text;

/********************************** DOB DD MM YYYY ****************************/

export function parseDOBtoDDMMYYYY(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return "00000000";

  const parts = dateStr.split(" ")[0].split("/"); // → ["15", "07", "2025"]
  if (parts.length !== 3) return "00000000";

  const [day, month, year] = parts;

  if (isNaN(Number(day)) || isNaN(Number(month)) || isNaN(Number(year)))
    return "00000000";

  return day.padStart(2, "0") + month.padStart(2, "0") + year;
}
export function parseAgeToYYMMCharsWithLabels(ageStr) {
  let years = 0;
  let months = 0;

  const yearMatch = ageStr.match(/(\d+)\s*Y/i);
  if (yearMatch) years = parseInt(yearMatch[1], 10);

  const monthMatch = ageStr.match(/(\d+)\s*M/i);
  if (monthMatch) months = parseInt(monthMatch[1], 10);

  const yearsStr = years.toString().padStart(2, "0");
  const monthsStr = months.toString().padStart(2, "0");

  return [...yearsStr, "Y", ...monthsStr, "M"];
}

export function parseDOBtoDDMMYY(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return "00000000";

  const parts = dateStr.split(" ")[0].split("/"); // Supports "15/08/2025" or "15/08/25"
  if (parts.length !== 3) return "00000000";

  let [day, month, year] = parts;

  // Normalize parts
  if (isNaN(+day) || isNaN(+month) || isNaN(+year)) return "00000000";

  // Fix year if only 2 digits
  if (year.length === 2) {
    year = Number(year) > 50 ? `19${year}` : `20${year}`;
  }

  return day.padStart(2, "0") + month.padStart(2, "0") + year.slice(-2);;
}


export function parseTimeToHHMM(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return "0000";

  const [datePart, timePart] = dateStr.split(" ");
  if (!datePart || !timePart) return "0000";

  const [day, month, year] = datePart.split("/");
  const [hour, minute] = timePart.split(":");

  const validHour = hour?.padStart(2, "0") ?? "00";
  const validMinute = minute?.padStart(2, "0") ?? "00";

  return `${validHour}${validMinute}`; // → "1510"
}

export const dobGaps = [
  15, // between D and D (e.g., '0' and '2')
  15, // between second D and first M
  15, // between M and M (e.g., '0' and '6')
  15, // between second M and first Y
  14, // between Y and Y
  14, // between second Y and third Y
  14, // between third Y and fourth Y
];

export const mainFilledData = {
  cashlessFormId: 60,

  //FHPL
  tollFreePhoneNumber: "9384434576",
  tollFreeTax: "9384434576",
  contactNoOfAttendingRelative: "",
  currentMedicalInsuranceCompanyName: "",
  currentMedicalCompanyDetails: "",

  policyId: 12345,
  groupId: 54321,
  corporateId: 7890,
  corporate: "Apex Solutions Group",
  groupName: "Apex Solutions Group",
  corporateEmployeeId: 1001,
  employeeName: "Asif Khan",
  relation: "Self",
  patientName: "Asif",
  patientId: 5001,
  uhid: "5645654",
  contactNo: "7646777891",
  dateOfBirth: "02/06/2020 00:00:00",
  gender: "male",
  age: "5 Y",
  payerName: "Asif Khan",
  insuranceName: "HealthCare Plus",
  giveDetails:
    "Patient experienced intermittent fever and body ache for 3 days. Initial diagnosis suggested viral infection. Further tests confirmed no bacterial involvement. Treatment initiated with antipyretics and rest.",
  additionalPayerName: "Family",
  additionalPolicyNumber: "POL1234567",
  email: "asif@gmail.com",
  occupation: "Business Man",
  emergencyContact: "9876543210",
  insuredIdCardNo: "ID123456789",
  policyNumber: "POL09876543219876543210",
  employeeId: "EMP100100",
  memberId: "MEM1001",
  currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance: "No",
  doYouHaveAFamilyPhysician: "Yes",
  currentPatientAddress: "123, Main Street, Bhubaneswar",
  nameOfTheTreatingDoctor: "Dr. Rajesh Kumar",
  doctorContactNo: "0123456789",
  relevantClinicalFindings: "Normal clinical findings",
  natureOfIllnessWithPresentingComplaints: "Fever, cough, and cold",
  durationOfPresentIllness: "3 days",
  doctorDateOfFirstConsultation: "10/07/2025 09:00:00",
  pastHistoryPresentIllness: "No significant past illness",
  provisionalDiagnosis: "Viral Fever",
  icd10Code: "J11",
  ifInvestigativeOfMedicalManagementProvideDetails: "Blood tests and X-ray",
  routeOfDrugAdministration: "Heart disesase",
  proposedLineOfTreatment: "Medical management with antipyretics",
  surgicalNameOfSurgery: "N/A",
  icd10PcsCode: "N/A",
  ifOtherTreatmentDetails: "None",
  howDidInjuryOccur: "N/A",
  dateOfInjury: "01/01/1900 00:00:00",
  isItRta: "no",
  reportedToPolice: "no",
  firNo: "N/A",
  injuryDueToAlcoholConsumption: "no",
  testsConductedToEstablish: "no",
  expectedDateOfDelivery: "01/01/1900 00:00:00",
  maternityG: "10",
  maternityP: "20",
  maternityL: "30",
  maternityA: "40",
  dateAndTimeOfAdmission: "15/07/2025 10:00:00",
  expectedNoOfDaysStayInHospital: "3",
  isThisAEmergencyOrPlannedEvent: "an emergency",
  roomType: "General Ward",
  perDayRoomRentNursingServiceCharges: "1500",
  expectedCostForInvestigationDiagnostics: "2000",
  icuCharges: "0",
  otCharges: "11230",
  professionalFeesSurgeonAnesthetistFeesConsultationCharges: "1000",
  medicinesConsumablesCostOfImplantsIfApplicablePleaseSpecify: "500",
  allInclusivePackageChargesIfAnyApplicable: "22220",
  sumTotalExpectedCostOfHospitalization: "5000",
  nameOfTheHospital: "Sum Hospital",
  hospitalLocation: "Bhubaneswar",
  hospitalId: "4",
  hospitalMobileNo: "8768867886",
  hospitalEmail: "asif@gmail.com",
  hospitalSumTotalExpectedCostOfHospitalization: "5000",
  dateOfAdmission: "15/07/2025 10:00:00",
  idCardNumber: "ID10001",
  address: "Plot-11, Bhubaneswar, Odisha, 751001",
  duration: "3 days",
  city: "Bhubaneswar",
  state: "Odisha",
  pincode: "751001",
  investigation: "Blood tests, X-ray",
  patientPanNumber: "ABCDE1234F",
  tariff: "Standard",
  rate: "1500",
  surgeryCode: "N/A",
  sumInsured: "100000",
  rohiniId: "R1234",
  dateOfFirstConsultation: "10/07/2025 09:00:00",
  findings: "Mild fever, no complications",
  primaryMember: "Asif Khan",
  doYouHaveAFamilyPhysician: "no",
  familyPhysicianName: "Dr. Meena Singh",
  familyPhysicianContactNumber: "0987654321",
  specialCase: false,
  pastHistoryOfPresentAilment: "false",
  intensiveCare: "No",
  presentAilmentDueToPed: false,
  presentAilmentDuration: "311 days",
  daysInIcu: "0",

  diabetesSince: "N/A",
  diabetesSinceTf: "N/A",
  diabetesRemarks: "No diabetes history",

  heartDiseaseSince: "N/A",
  heartDiseaseSinceTf: "N/A",
  heartDiseaseRemarks: "No heart disease",

  hyperlipidemiasSince: "N/A",
  hyperlipidemiasSinceTf: "N/A",
  hyperlipidemiasRemarks: "No hyperlipidemia",

  osteoarthritisSince: "03/2021",
  osteoarthritisSinceTf: "true",
  osteoarthritisRemarks: "Mild knee arthritis",

  hypertensionSince: "04/2022",
  hypertensionSinceTf: "true",
  hypertensionRemarks: "Under control",

  asthmaCopdBronchitisSince: "N/A",
  asthmaCopdBronchitisSinceTf: "N/A",
  asthmaCopdBronchitisRemarks: "No respiratory conditions",

  cancerSince: "N/A",
  cancerSinceTf: "N/A",
  cancerRemarks: "No cancer history",

  alcoholDrugabuseSince: "N/A",
  alcoholDrugabuseSinceTf: "N/A",
  alcoholDrugabuseRemarks: "No history of abuse",

  hivstdSince: "N/A",
  hivstdSinceTf: "N/A",
  hivstdRemarks: "No HIV/STD",

  anyOtherailmentSince: "N/A",
  anyOtherailmentSinceTf: "N/A",
  anyOtherailmentRemarks: "No other ailments",

  clinicalFindings: "No abnormality detected",
  otherTreatments: "None",
  dateAndTimeOfSignature: "17/07/2025 15:10:00",
  nameOfTreatingDoctor: "Dr. Rajesh Kumar",
  doctorQualification: "BDS, MDS",
  registrationNumberWithStateCode: "30AB1234",
  hospitalDateAndTimeOfSignature: "17/07/2025 15:15:00",
  documentDetails: "All documents submitted successfully",
  status: "submitted",
  active: true,
  deleted: false,
  createTs: "17/07/2025 15:11:20",
  updateTs: "17/07/2025 15:11:20",
  aggregatorCase: false,

  diabetes: false,
  hypertension: false,
  heartDisease: false,
  hyperlipidemias: false,
  osteoarthritis: false,
  asthmaCopdBronchitis: false,
  cancer: false,
  alcoholDrugabuse: false,
  hivstd: false,
  anyOtherailment: false,
};
