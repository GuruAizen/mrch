export const normalizeString = (value) =>
  String(value ?? "")
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
    .trim()
    .toLowerCase();

    
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
export function parseAgeToLabel(ageStr) {
  let years = 0;
  let months = 0;

  if (!ageStr || typeof ageStr !== 'string') {
    return "00 Years 00 Months";
  }

  // Match years: e.g. "5Y", "5 Y"
  const yearMatch = ageStr.match(/(\d+)\s*Y/i);
  if (yearMatch) {
    years = parseInt(yearMatch[1], 10);
  }

  // Match months: e.g. "3M", "3 M"
  const monthMatch = ageStr.match(/(\d+)\s*M/i);
  if (monthMatch) {
    months = parseInt(monthMatch[1], 10);
  }

  const yearsStr = years.toString().padStart(2, "0");
  const monthsStr = months.toString().padStart(2, "0");

  return `${yearsStr} Years ${monthsStr} Months`;
}


/**********************************AGE 5 Y MM YY ****************************/
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
export const getDateOnly = (dateStr = "") => {
  return dateStr.split(" ")[0]; // "02/06/2020"
};
export const ageGaps = [15, 45, 15, 33];

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
// export const getValidFormattedDateArray = (dateStr) => {
//   if (!dateStr) return ["-", "-", "-", "-", "-", "-", "-", "-"];

//   const trimmed = dateStr.trim().toLowerCase();
//   if (trimmed === "" || trimmed === "null") return ["-", "-", "-", "-", "-", "-", "-", "-"];

//   const [datePart] = trimmed.split(" ");
//   const dateParts = datePart.split("/");
//   if (dateParts.length !== 3) return ["-", "-", "-", "-", "-", "-", "-", "-"];

//   const [dd, mm, yyyy] = dateParts.map(Number);

//   if (
//     isNaN(dd) || dd < 1 || dd > 31 ||
//     isNaN(mm) || mm < 1 || mm > 12 ||
//     isNaN(yyyy) || yyyy < 1000
//   ) {
//     return ["-", "-", "-", "-", "-", "-", "-", "-"];
//   }

//   const ddStr = String(dd).padStart(2, "0");
//   const mmStr = String(mm).padStart(2, "0");
//   const yyyyStr = String(yyyy).padStart(4, "0");

//   return [
//     ddStr[0], ddStr[1],
//     mmStr[0], mmStr[1],
//     yyyyStr[0], yyyyStr[1], yyyyStr[2], yyyyStr[3]
//   ];
// };
export const getValidFormattedDateArray = (dateStr) => {
  // Fallback return for invalid input
  const fallback = ["-", "-", "-", "-", "-", "-", "-", "-"];

  // Null/undefined or non-string check
  if (!dateStr || typeof dateStr !== "string") return fallback;

  // Trim and sanitize input
  const trimmed = dateStr.trim().toLowerCase();
  if (trimmed === "" || trimmed === "null") return fallback;

  // Split off time part if present
  const [datePart] = trimmed.split(" ");
  const dateParts = datePart.split("/");

  // Must have exactly 3 parts (DD/MM/YYYY)
  if (dateParts.length !== 3) return fallback;

  // Parse numbers
  const [dd, mm, yyyy] = dateParts.map(Number);

  // Validate ranges
  if (
    isNaN(dd) || dd < 1 || dd > 31 ||
    isNaN(mm) || mm < 1 || mm > 12 ||
    isNaN(yyyy) || yyyy < 1000
  ) {
    return fallback;
  }

  // Pad with 0s
  const ddStr = String(dd).padStart(2, "0");
  const mmStr = String(mm).padStart(2, "0");
  const yyyyStr = String(yyyy).padStart(4, "0");

  // Return array of digits
  return [
    ddStr[0], ddStr[1],
    mmStr[0], mmStr[1],
    yyyyStr[0], yyyyStr[1], yyyyStr[2], yyyyStr[3]
  ];
};
export const getMonthYearArray = (dateStr) => {
  // Fallback return for invalid input
  const fallback = ["-", "-", "-", "-"];

  // Null/undefined or non-string check
  if (!dateStr || typeof dateStr !== "string") return fallback;

  // Trim and sanitize input
  const trimmed = dateStr.trim().toLowerCase();
  if (trimmed === "" || trimmed === "null") return fallback;

  // Split off time part if present
  const [datePart] = trimmed.split(" ");
  const dateParts = datePart.split("/");

  // Must have exactly 3 parts (DD/MM/YYYY)
  if (dateParts.length !== 3) return fallback;

  // Parse numbers
  const [dd, mm, yyyy] = dateParts.map(Number);

  // Validate ranges
  if (
    isNaN(dd) || dd < 1 || dd > 31 ||
    isNaN(mm) || mm < 1 || mm > 12 ||
    isNaN(yyyy) || yyyy < 1000
  ) {
    return fallback;
  }

  // Pad with 0s
  const mmStr = String(mm).padStart(2, "0");
  const yyyyStr = String(yyyy).padStart(4, "0");

  // Return array: MM, MM, YY, YY
  return [
    mmStr[0], mmStr[1],
    yyyyStr[2], yyyyStr[3]
  ];
};



export const getTimeFromDate = (dateStr) => {
  if (!dateStr) return ["-", "-", "-", "-"];

  const trimmed = dateStr.trim().toLowerCase();
  if (trimmed === "" || trimmed === "null") return ["-", "-", "-", "-"];

  const timePart = trimmed.split(" ")[1];
  if (!timePart) return ["-", "-", "-", "-"];

  const timeParts = timePart.split(":");
  if (timeParts.length < 2) return ["-", "-", "-", "-"];

  const [hh, mm] = timeParts.map(Number);

  if (
    isNaN(hh) || hh < 0 || hh > 23 ||
    isNaN(mm) || mm < 0 || mm > 59
  ) {
    return ["-", "-", "-", "-"];
  }

  const hhStr = String(hh).padStart(2, "0");
  const mmStr = String(mm).padStart(2, "0");

  return [
    hhStr[0], // first digit of hour
    hhStr[1], // second digit of hour
    mmStr[0], // first digit of minute
    mmStr[1]  // second digit of minute
  ];
};


export const dobGaps = [
  15, // between D and D (e.g., '0' and '2')
  17, // between second D and first M
  15, // between M and M (e.g., '0' and '6')
  15, // between second M and first Y
  15, // between Y and Y
  15, // between second Y and third Y
  15, // between third Y and fourth Y
];

export const mainFilledData = {
  cashlessFormId: 60,

  //FHPL
  //TPA
  tollFreePhoneNumber: "9384434576",
  tollFreeTax: "9384434576",
  contactNoOfAttendingRelative: "9384434576",
  currentMedicalInsuranceCompanyName: "MEDI ASSIST",
  currentMedicalCompanyDetails: "",
  //FHPL MEDICAL INSURANCE
  hospitalFaxNo: "1505",
  hospitalPhoneNo: "1505",

  //STAR HEALTH
  rheumatoidArthritisSince: "N/A",
  rheumatoidArthritisSinceTf: "N/A",
  rheumatoidArthritisRemarks: "No rheumatoid disease",

  cerebroVascularSince: "N/A",
  cerebroVascularSinceTf: "N/A",
  cerebroVascularRemarks: "No cerebro vascular disease",

  liverDiseaseSince: "N/A",
  liverDiseaseSinceTf: "N/A",
  liverDiseaseRemarks: "No liver disease",

  kidneyDiseaseSince: "N/A",
  kidneyDiseaseSinceTf: "N/A",
  kidneyDiseaseRemarks: "No liver disease",

  gradeOfSurgery: "Grade II – Intermediate", // Example: Hernia Repair

  //////////////////////////////////////////////////////////////
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
  currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance: "no",
  doYouHaveAFamilyPhysician: "Yes",
  currentPatientAddress: "123, Main Street, Bhubaneswar, Bhubaneswar",
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
  routeOfDrugAdministration: "Heart disease",
  proposedLineOfTreatment: "Medical management with antipyretics",
  surgicalNameOfSurgery: "N/A",
  icd10PcsCode: "N/0DTJ0ZZ",
  ifOtherTreatmentDetails: "None",
  howDidInjuryOccur: "N/A",
  // dateOfInjury: "null",
  dateOfInjury: "01/01/1900 00:00:00",
  isItRta: "no",
  reportedToPolice: "no",
  // firNo: "FIR/2025/CHN/NORTH/00234/A",
  firNo: "365",
  injuryDueToAlcoholConsumption: "no",
  testsConductedToEstablish: "no",
  expectedDateOfDelivery: "05/11/1910 00:00:00",
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
  icuCharges: "220",
  otCharges: "11230",
  professionalFeesSurgeonAnesthetistFeesConsultationCharges: "1000",
  medicinesConsumablesCostOfImplantsIfApplicablePleaseSpecify: "500",
  otherHospitalExpenses: "1000",
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
  familyPhysicianName: "Dr. Meena Singh",
  familyPhysicianContactNumber: "0987654321",
  specialCase: false,
  pastHistoryOfPresentAilment: false,
  intensiveCare: "No",
  presentAilmentDueToPed: false,
  presentAilmentDuration: "311",
  daysInIcu: "10",

  diabetesSince: "15/08/2025",
  diabetesSinceTf: true,
  diabetesRemarks: "No diabetes history",

  heartDiseaseSince: "15/08/2025",
  heartDiseaseSinceTf: true,
  heartDiseaseRemarks: "No heart disease",

  hyperlipidemiasSince: "N/A",
  hyperlipidemiasSinceTf: true,
  hyperlipidemiasRemarks: "No hyperlipidemia",

  osteoarthritisSince: "03/2021",
  osteoarthritisSinceTf: "true",
  osteoarthritisRemarks: "Mild knee arthritis",

  hypertensionSince: "04/2022",
  hypertensionSinceTf: true,
  hypertensionRemarks: "Under control",

  asthmaCopdBronchitisSince: "N/A",
  asthmaCopdBronchitisSinceTf: true,
  asthmaCopdBronchitisRemarks: "No respiratory conditions",

  cancerSince: "12-12-2012",
  cancerSinceTf: true,
  cancerRemarks: "No cancer history",

  alcoholDrugabuseSince: "N/A",
  alcoholDrugabuseSinceTf: true,
  alcoholDrugabuseRemarks: "No history of abuse",

  hivstdSince: "N/A",
  hivstdSinceTf: true,
  hivstdRemarks: "No HIV/STD",

  anyOtherailmentSince: "N/A",
  anyOtherailmentSinceTf: false,
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
