import page5 from "@/assets/form_templates/star_health/star_health_page_5.jpg";
import styled, { css } from "styled-components";

import {
  ageGaps,
  dobGaps,
  getAgeYYMM,
  getTimeFromDate,
  getValidFormattedDate,
  parseAgeToYYMM,
  parseDOBtoDDMMYY,
  parseDOBtoDDMMYYYY,
  parseTimeToHHMM,
  truncateToGaps,
} from "./functions";

export const normalizeString = (value) =>
  String(value ?? "")
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
    .trim()
    .toLowerCase();

const PageContainer = styled.div`
  position: relative;
  width: 210mm;
  height: 297mm;
  margin: 0 auto;

  @media print {
    position: relative;
    top: 0;
    left: 0;
    width: 210mm;
    height: 297mm;
    margin: 0;
  }
`;

const PageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 210mm;
  height: 297mm;
  box-sizing: border-box;
  z-index: 1;

  @media print {
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 0;
    page-break-inside: avoid;
    ${({ pagebreak }) =>
      pagebreak &&
      css`
        page-break-after: always;
        break-after: page;
      `}
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 210mm;
  height: 297mm;
  object-fit: fill;
  margin: 0;
  padding: 0;
  pointer-events: none;
  user-select: none;
  z-index: 0;

  @media print {
    width: 210mm;
    height: 297mm;
    object-fit: fill;
  }
`;
const Tick = styled.div`
  position: absolute;
  font-size: 12px;
  font-size: ${({ fontSize }) => fontSize}px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  /* border: 1px solid tomato; */
  /* background-color: red; */
`;

const Field = styled.div`
  position: absolute;
  font-size: 12px;
  font-family: Arial, sans-serif;
  color: #000;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 20; // <-- ensure it is above EraseArea
  text-transform: uppercase; // Apply uppercase via CSS
  /* border: 1px dashed red; // Helps you visualize the box while aligning */
`;

const FieldBox = styled.div`
  position: absolute;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-content: center;
  font-family: Arial, sans-serif;
  color: #000;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
  z-index: 20;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase; // Apply uppercase via CSS
`;

//Apply whitener in specific area
const EraseArea = styled.div`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: white; // or whatever color matches your form background
  z-index: 10; // Above background image, below text
  opacity: 1; // Fully opaque to hide background
  /* border: 1px solid tomato; */
`;
const StyledImage = styled.img`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  z-index: ${({ zIndex }) => zIndex || 1};
  opacity: ${({ opacity }) => opacity || 1};
  pointer-events: none;
  user-select: none;
`;

const StarHealthPage5 = ({ data }) => {
  // console.log(data, "medi assist result");

  const renderCharByChar = (text, top, left, gap) => {
    if (typeof text !== "string") return null;

    return [...(text || "")].map((char, index) => (
      <Field key={index} top={top} left={left + index * gap}>
        {char}
      </Field>
    ));
  };

  // too short — rest will use default gap
  //   {renderCharByCharWithGaps(myLongText, 300, 100, customGaps, 12)} // last gap = 12

  const renderCharByCharWithGaps = (
    text,
    top,
    left,
    gaps = [],
    defaultGap = 15.4
  ) => {
    const chars = [...(text || "")];

    let offset = 0;

    return chars.map((char, index) => {
      const field = (
        <Field key={index} top={top} left={left + offset}>
          {char}
        </Field>
      );

      // Add next gap or default gap for next char
      offset += gaps[index] ?? defaultGap;

      return field;
    });
  };
  const renderImage = (
    src,
    top,
    left,
    width,
    height,
    zIndex = 1,
    opacity = 1
  ) => (
    <StyledImage
      src={src}
      top={top}
      left={left}
      width={width}
      height={height}
      zIndex={zIndex}
      opacity={opacity}
      alt=""
    />
  );

  const renderParagraph = (text, top, left, width, height) => (
    <FieldBox
      top={top}
      left={left}
      width={width}
      height={height}
      //   style={{ border: "1px solid tomato" }}
    >
      {text || ""}
    </FieldBox>
  );

  const proposedLineOfTreatmentFn = (keyword) =>
    data?.proposedLineOfTreatment
      ?.toLowerCase()
      .includes(keyword.toLowerCase()) || false;

  const routeOfDrugAdministrationFn = (keyword) =>
    data?.routeOfDrugAdministration
      ?.toLowerCase()
      .includes(keyword.toLowerCase()) || false;

  const isEmergencyType = (type = "") => {
    const event =
      data?.isThisAEmergencyOrPlannedEvent?.toLowerCase().trim() || "";
    return event.includes(type.toLowerCase().trim());
  };

  /*****************GAP FOR EVERY CHARACTER ********************/
  const renderSingleCharByChar = (text, top, left, gaps = []) => {
    return [...(text || "")].map((char, index) => {
      // Calculate left offset by summing all previous gaps + base left
      const offset = gaps.slice(0, index).reduce((acc, g) => acc + g, 0);

      return (
        <Field key={index} top={top} left={left + offset}>
          {char}
        </Field>
      );
    });
  };

  const safeUpper = (text = "") => {
    if (!text || typeof text !== "string") return "";

    const trimmed = text.trim().toLowerCase();
    if (trimmed === "null" || trimmed === "undefined") return "";

    return text;
  };
  const shouldShowNoOtherAilments = () => {
    const chronicFields = [
      "diabetesSinceTf",
      "heartDiseaseSinceTf",
      "hypertensionSinceTf",
      "hyperlipidemiasSinceTf",
      "osteoarthritisSinceTf",
      "asthmaCopdBronchitisSinceTf",
      "cancerSinceTf",
      "alcoholDrugabuseSinceTf",
      "hivstdSinceTf",
      "anyOtherailmentSinceTf",
    ];

    return chronicFields.every((key) => {
      const val = data?.[key]?.toLowerCase() || "";
      return !val || val === "false" || val === "n/a";
    });
  };

  const renderMonthYearWithGaps = (
    value,
    top,
    left,
    gaps = [15, 16, 15, 16]
  ) => {
    const clean = (value || "").replace("/", "").replaceAll(" ", ""); // ensure no slash or space
    const chars = clean.slice(0, 2) + clean.slice(-2); // MMYY only

    let offset = 0;

    return [...chars].map((char, index) => {
      const field = (
        <Field key={index} top={top} left={left + offset}>
          {char}
        </Field>
      );
      offset += gaps[index] ?? 15;
      return field;
    });
  };

  const renderCheckboxTick = (condition, top, left) => {
    if (
      condition &&
      condition.toLowerCase() !== "n/a" &&
      condition.toLowerCase() !== "false"
    ) {
      return (
        <Tick top={top} left={left}>
          ✓
        </Tick>
      );
    }
    return null;
  };
  /***************** FOR 7 th EVERY CHARACTER ********************/

  const renderNumberRightAligned = (
    text,
    top,
    left,
    gaps = [],
    defaultGap = 15.3
  ) => {
    const digits = [...(text?.toString() || "")];
    const totalBoxes = 7;

    // Trim to last 7 digits if too long
    const paddedDigits = digits.slice(-totalBoxes);

    // Calculate how many empty boxes needed at the front
    const emptyBoxes = totalBoxes - paddedDigits.length;

    let offset = 0;

    return Array.from({ length: totalBoxes }).map((_, index) => {
      const charIndex = index - emptyBoxes;
      const char = charIndex >= 0 ? paddedDigits[charIndex] : "";

      const field = (
        <Field key={index} top={top} left={left + offset}>
          {char}
        </Field>
      );

      offset += gaps[index] ?? defaultGap;

      return field;
    });
  };

  // console.log("Raw:", data?.isItRta, "data:", data);
  // console.log("Normalized:", normalizeString(data?.isItRta));

  return (
     <PageContainer>
          <PageWrapper pageBreak={true}>
            <BackgroundImage src={page5.src} alt="Background Form" />
        {/********************************** I AM ADMITTED ****************************/}
        {renderParagraph(data?.nameOfTheHospital || "", 553, 243, 215, 16)}

        {renderParagraph(
          getValidFormattedDate(data?.dateOfAdmission) || "",
          553,
          485,
          67,
          18
        )}

        {/********************************** PATIENT / INSURER'S NAME ****************************/}
        {renderParagraph(data?.patientName || "", 683, 295, 250, 18)}

        {/********************************** CONTACT NUMBER ****************************/}
        {renderParagraph(data?.contactNo || "", 710, 295, 250, 18)}

        {/********************************** EMAIL ID ****************************/}
        {renderParagraph(data?.email || "", 745, 295, 250, 18)}

        {/********************************** PATIENT SIGNATURE ****************************/}
        {/* {renderImage(
          docsign, // src
          390, // top (pixels from top)
          480, // left (pixels from left)
          135, // width in px
          45, // height in px
          3, // zIndex: place above content
          1 // opacity: 10% for watermark effect
        )} */}
        {/********************************** DATE ****************************/}
        {renderParagraph(
          getValidFormattedDate(data?.dateAndTimeOfAdmission) || "",
          806,
          133,
          168,
          18
        )}

        {/********************************** TIME ****************************/}
        {renderParagraph(
          getTimeFromDate(data?.dateAndTimeOfAdmission) || "",
          805,
          445,
          103,
          18
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default StarHealthPage5;
