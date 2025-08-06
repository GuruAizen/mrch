import React from "react";
import page2 from "@/assets/form_templates/hdfc_ergo/hdfc_ergo_page_2.jpg";
import docsign from "@/assets/form_templates/common/doctorsignature.jpg";
import hospitalseal from "@/assets/form_templates/common/hospitalseal.jpg";
import styled, { css } from "styled-components";
import {
  normalizeString,
  parseDOBtoDDMMYYYY,
  parseTimeToHHMM,
} from "./functions";
import { getTimeFromDate } from "./functions";
import { getValidFormattedDate } from "./functions";

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
  /* border: 1px solid tomato; */
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
  /* text-align: center; */
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
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

const EraseArea = styled.div`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: white;
  z-index: 10;
  opacity: 1;
  /* border: 1px solid tomato; */
  /* background-color: red; */
`;

const HDFCErgoPage2 = ({ data }) => {
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

  ////////////********************************************** */
  const timeDigits = getTimeFromDate(data?.dateAndTimeOfSignature);

  return (
    <PageContainer>
      <PageWrapper pagebreak={false}>
        <BackgroundImage src={page2.src} alt="Background Form" />

        {/***************************** NAME OF TREATING DOCTOR *******************************/}
        {renderCharByCharWithGaps(
          data?.nameOfTheTreatingDoctor || "",
          73.5,
          173,
          [
            13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
            13, 13, 13, 13, 13, 13, 13,
          ]
        )}

        {/* QUALIFICATION */}
        {renderCharByCharWithGaps(
          data?.doctorQualification || "",
          92,
          172,
          [
            13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
            13, 13, 13, 13, 13, 13, 13,
          ]
        )}
        {/* REGISTRATION WITH STATE CODE */}
        {renderCharByCharWithGaps(
          data?.registrationNumberWithStateCode || "",
          92,
          419,
          [
            13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
            13, 13, 13, 13, 13, 13, 13,
          ]
        )}

        {/* HOSPITAL SEAL */}
        {renderImage(hospitalseal.src, 116, 60, 120, 35, 3, 1)}

        {/* PATIENT / INSURER SIGNATURE */}
        {renderImage(docsign.src, 105, 570, 135, 50, 3, 1)}

        {/* PATIENT INSURE'S NAME */}
        {renderParagraph(data?.patientName || "", 337, 160, 550, 16)}

        {/* CONTACT NUMBER */}
        {renderParagraph(data?.contactNo || "", 368, 112, 110, 16)}

        {/* EMAIL ID OPTIONAL */}
        {renderParagraph(data?.email || "", 368, 430, 300, 16)}

        {/* PATIENT / INSURER SIGNATURE */}
        {renderImage(docsign.src, 415, 100, 135, 30, 3, 1)}

        {/* EMAIL ID OPTIONAL */}
        {renderParagraph(
          getTimeFromDate(data?.dateAndTimeOfSignature) || "",
          420,
          253,
          144,
          16
        )}

        {/* HOSPITAL SEAL */}
        {renderImage(hospitalseal.src, 630, 100, 120, 50, 3, 1)}

        {/* DOCTOR SIGNATURE */}
        {renderImage(docsign.src, 634, 580, 135, 45, 3, 1)}

        {renderParagraph(
          getValidFormattedDate(data?.dateAndTimeOfAdmission || ""),
          700,
          76,
          100,
          16
        )}

        {/* TIME HH MM */}

        {renderParagraph(
          getTimeFromDate(data?.dateAndTimeOfAdmission || ""),
          700,
          276,
          100,
          16
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default HDFCErgoPage2;
