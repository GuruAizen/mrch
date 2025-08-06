import React from "react";
import page1 from "@/assets/form_templates/hdfc_ergo/hdfc_ergo_page_1.jpg";
import styled, { css } from "styled-components";
import {
  ageGaps,
  dobGaps,
  parseAgeToYYMM,
  parseDOBtoDDMMYYYY,
  parseTimeToHHMM,
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
  font-size: 14px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 20;
  border: 1px solid tomato;
`;

const Field = styled.div`
  position: absolute;
  font-size: 12px;
  font-family: Arial, sans-serif;
  color: #000;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 20;
  text-transform: uppercase;
`;

const FieldBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: center;
  font-family: Arial, sans-serif;
  color: #000;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  font-size: ${({ fontSize }) => fontSize || 12}px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
  z-index: 20;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  border: 1px solid tomato;
`;

const EraseArea = styled.div`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: white;
  z-index: 10;
  opacity: 1;
  border: 1px solid tomato;
`;

const HDFCErgoPage1 = ({ data }) => {
  const renderCharByChar = (text, top, left, gap) => {
    if (!text) return null;
    return [...(text || "")].map((char, index) => (
      <Field key={index} top={top} left={left + index * gap}>
        {char}
      </Field>
    ));
  };

  const renderCharByCharWithGaps = (
    text,
    top,
    left,
    gaps = [],
    defaultGap = 15.3
  ) => {
    const chars = [...(text || "")];
    let offset = 0;

    return chars.map((char, index) => {
      const field = (
        <Field key={index} top={top} left={left + offset}>
          {char}
        </Field>
      );
      offset += gaps[index] ?? defaultGap;
      return field;
    });
  };

  const renderParagraph = (text, top, left, width, height, fontSize) => (
    <FieldBox
      top={top}
      left={left}
      width={width}
      height={height}
      fontSize={fontSize}
    >
      {text || ""}
    </FieldBox>
  );

  const renderNumberRightAligned = (
    text,
    top,
    left,
    gaps = [],
    defaultGap = 15.3
  ) => {
    const digits = [...(text?.toString() || "")];
    const totalBoxes = 7;
    const paddedDigits = digits.slice(-totalBoxes);
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
  const renderMonthYearWithGaps = (
    value,
    top,
    left,
    gaps = [15, 16, 15, 16]
  ) => {
    const clean = normalizeString(value).replace("/", "").replaceAll(" ", "");
    const chars = clean.slice(0, 2) + clean.slice(-2);
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
      const val = normalizeString(data?.[key]);
      return !val || val === "false" || val === "n/a";
    });
  };
  const renderCheckboxTick = (condition, top, left) => {
    const normalized = normalizeString(condition);
    if (normalized && normalized !== "n/a" && normalized !== "false") {
      return (
        <Tick top={top} left={left}>
          ✓
        </Tick>
      );
    }
    return null;
  };
  const renderSingleCharByChar = (text, top, left, gaps = []) => {
    return [...(text || "")].map((char, index) => {
      const offset = gaps.slice(0, index).reduce((acc, g) => acc + g, 0);
      return (
        <Field key={index} top={top} left={left + offset}>
          {char}
        </Field>
      );
    });
  };

  const proposedLineOfTreatmentFn = (keyword) => {
    const value = normalizeString(data?.proposedLineOfTreatment);
    return value.includes(normalizeString(keyword));
  };

  const routeOfDrugAdministrationFn = (keyword) => {
    const value = normalizeString(data?.routeOfDrugAdministration);
    return value.includes(normalizeString(keyword));
  };

  const isEmergencyType = (type = "") => {
    const event = normalizeString(data?.isThisAEmergencyOrPlannedEvent);
    return event.includes(normalizeString(type));
  };

  const safeUpper = (text = "") => {
    const normalized = normalizeString(text);
    if (normalized === "null" || normalized === "undefined") return "";
    return text;
  };

  return (
    <PageContainer>
      <PageWrapper pagebreak={true}>
        <BackgroundImage src={page1.src} alt="Background Form" />
        {renderParagraph(
          safeUpper(data?.nameOfTheHospital || ""),
          176,
          120,
          600,
          10,
          8
        )}
        {renderParagraph(data?.hospitalLocation || "", 189, 100, 650, 10, 8)}
        {/* {renderParagraph(data?.hospitalId || "", 125, 600.4, 15.25)} */}
        {renderParagraph(data?.rohiniId || "", 203, 100, 650, 10, 8)}
        {renderParagraph(data?.email || "", 216, 100, 630, 10, 8)}
        {renderCharByChar(data?.patientName || "", 229, 140.9, 15.3)}

        {/* Gender tick */}
        {normalizeString(data?.gender) === "male" && (
          <Tick top={247} left={99}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.gender) === "female" && (
          <Tick top={247} left={140}>
            ✔
          </Tick>
        )}
        {normalizeString(data?.gender) === "thirdgender" && (
          <Tick top={247} left={201}>
            ✔
          </Tick>
        )}
        {renderCharByChar(data?.contactNo || "", 250, 340, 15.3)}
        {renderCharByChar(data?.contactNo || "", 252, 600, 15.3)}

        {/* AGE YY MM */}
        <EraseArea top={274} left={100} width={8} height={12} />
        <EraseArea top={274} left={115} width={8} height={12} />
        <EraseArea top={274} left={162} width={10} height={12} />
        <EraseArea top={274} left={178} width={10} height={12} />
        {renderSingleCharByChar(
          parseAgeToYYMM(data?.age || ""),
          272,
          101,
          [15, 47, 15, 33]
        )}

        {/* DOB DD MM YYYY */}
        <EraseArea top={274} left={262} width={10} height={12} />
        <EraseArea top={274} left={277} width={10} height={11} />
        <EraseArea top={274} left={292} width={10} height={11} />
        <EraseArea top={274} left={309} width={8} height={11} />
        <EraseArea top={274} left={323} width={10} height={11} />
        <EraseArea top={274} left={338} width={10} height={11} />
        <EraseArea top={274} left={353} width={10} height={11} />
        <EraseArea top={274} left={369} width={10} height={10} />
        {renderSingleCharByChar(
          parseDOBtoDDMMYYYY(data?.dateOfBirth || ""),
          272,
          263,
          dobGaps
        )}

        {/* INSURED ID NUMBER */}
        {renderCharByChar(data?.insuredIdCardNo || "", 271, 479, 14.9)}

        {/* POLICY NO / NAME OF CORPORATE */}
        {renderCharByCharWithGaps(data?.corporate || "", 292, 187, [14])}

        {/* EMPLOYEE ID */}
        {renderCharByCharWithGaps(
          data?.employeeId || "",
          292,
          614,
          [14, 16, 15, 16]
        )}

        {/* MEDICAL CLAIM / HEALTH INSURANCE */}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "yes" && (
          <Tick top={311} left={292}>
            ✔
          </Tick>
        )}
        {normalizeString(
          data?.currentlyDoYouHaveAnyOtherMedicalClaimHealthInsurance
        ) === "no" && (
          <Tick top={311} left={324}>
            ✔
          </Tick>
        )}

        {/* INSURER NAME */}
        {renderCharByCharWithGaps(
          data?.insuranceName || "",
          313,
          446,
          [15, 16, 15, 16, 15, 15, 15, 15, 15, 15]
        )}

        {/* GIVE DETAILS */}
        {renderParagraph(data?.giveDetails || "", 335, 106, 639, 32, 10)}

        {/* FAMILY PHYSICIAN NAME */}
        {renderCharByCharWithGaps(
          data?.familyPhysicianName || "",
          370,
          217,
          [15, 17, 15, 13, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* CONTACT NO */}
        {renderCharByCharWithGaps(
          data?.contactNo || "",
          370,
          600,
          [15, 15, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}

        {/* OCCUPATION OF INSURED PATIENT */}
        {renderCharByCharWithGaps(
          data?.occupation || "",
          392,
          170,
          [16, 16, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default HDFCErgoPage1;
