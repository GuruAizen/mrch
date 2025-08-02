export const filledData = {};
export const normalizeString = (str) => (str || "").trim().toLowerCase();
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

export const ageGaps = [10, 15, 20, 10, 15, 20]; // Adjust this as needed

/********************************** DOB DD MM YYYY ****************************/

export const getDateOnly = (dateStr = "") => {
  return dateStr.split(" ")[0]; // "02/06/2020"
};
export const dateGaps = [8, 13, 13, 7, 13, 13, 7, 7, 7, 10]; // sample for "02/06/2020"

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
  17, // between second D and first M
  15, // between M and M (e.g., '0' and '6')
  15, // between second M and first Y
  15, // between Y and Y
  15, // between second Y and third Y
  15, // between third Y and fourth Y
];
