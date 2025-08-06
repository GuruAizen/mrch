import React from "react";
import page3 from "@/assets/form_templates/aditya_birla/aditya_birla_capital_page3.jpg";
import docsign from "@/assets/form_templates/common/doctorsignature.jpg";
import hospitalseal from "@/assets/form_templates/common/hospitalseal.jpg";
import styled, { css } from "styled-components";
import {
  ageGaps,
  dobGaps,
  getDateOnly,
  getTimeFromDate,
  getValidFormattedDate,
  parseAgeToYYMM,
  parseAgeToYYMMCharsWithLabels,
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
const Tick = styled.div`
  position: absolute;
  font-size: 14px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 20;
  /* border: 1px solid tomato; */
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
  align-content: end;
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
  ${({ whiteBg }) =>
    whiteBg &&
    css`
      background-color: white;
      color: black;
    `}/* border: 1px solid tomato; */
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
`;

const AdityaBirlaPage3 = ({ data }) => {
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
  const renderConditionally = (field, tfField) => {
    const tf = (tfField || "").toString().toLowerCase();
    const shouldRender =
      tf &&
      tf !== "n/a" &&
      tf !== "false" &&
      tf !== "null" &&
      tf !== "undefined";

    return shouldRender ? field || "-" : "-";
  };
  const renderParagraph = (
    text,
    top,
    left,
    width,
    height,
    fontSize,
    whiteBg = false
  ) => (
    <FieldBox
      top={top}
      left={left}
      width={width}
      height={height}
      fontSize={fontSize}
      whiteBg={whiteBg}
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
        <BackgroundImage src={page3.src} alt="Background Form" />

        {/********************************** ICU CHARGES   ****************************/}
        {renderParagraph(data?.icuCharges || "", 29, 133, 213, 18)}

        {/********************************** OT CHARGES   ****************************/}
        {renderParagraph(data?.otCharges || "", 54, 133, 213, 18)}
        {/********************************** PROFESSION FEES SURGEON   ****************************/}
        {renderParagraph(
          data?.professionalFeesSurgeonAnesthetistFeesConsultationCharges || "",
          79,
          413,
          213,
          18
        )}

        {/********************************** MEDICINES + CONSUMABLES   ****************************/}
        {renderParagraph(
          data?.medicinesConsumablesCostOfImplantsIfApplicablePleaseSpecify ||
            "",
          105,
          444,
          219,
          18
        )}
        {/********************************** OTHER HOSPITAL EXPENSES     ****************************/}
        {renderParagraph(data?.otherHospitalExpenses || "", 130, 227, 219, 18)}

        {/********************************** ALL INCLUSIVE PACKAGES ****************************/}
        {renderParagraph(
          data?.allInclusivePackageChargesIfAnyApplicable || "",
          155,
          307,
          215,
          18
        )}
        {/********************************** SUM TOTAL EXPECTED ****************************/}
        {renderParagraph(
          data?.sumTotalExpectedCostOfHospitalization || "",
          180,
          287,
          459,
          18
        )}
        {/********************************** NAME OF TREATING DOCTOR ****************************/}
        {renderParagraph(data?.nameOfTreatingDoctor || "", 284, 220, 520, 18)}

        {/********************************** QUALIFICATION ****************************/}
        {renderParagraph(data?.doctorQualification || "", 309, 150, 600, 18)}

        {/********************************** REGISTRATION WITH STATE CODE ****************************/}
        {renderParagraph(
          data?.registrationNumberWithStateCode || "",
          334,
          260,
          490,
          18
        )}
        {/********************************** PATIENT / INSURER SIGNATURE ****************************/}
        {renderImage(
          docsign.src, // src
          390, // top (pixels from top)
          520, // left (pixels from left)
          135, // width in px
          30, // height in px
          3, // zIndex: place above content
          1 // opacity: 10% for watermark effect
        )}

        {/********************************** HOSPITAL SEAL ****************************/}
        {renderImage(
          hospitalseal.src, // src
          373, // top (pixels from top)
          80, // left (pixels from left)
          150, // width in px
          55, // height in px
          3, // zIndex: place above content
          1 // opacity: 10% for watermark effect
        )}

        {/**********************************  NAME OF THE PATIENT  ****************************/}
        {renderParagraph(data?.patientName || "", 829, 220, 482, 18)}
        {/**********************************  CONTACT NUMBER  ****************************/}
        {renderParagraph(data?.contactNo || "", 853, 166, 172, 18)}

        {/**********************************  EMAIL ID  ****************************/}
        {renderParagraph(data?.email || "", 853, 463, 282, 18)}

        {/********************************** PATIENT / INSURER SIGNATURE ****************************/}
        {renderImage(
          docsign.src, // src
          878, // top (pixels from top)
          240, // left (pixels from left)
          135, // width in px
          25, // height in px
          3, // zIndex: place above content
          1 // opacity: 10% for watermark effect
        )}

        {/**********************************  TIME   ****************************/}
        <EraseArea top={914} left={109} width={10} height={12} />
        <EraseArea top={914} left={125} width={10} height={12} />
        <EraseArea top={914} left={142} width={10} height={12} />
        <EraseArea top={914} left={158} width={10} height={12} />
        <EraseArea top={914} left={175} width={10} height={12} />
        <EraseArea top={914} left={191} width={10} height={12} />
        <EraseArea top={914} left={208} width={10} height={12} />
        <EraseArea top={914} left={224} width={10} height={12} />

        {renderCharByCharWithGaps(
          parseTimeToHHMM(data?.dateAndTimeOfSignature) || "",
          912,
          340,
          [16, 16, 16, 16]
        )}

        {/**********************************  DATE   ****************************/}

        <EraseArea top={914} left={339} width={10} height={12} />
        <EraseArea top={914} left={355} width={10} height={12} />
        <EraseArea top={914} left={371} width={10} height={12} />
        <EraseArea top={914} left={388} width={10} height={12} />

        {renderCharByCharWithGaps(
          parseDOBtoDDMMYYYY(data?.dateAndTimeOfSignature) || "",
          912,
          110,
          [17, 17, 17, 17, 17, 17]
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default AdityaBirlaPage3;
